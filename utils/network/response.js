class ErrorHandler {
  static badRequest(res, message) {
    res.status(400).json({ error: message });
  }

  static unauthorized(res) {
    res.status(401).json({ error: 'Unauthorized' });
  }

  static notFound(res) {
    res.status(404).json({ error: 'Not found' });
  }
}

export default ErrorHandler;
