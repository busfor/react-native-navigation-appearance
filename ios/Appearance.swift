import Foundation

@objc(Appearance)
class Appearance: NSObject {

  @objc(setDefaultNightMode:)
  func setDefaultNightMode(_ mode: Int) {
    DispatchQueue.main.async {
      if #available(iOS 13.0, *) {
        UIApplication.shared.windows[0].overrideUserInterfaceStyle = UIUserInterfaceStyle(rawValue: mode)!
      }
    }
  }

  @objc
  func constantsToExport() -> [AnyHashable: Any]! {
    if #available(iOS 12.0, *) {
      return [
        "MODE_NIGHT_YES": UIUserInterfaceStyle.dark.rawValue,
        "MODE_NIGHT_NO": UIUserInterfaceStyle.light.rawValue,
        "MODE_NIGHT_FOLLOW_SYSTEM": UIUserInterfaceStyle.unspecified.rawValue
      ]
    } else {
      return nil
    }
  }

}
