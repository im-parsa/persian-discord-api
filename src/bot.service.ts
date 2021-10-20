import Discord from "discord.js";

const Client0: any = new Discord.Client(),
  Client1: any = new Discord.Client(),

  { TOKEN0, TOKEN1 } = process.env;

Client0.login(TOKEN0);
Client1.login(TOKEN1);

Client0.on("ready", async () =>
{
    console.log(String(`Logged in as ${Client0.user.tag} !`));
});

Client1.on("ready", async () =>
{
  console.log(String(`Logged in as ${Client1.user.tag} !`));
  Client1.user.setActivity(` Discord Users`, { type: 'WATCHING' });
});

export const bot = Client0;
