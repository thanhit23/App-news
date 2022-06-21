const response = {
  error: (res, message = 'Failed', statusCode = 400) => {
    const error = {
      data: null,
      message,
      status: false,
    }
    return res.status(statusCode).json(error)
  },
  success: (res, data, message = 'success') => {
    const success = {
      data,
      message,
      status: true,
    }
    return res.status(200).json(success)
  },
  server: (res, error) => {
    return res.status(500).json(error)
  },
}

export default response;
