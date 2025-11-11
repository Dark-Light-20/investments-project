import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { CdtUseCase, PocketUseCase } from "@dark-light-20/invest-domain";
import { CdtService } from "./infrastructure/http-adapter/cdt.service.js";
import { PocketService } from "./infrastructure/http-adapter/pocket.service.js";
import { cdtRoutesBuilder } from "./adapters/routes/cdt.route.js";
import { boxRoutesBuilder } from "./adapters/routes/box.route.js";

// Config
const PORT = process.env.PORT ?? 3004;
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
const boxRoutes = boxRoutesBuilder(pocketUseCase);
app.use("/cdt", cdtRoutes);
app.use("/box", boxRoutes);

app.listen(PORT, () => console.log(`App is listening on port ${PORT}!`));
