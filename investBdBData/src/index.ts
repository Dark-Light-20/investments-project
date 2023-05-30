import dotenv from "dotenv";
dotenv.config();

import express from "express";

const PORT = process.env.PORT ?? 3001;

const app = express();
app.use(express.json());

app.use("/fics", require("./routes/fics.route"));
app.use("/cdt", require("./routes/cdt.route"));

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}!`);
});
