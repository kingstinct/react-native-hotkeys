//
//  React-Native-Keys-Public.h
//  Pods
//
//  Created by Robert Herber on 2021-11-15.
//

#import <UIKit/UIKit.h>

#ifndef React_Native_Keys_Public_h
#define React_Native_Keys_Public_h

@interface RNKeys : NSObject {
  - (void)pressesBegan:(NSSet<UIPress *> *)presses withEvent:(UIPressesEvent *)event;
}


#endif /* React_Native_Keys_Public_h */
