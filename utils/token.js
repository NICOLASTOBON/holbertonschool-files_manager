class Token {
  static validToken(credentials) {
    if (!credentials) return null;

    /* get token after word Basic (e.g: ["Ym9iQGR5bGFuLmNvbTp0b3RvMTIzNCE="]) */
    const regex = /((?<=Basic\s).*)/g;
    const credential = credentials.match(regex);
    if (!credential) return null;

    return credential[0];
  }

  static getCredentials(token) {
    /* tranform token (e.g: Ym9iQGR5bGFuLmNvbTp0b3RvMTIzNCE= to <email>:<password>) */
    return Buffer.from(token, 'base64').toString();
  }
}
export default Token;
