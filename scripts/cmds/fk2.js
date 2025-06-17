const fs = require("fs-extra");
const axios = require("axios");
const Canvas = require("canvas");
const path = require("path");

module.exports = {
  config: {
    name: "fk2",
    aliases: ["fk2"],
    version: "1.1",
    author: "Tarek",
    countDown: 5,
    role: 0,
    shortDescription: "FK2 with custom image",
    longDescription: "Generate a fk image with the mentioned user using a custom background. Female on left and slightly lower, male on right.",
    category: "funny",
    guide: "{pn} @mention"
  },

  onStart: async function ({ api, message, event, usersData }) {
    const mention = Object.keys(event.mentions);
    if (mention.length === 0) return message.reply("Please mention someone to FK.");

    let senderID = event.senderID;
    let mentionedID = mention[0];

    try {
      // Gender check
      const senderData = await usersData.get(senderID);
      const mentionedData = await usersData.get(mentionedID);

      const senderGender = senderData.gender || "male";
      const mentionedGender = mentionedData.gender || "female";

      let maleID, femaleID;

      if (senderGender === "male") {
        maleID = senderID;
        femaleID = mentionedID;
      } else {
        maleID = mentionedID;
        femaleID = senderID;
      }

      // Load avatars
      const avatarMale = await usersData.getAvatarUrl(maleID);
      const avatarFemale = await usersData.getAvatarUrl(femaleID);

      const [avatarImgMale, avatarImgFemale] = await Promise.all([
        Canvas.loadImage(avatarMale),
        Canvas.loadImage(avatarFemale)
      ]);

      // Load background
      const bgUrl = "https://files.catbox.moe/r3umhp.jpg";
      const bgRes = await axios.get(bgUrl, { responseType: "arraybuffer" });
      const bg = await Canvas.loadImage(bgRes.data);

      // Canvas setup
      const canvasWidth = 900;
      const canvasHeight = 600;
      const canvas = Canvas.createCanvas(canvasWidth, canvasHeight);
      const ctx = canvas.getContext("2d");

      // Draw background
      ctx.drawImage(bg, 0, 0, canvasWidth, canvasHeight);

      const avatarSize = 230;

      // ✅ Female avatar (left, নিচে)
      const femaleX = 100;
      const femaleY = canvasHeight / 2 - avatarSize / 2 + 40; // নিচে নামানো

      ctx.save();
      ctx.beginPath();
      ctx.arc(femaleX + avatarSize / 2, femaleY + avatarSize / 2, avatarSize / 2, 0, Math.PI * 2);
      ctx.closePath();
      ctx.clip();
      ctx.drawImage(avatarImgFemale, femaleX, femaleY, avatarSize, avatarSize);
      ctx.restore();

      // ✅ Male avatar (right, একটু ডানে)
      const maleX = canvasWidth - 130 - avatarSize; // ডানদিকে
      const maleY = canvasHeight / 2 - avatarSize / 2;

      ctx.save();
      ctx.beginPath();
      ctx.arc(maleX + avatarSize / 2, maleY + avatarSize / 2, avatarSize / 2, 0, Math.PI * 2);
      ctx.closePath();
      ctx.clip();
      ctx.drawImage(avatarImgMale, maleX, maleY, avatarSize, avatarSize);
      ctx.restore();

      // Save and send image
      const imgPath = path.join(__dirname, "tmp", `${maleID}_${femaleID}_fk2.png`);
      await fs.ensureDir(path.dirname(imgPath));
      fs.writeFileSync(imgPath, canvas.toBuffer("image/png"));

      message.reply({
        body: "Fkkkk!",
        attachment: fs.createReadStream(imgPath)
      }, () => fs.unlinkSync(imgPath));

    } catch (err) {
      console.error("Error in fk2 command:", err);
      message.reply("There was an error creating the fk2 image.");
    }
  }
};
