import express from "express";
import postRoutes from "./routes/posts.js";


const app= express();
let port = 8800;

app.use(express.json());
app.use("/api/posts" , postRoutes);

app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
});
