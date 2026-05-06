import "dotenv/config";
import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { PrismaClient } from "@prisma/client";
import multer from "multer";
import fs from "fs";

const prisma = new PrismaClient();

// Ensure uploads directory exists
const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());
  app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

  // API endpoints
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", service: "Dentivis Engine" });
  });

  app.get("/api/patients", async (req, res) => {
    try {
      const patients = await prisma.patient.findMany();
      res.json(patients);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch patients" });
    }
  });

  app.get("/api/cases", async (req, res) => {
    try {
      const cases = await prisma.case.findMany({
        orderBy: { createdAt: "desc" },
      });
      res.json(cases);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch cases" });
    }
  });

  app.post("/api/cases", upload.single("scanFile"), async (req, res) => {
    try {
      const { patientName, patientAge, type, notes } = req.body;
      const scanFileUrl = req.file ? `/uploads/${req.file.filename}` : null;
      
      const newCase = await prisma.case.create({
        data: {
          patientName,
          patientAge: patientAge ? parseInt(patientAge) : undefined,
          type,
          notes,
          scanFileUrl,
          status: "Draft",
        },
      });
      
      res.json(newCase);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to create case" });
    }
  });

  // Vite middleware for development

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
