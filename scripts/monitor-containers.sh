#!/bin/bash

# Container Monitoring Script for Astra Landing Page
# Features: Resource usage, health checks, performance metrics

set -euo pipefail

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
CONTAINER_NAME="${1:-astra-landing-prod}"
ALERT_CPU_THRESHOLD=80
ALERT_MEMORY_THRESHOLD=80

# Functions
print_header() {
    echo -e "${BLUE}================================================${NC}"
    echo -e "${BLUE}  Container Monitoring - $(date '+%Y-%m-%d %H:%M:%S')${NC}"
    echo -e "${BLUE}================================================${NC}"
}

print_section() {
    echo -e "\n${GREEN}▶ $1${NC}"
    echo "----------------------------------------"
}

check_container_status() {
    print_section "Container Status"

    if docker ps -f name="${CONTAINER_NAME}" --format "{{.Names}}" | grep -q "${CONTAINER_NAME}"; then
        STATUS=$(docker inspect -f '{{.State.Status}}' "${CONTAINER_NAME}")
        UPTIME=$(docker inspect -f '{{.State.StartedAt}}' "${CONTAINER_NAME}")

        if [ "$STATUS" = "running" ]; then
            echo -e "${GREEN}✓${NC} Container is ${GREEN}running${NC}"
        else
            echo -e "${RED}✗${NC} Container status: ${RED}${STATUS}${NC}"
        fi

        echo "  Started: ${UPTIME}"
        echo "  Health: $(docker inspect -f '{{.State.Health.Status}}' "${CONTAINER_NAME}" 2>/dev/null || echo 'N/A')"
    else
        echo -e "${RED}✗ Container '${CONTAINER_NAME}' not found${NC}"
        exit 1
    fi
}

check_resource_usage() {
    print_section "Resource Usage"

    # Get container stats
    STATS=$(docker stats --no-stream --format "{{.CPUPerc}}|{{.MemPerc}}|{{.MemUsage}}|{{.NetIO}}|{{.BlockIO}}" "${CONTAINER_NAME}")

    CPU_PERC=$(echo "${STATS}" | cut -d'|' -f1 | sed 's/%//')
    MEM_PERC=$(echo "${STATS}" | cut -d'|' -f2 | sed 's/%//')
    MEM_USAGE=$(echo "${STATS}" | cut -d'|' -f3)
    NET_IO=$(echo "${STATS}" | cut -d'|' -f4)
    BLOCK_IO=$(echo "${STATS}" | cut -d'|' -f5)

    # CPU check
    echo -n "  CPU Usage: ${CPU_PERC}% "
    if (( $(echo "${CPU_PERC} > ${ALERT_CPU_THRESHOLD}" | bc -l) )); then
        echo -e "${RED}⚠ HIGH${NC}"
    else
        echo -e "${GREEN}✓${NC}"
    fi

    # Memory check
    echo -n "  Memory Usage: ${MEM_PERC}% (${MEM_USAGE}) "
    if (( $(echo "${MEM_PERC} > ${ALERT_MEMORY_THRESHOLD}" | bc -l) )); then
        echo -e "${RED}⚠ HIGH${NC}"
    else
        echo -e "${GREEN}✓${NC}"
    fi

    echo "  Network I/O: ${NET_IO}"
    echo "  Disk I/O: ${BLOCK_IO}"
}

check_health_endpoint() {
    print_section "Health Check"

    # Get container port
    PORT=$(docker port "${CONTAINER_NAME}" 3000 2>/dev/null | cut -d':' -f2)

    if [ -n "${PORT}" ]; then
        HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:${PORT}/api/health" || echo "000")

        if [ "${HTTP_CODE}" = "200" ]; then
            echo -e "${GREEN}✓${NC} Health endpoint responding (HTTP ${HTTP_CODE})"
        else
            echo -e "${RED}✗${NC} Health endpoint not responding (HTTP ${HTTP_CODE})"
        fi
    else
        echo -e "${YELLOW}⚠${NC} Could not determine container port"
    fi
}

check_logs() {
    print_section "Recent Logs (Last 10 lines)"

    docker logs --tail 10 "${CONTAINER_NAME}" 2>&1 | sed 's/^/  /'
}

check_image_info() {
    print_section "Image Information"

    IMAGE_ID=$(docker inspect -f '{{.Image}}' "${CONTAINER_NAME}")
    IMAGE_SIZE=$(docker images --format "{{.Size}}" --filter "reference=$(docker inspect -f '{{.Config.Image}}' "${CONTAINER_NAME}")" | head -1)
    IMAGE_CREATED=$(docker inspect -f '{{.Created}}' "${IMAGE_ID}")

    echo "  Image: $(docker inspect -f '{{.Config.Image}}' "${CONTAINER_NAME}")"
    echo "  Size: ${IMAGE_SIZE}"
    echo "  Created: ${IMAGE_CREATED}"
}

generate_metrics_json() {
    print_section "Metrics Export (JSON)"

    STATS=$(docker stats --no-stream --format "{{.CPUPerc}}|{{.MemPerc}}|{{.MemUsage}}|{{.NetIO}}|{{.BlockIO}}" "${CONTAINER_NAME}")

    CPU_PERC=$(echo "${STATS}" | cut -d'|' -f1 | sed 's/%//')
    MEM_PERC=$(echo "${STATS}" | cut -d'|' -f2 | sed 's/%//')
    MEM_USAGE=$(echo "${STATS}" | cut -d'|' -f3)

    cat > /tmp/container-metrics.json <<EOF
{
  "timestamp": "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
  "container": "${CONTAINER_NAME}",
  "status": "$(docker inspect -f '{{.State.Status}}' "${CONTAINER_NAME}")",
  "health": "$(docker inspect -f '{{.State.Health.Status}}' "${CONTAINER_NAME}" 2>/dev/null || echo 'N/A')",
  "metrics": {
    "cpu_percent": ${CPU_PERC},
    "memory_percent": ${MEM_PERC},
    "memory_usage": "${MEM_USAGE}"
  },
  "alerts": {
    "cpu_high": $([ $(echo "${CPU_PERC} > ${ALERT_CPU_THRESHOLD}" | bc -l) -eq 1 ] && echo "true" || echo "false"),
    "memory_high": $([ $(echo "${MEM_PERC} > ${ALERT_MEMORY_THRESHOLD}" | bc -l) -eq 1 ] && echo "true" || echo "false")
  }
}
EOF

    echo "  Metrics saved to: /tmp/container-metrics.json"
}

# Main execution
main() {
    print_header
    check_container_status
    check_resource_usage
    check_health_endpoint
    check_image_info
    check_logs
    generate_metrics_json

    echo -e "\n${BLUE}================================================${NC}"
    echo -e "${GREEN}Monitoring complete!${NC}"
    echo -e "${BLUE}================================================${NC}\n"
}

# Run monitoring
main "$@"
