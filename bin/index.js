#! /usr/bin/env node

import { add } from "./add.js";
import fs from "fs";
import path from "path";
import { setup } from "./setup.js";
(async () => {
  try {
    //Try to read conf
    JSON.parse(fs.readFileSync(path.resolve(process.cwd(), "snipia.json")));
  } catch (err) {
    // Not found we create it
    setup();
  } finally {
    // After that we run the add command
    add();
  }
})();
