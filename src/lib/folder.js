import fs from 'fs';
import path from 'path';

async function findFolders(targetDir, folderName) {
  const results = [];

  async function findNodeModulesRecursive(dir) {
    const entries = await fs.promises.readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      if (entry.isDirectory()) {
        if (entry.name === folderName) {
          results.push(path.join(dir, entry.name));
        } else {
          await findNodeModulesRecursive(path.join(dir, entry.name));
        }
      }
    }
  }

  await findNodeModulesRecursive(targetDir);
  return results;
}

function getFolderSize(folderPath) {
  let size = 0;
  const files = fs.readdirSync(folderPath);

  files.forEach((file) => {
    const filePath = path.join(folderPath, file);
    const stats = fs.statSync(filePath);

    if (stats.isFile()) {
      size += stats.size;
    } else if (stats.isDirectory()) {
      size += getFolderSize(filePath);
    }
  });

  return size;
}

function calculateSizeOfDirs(foundDirs) {
  let counter = 0;
  const entries = [];
  let totalSize = 0;

  for (const dir of foundDirs) {
    counter++;
    const dirSize = getFolderSize(dir);
    totalSize += dirSize;
    entries.push({
      path: dir,
      size: dirSize,
    });
    console.log(`Locating folders (found ${counter})...`);
  }

  return {
    entries,
    totalSize,
  };
}

export default {
  findFolders,
  calculateSizeOfDirs,
};
