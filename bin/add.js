import clipboardy from "clipboardy";
import { createFile } from "./libs.js";
import fs from "fs";
import path from "path";
export function add() {
  try {
    const userConfig = JSON.parse(
      fs.readFileSync(path.resolve(process.cwd(), "snipia.json"))
    );

    // The text you want to copy to the clipboard

    // Copy the text to the clipboard
    const action = process.argv[2];
    const componentName = process.argv[3];
    const fileName = process.argv[4];

    if (action === "add") {
      fetch(
        `http://localhost:3000/api/snippets/?name=${componentName}&userId=${userConfig.userId}`
      )
        .then((response) => response.json())
        .then((response) => {
          const content = response.data[0].content;
          if (!fileName) {
            clipboardy.writeSync(content);
            console.log("Code copied into clipboard");
          } else {
            createFile(userConfig.components + "/" + fileName, content);
          }
        })
        .catch((error) => console.error("Error:", error));
    } else {
      console.error(
        'Error: action does not exist. Available actions are "add" '
      );
    }
  } catch (err) {
    console.error("No config found");
  }
}
