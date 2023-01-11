const router = require("express").Router();
const multer = require("multer");
const fileModel = require("../models/files");
const { v4: uuidv4 } = require("uuid");

// Multer Configuration

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    let uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}-${
      file.originalname
    }`;
    cb(null, uniqueName);
  },
});

const uploads = multer({
  storage,
  limits: { fileSize: 1000000 * 100 },
}).single("file");


// Router configuration
router.post("/upload", uploads, async (req, res) => {
  const clientData = req.file;
  
  // Validation
  if (!clientData || !clientData.fieldname)
    return res.status(400).json({ error: "All fields are required." });

  // Same Data Validation
  let findExist = await fileModel.findOne(clientData);
  if (findExist) {
    return res.json({ error: "Data already uploaded." });
  }

  // Append Data into Database
  let saveData = new fileModel({
    filename: clientData.filename,
    uuid: uuidv4(),
    path: clientData.path,
    size: clientData.size,
  });
  let response = await saveData.save();

  //   Download Link as response
  res.json({
    message: `${process.env.APP_BASE_URL}/download/${response.uuid}`,
  });
});

module.exports = router;
