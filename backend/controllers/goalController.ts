// @desc    Get goals
// @route   GET /api/goals
// @access  Private
export const getGoals = (req: any, res: any) => {
  res.status(200).json({message: 'Get goals'})
}

// @desc    Set goals
// @route   POST /api/goals
// @access  Private
export const createGoal = (req: any, res: any) => {
  res.status(201).json({message: 'Set goal'})
}

// @desc    Update goals
// @route   PUT /api/goals/:id
// @access  Private
export const updateGoal = (req: any, res: any) => {
  res.status(200).json({message: `Update goal ${req.params.id}`})
}

// @desc    Delete goals
// @route   DELETE /api/goals/:id
// @access  Private
export const deleteGoal = (req: any, res: any) => {
  res.status(200).json({message: `Delete goal ${req.params.id}`})
}