//
//  React-Native-Keys-Public.h
//  react-native-keys
//
//  Created by Robert Herber on 2021-11-15.
//

#ifndef React_Native_Keys_Public_h
#define React_Native_Keys_Public_h

@interface RNKeysPublic : NSObject

+ (BOOL)pressesBegan:(NSSet<UIPress *> *)presses withEvent:(UIPressesEvent *)event;

+ (BOOL)pressesEnded:(NSSet<UIPress *> *)presses withEvent:(UIPressesEvent *)event;

@end

#endif /* React_Native_Keys_Public_h */

