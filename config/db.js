const mongoose = require("mongoose");

module.exports = mongoose
  .connect(
    process.env.DB_URL,
    { useNewUrlParser: true, useUnifiedTopology: true },
    mongoose.set("strictQuery", false)
  )
  .then(() => console.log("Connected to database..."))
  .catch((err) => console.log(err));
