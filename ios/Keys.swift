import React;
import Foundation;

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
    if(!self._hasListeners){
      return false;
    }

    self.sendEvent(withName: "keydown", body: [
      "type": event?.type.rawValue,
      "subtype": event?.subtype.rawValue,
      "timestamp": event?.timestamp,
      "touches": event?.allTouches.map({ touch in
        return [
          "force": touch.first?.force,
          "timestamp": touch.first?.timestamp,
          "type": touch.first?.type.rawValue,
          "tapCount": touch.first?.tapCount,
          "altitudeAngle": touch.first?.altitudeAngle,
          "majorRadius": touch.first?.majorRadius,
        ]
      }),
      "presses": presses.map({ press in
        return [
          "force": press.force,
          "timestamp": press.timestamp,
          "phase": press.phase.rawValue,
          "type": press.type.rawValue,
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
    if(!self._hasListeners){
      return false;
    }

    self.sendEvent(withName: "keyup", body: [
      "type": event?.type.rawValue,
      "subtype": event?.subtype.rawValue,
      "timestamp": event?.timestamp,
      "touches": event?.allTouches.map({ touch in
        return [
          "force": touch.first?.force,
          "timestamp": touch.first?.timestamp,
          "type": touch.first?.type.rawValue,
          "tapCount": touch.first?.tapCount,
          "altitudeAngle": touch.first?.altitudeAngle,
          "majorRadius": touch.first?.majorRadius,
        ]
      }),
      "presses": presses.map({ press in
        return [
          "force": press.force,
          "timestamp": press.timestamp,
          "phase": press.phase.rawValue,
          "type": press.type.rawValue,
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
  
  public override func supportedEvents() -> [String]! {
    return ["keyup", "keydown"]
  }
  
  public func setPassive(_ isEnabled: Bool, listener: Int) -> Void{
    
  }
  
  public override func stopObserving() {
    self._hasListeners = false
  }
  
  public override func startObserving() {
    self._hasListeners = true;
  }
}
