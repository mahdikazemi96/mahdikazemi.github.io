import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const input = process.argv[2];
if (!input)
  throw new Error("Usage: npm run photo -- /absolute/path/to/original.jpg");
await mkdir("public/images", { recursive: true });
const metadata = await sharp(input).metadata();
console.log(
  `Original preserved: ${path.basename(input)} (${metadata.width} × ${metadata.height})`,
);
// A 4:5 crop preserves the subject’s face and shoulders. No facial retouching.
// Slight exposure lift compensates for the dark studio image.
for (const width of [480, 960]) {
  const base = sharp(input)
    .rotate()
    .resize(width, Math.round(width * 1.25), {
      fit: "cover",
      position: "north",
    })
    .modulate({ brightness: 1.12 });
  await base
    .clone()
    .webp({ quality: 83 })
    .toFile(`public/images/portrait-${width}.webp`);
  await base
    .clone()
    .avif({ quality: 55 })
    .toFile(`public/images/portrait-${width}.avif`);
  await base
    .clone()
    .jpeg({ quality: 85, mozjpeg: true })
    .toFile(`public/images/portrait-${width}.jpg`);
}
// Social previews use a raster asset for broad crawler compatibility.
const text = Buffer.from(
  `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg"><rect width="1200" height="630" fill="#0c1419"/><path d="M70 80H120" stroke="#8ed9c3" stroke-width="3"/><text x="70" y="143" font-family="Arial" font-size="18" letter-spacing="4" fill="#8ed9c3">ENGINEERING WITH INTENTION</text><text x="65" y="267" font-family="Arial" font-size="76" fill="#eceee9">Mahdi</text><text x="65" y="352" font-family="Arial" font-size="76" fill="#eceee9">Kazemi<tspan fill="#8ed9c3">.</tspan></text><text x="70" y="427" font-family="Arial" font-size="23" fill="#b8c7cb">.NET Backend Developer</text><text x="70" y="471" font-family="Arial" font-size="18" fill="#b8c7cb">Software Architecture Enthusiast</text><text x="70" y="560" font-family="Arial" font-size="15" letter-spacing="2" fill="#8ed9c3">BUILD. UNDERSTAND. SHARE.</text></svg>`,
);
const portrait = await sharp(input)
  .rotate()
  .resize(430, 550, { fit: "cover", position: "north" })
  .modulate({ brightness: 1.12 })
  .toBuffer();
await sharp(text)
  .composite([{ input: portrait, left: 730, top: 40 }])
  .jpeg({ quality: 87 })
  .toFile("public/images/social-card.jpg");
console.log(
  "Generated responsive AVIF/WebP/JPEG portraits and social-card.jpg. Inspect crops before publishing.",
);
