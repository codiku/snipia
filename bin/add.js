import clipboardy from "clipboardy";
import { createFile, getConfig } from "./libs.js";
import fs from "fs";
import path from "path";
export function add() {
  try {
    const userConfig = getConfig();

    const action = process.argv[2];
    const componentName = process.argv[3];
    const fileName = process.argv[4];

    if (action === "add") {
      fetch(
        `${process.env.SNIPIA_BASE_URL}/api/snippets/?name=${componentName}&userId=${userConfig.userId}`
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
        "Invalid command use npx snipia add <component-name> <file-name-optional>"
      );
    }
  } catch (err) {
    console.error("No config found");
  }
}
