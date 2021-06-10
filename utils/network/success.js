class SuccessHandler {
  static ok(res, message) {
    res.status(200).json(message);
  }
}

export default SuccessHandler;
