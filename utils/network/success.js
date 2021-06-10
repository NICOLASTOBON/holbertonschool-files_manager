class SuccessHandler {
  static ok(res, message) {
    res.status(200).json(message);
  }

  static noContent(res) {
    res.status(204).end();
  }

  static created(res, message) {
    res.status(201).json(message);
  }
}

export default SuccessHandler;
