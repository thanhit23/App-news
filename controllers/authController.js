import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../models/User.js';
import response from '../helpers/response.js';

const checkpassword = async(req) => {
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(req.body.password, salt);
  return hashed;
}

const  authController = {
  registerUser: async(req, res) => {
    try {
      const { body: { username, email } } = req;
      const password = await checkpassword(req);
      const userEmail = await User.findOne({ email });

      if (userEmail) {
        response.error(res, 'Email already exists');
      } else {
        const newUser = await new User({
          username,
          email,
          password,
        })
        const user = await newUser.save();
        const accessToken = jwt.sign(
          { user },
          process.env.JWT_ACCESS_KEY,
          { expiresIn: "30d" },
        )
        
        response.success(res, accessToken);
      }
    } catch (error) {
      response.server(res, error)
    }
  },
  generateAccessToken: (user) => {
    return jwt.sign(
      { user },
      process.env.JWT_ACCESS_KEY,
      { expiresIn: "30d" },
    )
  },
  generateRefreshToken: (user) => {
    return jwt.sign(
      { user },
      process.env.JWT_REFRESH_KEY,
      { expiresIn: "365d" },
    )
  },
  loginUser: async(req, res) => {
    try {
      const { body: { password, email } } = req;
      const user = await User.findOne({ email });
      if (user) response.error(res, 'Wrong email!', 400);
      const validPassword = await bcrypt.compare(
        password,
        user.password
      )

      if (validPassword) response.error(res, 'Wrong password!', 400);
      if (user && password) {
        const accessToken = authController.generateAccessToken(user);
        const refreshToken = authController.generateRefreshToken(user);
        res.cookie('refreshToken', refreshToken, {
          httpOnly: true,
          secure: false,
          path: '/',
          sameSite: 'strict',
        })
        return response.success(res, {accessToken, refreshToken}, 'Login successfully')
      }
    } catch (error) {
      response.server(res, error);
    }
  },
  // reqRefreshToken: async(req, res) => {
  //   try {
  //     console.log(req.headers.cookie, 'req.cookie');
  //     console.log(req.body, 'req');
  //     // const refreshToken = req.cookies.refreshToken;
  //     // const success = {
  //     //   data: refreshToken,
  //     //   message: 'Successfully',
  //     //   status: true,
  //     // }
  //     res.status(200).json(success);
  //     response.success(res,);
  //   } catch (error) {
  //     response.server(res, error);
  //   }
  // }
}

export default authController;
