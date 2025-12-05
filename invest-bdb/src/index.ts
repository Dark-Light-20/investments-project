import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { CdtService } from "./infrastructure/http-adapters/cdt.service.js";
import { CdtUseCase, FICUseCase } from "@dark-light-20/invest-domain";
import { cdtRoutesBuilder } from "./adapters/routes/cdt.route.js";
import { ficRoutesBuilder } from "./adapters/routes/fic.route.js";
import { FicService } from "./infrastructure/http-adapters/fic.service.js";

// Config
const PORT = process.env.PORT ?? 3001;
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
const ficService = new FicService();

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
