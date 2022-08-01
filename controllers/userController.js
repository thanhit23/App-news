import User from "../models/User.js";
import response from "../helpers/response.js";

const userController = {
  getAllUsers: async(req, res) => {
    try {
      const user = await User.find();
      return response.success(res, user, 'Successfully')
    } catch (error) {
      return response.serverError(res, error);
    }
  },
  delete: async(req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      return response.success(res, user)
    } catch (error) {
      return response.serverError(res, error);
    }
  },
  getMe: async(req, res) => {
    try {
      return response.success(res, req.user.user)
    } catch (error) {
      return response.serverError(res, error);
    }
  }
}

export default userController;
