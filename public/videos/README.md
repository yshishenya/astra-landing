# Hero Video Setup Instructions

## 📹 Video from Yandex.Disk

The hero video "Wendy AI-HR.mp4" needs to be downloaded manually from Yandex.Disk:

**Download URL:** https://disk.yandex.ru/d/tVfYcAQ4kqGlpA/Wendy%20AI-HR.mp4

### Manual Download Steps:

1. Open the URL above in your browser
2. Complete the CAPTCHA if prompted
3. Click the download button
4. Save the file as `hero-demo.mp4` in this directory (`/public/videos/`)

### Video Requirements:

- **Format:** MP4 (H.264 codec preferred)
- **Resolution:** Max 1920x1080px (1080p)
- **File Size:** Should be < 10MB for optimal performance
- **Duration:** 10-30 seconds recommended for hero background

### Optional: Compress the Video

If the downloaded video is too large (> 10MB), compress it using FFmpeg:

```bash
# Install FFmpeg first if not installed:
# Ubuntu/Debian: sudo apt-get install ffmpeg
# macOS: brew install ffmpeg

# Compress to < 5MB with good quality:
ffmpeg -i hero-demo.mp4 -vcodec libx264 -crf 28 -preset slow -vf scale=1280:-1 -an hero-demo-compressed.mp4

# Optional: Convert to WebM for better compression:
ffmpeg -i hero-demo.mp4 -c:v libvpx-vp9 -crf 30 -b:v 0 -vf scale=1280:-1 -an hero-demo.webm
```

### Alternative: Use Stock Video

If the Yandex video is not suitable, download a free stock video from:

- **Pexels Videos:** https://www.pexels.com/search/videos/ai-technology-dashboard/
- **Coverr:** https://coverr.co/
- **Pixabay:** https://pixabay.com/videos/search/data%20analytics/

Search for: "AI technology", "data analytics", "dashboard interface", "modern tech"

### Expected Files:

After download and optimization, you should have:
- ✅ `hero-demo.mp4` (primary format, < 10MB)
- ✅ `hero-demo.webm` (optional, better compression)

The video will be automatically used in the Hero section once placed in this directory.
