import moment from "moment";
import { bot } from '../bot.service';
import { removeItemOnce, logger } from '../utils/functions.resolver'

export const main = async (req: any, res: any) =>
{
  res.render('index.ejs');
};

export const user = async (req: any, res: any) =>
{
  try
  {
    let { id, json } = req.query,
      MyGuild: any = bot.guilds.cache.get("796767783354368030"),
      user: any = MyGuild.members.cache.get(id),
      activities: string[] = [],
      customStatusArray: string[] = [],
      customStatus: string = 'N/A';

    if (!user)
    {
      if (json === 'true')
      {
        res.status(404).json(
          {
            message: "No user find with this ID"
          });
      }
      else
      {
        res.render(`error.ejs`,
          {
            error:
              {
                E404: false,
                title: "No user find with this ID"
              }
          });
      }
      return console.log("error")
    }

    if (json === 'true')
    {
      for (const activity of user.presence.activities.values())
      {
        switch (activity.type)
        {
          case "PLAYING":
            activities.push(`Playing`);
            customStatus = activity.state;
            break;
          case "LISTENING":
            if (user.user.bot)
            {
              activities.push(`Listening`);
              customStatus = activity.state;
            }
            else
            {
              activities.push(`Listening`);
              customStatus = activity.state + " - " + activity.details;
            }
            break;
          case "WATCHING":
            activities.push(`Watching`);
            customStatus = activity.state;
            break;
          case "STREAMING":
            activities.push(`Streaming`);
            customStatus = activity.state;

            break;
          case "CUSTOM_STATUS":
            activities.push(`Custom Status`);
            customStatus = activity.state;
            break;
        }
      }

      let userBadge = (await user.user.fetchFlags()).toArray() || [],
        userCreatedAt = moment(user.user.createdAt).format("MMMM Do YYYY"),
        userAgeFromNow = moment(user.user.createdAt).fromNow(),
        userId = user.user.id,
        userPresence = user.presence.status,
        userName = user.user.username + "#" + user.user.discriminator;

      res.status(200).json(
        {
          userId,
          userName,
          userBadge,
          userPresence,
          userActivities: activities,
          userStatus: customStatus || "N/A",
          accountCreationDate: userCreatedAt || "N/A",
          accountAgeFromNow: userAgeFromNow || "N/A",
          userAvatar: user.user.displayAvatarURL({ dynamic: true,size: 1024 })
        });
    }
    else
    {

      for (let activity of user.presence.activities.values())
      {
        switch (activity.type)
        {
          case "PLAYING":
            activities.push(`<i class="bi bi-controller"></i> Playing`);
            customStatusArray.push(activity.state);
            break;
          case "LISTENING":
            activities.push(`<i class="bi bi-headphones"></i> Listening`);
            customStatusArray.push(activity.state);
            break;
          case "WATCHING":
            activities.push(`<i class="bi bi-eye"></i> Watching`);
            customStatusArray.push(activity.state || '');
            break;
          case "CUSTOM_STATUS":
            activities.push(`<i class="bi bi-chat-square-text-fill"></i> Custom Status`);
            customStatusArray.push(activity.state);
            break;
        }
      }

      let userFlags = (await user.user.fetchFlags()).toArray(),
        userAge = moment(user.user.createdAt).format("MMMM Do YYYY"),
        userAgeFromNow = moment(user.user.createdAt).fromNow(),
        userId = user.user.id,
        userPresence = user.presence.status,
        userName = user.user.username + "#" + user.user.discriminator,
        presenceHtml,
        badgeHtml = [];

      if (userPresence === "offline")
      {
        presenceHtml =
          `
            <div class="card-content">
              <div class="card-subtitle"><i class="bi bi-toggle2-off"></i> This user is now offline</div>
            </div>
          `;
      }
      else
      {
        if (activities[0] === undefined)
        {
          presenceHtml =
            `
              <div class="card-content">
                <div class="card-subtitle"><i class="bi bi-toggle2-off"></i> This user has no status</div>
              </div>
            `;
        }
        else
        {
          presenceHtml =
            `
              <div class="card-content">
                <div class="card-subtitle">${activities[0]}</div>
                <p class="card-desc">${customStatusArray[0]}</p>
              </div>
            `;
        }

      }

      removeItemOnce(userFlags, 'EARLY_VERIFIED_DEVELOPER')

      userFlags.forEach(function(flag)
      {
        badgeHtml.push(`<img src="/image/${flag}.png" alt="${flag}">`)
      })

      res.render(`user.ejs`,
        {
          user,
          badgeHtml,
          presenceHtml,
          userName,
          userId,
          userAgeFromNow,
          userPresence,
          userAge
        });
    }

    let data =
      {
        json,
        id,
        user
      }

    await logger(data);
  }
  catch (error)
  {
    console.log(error)
    res.render(`error.ejs`,
      {
        error:
          {
            E404: false,
            title: error.message
          }
      });
  }
};
