import express from "express";
import {getAll, sendAll, individual, getInven, sendone} from "../controllers/material.js";
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.get("/", getAll);
router.get("/inven", getInven);
router.post("/",verifyToken, sendAll);
router.post("/:id",verifyToken, sendone);
router.get("/:id", individual);

export default router;