import enquirer from "enquirer";
import { createFile } from "./libs.js";

export async function setup() {
  const defaultConfig = JSON.parse(
    fs.readFileSync(path.resolve(process.cwd(), "bin/default-config.json"))
  );
  let userConfig = { ...defaultConfig };

  const { userId } = await enquirer.prompt({
    type: "input",
    name: "userId",
    message: `What is your snipia userId ? (Top right corner in snipia when signed in) )`,
  });
  userConfig.userId = userId;
  const { componentPath } = await prompt({
    type: "input",
    name: "componentPath",
    message: `Where is the components folder located ?)`,
    initial: defaultConfig.components,
  });
  userConfig.components = componentPath;

  createFile("snipia.json", JSON.stringify(userConfig));
}
