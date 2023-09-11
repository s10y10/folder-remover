import inquirer from 'inquirer';

async function getFolderName() {
  const { folderName } = await inquirer.prompt([
    {
      type: 'list',
      name: 'folderName',
      message: 'Please select the type of folder to delete：',
      choices: [
        {
          name: 'node_modules',
          value: 'node_modules',
        },
        {
          name: '.git',
          value: '.git',
        },
        {
          name: '.svn',
          value: '.svn',
        },
        {
          name: 'custom input',
          value: 'input',
        },
      ],
    },
  ]);
  if (folderName === 'input') {
    return getCustomInput();
  }
  return folderName;
}

async function getCustomInput() {
  const { input } = await inquirer.prompt([
    {
      type: 'input',
      name: 'input',
      message: 'Enter the folder name you want to delete',
    },
  ]);
  return input;
}

async function confirmDelete() {
  const { result } = await inquirer.prompt([
    {
      type: 'list',
      name: 'result',
      message: 'Do you want to delete the above folders?',
      choices: [
        {
          name: 'Yes',
          value: true,
        },
        {
          name: 'No',
          value: false,
        },
      ],
    },
  ]);
  return result;
}

export default {
  getFolderName,
  confirmDelete,
};
