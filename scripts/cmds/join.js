module.exports = {
  config: {
    name: "join",
    version: "3.0",
    author: "T A N J I L 🎀",
    countDown: 5,
    role: 0,
    shortDescription: "Join a group where bot is currently in",
    longDescription: "Shows a list of only the groups where bot is a current member",
    category: "owner",
    guide: {
      en: "{p}{n}"
    }
  },

  onStart: async function ({ api, event }) {
    try {
      const allThreads = await api.getThreadList(100, null, ["INBOX"]);
      const groupThreads = allThreads.filter(thread => thread.name != null && thread.participantIDs.length > 2);

      const activeGroups = [];

      for (const thread of groupThreads) {
        try {
          const info = await api.getThreadInfo(thread.threadID);
          if (info.participantIDs.includes(api.getCurrentUserID())) {
            activeGroups.push({
              name: info.threadName || "Unnamed Group",
              threadID: info.threadID,
              participants: info.participantIDs.length
            });
          }
        } catch (e) {
          // Skip threads that throw error (maybe removed/archived)
        }
      }

      if (activeGroups.length === 0) {
        return api.sendMessage("⚠️ Currently the bot is not in any group chats.", event.threadID);
      }

      let message = "📃 Groups where bot is currently a member:\n\n";
      activeGroups.forEach((group, index) => {
        message += `${index + 1}. ${group.name}\n✨TID: ${group.threadID}\n🎀 Members: ${group.participants}\n\n`;
      });
      message += "📝 Reply with the number of the group you want to join.";

      const msg = await api.sendMessage(message, event.threadID);
      global.GoatBot.onReply.set(msg.messageID, {
        commandName: "join",
        author: event.senderID,
        groupList: activeGroups
      });
    } catch (err) {
      console.error("❌ Error:", err);
      api.sendMessage("❌ Error occurred while fetching group list.", event.threadID);
    }
  },

  onReply: async function ({ api, event, Reply }) {
    const { author, groupList } = Reply;

    if (event.senderID !== author) return;

    const choice = parseInt(event.body);
    if (isNaN(choice) || choice < 1 || choice > groupList.length) {
      return api.sendMessage("⚠️ Invalid input. Please enter a valid number.", event.threadID);
    }

    const selectedGroup = groupList[choice - 1];

    try {
      const info = await api.getThreadInfo(selectedGroup.threadID);

      if (info.participantIDs.includes(event.senderID)) {
        return api.sendMessage(`ℹ️ You are already in "${selectedGroup.name}".`, event.threadID);
      }

      if (info.participantIDs.length >= 250) {
        return api.sendMessage(`🚫 Group "${selectedGroup.name}" is full (250 members).`, event.threadID);
      }

      await api.addUserToGroup(event.senderID, selectedGroup.threadID);
      api.sendMessage(`✅ You have joined the group: "${selectedGroup.name}"`, event.threadID);
    } catch (e) {
      console.error("❌ Add error:", e);
      api.sendMessage("⚠️ Couldn't add you. Maybe the group is archived or bot lacks permission.", event.threadID);
    } finally {
      global.GoatBot.onReply.delete(Reply.messageID);
    }
  }
};
