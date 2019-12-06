
// IPv4.
// Examples valid: 1.1.1.1 .
// Examples invalid: 256.1.1.1 .
module.exports.RG_IP = new RegExp('^(?:(?:2(?:[0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9])\\.){3}(?:(?:2([0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9]))$', 'gi');

// IPv4 in normal format and CIDR format.
// Examples valid: 1.1.1.1, 1.1.1.1/1, 1.1.1.1/32 .
// Examples invalid: 256.1.1.1, 1.1.1.1/, 1.1.1.1/33 .
module.exports.RG_IP_CIDR = new RegExp('^(?:(?:2(?:[0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9])\\.){3}(?:(?:2([0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9]))(?:\\/\\d{1,1}|\\/[1-2][0-9]|\\/[1-3][0-2]|)$', 'gi');

// IP port
// Examples valid: 0, 1, 65000, 65535
// Examples invalid: 65536, a
module.exports.RG_PORT = new RegExp('^()([1-9]|[1-5]?[0-9]{2,4}|6[1-4][0-9]{3}|65[1-4][0-9]{2}|655[1-2][0-9]|6553[1-5])$', 'g');
