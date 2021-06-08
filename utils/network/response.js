class Response {
  static success(res, statusCode, message) {
    res.status(statusCode).send(message);
  }

  static error(res, statusCode, message) {
    res.status(statusCode).send({ error: message });
  }
}

export default Response;
