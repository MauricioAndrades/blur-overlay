module.exports = {
  "extends": "airbnb-base",
  "env": {
    "browser": true,
    "jquery": true,
    "jasmine": true
  },
  "globals": {
    "readFixtures": true,
    "loadFixtures": true
  },
  "rules": {
    "strict": "off",
    "func-names": "off",
    "new-cap": "off",
    "no-underscore-dangle": "off",
    "max-len": ["warn", 120],
    "no-confusing-arrow": "warn"
  }
};
