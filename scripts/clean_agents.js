const sharp = require('sharp');
const path = require('path');

const CONFIG = {
  1: { sampleBox: { x1: 15, y1: 5, x2: 35, y2: 35 } },
  2: { sampleBox: { x1: 15, y1: 5, x2: 35, y2: 35 } },
  3: { sampleBox: { x1: 15, y1: 5, x2: 35, y2: 35 } },
  4: { sampleBox: { x1: 20, y1: 5, x2: 45, y2: 35 } },
  5: { sampleBox: { x1: 15, y1: 5, x2: 35, y2: 35 } },
  6: { sampleBox: { x1: 15, y1: 5, x2: 40, y2: 35 } },
};

async function cleanImage(id, inputPath, outputPath) {
  const { data, info } = await sharp(inputPath).raw().toBuffer({ resolveWithObject: true });
  const w = info.width;
  const h = info.height;
  const ch = info.channels;
  const buf = Buffer.from(data);

  const cfg = CONFIG[id];
  const srcBoxW = cfg.sampleBox.x2 - cfg.sampleBox.x1;
  const srcBoxH = cfg.sampleBox.y2 - cfg.sampleBox.y1;

  for (let y = 0; y <= 42; y++) {
    for (let x = 88; x < w; x++) {
      const idx = (y * w + x) * ch;
      const sampleX = cfg.sampleBox.x1 + ((x - 88) % srcBoxW);
      const sampleY = cfg.sampleBox.y1 + (y % srcBoxH);
      const sampleIdx = (sampleY * w + sampleX) * ch;

      buf[idx] = buf[sampleIdx];
      buf[idx + 1] = buf[sampleIdx + 1];
      buf[idx + 2] = buf[sampleIdx + 2];
      if (ch === 4) buf[idx + 3] = buf[sampleIdx + 3];
    }
  }

  // Smooth bokeh blur over the region x: 84..w, y: 0..44 (several passes of box blur)
  for (let pass = 0; pass < 5; pass++) {
    for (let y = 0; y <= 43; y++) {
      for (let x = 86; x < w; x++) {
        const idx = (y * w + x) * ch;
        for (let c = 0; c < 3; c++) {
          let sum = 0;
          let count = 0;
          for (let dy = -2; dy <= 2; dy++) {
            for (let dx = -2; dx <= 2; dx++) {
              const ny = Math.max(0, Math.min(43, y + dy));
              const nx = Math.max(85, Math.min(w - 1, x + dx));
              sum += buf[(ny * w + nx) * ch + c];
              count++;
            }
          }
          buf[idx + c] = Math.round(sum / count);
        }
      }
    }
  }

  await sharp(buf, { raw: { width: w, height: h, channels: ch } })
    .png()
    .toFile(outputPath);
  console.log(`Cleaned agent ${id} with bokeh -> ${outputPath}`);
}

(async () => {
  for (let i = 1; i <= 6; i++) {
    await cleanImage(
      i,
      path.join(__dirname, '..', 'public', 'agents', `top-agent-figma-${i}.png`),
      path.join(__dirname, '..', 'public', 'agents', `top-agent-clean-${i}.png`)
    );
  }
})();
