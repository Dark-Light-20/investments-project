import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { CdtUseCase } from "@dark-light-20/invest-domain";
import { CdtService } from "./infrastructure/http-adapter/cdt.service.js";
import { cdtRoutesBuilder } from "./adapters/routes/cdt.route.js";
import { boxRoutesBuilder } from "./adapters/routes/box.route.js";

// Config
const PORT = process.env.PORT ?? 3004;
const app = express();
app.use(express.json());

// Infra
const cdtService = new CdtService();

// Use Case
const cdtUseCase = new CdtUseCase(cdtService);

// App
const cdtRoutes = cdtRoutesBuilder(cdtUseCase);
const boxRoutes = boxRoutesBuilder(cdtUseCase);
app.use("/cdt", cdtRoutes);
app.use("/box", boxRoutes);

app.listen(PORT, () => console.log(`App is listening on port ${PORT}!`));
