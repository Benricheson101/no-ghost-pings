import Client from "./util/Client";
import { token } from "./config";
import fileLoader from "./util/fileloader";
import { basename } from "path";

const client = new Client({
  disableMentions: "all"
});

//TODO: check permissions, ignore channels where the bot is missing 'send messages'
(async () => {
  let eventFiles = fileLoader("build/events");
  for await (let file of eventFiles) {
    if (!file.endsWith(".js")) continue;

    let event = require(file);
    let eventName = basename(file).split(".")[0];

    client.on((eventName as any), event.bind(null, client));
    console.log(`[E] Loaded ${eventName}`);
  }

  /*let commandFiles = fileLoader("build/cmds");
  for await (let file of commandFiles) {
    if (!file.endsWith(".js")) continue;
    let cmd = require(file);
    client.commands.set(cmd.config.name, cmd);
    console.log(`[C] Loaded ${basename(file)}`);
  }*/
})();

client.login(token)
  .catch(console.error);
