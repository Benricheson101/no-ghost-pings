import { Client, ClientOptions, Collection } from "discord.js";

export default class extends Client {
  commands: Collection<string, any>;

  constructor (options: ClientOptions) {
    super(options);
  }
}
