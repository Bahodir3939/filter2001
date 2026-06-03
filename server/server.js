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
  res.send("WORKING");
});

// Property API
app.get("/property", (req, res) => {
  const { range, bedroom } = req.query;

  const filterOptions = {
    range: JSON.parse(range),
    bedroom,
  };

  const filteredProperties = filterProperties(filterOptions);

  res.json(filteredProperties);
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});