const axios = require("axios");

module.exports = {
  config: {
    name: "gemini",
    version: "1.0",
    author: "Tarek",
    countDown: 5,
    role: 0,
    shortDescription: {
      en: "Ask anything to Google Gemini AI"
    },
    longDescription: {
      en: "This command fetches answers from Google's Gemini Pro AI"
    },
    category: "AI",
    guide: {
      en: "/gemini [your question]"
    }
  },

  onStart: async function ({ api, event, args }) {
    const query = args.join(" ");
    if (!query) {
      return api.sendMessage("❗ Please provide a question.\nExample: /gemini রক্তচাপ কাকে বলে?", event.threadID, event.messageID);
    }

    try {
      const res = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyCermgZEalbXAkok-t4QoIDwgX5gUrQg7s`,
        {
          contents: [{ parts: [{ text: query }] }]
        }
      );

      const result = res.data.candidates?.[0]?.content?.parts?.[0]?.text || "❌ Sorry, couldn't find a proper answer.";
      return api.sendMessage(`🤖 Gemini says:\n${result}`, event.threadID, event.messageID);

    } catch (e) {
      console.error(e);
      return api.sendMessage("⚠️ Gemini API call failed. Please try again later.", event.threadID, event.messageID);
    }
  }
};
