import dotenv from "dotenv";
dotenv.config();

import express from "express";

const PORT = process.env.PORT ?? 3004;

const app = express();
app.use(express.json());

app.use("/cdt", require("./routes/cdt.route"));
app.use("/box", require("./routes/box.route"));

app.listen(PORT, () => console.log(`App is listening on port ${PORT}!`));
