import express from "express";
import cors from "cors";
import signupRouter from "./routes/signup.js";

const app = express();
const port = 8000;

app.use(cors({
    origin: 'http://localhost:5173' // Replace with your frontend origin
  }));
//app.use(cors);
 app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.use("/api/signup",signupRouter);

app.listen(port,()=>{
    console.log("listening on port 8000");
})