import express from "express";
import cors from "cors";
import morgan from "morgan";
import newsRoute from "./routes/news.routes";
import userRoute from "./routes/user.routes";
import "./database";
import * as dotenv from "dotenv";

dotenv.config();


const app = express();
app.set("port", process.env.PORT || 4000);
app.listen(app.get("port"), () => {
    console.log("Estoy en el puerto " + app.get("port"));
});


app.use(cors()); 
app.use(express.json()); 
app.use(express.urlencoded({ extends: true })); 
app.use(morgan("dev"));


app.use("/blognews", newsRoute); 
app.use("/blognews/auth", userRoute); 
