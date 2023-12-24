import clipboardy from "clipboardy";
import { createFile, getConfig } from "./libs.js";

export async function add() {
  const action = process.argv[2];
  const componentName = process.argv[3];
  const fileName = process.argv[4];
  const userConfig = getConfig();

  if (!userConfig?.userId) {
    throw new Error("Missing userId in snipia.json");
  }
  if (action !== "add") {
    throw new Error(
      "Invalid or missing action. Usage : npx snipia add <component-name> <optional-file-path>"
    );
  }
  if (!componentName) {
    throw new Error(
      "Missing component name. Usage : npx snipia add <component-name> <optional-file-path>"
    );
  }

  try {
    try {
      const response = await fetch(
        `http://localhost:3000/api/snippets/?name=${componentName}&userId=${userConfig.userId}`
      ).then((response) => response.json());

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
    } catch (err) {
      console.error("Something went wrong trying to fetch the snippets.");
    }
  } catch (err) {
    console.error(err.message);
  }
}
