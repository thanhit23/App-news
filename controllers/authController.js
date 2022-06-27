import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../models/User.js';
import response from '../helpers/response.js';

const checkpassword = async(req) => {
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(req.body.password, salt);
  return hashed;
}

const authController = {
  registerUser: async(req, res) => {
    try {
      const { body: { username, email } } = req;
      const password = await checkpassword(req);
      const userExist = await User.findOne({ email });
      const { env: { JWT_ACCESS_KEY } } = process;

      if (userExist) return response.error(res, 'Email already exists');
      
      const newUser = new User({
        username,
        email,
        password,
      })
      const user = await newUser.save();
      const accessToken = jwt.sign(
        { user },
        JWT_ACCESS_KEY,
        { expiresIn: "30d" },
      )
      
      return response.success(res, accessToken);
    } catch (error) {
      response.serverError(res, error)
    }
  },
  generateAccessToken: (user) => {
    const { env: { JWT_ACCESS_KEY } } = process;
    return jwt.sign(
      { user },
      JWT_ACCESS_KEY,
      { expiresIn: "30d" },
    )
  },
  generateRefreshToken: (user) => {
    const { env: { JWT_REFRESH_KEY } } = process;
    return jwt.sign(
      { user },
      JWT_REFRESH_KEY,
      { expiresIn: "365d" },
    )
  },
  loginUser: async(req, res) => {
    try {
      const { body: { password, email } } = req;
      const user = await User.findOne({ email });
      if (!user) {
        return response.error(res, 'Wrong email!')
      };
      const validPassword = await bcrypt.compare(
        password,
        user.password
      )

      if (!validPassword) {
        return response.error(res, 'Wrong password!')
      };
      if (user && password) {
        const accessToken = authController.generateAccessToken(user);
        const refreshToken = authController.generateRefreshToken(user);
        res.cookie('refreshToken', refreshToken, {
          httpOnly: true,
          secure: false,
          path: '/',
          sameSite: 'strict',
        })
        res.set("Access-Control-Allow-Origin", '*')
        return response.success(res, { accessToken, refreshToken }, 'Login successfully')
      }
    } catch (error) {
      response.serverError(res, error);
    }
  },
}

export default authController;
