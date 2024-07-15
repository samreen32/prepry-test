const express = require("express");
const cors = require("cors");
const connectToMongo = require("./db");

connectToMongo();

const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

// Available Routes
app.use("/api/auth", require("./routes/user_auth"));
app.use("/api/auth", require("./routes/admin_auth"));

app.listen(port, () => {
  console.log(`React Project backend listening on port ${port}`);
});