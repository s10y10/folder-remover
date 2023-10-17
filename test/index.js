import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

function run() {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const dirPath = path.resolve(__dirname, "../temp");
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
  }
  const filePath = path.resolve(dirPath, "a.txt");
  fs.writeFileSync(filePath, "test");
}

run();
