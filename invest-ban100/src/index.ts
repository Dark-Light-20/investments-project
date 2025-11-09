import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { CdtService } from "./infrastructure/http-adapters/cdt.service.js";
import { CdtUseCase } from "@dark-light-20/invest-domain";
import { cdtRoutesBuilder } from "./adapters/routes/cdt.route.js";

// Config
const PORT = process.env.PORT ?? 3003;
const app = express();
app.use(express.json());

// Infra
const cdtService = new CdtService();

// Use Case
const cdtUseCase = new CdtUseCase(cdtService);

// App
const cdtRoutes = cdtRoutesBuilder(cdtUseCase);
app.use("/cdt", cdtRoutes);

app.listen(PORT, () => console.log(`App is listening on port ${PORT}!`));
