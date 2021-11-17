const { withAppDelegate } = require('@expo/config-plugins');

/**
 * A plugin which adds new base modifiers to the prebuild config.
 * @type {import("@expo/config-plugins").ConfigPlugin }
 */
const plugin = function (config) {
  return withAppDelegate(config, function (cfg) {
    cfg.modResults.contents =
      '#import "React-Native-Keys-Public.h";\n' +
      cfg.modResults.contents.replace(
        '@end',
        '\n    - (void)pressesBegan:(NSSet<UIPress *> *)presses withEvent:(UIPressesEvent *)event {\n      BOOL handled = [RNKeysPublic pressesBegan:presses withEvent:event];\n      if(!handled){\n        [super pressesBegan:presses withEvent:event];\n      }\n    }\n    \n    - (void)pressesChanged:(NSSet<UIPress *> *)presses withEvent:(UIPressesEvent *)event:(NSSet<UIPress *> *)presses withEvent:(UIPressesEvent *)event{\n    // BOOL handled = [RNKeysPublic pressesEnded:presses withEvent:event];\n    //  if(!handled){\n        [super pressesEnded:presses withEvent:event];\n     // }\n    }\n    \n    - (void)pressesCancelled:(NSSet<UIPress *> *)presses withEvent:(UIPressesEvent *)event{\n      BOOL handled = [RNKeysPublic pressesEnded:presses withEvent:event];\n      if(!handled){\n        [super pressesEnded:presses withEvent:event];\n      }\n    }\n    \n    - (void)pressesEnded:(NSSet<UIPress *> *)presses withEvent:(UIPressesEvent *)event {\n      BOOL handled = [RNKeysPublic pressesEnded:presses withEvent:event];\n      if(!handled){\n        [super pressesEnded:presses withEvent:event];\n      }\n    }\n    \n    - (BOOL)canBecomeFirstResponder{\n      return true;\n    }\n    @end'
      );
    return cfg;
  });
};

module.exports = plugin;
