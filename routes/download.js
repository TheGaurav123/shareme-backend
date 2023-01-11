const router = require("express").Router();
const fileModel = require("../models/files");

router.get("/:uuid", async (req, res) => {
  let clientUUID = req.params.uuid;


  // Validation
  if (!clientUUID) return res.status(400).json({ error: "All fields are required." });



  // Validation for existing data
  let clientData = await fileModel.findOne({
    uuid: clientUUID,
  }).select(['-_id','-__v','-createdAt', '-updatedAt']);



  if (!clientData) return res.status(204).json({message:'Link expired.'})

  res.json({message: clientData})
  
});

router.get('/download/:uuid', async(req, res)=>{
  let clientData = await fileModel.findOne({
    uuid : req.params.uuid
  })
  
  if(!clientData) return res.json({error:'File not found.'})

  res.download(`${__dirname}/../${clientData.path}`);
})

module.exports = router;
