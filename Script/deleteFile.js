const fileModel = require("../models/files");
const fs = require("fs");

const deleteFile = async () => {
  let pastDate = new Date(Date.now() - 24 * 60 * 60 * 1000);

  const files = await fileModel.find({ createdAt: { $lt: pastDate } });

  if (files.length) {
    for (const file of files) {
      try {
        fs.unlinkSync(file.path);
        await file.remove;
        console.log("Task Completed...");
      } catch (error) {
        console.log(`Task Failed :( ${error})`);
      }
    }
  }
}

module.exports = deleteFile;
