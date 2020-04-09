import Client from "../util/Client";
import { Collection, Snowflake, Role, GuildMember, User } from "discord.js";
import { post } from "../util/Request";

export = async (client, oldMsg, newMsg) => {
 //if (newMsg.mentions === oldMsg.mentions) return;

  let webhook = (await oldMsg.channel.fetchWebhooks()).find((w) => w.type === "Incoming")?.url
    || (await oldMsg.channel.createWebhook("No-Ghost-Pings Webhook", { reason: 'Send a message "as" the user who sent a ghost ping' })).url;



 const mentions: string[] = [];

  oldMsg.mentions.users.array().filter((u: User) => !newMsg.mentions.users.array().includes(u)).forEach((u: User) => mentions.push(u.toString()));

  oldMsg.mentions.roles.array().filter((m: Role) => !newMsg.mentions.roles.array().includes(m)).forEach((m: Role) => mentions.push(m.toString()));

  if (oldMsg.mentions.everyone && !newMsg.mentions.everyone) mentions.push("@everyone");

  if (!mentions.length) return;

  const body = {
    content: `${mentions.join(" ")} \`[Ghost ${mentions.length > 1 ? "pings" : "ping"}]\``,
    avatar_url: oldMsg.author.displayAvatarURL({ format: "png", dynamic: true }),
    username: oldMsg.author.tag,
    allowed_mentions: { parse: [] }
  };

  await post (webhook, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  })
    .catch(console.error);

}
