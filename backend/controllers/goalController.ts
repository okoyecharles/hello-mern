import expressAsyncHandler from "express-async-handler"
// @desc    Get goals
// @route   GET /api/goals
// @access  Private
export const getGoals = expressAsyncHandler(async (req: any, res: any) => {
  res.status(200).json({ message: 'Get goals' })
})

// @desc    Set goals
// @route   POST /api/goals
// @access  Private
export const createGoal = expressAsyncHandler(async (req: any, res: any) => {
  if (!req.body.text) {
    res.status(400)
    throw new Error('Please add a text field ')
  }

  res.status(201).json({ message: 'Set goal' })
})

// @desc    Update goals
// @route   PUT /api/goals/:id
// @access  Private
export const updateGoal = expressAsyncHandler(async (req: any, res: any) => {
  res.status(200).json({ message: `Update goal ${req.params.id}` })
})

// @desc    Delete goals
// @route   DELETE /api/goals/:id
// @access  Private
export const deleteGoal = expressAsyncHandler(async (req: any, res: any) => {
  res.status(200).json({ message: `Delete goal ${req.params.id}` })
})