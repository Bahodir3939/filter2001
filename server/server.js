import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { filterProperties } from "./db.js";
import compression from "compression";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(cors());
app.use(compression());

app.use(express.static(path.join(__dirname, "public")));

// Home page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/test", (req, res) => {
  res.send("WORKING V2");
});

// Property API
app.get("/property", (req, res) => {
  try {
    const { range, bedroom } = req.query;

    const filterOptions = {
      range: range ? JSON.parse(range) : [0, 10000],
      bedroom: bedroom || "any",
    };

    const filteredProperties = filterProperties(filterOptions);

    res.json(filteredProperties);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});