import fs from 'fs';
import path from 'path';
import folder from './lib/folder.js';
import prompt from './lib/prompt.js';
import tools from './lib/tools.js';

async function main() {
  const args = process.argv.slice(2);

  // 校验执行参数
  if (args.length < 1) {
    console.log("❌ Please provide a path. E.g './' for the current folder");
    return;
  }

  // 获取要删除的文件夹名
  const folderName = await prompt.getFolderName();
  const targetDir = path.resolve(process.cwd(), args[0]);

  // 查找是否存在要删除的文件夹
  const foundDirs = await folder.findFolders(targetDir, folderName);
  if (foundDirs.length === 0) {
    console.log(`❌ No '${folderName}' folders found.`);
    return;
  }

  // 计算文件夹大小
  const { entries, totalSize } = folder.calculateSizeOfDirs(foundDirs);

  // 输出表格并提示是否确认删除
  tools.generateTable({ entries, totalSize });

  const confirmRes = await prompt.confirmDelete();
  if (!confirmRes) {
    console.log('The deletion has been cancelled');
    return;
  }

  // 执行删除
  let deletedFoldersCounter = 0;
  for (const entry of entries) {
    await fs.promises.rm(entry.path, { recursive: true });
    deletedFoldersCounter++;
    console.log(
      `Deleting ${folderName} folders (${deletedFoldersCounter}/${entries.length})...`
    );
  }

  // 打印结果
  console.log(
    `All specified node_modules folders have been deleted. Total removed size: ${tools.unitsFormatter(
      totalSize
    )}`
  );
}

main().catch((err) => {
  console.error('An error occurred:', err);
  process.exit(1);
});
