class Token {
  static getValidInfo(credentials) {
    /* get token after word Basic (e.g: ["Ym9iQGR5bGFuLmNvbTp0b3RvMTIzNCE="]) */
    const regex = /((?<=Basic\s).*)/g;
    const credential = credentials.match(regex);
    if (!credential) return null;

    /* tranform token (e.g: Ym9iQGR5bGFuLmNvbTp0b3RvMTIzNCE= to <email>:<password>) */
    return Buffer.from(credential[0], 'base64').toString();
  }
}
export default Token;
