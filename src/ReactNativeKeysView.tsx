import { requireNativeViewManager } from 'expo-modules-core'
import * as React from 'react'

import type { ReactNativeKeysViewProps } from './types'

const NativeView: React.ComponentType<ReactNativeKeysViewProps> = requireNativeViewManager('ReactNativeKeys')

export default function ReactNativeKeysView(props: ReactNativeKeysViewProps) {
  return <NativeView {...props} />
}
