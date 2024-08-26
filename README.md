# Welcome to your Pixaura app 👋

## Demo


https://github.com/user-attachments/assets/9c4d3064-795d-48e8-a1bf-f28f1866f826


 **Video:** [Watch here](https://github.com/user-attachments/assets/9c4d3064-795d-48e8-a1bf-f28f1866f826)

## Install

**APK:** [Download here](https://raw.githubusercontent.com/annnmol/pixaura/dev/com.annnmol.pixaura.apk)

## Get started

#### COMMAND - START
yarn start --clear
yarn start --clear --no-dev --minify  // Production

npx expo run:android --variant preview

#### COMMAND - EXPO EAS BUILD
npm install --global eas-cli
eas login

#### COMMAND - PREBUILD
npx expo prebuild -p android

#### COMMAND - Local EAS Build
eas build --local --profile development --platform android

#### COMMAND - BUILD 
eas build --profile development --platform android

#### COMMAND - BUILD using Java
npx expo run:android --variant release

### DEPENDENCIES
npx create-expo-app@latest
npx expo install expo-dev-client react-native-reanimated react-native-gesture-handler

1. Install dependencies

npx expo install expo-dev-client

npx expo install expo-image

npx expo install expo-haptics

npx expo install expo-file-system

npx expo install expo-linear-gradient

npx expo install expo-blur

npx expo install expo-sharing

npx expo install @react-native-async-storage/async-storage

npx expo install @shopify/flash-list

npx expo install @tanstack/react-query

npx expo install @gorhom/bottom-sheet@^4

npx expo install zustand

npx expo install react-native-toast-message

npx expo install @expo/vector-icons
