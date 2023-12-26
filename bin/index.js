#! /usr/bin/env node

import { add } from "./add.js";
import { setup } from "./setup.js";
import { getConfig } from "./libs.js";
import chalk from "chalk";

(async () => {
  const userConfig = getConfig();
  if (userConfig === null) {
    console.log(
      chalk.yellow("No config found, initializing a new snipia.json")
    );
    await setup();
  }
  add();
})();
