module.exports = {
  extends: 'airbnb-base',
  env: {
    jest: true,
  },
  "rules": {
    // windows linebreaks ignored
    // ensure git actually translates between the two
    "linebreak-style": ["error", (process.platform === "win32" ? "windows" : "unix")]
  }
};
