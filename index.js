import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mobile from "./routes/mobile.js";

dotenv.config({path: "./config/config.env"});

const app = express();

app.use(cors({origin: "*", optionsSuccessStatus: 200}));

app.use(express.json());

app.use("/mobile", mobile);

const PORT = 5000;


app.listen(PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});