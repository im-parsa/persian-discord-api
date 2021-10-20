import Discord from "discord.js";
import moment from "moment";

const discordWebhookClient = new Discord.WebhookClient
(
  `${process.env.WEBHOOK_ID}`,
  `${process.env.WEBHOOK_TOKEN}`
)

export const removeItemOnce = (arr: any, value: string) =>
{
  const index = arr.indexOf(value);
  if (index > -1) arr.splice(index, 1);
  return arr;
}

export const logger = (data: { json: string, id: number, user: any }) =>
{
  const logEmbed = new Discord.MessageEmbed()
    .setTitle(':postbox: New API Usage')
    .setColor('#5865F2')
    .setThumbnail(data.user.user.displayAvatarURL({ dynamic: true,size: 1024 }) )
    .addFields(
      {
        name: '**JSON Status: **',
        value: `\`\`\` ${data.json || false} \`\`\``
      },
      {
        name: '**User ID: **',
        value: `\`\`\` ${data.id} \`\`\``
      },
      {
        name: '**Username: **',
        value: `\`\`\` ${data.user.user.username + "#" + data.user.user.discriminator} \`\`\``
      },
      {
        name: '**User Presence: **',
        value: `\`\`\` ${data.user.presence.status} \`\`\``
      },
      {
        name: '**Account Creation Date: **',
        value: `\`\`\` ${moment(data.user.user.createdAt).format("MMMM Do YYYY")} \`\`\``
      },
      {
        name: '**Account Age From Now: **',
        value: `\`\`\` ${moment(data.user.user.createdAt).fromNow()} \`\`\``
      },
      {
        name: '**Username: **',
        value: `\`\`\` ${data.user.user.username + "#" + data.user.user.discriminator} \`\`\``
      },
    )
    .setTimestamp();

  discordWebhookClient.send(
    {
      embeds : [logEmbed]
    })
}
