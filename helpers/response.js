const response = {
  error: (res, message = 'Failed', statusCode = 400) => {
    const error = {
      data: null,
      message,
      status: false,
    }
    return res.status(statusCode).json(error)
  },
  success: (res, data, message = 'Success') => {
    const success = {
      data,
      message,
      status: true,
    }
    return res.status(200).json(success)
  },
  serverError: (res, error) => {
    const err = {
      data: null,
      message: error.message,
      status: false,
    }
    return res.status(500).json(err)
  },
}

export default response;
