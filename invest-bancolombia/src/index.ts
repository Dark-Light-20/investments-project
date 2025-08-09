import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { CdtUseCase, FICUseCase } from "@dark-light-20/invest-domain";
import { CdtService } from "./infrastructure/http-adapter/cdt.service.js";
import { cdtRoutesBuilder } from "./adapters/routes/cdt.route.js";
import { FICService } from "./infrastructure/http-adapter/fic.service.js";
import { ficRoutesBuilder } from "./adapters/routes/fic.route.js";

// Config
const PORT = process.env.PORT ?? 3000;
const app = express();
app.use(express.json());

// Infra
const cdtService = new CdtService();
const ficService = new FICService();

// Use Case
const cdtUseCase = new CdtUseCase(cdtService);
const ficUseCase = new FICUseCase(ficService);

// App
const cdtRoutes = cdtRoutesBuilder(cdtUseCase);
const ficRoutes = ficRoutesBuilder(ficUseCase);
app.use("/cdt", cdtRoutes);
app.use("/fic", ficRoutes);

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}!`);
});
