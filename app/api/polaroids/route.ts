import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { DEFAULT_POLAROID_IMAGES } from "@/data/polaroidManifest";

// Supported image extensions
const VALID_IMAGE_EXTS = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif"]);

export async function GET() {
  try {
    const cwd = process.cwd();
    const sourceDir = path.join(cwd, "images", "poloroid");
    const publicDir = path.join(cwd, "public", "images", "polaroid");

    let discoveredFiles: string[] = [];

    // Safely attempt scanning source folder (local dev environment)
    try {
      if (fs.existsSync(sourceDir)) {
        const files = fs.readdirSync(sourceDir);
        for (const file of files) {
          const ext = path.extname(file).toLowerCase();
          if (VALID_IMAGE_EXTS.has(ext)) {
            discoveredFiles.push(file);

            // Attempt copy only if publicDir is writable
            try {
              if (!fs.existsSync(publicDir)) {
                fs.mkdirSync(publicDir, { recursive: true });
              }
              const srcPath = path.join(sourceDir, file);
              const destPath = path.join(publicDir, file);
              if (!fs.existsSync(destPath)) {
                fs.copyFileSync(srcPath, destPath);
              }
            } catch {
              // Read-only filesystem in cloud deployment (Vercel)
            }
          }
        }
      }
    } catch {
      // Ignore filesystem access issues in serverless
    }

    // Safely check public directory
    try {
      if (fs.existsSync(publicDir)) {
        const pubFiles = fs.readdirSync(publicDir);
        for (const file of pubFiles) {
          const ext = path.extname(file).toLowerCase();
          if (VALID_IMAGE_EXTS.has(ext) && !discoveredFiles.includes(file)) {
            discoveredFiles.push(file);
          }
        }
      }
    } catch {
      // Ignore filesystem access issues in serverless
    }

    // Map to URLs, or fallback to static manifest if serverless has isolated filesystem
    let imageUrls = discoveredFiles.map((file) => `/images/polaroid/${file}`);
    if (imageUrls.length === 0) {
      imageUrls = DEFAULT_POLAROID_IMAGES;
    }

    return NextResponse.json({
      success: true,
      count: imageUrls.length,
      images: imageUrls,
    });
  } catch (err) {
    console.error("Error reading polaroids directory:", err);
    return NextResponse.json({
      success: true,
      count: DEFAULT_POLAROID_IMAGES.length,
      images: DEFAULT_POLAROID_IMAGES,
    });
  }
}
