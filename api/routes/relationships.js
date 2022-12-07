import express from "express";
import {addRelationship,deleteRelationship, getRelationships } from "../controllers/relationship.js";

const router = express.Router()

router.post("/", addRelationship)
router.delete("/",deleteRelationship)
router.get("/", getRelationships)

export default router