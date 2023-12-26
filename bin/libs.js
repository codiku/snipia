import fs from "fs";
import path from "path";
import chalk from "chalk";

export const createFile = (folderPath, content = "") => {
  // Normalize the folder path for cross-platform compatibility
  const normalizedFolderPath = path.normalize(folderPath);

  const foldersAndFile = normalizedFolderPath.split(path.sep);
  const fileName = foldersAndFile.pop();
  let currentPath = process.cwd();

  foldersAndFile.forEach((folder) => {
    currentPath = path.join(currentPath, folder);

    if (!fs.existsSync(currentPath)) {
      fs.mkdirSync(currentPath);
    }
  });

  const filePath = path.join(currentPath, fileName);

  // Check if the path is a file or a directory
  if (path.extname(filePath)) {
    // It's a file
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, content);
      console.log(chalk.white.bgGreen(`Created file: ${filePath}`));
    } else {
      console.log(chalk.yellow(`File already exists: ${filePath}`));
    }
  } else {
    // It's a directory
    if (!fs.existsSync(filePath)) {
      fs.mkdirSync(filePath);
      console.log(chalk.green(`Created directory: ${filePath}`));
    } else {
      console.log(chalk.yellow(`Directory already exists: ${filePath}`));
    }
  }
};

export const getConfig = () => {
  try {
    return JSON.parse(
      fs.readFileSync(path.resolve(process.cwd(), "snipia.json"))
    );
  } catch (err) {
    return null;
  }
};
