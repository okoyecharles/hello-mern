import User from '../models/userModel';
import Goal from '../models/goalModel';

import expressAsyncHandler from "express-async-handler"
// @desc    Get goals
// @route   GET /api/goals
// @access  Private
export const getGoals = expressAsyncHandler(async (req: any, res: any) => {
  const goals = await Goal.find({ user: req.user.id });
  res.status(200).json({ goals })
})

// @desc    Set goals
// @route   POST /api/goals
// @access  Private
export const createGoal = expressAsyncHandler(async (req: any, res: any) => {
  if (!req.body.text) {
    res.status(400)
    throw new Error('Please add a text field ')
  }

  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id
  });

  res.status(201).json({ goal });
})

// @desc    Update goals
// @route   PUT /api/goals/:id
// @access  Private
export const updateGoal = expressAsyncHandler(async (req: any, res: any) => {
  const goal = await Goal.findById(req.params.id);


  if (!goal) {
    res.status(404)
    throw new Error('Goal not found');
  }

  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error('User not found')
  }

  if (goal.user.toString() !== user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, { new: true });

  res.status(200).json({ goal: updatedGoal })
})

// @desc    Delete goals
// @route   DELETE /api/goals/:id
// @access  Private
export const deleteGoal = expressAsyncHandler(async (req: any, res: any) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(404)
    throw new Error('Goal not found');
  }

  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error('User not found')
  }

  if (goal.user.toString() !== user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  await goal.remove();

  res.status(200).json({ id: req.params.id })
})