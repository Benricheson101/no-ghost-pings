import Client from "./util/Client";
import { token, prefix } from "./config";
import fileLoader from "./util/fileloader";

const client = new Client({
  disableMentions: "all"
});

(async () => {
  let eventFiles = await fileLoader("build/events");
  for await (let file of eventFiles) {
    if (!file.endsWith(".js")) continue;

    let event = require(file);
    let eventName = basename(file).split(".")[0];

    client.on((eventName as any), event.bind(null, client));
  }

  let commandFiles = await fileLoader("build/cmds");
  for await (let file of commandFiles) {
    if (!file.endsWith(".js")) continue;
    let cmd = require(file);
    client.commands.set(cmd.config.name, cmd);
  }
})();




client.login(token)
  .catch(console.error);
