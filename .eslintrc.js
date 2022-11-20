module.exports = {
  "root": true,
  "extends": ["eslint-config-kingstinct/react-native"],
  "ignorePatterns": ["build"],
  "rules": {
    "import/no-extraneous-dependencies": ["error", {"devDependencies": true, "optionalDependencies": false, "peerDependencies": false}],
    "import/no-unresolved": 0
  }
}
