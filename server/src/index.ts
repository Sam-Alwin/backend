import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./routes";

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(router);
app.use(cors({
  origin: "http://coursetrackerv7.s3-website.eu-north-1.amazonaws.com:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

app.listen( 5000,"0.0.0.0", () => {
  console.log("Server running on port 5000");
});

