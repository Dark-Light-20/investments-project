import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { CdtUseCase, PocketUseCase } from "@dark-light-20/invest-domain";
import { CdtService } from "./infrastructure/http-adapter/cdt.service.js";
import { cdtRoutesBuilder } from "./adapters/routes/cdt.route.js";
import { pocketRoutesBuilder } from "./adapters/routes/pocket.route.js";
import { PocketService } from "./infrastructure/http-adapter/pocket.service.js";

// Config
const PORT = process.env.PORT ?? 3005;
const app = express();
app.use(express.json());

// Infra
const cdtService = new CdtService();
const pocketService = new PocketService();

// Use Case
const cdtUseCase = new CdtUseCase(cdtService);
const pocketUseCase = new PocketUseCase(pocketService);

// App
const cdtRoutes = cdtRoutesBuilder(cdtUseCase);
const pocketRoutes = pocketRoutesBuilder(pocketUseCase);
app.use("/cdt", cdtRoutes);
app.use("/pocket", pocketRoutes);

app.listen(PORT, () => console.log(`App is listening on port ${PORT}!`));
