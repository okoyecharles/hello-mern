import { deleteGoal, getGoals, updateGoal, createGoal } from '../controllers/goalController';
import express from "express";
import { protect } from '../middleware/authMiddleware';
const router = express.Router();

router.route('/').get(protect, getGoals).post(protect, createGoal);
router.route('/:id').put(protect, updateGoal).delete(protect, deleteGoal);

export default router;