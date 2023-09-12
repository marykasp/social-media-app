import express from "express";
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// read routes - get information (CRUD)
router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);

// update - add or remove friend
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);

export default router;
