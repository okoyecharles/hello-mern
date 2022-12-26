import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import expressAsyncHandler from 'express-async-handler';
import User from '../models/userModel';

// @desc    Register user
// @route   POST /api/users
// @access  Public
export const registerUser = expressAsyncHandler(async (req: any, res: any) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please add all fields');
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name, email, password: hashedPassword
  })

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    })
  } else {
    res.status(400);
    throw new Error('Invalid user data')
  }
})

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
export const loginUser = expressAsyncHandler(async (req: any, res: any) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    res.status(400)
    throw new Error('User does not exist');
  } else if (await bcrypt.compare(password, user.password)) {
    res.status(200).send({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    })
  } else {
    res.status(400);
    throw new Error('Invalid user credentials');
  }
})

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
export const getMe = expressAsyncHandler(async (req: any, res: any) => {
  const { _id, name, email }: any = await User.findById(req.user.id);

  res.status(200).json({ id: _id, name, email });
})

// Generate JWT
const generateToken = (id: any) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || '', {
    expiresIn: '30d'
  });
};