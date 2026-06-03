import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { filterProperties } from "./db.js";
import compression from "compression";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("public"));
app.use(compression());

app.get("/property", (req, res) => {
  const { range, bedroom } = req.query;

  const filterOptions = {
    range: JSON.parse(range),
    bedroom,
  };
  console.log(filterOptions);
  console.log(filterOptions.range[0]);
  console.log(filterOptions.range[1]);

  const filteredProperties = filterProperties(filterOptions);
  res.send(filteredProperties);
});

app.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);
});
