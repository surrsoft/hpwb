const { RG_EMAIL } = require('./TRegExp');

module.exports = {
  isEmail(email) {
    if (!email && email.length < 1) {
      return false
    }
    // ---
    RG_EMAIL.lastIndex = 0;
    return RG_EMAIL.test(email);
  }
}
