module.exports = {
  config: {
    name: "ganja",
    version: "2.6",
    author: "Tarek",
    category: "fun",
    shortDescription: "Random ganja report with 70% smoking chance",
    longDescription: "Randomly shows if user smokes ganja or not with 70% chance",
    guide: {
      en: "{p}ganja [name]",
    },
  },

  onStart: async function({ api, event, args }) {
    const target = args.join(" ") || "You";

    // 70% chance to smoke
    const smokes = Math.random() < 0.7;

    if (smokes) {
      const kg = (Math.random() * 2.5 + 0.3).toFixed(2);
      const cost = (kg * 1600).toFixed(0);
      const levels = ["🥱 Light", "😵 Moderate", "🔥 Heavy", "💀 Ultra High", "🚀 NASA Level"];
      const addiction = levels[Math.floor(Math.random() * levels.length)];

      const message = 
`🌿 𝗚𝗮𝗻𝗷𝗮 𝗥𝗲𝗽𝗼𝗿𝘁 🌿

👤 User: ${target}
📦 Daily Dose: ${kg} kg
💸 Cost: ৳${cost}
🧠 Level: ${addiction}

☠️ Warning: Slow down before you fly away 🚀`;

      try {
        await api.sendMessage({ body: message }, event.threadID);
      } catch (error) {
        console.error("❌ Ganja Report Error:", error);
        return api.sendMessage("❌ Couldn't send ganja report, bro!", event.threadID);
      }
    } else {
      const message = 
`🤫 𝗣𝘀𝘁... 𝗧𝗵𝗶𝘀 𝗶𝘀 𝗮 𝗰𝗹𝗲𝗮𝗿 𝗱𝗮𝘆!

👤 ${target}, you don't smoke ganja.  
That's why we call you a 🎩 𝙂𝙚𝙣𝙩𝙡𝙚 𝙈𝙖𝙣!  
Keep it clean and classy! 🌟`;

      try {
        await api.sendMessage({ body: message }, event.threadID);
      } catch (error) {
        console.error("❌ Ganja Report Error:", error);
        return api.sendMessage("❌ Couldn't send ganja report, bro!", event.threadID);
      }
    }
  }
};
