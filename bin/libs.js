import fs from "fs";
import path from "path";

export const createFile = (folderPath, content) => {
  const foldersAndFile = folderPath.split(path.sep);
  const fileName = foldersAndFile.pop();
  let currentPath = "";

  foldersAndFile.forEach((folder) => {
    currentPath = path.join(currentPath, folder);

    if (!fs.existsSync(currentPath)) {
      fs.mkdirSync(currentPath);
    }
  });

  const filePath = path.join(currentPath, fileName);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content || "");
    console.log(`Created file: ${filePath}`);
  } else {
    console.log(`File already exists: ${filePath}`);
  }
};
