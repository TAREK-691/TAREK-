const moment = require('moment-timezone');
const axios = require('axios');

module.exports = {
  config: {
    name: "info",
    aliases: ["inf", "in4"],
    version: "2.0",
    author: "Eren",
    countDown: 5,
    role: 0,
    shortDescription: {
      en: "Sends information about the bot and admin along with a video."
    },
    longDescription: {
      en: "Sends information about the bot and admin along with a video."
    },
    category: "Information",
    guide: {
      en: "{pn}"
    }
  },

  onStart: async function ({ message }) {
    this.sendInfo(message);
  },

  onChat: async function ({ event, message }) {
    if (event.body && event.body.toLowerCase() === "info") {
      this.sendInfo(message);
    }
  },

  sendInfo: async function (message) {
    const botName = "🕸️ 𝐒𝐩𝐢𝐝𝐞𝐘🕷️";
    const authorName = "Evaan";
    const authorFB = "fb.com/mahi68x";
    const authorInsta = "raadx102";
    const status = "𝗦𝗶𝗻𝗴𝗹𝗲";

    const now = moment().tz('Asia/Dhaka');
    const time = now.format('h:mm:ss A');

    const uptime = process.uptime();
    const seconds = Math.floor(uptime % 60);
    const minutes = Math.floor((uptime / 60) % 60);
    const hours = Math.floor((uptime / (60 * 60)) % 24);
    const uptimeString = `${hours}h ${minutes}m ${seconds}s`;

    const videoUrl = "https://files.catbox.moe/fk4p6y.mp4",  // 1st video
      "https://files.catbox.moe/vovx3d.mp4",  // 2nd video
    ];

    const body = `

┌────────────────┐
           𝗢𝗪𝗡𝗘𝗥 𝗜𝗡𝗙𝗢
└────────────────┘

  ☁️ 𝗡𝗮𝗺𝗲 ➝ 𝗧𝗮𝗿𝗲𝗸 𝗦𝗵𝗶𝗸𝗱𝗮𝗿
  🎂 𝗔𝗴𝗲 ➝ 18+
  🧠 𝗘𝗱𝘂𝗰𝗮𝘁𝗶𝗼𝗻 ➝ 𝗗𝗶𝗽𝗹𝗼𝗺𝗮 𝗶𝗻 𝗖𝗶𝘃𝗶𝗹 𝗘𝗻𝗴𝗶𝗻𝗲𝗲𝗿𝗶𝗻𝗴                  
  ❄️ 𝘀𝗲𝘀𝘀𝗶𝗼𝗻 ➝ 2023-24
  🏠 𝗙𝗿𝗼𝗺 ➝ 𝗧𝗮𝗻𝗴𝗮𝗶𝗹
  ❤️ 𝗥𝗲𝗹𝗮𝘁𝗶𝗼𝗻 ➝ 𝐒𝐢𝐧𝐠𝐥𝐞
  ♂️ 𝗚𝗲𝗻𝗱𝗲𝗿 ➝ 𝐌𝐚𝐥𝐞

━━━━━━━━━━━━━━━━━━

 ✦ 𝗛𝗼𝗯𝗯𝗶𝗲𝘀 ➝ ɢᴀᴍɪɴɢ • ᴍᴜsɪᴄ

━━━━━━━━━━━━━━━━━━

💫 𝗧𝗵𝗮𝗻𝗸𝘀 𝗳𝗼𝗿 𝘂𝘀𝗶𝗻𝗴 𝗺𝗲 💫

I may not be perfect,
   but I’ll always reply to you.`;

    const response = await axios.get(videoUrl, { responseType: 'stream' });

    message.reply({
      body,
      attachment: response.data
    });
  }
};
