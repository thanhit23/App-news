import User from "../models/User.js";
import response from "../helpers/response.js";

const userController = {
  getAllUsers: async(req, res) => {
    try {
      const user = await User.find();
      response.success(res, user, 'Successfully')
    } catch (error) {
      response.serverError(res, error);
    }
  },
  deleteUser: async(req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      response.success(res)
    } catch (error) {
      response.serverError(res, error);
    }
  },
  getMe: async(req, res) => {
    try {
      response.success(res, req.user.user)
    } catch (error) {
      response.serverError(res, error);
    }
  }
}

export default userController;
