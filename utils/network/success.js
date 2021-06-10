class SuccessHandler {
  static ok(res, message) {
    res.status(200).json(message);
  }

  static noContent(res) {
    res.status(204).end();
  }
}

export default SuccessHandler;
