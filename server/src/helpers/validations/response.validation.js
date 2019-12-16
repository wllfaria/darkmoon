module.exports = {
  errorResponse: (status, error) => {
    return {
      ok: false,
      status: status,
      code: error.code,
      name: error.name,
      message: error.message
    };
  },
  successResponse: (status, data) => {
    return {
      ok: true,
      status: status,
      data
    };
  }
};
