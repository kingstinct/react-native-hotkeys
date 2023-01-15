import ExpoModulesCore
import UIKit

// This view will be used as a native component. Make sure to inherit from `ExpoView`
// to apply the proper styling (e.g. border radius and shadows).
class ReactNativeKeysView: ExpoView {
    override func pressesBegan(_ presses: Set<UIPress>, with event: UIPressesEvent?) {
        self.appContext?.eventEmitter?.sendEvent(withName: "keydown", body: [
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
        super.pressesBegan(presses, with: event)
    }

    
    override func pressesEnded(_ presses: Set<UIPress>, with event: UIPressesEvent?) {
        self.appContext?.eventEmitter?.sendEvent(withName: "keyup", body: [
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
        super.pressesEnded(presses, with: event)
    }
    
    var _keyCommands: [UIKeyCommand]? = []
    
    
    override var keyCommands: [UIKeyCommand]? {
        return _keyCommands
    }
    
    
    func setCommands(commands: [CommandArgs]){
        _keyCommands?.removeAll()
        _keyCommands?.append(contentsOf: commands.map({ command in
            
            let modifierFlags = UIKeyModifierFlags(command.modifiers.map({ el in
                switch el {
                    case .command: return UIKeyModifierFlags.command
                    case .control: return UIKeyModifierFlags.control
                    case .alphaShift: return UIKeyModifierFlags.alphaShift
                    case .shift: return UIKeyModifierFlags.shift
                    case .alternate: return UIKeyModifierFlags.alternate
                    case .numericPad: return UIKeyModifierFlags.numericPad
                }
            }))
            
            guard let title = command.title else {
                return UIKeyCommand(
                    input: command.input,
                    modifierFlags: modifierFlags,
                    action: #selector(onCommand)
                );
            }
            
            
            
        return UIKeyCommand(
                title: title, /*image: UIImage.init(systemName: "square.and.arrow.up"),*/
                action: #selector(onCommand),
                input: command.input,
                modifierFlags: modifierFlags,
                discoverabilityTitle: title
            )
            
        }))
    }

    @objc func onCommand(sender: UIKeyCommand) {
        appContext?.eventEmitter?.sendEvent(withName: "command", body: [
            "input": sender.input!,
            "modifierFlags": [
                "shift": sender.modifierFlags.contains(UIKeyModifierFlags.shift),
                "command": sender.modifierFlags.contains(UIKeyModifierFlags.command),
                "control": sender.modifierFlags.contains(UIKeyModifierFlags.control),
                "alphaShift": sender.modifierFlags.contains(UIKeyModifierFlags.alphaShift),
                "alternate": sender.modifierFlags.contains(UIKeyModifierFlags.alternate),
                "numericPad": sender.modifierFlags.contains(UIKeyModifierFlags.numericPad),
              ],
        ])
    }
    
    required init(appContext: AppContext? = nil) {
        super.init(appContext: appContext)
        self.becomeFirstResponder()
        
    }
    
    override func pressesChanged(_ presses: Set<UIPress>, with event: UIPressesEvent?) {
        
    }
    
    override func pressesCancelled(_ presses: Set<UIPress>, with event: UIPressesEvent?) {
        
    }
    
    
    override var canBecomeFocused: Bool {
        get{
            return true
        }
    }
    
    override var canBecomeFirstResponder: Bool {
        return true
    }
}
