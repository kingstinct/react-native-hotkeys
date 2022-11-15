//
//  React-Native-Keys-Public.m
//  DoubleConversion
//
//  Created by Robert Herber on 2021-11-15.
//
#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>
#import <React/RCTEventEmitter.h>

#import "react_native_keys-Swift.h"
#import "React-Native-Keys-Public.h"

@implementation RNKeysPublic : NSObject

+ (BOOL)pressesBegan:(NSSet<UIPress *> *)presses withEvent:(UIPressesEvent *)event{
  return [Keys.shared pressesBegan:presses event:event];
}

+ (BOOL)pressesEnded:(NSSet<UIPress *> *)presses withEvent:(UIPressesEvent *)event{
  return [Keys.shared pressesEnded:presses event:event];
}

@end

