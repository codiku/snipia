import enquirer from "enquirer";
import { createFile } from "./libs.js";

export async function setup() {
  let config = {
    components: "/",
    userId: null,
  };

  const { userId } = await enquirer.prompt({
    type: "input",
    name: "userId",
    message: `What is your snipia userId ? (Find it a the top right corner in snipia.vercel.app when signed-in) )`,
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
