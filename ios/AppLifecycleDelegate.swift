import ExpoModulesCore

var hello: [UIMenu] = []

// seems not to be possible quite yet - because it might cause side effects
public class AppLifecycleDelegate: ExpoAppDelegateSubscriber {
    func openMenu() -> UIMenu {
        let openCommand =
            UIKeyCommand(title: "My custom menu item",
                         image: nil,
                         action: #selector(self.openAction),
                         input: "o",
                         modifierFlags: .command)
        let openMenu =
            UIMenu(title: "yo",
                   image: nil,
                   identifier: nil,
                   options: .displayInline,
                   children: [openCommand])
        return openMenu
    }
    
    @objc func openAction(){
        
    }
    
    public override func buildMenu(with builder: UIMenuBuilder) {
        builder.insertChild(openMenu(), atEndOfMenu: UIMenu.Identifier.edit)
    }
}
