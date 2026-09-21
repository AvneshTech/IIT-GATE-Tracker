import fs from 'fs';
import path from 'path';
import { generateGateExcel } from '../src/utils/excelGenerator';
import { GATE_TOPICS } from '../src/data/topicsData';

async function run() {
  console.log('Generating GATE_CSE_Complete_Preparation_Roadmap.xlsx...');
  const blob = await generateGateExcel(GATE_TOPICS);
  const arrayBuffer = await blob.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const publicDir = path.resolve(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const outPath = path.join(publicDir, 'GATE_CSE_Complete_Preparation_Roadmap.xlsx');
  fs.writeFileSync(outPath, buffer);
  console.log(`Successfully generated: ${outPath} (${buffer.length} bytes)`);
}

run().catch(err => {
  console.error('Error generating excel:', err);
  process.exit(1);
});
