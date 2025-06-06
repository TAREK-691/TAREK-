module.exports.config = {
  name: "join",
  version: "1.2",
  credits: "Tarek x ChatGPT",
  description: "Join a group by number",
  commandCategory: "utility",
  usages: "[group number]",
  cooldowns: 5
};

module.exports.onStart = async function () {
  // Optional initialization, can be left empty
};

module.exports.run = async function ({ api, event, args }) {
  const threadList = [
    { id: "100047994102529", members: 2 },
    { id: "61571630409265", members: 2 },
    { id: "9861230640579491", members: 46 },
    { id: "10093109697413862", members: 6 },
    { id: "9905832306191152", members: 44 },
    { id: "24077231248569185", members: 187 },
    { id: "61577095705293", members: 2 },
    { id: "61575134176561", members: 2 },
    { id: "61565923611162", members: 2 },
    { id: "100067593817717", members: 2 }
  ];

  if (!args[0]) {
    let msg = "╭─╮\n│𝐋𝐢𝐬𝐭 𝐨𝐟 𝐠𝐫𝐨𝐮𝐩 𝐜𝐡𝐚𝐭𝐬:\n";
    let userThreads = await api.getThreadList(100, 1);
    let userGroups = userThreads.map(t => t.threadID);

    threadList.forEach((thread, index) => {
      const alreadyJoined = userGroups.includes(thread.id);
      msg += `│${index + 1}. Unnamed Group\n│𝐓𝐈𝐃: ${thread.id}\n│𝐓𝐨𝐭𝐚𝐥 𝐦𝐞𝐦𝐛𝐞𝐫𝐬: ${thread.members}\n`;
      if (alreadyJoined) {
        msg += "│🔒 You have already joined\n";
      }
      msg += "│\n";
    });

    msg += "╰───────────ꔪ\n𝐌𝐚𝐱𝐢𝐦𝐮𝐦 𝐌𝐞𝐦𝐛𝐞𝐫𝐬 = 250\n\nReply to this message with the number of the group you want to join...";
    return api.sendMessage(msg, event.threadID, event.messageID);
  }

  const index = parseInt(args[0]) - 1;
  if (isNaN(index) || index < 0 || index >= threadList.length) {
    return api.sendMessage("❌ Invalid group number.", event.threadID, event.messageID);
  }

  const threadToJoin = threadList[index];
  try {
    await api.addUserToGroup(event.senderID, threadToJoin.id);
    return api.sendMessage(`✅ You have been added to Group ${index + 1}`, event.threadID, event.messageID);
  } catch (err) {
    return api.sendMessage("⚠️ Failed to add. Maybe you're already in the group or I lack permission.", event.threadID, event.messageID);
  }
};
