#! /usr/bin/env node
const { prompt } = require("enquirer");
const path = require("path");
const { createFile } = require("./libs");
const fs = require("fs");
const defaultConfig = require("./snipia.json");
let userConfig = { ...config };

(async () => {
  const { componentPath } = await prompt({
    type: "input",
    name: "componentPath",
    message: `Where is the components folder located? (default: ${defaultConfig.components})`,
    initial: defaultConfig.components,
  });
  userConfig.components = componentPath;

  createFile("snipia.json");
})();
