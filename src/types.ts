import type { Subscription } from 'expo-modules-core'
import type { PropsWithChildren } from 'react'
import type { StyleProp, ViewStyle } from 'react-native'

export enum ModifiersType {
  'Alt' = 'Alt',
  'AltGraph' = 'AltGraph',
  'CapsLock' = 'CapsLock',
  'Control' = 'Control',
  'Fn' = 'Fn',
  'FnLock' = 'FnLock',
  'Hyper' = 'Hyper',
  'Meta' = 'Meta',
  'NumLock' = 'NumLock',
  'OS' = 'OS',
  'ScrollLock' = 'ScrollLock',
  'Shift' = 'Shift',
  'Super' = 'Super',
  'Symbol' = 'Symbol',
  'SymbolLock' = 'SymbolLock',
}

export enum CommandKeyModifiers {
  alphaShift = 'alphaShift',
  shift = 'shift',
  control = 'control',
  alternate = 'alternate',
  command = 'command',
  numericPad = 'numericPad',
}

export type Command = {
  readonly id: string,
  readonly input: string;
  readonly title?: string;
  readonly modifiers: readonly (CommandKeyModifiers | `${CommandKeyModifiers}`)[]
}

export type ReactNativeKeysViewProps = PropsWithChildren<{
  readonly commands?: readonly Command[],
  readonly style?: StyleProp<ViewStyle>
}>;

export type Modifiers = ModifiersType | `${ModifiersType}`

export const MapIosToModifier: Record<CommandKeyModifiers, Modifiers> = {
  alternate: ModifiersType.Alt,
  alphaShift: ModifiersType.Shift,
  command: ModifiersType.Hyper,
  control: ModifiersType.Control,
  numericPad: ModifiersType.NumLock,
  shift: ModifiersType.Shift,
}

type CommandKeyArgsEnum = ModifiersType.Alt | ModifiersType.Control | ModifiersType.Hyper | ModifiersType.NumLock | ModifiersType.Shift
export type CommandKeyArgs = CommandKeyArgsEnum | `${CommandKeyArgsEnum}`

export const MapKeyArgToIos: Record<CommandKeyArgs, CommandKeyModifiers> = {
  [ModifiersType.Alt]: CommandKeyModifiers.alternate,
  [ModifiersType.Hyper]: CommandKeyModifiers.command,
  [ModifiersType.Control]: CommandKeyModifiers.control,
  [ModifiersType.NumLock]: CommandKeyModifiers.numericPad,
  [ModifiersType.Shift]: CommandKeyModifiers.shift,
}

export enum UIPressPhase {
  began = 0,
  changed = 1,
  stationary = 2,
  ended = 3,
  cancelled = 4,
}

export enum UIPressType {
  upArrow = 0,
  downArrow = 1,
  leftArrow = 2,
  rightArrow = 3,
  select = 4,
  menu = 5,
  playPause = 6,
}

export type IosModifierFlags = {
  readonly shift: boolean;
  readonly command: boolean;
  readonly control: boolean;
  readonly alphaShift: boolean;
  readonly alternate: boolean;
  readonly numericPad: boolean;
};

export type IOSPress = {
  readonly force: number;
  readonly phase: UIPressPhase;
  readonly type: UIPressType;
  readonly characters: string;
  readonly charactersIgnoringModifiers: string;
  readonly keyCode: UIKeyboardHIDUsage;
  readonly modifierFlags: IosModifierFlags;
};

enum UIEventType {
  touches = 0,
  motion = 1,
  remoteControl = 2,
  presses = 3,
  scroll = 10,
  hover = 11,
  transform = 14,
}

enum UIEventSubtype {
  // available in iPhone OS 3.0
  none = 0,

  // for UIEventTypeMotion, available in iPhone OS 3.0
  motionShake = 1,

  // for UIEventTypeRemoteControl, available in iOS 4.0
  remoteControlPlay = 100,

  remoteControlPause = 101,

  remoteControlStop = 102,

  remoteControlTogglePlayPause = 103,

  remoteControlNextTrack = 104,

  remoteControlPreviousTrack = 105,

  remoteControlBeginSeekingBackward = 106,

  remoteControlEndSeekingBackward = 107,

  remoteControlBeginSeekingForward = 108,

  remoteControlEndSeekingForward = 109,
}

export type IOSKeyboardEvent = {
  readonly type: UIEventType;
  readonly subtype: UIEventSubtype;
  readonly presses: readonly IOSPress[];
};

export type ReactNativeKeysEvent = {
  readonly altKey: boolean;
  // readonly code: string;
  readonly ctrlKey: boolean;
  // readonly isComposing: boolean;
  readonly key?: string;
  // readonly location: number;
  readonly metaKey: boolean;
  // readonly repeat: boolean;
  readonly shiftKey: boolean;
  getModifierState(keyArg: Modifiers): boolean;
  readonly nativeEvent: IOSKeyboardEvent | KeyboardEvent;
  readonly keyCode: ReactNativeKeysKeyCode | null;
};

export type CallbackFn = (event: ReactNativeKeysEvent) => void;

export type CommandPayload = { readonly input: string, readonly modifierFlags: IosModifierFlags }

export type CommandCallback = (payload: CommandPayload) => void

export type EventTypes = 'command' | 'keydown' | 'keyup';

export type ReactNativeKeysEventListener<TEventType extends EventTypes> = ((
  eventType: TEventType,
  callback: TEventType extends 'command' ? CommandCallback : CallbackFn,
  options?: {
    /** Web Only */
    readonly passive?: boolean;
    readonly once?: boolean;
    /** Web Only */
    readonly capture?: boolean;
  }
) => Subscription);

// All keys in
export enum ReactNativeKeysKeyCode {
  // Comma = 'Comma',
  // Period = 'Period',
  Alt = 'Alt',
  AltGraph = 'AltGraph',
  ArrowDown = 'ArrowDown',
  ArrowLeft = 'ArrowLeft',
  ArrowRight = 'ArrowRight',
  ArrowUp = 'ArrowUp',
  Backspace = 'Backspace',
  CapsLock = 'CapsLock',
  Control = 'Control',
  Copy = 'Copy' /* Copy */,
  Cut = 'Cut' /* Cut */,
  Delete = 'Delete',
  End = 'End',
  Enter = 'Enter',
  Escape = 'Escape',
  F1 = 'F1',
  F10 = 'F10',
  F11 = 'F11',
  F12 = 'F12',
  F13 = 'F13',
  F14 = 'F14',
  F15 = 'F15',
  F16 = 'F16',
  F17 = 'F17',
  F18 = 'F18',
  F19 = 'F19',
  F2 = 'F2',
  F20 = 'F20',
  F3 = 'F3',
  F4 = 'F4',
  F5 = 'F5',
  F6 = 'F6',
  F7 = 'F7',
  F8 = 'F8',
  F9 = 'F9',
  Find = 'Find' /* Find */,
  Help = 'Help',
  Home = 'Home',
  Insert = 'Insert',
  // This is better done with the string/regex
  Key0 = 'Key0',
  Key1 = 'Key1',
  Key2 = 'Key2',
  Key3 = 'Key3',
  Key4 = 'Key4',
  Key5 = 'Key5',
  Key6 = 'Key6',
  Key7 = 'Key7',
  Key8 = 'Key8',
  Key9 = 'Key9',
  KeyA = 'KeyA',
  KeyB = 'KeyB',
  KeyC = 'KeyC',
  KeyD = 'KeyD',
  KeyE = 'KeyE',
  KeyF = 'KeyF',
  KeyG = 'KeyG',
  KeyH = 'KeyH',
  KeyI = 'KeyI',
  KeyJ = 'KeyJ',
  KeyK = 'KeyK',
  KeyL = 'KeyL',
  KeyM = 'KeyM',
  KeyN = 'KeyN',
  KeyO = 'KeyO',
  KeyP = 'KeyP',
  KeyQ = 'KeyQ',
  KeyR = 'KeyR',
  KeyS = 'KeyS',
  KeyT = 'KeyT',
  KeyU = 'KeyU',
  KeyV = 'KeyV',
  KeyW = 'KeyW',
  KeyX = 'KeyX',
  KeyY = 'KeyY',
  KeyZ = 'KeyZ',
  Meta = 'Meta',
  Mute = 'Mute',
  NumberPadPlus = 'NumberPadPlus',
  NumLock = 'NumLock',
  PageDown = 'PageDown',
  PageUp = 'PageUp',
  Paste = 'Paste' /* Paste */,
  Pause = 'Pause',
  PrintScreen = 'PrintScreen',
  Redo = 'Redo',
  ScrollLock = 'ScrollLock',
  Shift = 'Shift',
  Stop = 'Stop' /* Stop */,
  Tab = 'Tab',
  Undo = 'Undo' /* Undo */,
  VolumeDown = 'VolumeDown',
  VolumeUp = 'VolumeUp',
}

// as per https://developer.apple.com/documentation/uikit/uikeyboardhidusage
export enum UIKeyboardHIDUsage {
  keyboardErrorRollOver = 1 /* ErrorRollOver */,
  keyboardPOSTFail = 2 /* POSTFail */,
  keyboardErrorUndefined = 3 /* ErrorUndefined */,
  keyboardA = 4 /* a or A */,
  keyboardB = 5 /* b or B */,
  keyboardC = 6 /* c or C */,
  keyboardD = 7 /* d or D */,
  keyboardE = 8 /* e or E */,
  keyboardF = 9 /* f or F */,
  keyboardG = 10 /* g or G */,
  keyboardH = 11 /* h or H */,
  keyboardI = 12 /* i or I */,
  keyboardJ = 13 /* j or J */,
  keyboardK = 14 /* k or K */,
  keyboardL = 15 /* l or L */,
  keyboardM = 16 /* m or M */,

  keyboardN = 17 /* n or N */,

  keyboardO = 18 /* o or O */,

  keyboardP = 19 /* p or P */,

  keyboardQ = 20 /* q or Q */,

  keyboardR = 21 /* r or R */,

  keyboardS = 22 /* s or S */,

  keyboardT = 23 /* t or T */,

  keyboardU = 24 /* u or U */,

  keyboardV = 25 /* v or V */,

  keyboardW = 26 /* w or W */,

  keyboardX = 27 /* x or X */,

  keyboardY = 28 /* y or Y */,

  keyboardZ = 29 /* z or Z */,

  keyboard1 = 30 /* 1 or ! */,

  keyboard2 = 31 /* 2 or @ */,

  keyboard3 = 32 /* 3 or # */,

  keyboard4 = 33 /* 4 or $ */,

  keyboard5 = 34 /* 5 or % */,

  keyboard6 = 35 /* 6 or ^ */,

  keyboard7 = 36 /* 7 or & */,

  keyboard8 = 37 /* 8 or * */,

  keyboard9 = 38 /* 9 or ( */,

  keyboard0 = 39 /* 0 or ) */,

  keyboardReturnOrEnter = 40 /* Return (Enter) */,

  keyboardEscape = 41 /* Escape */,

  keyboardDeleteOrBackspace = 42 /* Delete (Backspace) */,

  keyboardTab = 43 /* Tab */,

  keyboardSpacebar = 44 /* Spacebar */,

  keyboardHyphen = 45 /* - or _ */,

  keyboardEqualSign = 46 /* = or + */,

  keyboardOpenBracket = 47 /* [ or { */,

  keyboardCloseBracket = 48 /* ] or } */,

  keyboardBackslash = 49 /* \ or | */,

  keyboardNonUSPound = 50 /* Non-US # or _ */,

  /* Typical language mappings: US: \| Belg: μ`£ FrCa: <}> Dan:’* Dutch: <> Fren:*μ
                                  Ger: #’ Ital: ù§ LatAm: }`] Nor:,* Span: }Ç Swed: ,*
                                  Swiss: $£ UK: #~. */
  keyboardSemicolon = 51 /* ; or : */,

  keyboardQuote = 52 /* ' or " */,

  keyboardGraveAccentAndTilde = 53 /* Grave Accent and Tilde */,

  keyboardComma = 54 /* , or < */,

  keyboardPeriod = 55 /* . or > */,

  keyboardSlash = 56 /* / or ? */,

  keyboardCapsLock = 57 /* Caps Lock */,

  /* Function keys */
  keyboardF1 = 58 /* F1 */,

  keyboardF2 = 59 /* F2 */,

  keyboardF3 = 60 /* F3 */,

  keyboardF4 = 61 /* F4 */,

  keyboardF5 = 62 /* F5 */,

  keyboardF6 = 63 /* F6 */,

  keyboardF7 = 64 /* F7 */,

  keyboardF8 = 65 /* F8 */,

  keyboardF9 = 66 /* F9 */,

  keyboardF10 = 67 /* F10 */,

  keyboardF11 = 68 /* F11 */,

  keyboardF12 = 69 /* F12 */,

  keyboardPrintScreen = 70 /* Print Screen */,

  keyboardScrollLock = 71 /* Scroll Lock */,

  keyboardPause = 72 /* Pause */,

  keyboardInsert = 73 /* Insert */,

  keyboardHome = 74 /* Home */,

  keyboardPageUp = 75 /* Page Up */,

  keyboardDeleteForward = 76 /* Delete Forward */,

  keyboardEnd = 77 /* End */,

  keyboardPageDown = 78 /* Page Down */,

  keyboardRightArrow = 79 /* Right Arrow */,

  keyboardLeftArrow = 80 /* Left Arrow */,

  keyboardDownArrow = 81 /* Down Arrow */,

  keyboardUpArrow = 82 /* Up Arrow */,

  /* Keypad (numpad) keys */
  keypadNumLock = 83 /* Keypad NumLock or Clear */,

  keypadSlash = 84 /* Keypad / */,

  keypadAsterisk = 85 /* Keypad * */,

  keypadHyphen = 86 /* Keypad - */,

  keypadPlus = 87 /* Keypad + */,

  keypadEnter = 88 /* Keypad Enter */,

  keypad1 = 89 /* Keypad 1 or End */,

  keypad2 = 90 /* Keypad 2 or Down Arrow */,

  keypad3 = 91 /* Keypad 3 or Page Down */,

  keypad4 = 92 /* Keypad 4 or Left Arrow */,

  keypad5 = 93 /* Keypad 5 */,

  keypad6 = 94 /* Keypad 6 or Right Arrow */,

  keypad7 = 95 /* Keypad 7 or Home */,

  keypad8 = 96 /* Keypad 8 or Up Arrow */,

  keypad9 = 97 /* Keypad 9 or Page Up */,

  keypad0 = 98 /* Keypad 0 or Insert */,

  keypadPeriod = 99 /* Keypad . or Delete */,

  keyboardNonUSBackslash = 100 /* Non-US \ or | */,

  /* On Apple ISO keyboards, this is the section symbol (§/±) */
  /* Typical language mappings: Belg:<\> FrCa:«°» Dan:<\> Dutch:]|[ Fren:<> Ger:<|>
                                  Ital:<> LatAm:<> Nor:<> Span:<> Swed:<|> Swiss:<\>
                                  UK:\| Brazil: \|. */
  keyboardApplication = 101 /* Application */,

  keyboardPower = 102 /* Power */,

  keypadEqualSign = 103 /* Keypad = */,

  /* Additional keys */
  keyboardF13 = 104 /* F13 */,

  keyboardF14 = 105 /* F14 */,

  keyboardF15 = 106 /* F15 */,

  keyboardF16 = 107 /* F16 */,

  keyboardF17 = 108 /* F17 */,

  keyboardF18 = 109 /* F18 */,

  keyboardF19 = 110 /* F19 */,

  keyboardF20 = 111 /* F20 */,

  keyboardF21 = 112 /* F21 */,

  keyboardF22 = 113 /* F22 */,

  keyboardF23 = 114 /* F23 */,

  keyboardF24 = 115 /* F24 */,

  keyboardExecute = 116 /* Execute */,

  keyboardHelp = 117 /* Help */,

  keyboardMenu = 118 /* Menu */,

  keyboardSelect = 119 /* Select */,

  keyboardStop = 120 /* Stop */,

  keyboardAgain = 121 /* Again */,

  keyboardUndo = 122 /* Undo */,

  keyboardCut = 123 /* Cut */,

  keyboardCopy = 124 /* Copy */,

  keyboardPaste = 125 /* Paste */,

  keyboardFind = 126 /* Find */,

  keyboardMute = 127 /* Mute */,

  keyboardVolumeUp = 128 /* Volume Up */,

  keyboardVolumeDown = 129 /* Volume Down */,

  keyboardLockingCapsLock = 130 /* Locking Caps Lock */,

  keyboardLockingNumLock = 131 /* Locking Num Lock */,

  /* Implemented as a locking key; sent as a toggle button. Available for legacy support;
       however, most systems should use the non-locking version of this key. */
  keyboardLockingScrollLock = 132 /* Locking Scroll Lock */,

  keypadComma = 133 /* Keypad Comma */,

  keypadEqualSignAS400 = 134 /* Keypad Equal Sign for AS/400 */,

  /* See the footnotes in the USB specification for what keys these are commonly mapped to.
   * https://www.usb.org/sites/default/files/documents/hut1_12v2.pdf */
  keyboardInternational1 = 135 /* International1 */,

  keyboardInternational2 = 136 /* International2 */,

  keyboardInternational3 = 137 /* International3 */,

  keyboardInternational4 = 138 /* International4 */,

  keyboardInternational5 = 139 /* International5 */,

  keyboardInternational6 = 140 /* International6 */,

  keyboardInternational7 = 141 /* International7 */,

  keyboardInternational8 = 142 /* International8 */,

  keyboardInternational9 = 143 /* International9 */,

  /* LANG1: On Apple keyboard for Japanese, this is the kana switch (かな) key */
  /* On Korean keyboards, this is the Hangul/English toggle key. */
  keyboardLANG1 = 144 /* LANG1 */,

  /* LANG2: On Apple keyboards for Japanese, this is the alphanumeric (英数) key */
  /* On Korean keyboards, this is the Hanja conversion key. */
  keyboardLANG2 = 145 /* LANG2 */,

  /* LANG3: Defines the Katakana key for Japanese USB word-processing keyboards. */
  keyboardLANG3 = 146 /* LANG3 */,

  /* LANG4: Defines the Hiragana key for Japanese USB word-processing keyboards. */
  keyboardLANG4 = 147 /* LANG4 */,

  /* LANG5: Defines the Zenkaku/Hankaku key for Japanese USB word-processing keyboards. */
  keyboardLANG5 = 148 /* LANG5 */,

  /* LANG6-9: Reserved for language-specific functions, such as Front End Processors and Input Method Editors. */
  keyboardLANG6 = 149 /* LANG6 */,

  keyboardLANG7 = 150 /* LANG7 */,

  keyboardLANG8 = 151 /* LANG8 */,

  keyboardLANG9 = 152 /* LANG9 */,

  keyboardAlternateErase = 153 /* AlternateErase */,

  keyboardSysReqOrAttention = 154 /* SysReq/Attention */,

  keyboardCancel = 155 /* Cancel */,

  keyboardClear = 156 /* Clear */,

  keyboardPrior = 157 /* Prior */,

  keyboardReturn = 158 /* Return */,

  keyboardSeparator = 159 /* Separator */,

  keyboardOut = 160 /* Out */,

  keyboardOper = 161 /* Oper */,

  keyboardClearOrAgain = 162 /* Clear/Again */,

  keyboardCrSelOrProps = 163 /* CrSel/Props */,

  keyboardExSel = 164 /* ExSel */,

  /* 0xA5-0xDF: Reserved */

  keyboardLeftControl = 224 /* Left Control */,

  keyboardLeftShift = 225 /* Left Shift */,

  keyboardLeftAlt = 226 /* Left Alt */,

  keyboardLeftGUI = 227 /* Left GUI */,

  keyboardRightControl = 228 /* Right Control */,

  keyboardRightShift = 229 /* Right Shift */,

  keyboardRightAlt = 230 /* Right Alt */,

  keyboardRightGUI = 231 /* Right GUI */,

  /* 0xE8-0xFFFF: Reserved */
  keyboard_Reserved = 65535,
}
