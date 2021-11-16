import React;

@objc(Keys)
public class Keys: RCTEventEmitter {
  var _hasListeners = false
  
  @objc
  public static var shared: Keys? = nil;
  
  override init(){
    super.init()
    Keys.shared = self
  }
  
  public override class func requiresMainQueueSetup() -> Bool {
    return true;
  }
  
  @objc(pressesBegan:event:)
  public func pressesBegan(_ presses: Set<UIPress>,
                                  with event: UIPressesEvent?) -> Bool{
    /*if(!self._hasListeners){
      return false;
    }*/
    
    self.sendEvent(withName: "keydown", body: [
      
      "presses": presses.map({ press in
        return [
          "characters": press.key?.characters,
          "charactersIgnoringModifiers": press.key?.charactersIgnoringModifiers,
          "keyCode": press.key?.keyCode.rawValue,
          "modifierFlags": [
            "shift": press.key?.modifierFlags.contains(UIKeyModifierFlags.shift),
            "command": press.key?.modifierFlags.contains(UIKeyModifierFlags.command),
            "control": press.key?.modifierFlags.contains(UIKeyModifierFlags.control),
            "alphaShift": press.key?.modifierFlags.contains(UIKeyModifierFlags.alphaShift),
            "alternate": press.key?.modifierFlags.contains(UIKeyModifierFlags.alternate),
            "numericPad": press.key?.modifierFlags.contains(UIKeyModifierFlags.numericPad),
          ],
        ]
      })
    ])
    return true;
  }
  
  @objc(pressesEnded:event:)
  public func pressesEnded(_ presses: Set<UIPress>,
                                  with event: UIPressesEvent?) -> Bool{
    /*if(!self._hasListeners){
      return false;
    }*/
    self.sendEvent(withName: "keyup", body: [
      "presses": presses.map({ press in
        return [
          "characters": press.key?.characters,
          "charactersIgnoringModifiers": press.key?.charactersIgnoringModifiers,
          "modifierFlags": [
            "shift": press.key?.modifierFlags.contains(UIKeyModifierFlags.shift),
            "command": press.key?.modifierFlags.contains(UIKeyModifierFlags.command),
            "control": press.key?.modifierFlags.contains(UIKeyModifierFlags.control),
            "alphaShift": press.key?.modifierFlags.contains(UIKeyModifierFlags.alphaShift),
            "alternate": press.key?.modifierFlags.contains(UIKeyModifierFlags.alternate),
            "numericPad": press.key?.modifierFlags.contains(UIKeyModifierFlags.numericPad),
          ],
          "keyCode": press.key?.keyCode.rawValue
        ]
      })
    ])
    return true;
  }
  
  public override func supportedEvents() -> [String]! {
    return ["keyup", "keydown"]
  }
  
  public override func stopObserving() {
    self._hasListeners = false
  }
  
  public override func startObserving() {
    self._hasListeners = true;
  }
}
