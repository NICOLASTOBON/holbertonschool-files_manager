export class SuccessHandler {
  static ok(res, message) {
    res.status(200).json(message);
  }

  static created(res, message) {
    res.status(201).json(message);
  }

  static noContent(res) {
    res.status(204).end();
  }
}

export class ErrorHandler {
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
