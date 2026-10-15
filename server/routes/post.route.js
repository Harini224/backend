import {Router} from "express";
import {createPost, getAllPosts, updatepost, deletepost} from "../controller/post.controller.js";

const router = Router();

router.route("/create").post(createPost);
router.route("/getallposts").get(getAllPosts);
router.route("/update/:id").patch(updatepost);
router.route("/delete/:id").delete(deletepost);

export default router;