module.exports = {
	config: {
		name: "listbox",
		aliases: [],
		author: "kshitiz",
		version: "4.0",
		cooldowns: 5,
		role: 2,
		shortDescription: {
			en: "List all groups and inbox chats with gender details."
		},
		longDescription: {
			en: "List all group chats with gender breakdown and personal inboxes with unknown detection."
		},
		category: "owner",
		guide: {
			en: "{p}{n}"
		}
	},

	onStart: async function ({ api, event }) {
		try {
			const allThreads = await api.getThreadList(100, null, ["INBOX"]);
			const groupThreads = allThreads.filter(thread => thread.isGroup);
			const userThreads = allThreads.filter(thread => !thread.isGroup);

			// Format group threads with gender breakdown
			const formatGroupThreads = async (threads) => {
				const result = await Promise.all(threads.map(async (thread, index) => {
					let name = thread.threadName || "Unnamed Group";
					let male = 0, female = 0, unknown = 0;

					try {
						const info = await api.getThreadInfo(thread.threadID);
						if (info.userInfo) {
							info.userInfo.forEach(u => {
								if (u.gender === 'MALE') male++;
								else if (u.gender === 'FEMALE') female++;
								else unknown++;
							});
							name = info.threadName || name;
						}
					} catch (e) {
						// Skip if error
					}

					return `│${index + 1}. ${name}\n│𝐓𝐈𝐃: ${thread.threadID}\n│👨‍🦰 Male: ${male} | 👩‍🦰 Female: ${female} | 🙎‍♂️ Unknown: ${unknown}`;
				}));
				return `╭─╮\n│𝐆𝐫𝐨𝐮𝐩 𝐂𝐡𝐚𝐭𝐬 𝐖𝐢𝐭𝐡 𝐆𝐞𝐧𝐝𝐞𝐫:\n${result.join("\n")}\n╰───────────ꔪ`;
			};

			// Format personal inboxes
			const formatUserThreads = async (threads) => {
				const result = await Promise.all(threads.map(async (thread, index) => {
					let name = thread.threadName;
					if (!name) {
						try {
							const info = await api.getUserInfo(thread.threadID);
							name = info[thread.threadID]?.name || "Unknown User";
						} catch {
							name = "Unknown User";
						}
					}
					return `│${index + 1}. ${name}\n│𝐓𝐈𝐃: ${thread.threadID}`;
				}));
				return `╭─╮\n│𝐏𝐞𝐫𝐬𝐨𝐧𝐚𝐥 𝐈𝐧𝐛𝐨𝐱𝐞𝐬:\n${result.join("\n")}\n╰───────────ꔪ`;
			};

			const groupListText = groupThreads.length > 0 ? await formatGroupThreads(groupThreads) : "No group chats found.";
			const userListText = userThreads.length > 0 ? await formatUserThreads(userThreads) : "No inboxes found.";

			await api.sendMessage(`${groupListText}\n\n${userListText}`, event.threadID, event.messageID);

		} catch (err) {
			console.error("❌ Error listing chats:", err);
			await api.sendMessage("⚠️ Something went wrong while listing chats.", event.threadID);
		}
	}
};
