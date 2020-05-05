import { Message } from "discord.js";
import Client from "../util/Client";
import { post } from "../util/Request";

export = async (client: Client, message: Message) => {
  if (message.author.bot) return
  if (!message.guild.me.permissions.has("SEND_MESSAGES")) return;
  if (message.channel.type !== "text") return;
  if (Date.now() - message.createdTimestamp >= 300000) return; // 5 minutes
  const noMentions: boolean =
    !message.mentions.everyone &&
    !message.mentions.users.size &&
    !message.mentions.roles.size &&
    !message.mentions.members.size;

  if (noMentions) return;

  let webhook = (await message.channel.fetchWebhooks()).find((w) => w.type === "Incoming")?.url
    || (await message.channel.createWebhook("No-Ghost-Pings Webhook", { reason: 'Send a message "as" the user who sent a ghost ping' })).url;


  let mentions = [];

  message.mentions.members.filter((mention) => !mention.user.bot && mention.user.id !== message.author.id).forEach((mention) => mentions.push(mention.toString()));
  message.mentions.roles.filter((mention) => !mention.managed).forEach((mention) => mentions.push(mention.toString()));
  if (message.mentions.everyone) mentions.push("@everyone");

  if (!mentions.length) return;

  const body = {
    content: `${mentions.join(" ")} \`[Ghost ${mentions.length > 1 ? "pings" : "ping"}]\``,
    avatar_url: message.author.displayAvatarURL({ format: "png", dynamic: true }),
    username: message.author.tag,
    allowed_mentions: { parse: [] }
  };

  await post (webhook, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  })
    .then(console.log)
    .catch(console.error);
  }

