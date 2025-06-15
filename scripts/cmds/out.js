const axios = require("axios");
const fs = require("fs-extra");
const request = require("request");

module.exports = {
  config: {
    name: "out",
    aliases: ["o"],
    version: "1.0",
    author: "Sandy",
    countDown: 5,
    role: 2,
    shortDescription: "bot will leave gc",
    longDescription: "",
    category: "admin",
    guide: {
      vi: "{pn} [tid,blank]",
      en: "{pn} [tid,blank]"
    }
  },

  onStart: async function ({ api, event, args, message }) {
    var id;
    if (!args.join(" ")) {
      id = event.threadID;
    } else {
      id = parseInt(args.join(" "));
    }

    const leaveMessage = 
`         ⚠️______𝗔𝗧𝗧𝗘𝗡𝗧𝗜𝗢𝗡______⚠️ ━━━━━━━━━━━━━━━━━━
🚪 𝙆𝙣𝙤𝙘𝙠 𝙠𝙣𝙤𝙘𝙠…  
🤍 𝘽𝙤𝙩: 𝘼𝙢𝙞 𝙟𝙖𝙘𝙘𝙝𝙞…

😔 𝘼𝙢𝙖𝙧 𝙥𝙡𝙖𝙘𝙚 𝙩𝙖 𝙠𝙝𝙖𝙡𝙞 𝙩𝙝𝙖𝙠𝙗𝙚 𝙢𝙤𝙣𝙚 𝙢𝙤𝙣𝙚…  
💋 𝘽𝙮𝙚 𝙂𝘾... 𝙏𝙖𝙠𝙚 𝙡𝙤𝙫𝙚.
━━━━━━━━━━━━━━━━━━ `;

    return api.sendMessage(leaveMessage, id, () => 
      api.removeUserFromGroup(api.getCurrentUserID(), id)
    );
  }
}
