import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { CdtUseCase, PocketUseCase } from "@dark-light-20/invest-domain";
import { CdtService } from "./infrastructure/http-adapter/cdt.service.js";
import { cdtRoutesBuilder } from "./adapters/routes/cdt.route.js";
import { pocketRoutesBuilder } from "./adapters/routes/pocket.route.js";
import { PocketService } from "./infrastructure/http-adapter/pocket.service.js";

// Config
const PORT = process.env.PORT ?? 3005;
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",") ?? [];
const app = express();
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);
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
