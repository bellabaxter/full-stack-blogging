import express from "express";
import { getPosts, getPost, addPost, deletePost, updatePost} from "../controllers/post.js";
import verifyToken from "../middleware/verifytoken.js"
const router = express.Router();

router.get("/", getPosts);
router.get("/:id", getPost);
router.post("/",verifyToken, addPost);
router.delete("/:id", verifyToken, deletePost);
router.put("/:id", verifyToken, updatePost);

export default router;