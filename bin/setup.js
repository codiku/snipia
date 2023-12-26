import enquirer from "enquirer";
import { createFile } from "./libs.js";
import fs from "fs";
import path from "path";

export async function setup() {
  let config = {
    components: "/app/components",
    userId: null,
  };

  const { userId } = await enquirer.prompt({
    type: "input",
    name: "userId",
    message: `What is your snipia userId ? (Top right corner in snipia when signed in) )`,
  });
  config.userId = userId;
  const { componentPath } = await enquirer.prompt({
    type: "input",
    name: "componentPath",
    message: `Where is the components folder located ?)`,
    initial: config.components,
  });
  config.components = componentPath;

  createFile("snipia.json", JSON.stringify(config));
}
