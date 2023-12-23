const clipboardy = require("clipboardy");

// The text you want to copy to the clipboard

// Copy the text to the clipboard

const action = process.argv[2];
const componentName = process.argv[3];
const fileName = process.argv[4];

const config = require("../snipia.json");

const { createFile } = require("./libs");
const userId = snipiaData.userId;

if (action === "add") {
  fetch(
    `http://localhost:3000/api/snippets/?name=${componentName}&userId=${userId}`
  )
    .then((response) => response.json())
    .then((data) => {
      if (!fileName) {
        clipboardy.writeSync(textToCopy);
        console.log("Code copied into clipboard");
      } else {
        createFile(config.components + fileName, data.content);
      }
    })
    .catch((error) => console.error("Error:", error));
} else {
  console.error('Error: action does not exist. Available actions are "add" ');
}
