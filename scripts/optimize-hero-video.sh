#!/bin/bash

# Hero Video Optimization Script
# Compresses video from 265MB to < 10MB for web performance

set -e  # Exit on error

INPUT_VIDEO="public/videos/Wendy hg_1.2.mp4"
OUTPUT_DIR="public/videos"
OUTPUT_MP4="${OUTPUT_DIR}/hero-demo-optimized.mp4"
OUTPUT_WEBM="${OUTPUT_DIR}/hero-demo-optimized.webm"

echo "🎬 Hero Video Optimization"
echo "=========================="
echo ""

# Check if FFmpeg is installed
if ! command -v ffmpeg &> /dev/null; then
    echo "❌ Error: FFmpeg is not installed"
    echo ""
    echo "Install FFmpeg:"
    echo "  Ubuntu/Debian: sudo apt-get install ffmpeg"
    echo "  macOS: brew install ffmpeg"
    echo "  Windows: Download from https://ffmpeg.org/download.html"
    exit 1
fi

# Check if input video exists
if [ ! -f "$INPUT_VIDEO" ]; then
    echo "❌ Error: Input video not found: $INPUT_VIDEO"
    exit 1
fi

# Get original video info
echo "📊 Original Video Info:"
echo "=========================="
du -h "$INPUT_VIDEO"
ffprobe -v error -show_entries format=duration,size,bit_rate -of default=noprint_wrappers=1 "$INPUT_VIDEO" 2>/dev/null || echo "Could not get detailed info"
echo ""

# Optimize to MP4 (H.264)
echo "🔄 Creating optimized MP4..."
echo "Target: < 10MB, 1280x720, 30fps"
echo ""

ffmpeg -i "$INPUT_VIDEO" \
    -vf "scale=1280:-2" \
    -c:v libx264 \
    -crf 28 \
    -preset slow \
    -r 30 \
    -an \
    -movflags +faststart \
    "$OUTPUT_MP4" \
    -y \
    2>&1 | grep -E "(Duration|Stream|frame|size)" || true

echo ""
echo "✅ MP4 created: $OUTPUT_MP4"
du -h "$OUTPUT_MP4"
echo ""

# Optimize to WebM (VP9) - better compression
echo "🔄 Creating optimized WebM..."
echo "Target: even smaller than MP4"
echo ""

ffmpeg -i "$INPUT_VIDEO" \
    -vf "scale=1280:-2" \
    -c:v libvpx-vp9 \
    -crf 35 \
    -b:v 0 \
    -r 30 \
    -an \
    "$OUTPUT_WEBM" \
    -y \
    2>&1 | grep -E "(Duration|Stream|frame|size)" || true

echo ""
echo "✅ WebM created: $OUTPUT_WEBM"
du -h "$OUTPUT_WEBM"
echo ""

# Compare sizes
echo "📊 Compression Results:"
echo "=========================="
ORIGINAL_SIZE=$(stat -f%z "$INPUT_VIDEO" 2>/dev/null || stat -c%s "$INPUT_VIDEO")
MP4_SIZE=$(stat -f%z "$OUTPUT_MP4" 2>/dev/null || stat -c%s "$OUTPUT_MP4")
WEBM_SIZE=$(stat -f%z "$OUTPUT_WEBM" 2>/dev/null || stat -c%s "$OUTPUT_WEBM")

ORIGINAL_MB=$(echo "scale=2; $ORIGINAL_SIZE / 1024 / 1024" | bc)
MP4_MB=$(echo "scale=2; $MP4_SIZE / 1024 / 1024" | bc)
WEBM_MB=$(echo "scale=2; $WEBM_SIZE / 1024 / 1024" | bc)

MP4_REDUCTION=$(echo "scale=1; (1 - $MP4_SIZE / $ORIGINAL_SIZE) * 100" | bc)
WEBM_REDUCTION=$(echo "scale=1; (1 - $WEBM_SIZE / $ORIGINAL_SIZE) * 100" | bc)

echo "Original:  ${ORIGINAL_MB} MB"
echo "MP4:       ${MP4_MB} MB (-${MP4_REDUCTION}%)"
echo "WebM:      ${WEBM_MB} MB (-${WEBM_REDUCTION}%)"
echo ""

# Update symlink to use optimized video
if [ -f "$OUTPUT_MP4" ]; then
    echo "🔗 Updating symlink to use optimized video..."
    rm -f "${OUTPUT_DIR}/hero-demo.mp4"
    ln -s "hero-demo-optimized.mp4" "${OUTPUT_DIR}/hero-demo.mp4"
    echo "✅ Symlink updated: hero-demo.mp4 → hero-demo-optimized.mp4"
    echo ""
fi

# Recommendations
echo "📝 Next Steps:"
echo "=========================="
echo ""
if (( $(echo "$MP4_MB < 10" | bc -l) )); then
    echo "✅ MP4 is under 10MB - good for production!"
else
    echo "⚠️  MP4 is still > 10MB. Consider:"
    echo "   - Shorter duration (trim to 10-15 seconds)"
    echo "   - Lower resolution (720p → 480p)"
    echo "   - Higher CRF (28 → 30-32)"
fi
echo ""
if (( $(echo "$WEBM_MB < 5" | bc -l) )); then
    echo "✅ WebM is excellent! Use it for modern browsers"
else
    echo "💡 WebM is larger than expected, but still good"
fi
echo ""
echo "Update Hero component to use both formats:"
echo "  <video>"
echo "    <source src=\"/videos/hero-demo-optimized.webm\" type=\"video/webm\">"
echo "    <source src=\"/videos/hero-demo-optimized.mp4\" type=\"video/mp4\">"
echo "  </video>"
echo ""
echo "🎉 Done! Test the video in your browser."
