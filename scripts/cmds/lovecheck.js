module.exports = {
  config: {
    name: "love",
    version: "1.0",
    author: "💘 Tarek",
    category: "fun",
    shortDescription: "Love meter check",
    longDescription: "Random funny love meter showing relationship level, heart status, and drama level",
    guide: {
      en: "{p}love [name]",
    },
  },

  onStart: async function({ message, args, event }) {
    const name = args.join(" ") || "You";

    const isSingle = Math.random() < 0.5;
    const lovePercent = Math.floor(Math.random() * 101);
    const heartTypes = ["❤️", "💔", "🖤", "💕", "💖", "💘", "😢"];
    const dramaLevels = ["😇 No Drama", "🙂 Low Drama", "😬 Medium Drama", "🔥 High Drama", "💥 Toxic Combo", "🚫 Already Blocked"];

    const loveResult = isSingle
      ? `💘 𝗟𝗢𝗩𝗘 𝗖𝗛𝗘𝗖𝗞 💘

👤 Name: ${name}
🖤 Status: Single AF
💔 Heart Type: ${heartTypes[Math.floor(Math.random() * heartTypes.length)]}
📉 Love Percent: ${lovePercent}%
💣 Drama Level: ${dramaLevels[Math.floor(Math.random() * dramaLevels.length)]}

📢 Suggestion: Download "Respect Yourself" App 😎`
      : `💘 𝗟𝗢𝗩𝗘 𝗖𝗛𝗘𝗖𝗞 💘

👤 Name: ${name}
❤️ Status: In a Relationship (probably)
💘 Love Percent: ${lovePercent}%
💞 Heart Type: ${heartTypes[Math.floor(Math.random() * heartTypes.length)]}
🔥 Drama Level: ${dramaLevels[Math.floor(Math.random() * dramaLevels.length)]}

📢 Note: Love carefully. Use helmet if needed 😌`;

    message.reply(loveResult);
  }
};
