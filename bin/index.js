#! /usr/bin/env node
import enquirer from "enquirer";
import { createFile } from "./libs.js";
import { add } from "./add.js";
import fs from "fs";
import path from "path";

(async () => {
  console.log(process.cwd(), "snipia.json");
  try {
    const userConfig = JSON.parse(
      fs.readFileSync(path.resolve(process.cwd(), "snipia.json"))
    );
  } catch (err) {
    const defaultConfig = JSON.parse(
      fs.readFileSync(path.resolve(process.cwd(), "bin/default-config.json"))
    );
    let userConfig = { ...defaultConfig };
    const { userId } = await enquirer.prompt({
      type: "input",
      name: "userId",
      message: `What is your snipia user id  ? ex: user_2Z3az.....)`,
    });
    userConfig.userId = userId;
    createFile("snipia.json", JSON.stringify(userConfig));
  } finally {
    add();
  }

  // const { componentPath } = await prompt({
  //   type: "input",
  //   name: "componentPath",
  //   message: `Where is the components folder located ?)`,
  //   initial: defaultConfig.components,
  // });

  // userConfig.components = componentPath;
})();
