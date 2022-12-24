import { deleteGoal, getGoals, updateGoal, createGoal } from './../controllers/goalController';
import express from "express";
const router = express.Router();

router.route('/').get(getGoals).post(createGoal);
router.route('/:id').put(updateGoal).delete(deleteGoal);

export default router;