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
app.use("/api/tests", require("./routes/admin_tests"));
app.use("/api/questions", require("./routes/admin_questions"));
app.use("/api/practiceQs", require("./routes/admin_practice_qs"));
app.use("/api/notes", require("./routes/notes"));
app.use("/api/reports", require("./routes/reports"));
app.use("/api/notifications", require("./routes/notifications"));

app.listen(port, () => {
  console.log(`Prepry backend listening on port ${port}`);
});