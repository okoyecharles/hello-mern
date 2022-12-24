import Goal from '../models/goalModel';

import expressAsyncHandler from "express-async-handler"
// @desc    Get goals
// @route   GET /api/goals
// @access  Private
export const getGoals = expressAsyncHandler(async (req: any, res: any) => {
  const goals = await Goal.find();
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
    text: req.body.text
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

  await goal.remove();

  res.status(200).json({ id: req.params.id })
})