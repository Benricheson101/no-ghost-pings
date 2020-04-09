import { Message } from "discord.js";
import Client from "src/util/Client";

export = async (client: Client, message: Message) => {
  if (message.author.bot) return;
}
