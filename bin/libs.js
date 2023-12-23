const fs = require("fs");
const path = require("path");

const createFile = (folderPath, content) => {
  const foldersAndFile = folderPath.split(path.sep);
  const fileName = foldersAndFile.pop();
  let currentPath = "";

  foldersAndFile.forEach((folder) => {
    currentPath = path.join(currentPath, folder);

    if (!fs.existsSync(currentPath)) {
      fs.mkdirSync(currentPath);
      console.log(`Created folder: ${currentPath}`);
    } else {
      console.log(`Folder already exists: ${currentPath}`);
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

module.exports = {
  createFile,
};
