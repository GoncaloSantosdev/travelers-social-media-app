import express from "express";
const router = express.Router();
import auth from "../middleware/auth.js";

import { createTour, deleteTour, getTour, getTours, getToursBySearch, getToursByUser, updateTour } from "../controllers/tour.js";

router.post("/", auth, createTour);

router.get("/", getTours);
router.get('/search', getToursBySearch);
router.get("/:id", getTour);
router.get("/userTours/:id", auth, getToursByUser);

router.delete("/:id", auth, deleteTour);
router.put("/:id", auth, updateTour);

export default router;