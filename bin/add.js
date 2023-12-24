import clipboardy from "clipboardy";
import { createFile, getConfig } from "./libs.js";

export function add() {
  const action = process.argv[2];
  const componentName = process.argv[3];
  const fileName = process.argv[4];

  try {
    const userConfig = getConfig();

    if (action === "add") {
      if (!componentName) {
        throw new Error(
          "No component name provided. Usage : npx snipia add <component-name>"
        );
      }
      fetch(
        `http://localhost:3000/api/snippets/?name=${componentName}&userId=${userConfig.userId}`
      )
        .then((response) => response.json())
        .then((response) => {
          if (response.data.length === 0) {
            throw new Error(
              "Could not find a snippet named ",
              componentName,
              " for userId ",
              userConfig.userId
            );
          }
          const content = response.data[0].content;
          if (!fileName) {
            clipboardy.writeSync(content);
            console.log("Code copied into clipboard");
          } else {
            createFile(userConfig.components + "/" + fileName, content);
          }
        });
    } else {
      throw new Error(
        "Invalid or missing action. Usage : npx snipia add <component-name> <optional-file-path>"
      );
    }
  } catch (err) {
    console.error(err.message);
  }
}
