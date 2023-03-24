# Web Security Training Modules

This React app is designed to teach users about online safety, privacy, and account management skills through a series of learning modules and quiz questions. The app features four core modules that cover topics such as online account management, protecting yourself from online threats, online banking, and staying safe while using apps and websites. Each module includes quiz questions that test the user's knowledge, and their progress is tracked throughout the app.

# Using the App

When you first open the app, you'll see the module page with a hamburger menu showing your location in the learning modules. 

Each module includes several lessons on the topic of its name, followed by short quizzes to test your knowledge. The quizzes are multiple choice and you'll be able to see your score at the end of the modules as well as get immediate feedback on each quiz question.

Your progress through the modules is tracked in the app, so you can see which modules you've completed and which ones you still need to work on. If you'd like to save your progress locally, you can toggle the save progress button on the settings page

## Environment Setup

### Install dependencies

1. Get [Node.JS](https://nodejs.org/en/download/) LTS
    - (Optional, but better) Get [nvm](https://github.com/nvm-sh/nvm) and install node LTS via `nvm`.
1. Get [yarn](https://yarnpkg.com/getting-started/install)
1. Get [Java JDK version 11](https://www.oracle.com/java/technologies/javase/jdk11-archive-downloads.html)
    - Set the `JAVA_HOME` environment variable to point to the JDK directory
1. Get [Android Studio](https://developer.android.com/studio)
1. Add the path to the android SDK tools to your path
   - [Find the path to `platform-tools`](https://stackoverflow.com/questions/35854238/where-is-adb-exe-in-windows-10-located)
   - Add that path to your path environment variable
   - Confirm the path was added correctly by running `adb --version` in your terminal

### Set up project code

1. Clone this repository and `cd` inside
1. Run `yarn`

### Creating an emulated device

1. Run Android Studio
1. Open the Device Manager (sometimes listed as "Virtual Device Manager")
1. Create a new device `Pixel 2` device with  `API Level` set to `31` 


## Development

In order to view the app, you will need either an emulator running or an android phone connected via USB.

### Starting the emulator

1. Open the Device Manager in Android Studio
1. Click the play button to start the device
1. You should see the phone emulator appear
1. Confirm ADB correctly sees the device by checking the device is listed in the output of `adb devices`


### Running the app

1. Open a terminal, `cd` to the root project folder, and run `npx react-native start`
   - This terminal will remain running while you develop
   - You can press `r` on this terminal to force the app to rebuild + deploy onto phone
   - You'll see output of any react native code issues here as you edit files
   - It's recommended to keep this window visible while developing, or easily accessible
1. Open another terminal, `cd` to the root project folder, and run `npx react-native run-android`
   - Sometimes things get borked with the emulator, so you may occasionally need to re-run this command.
   - Re-running this command at any time is fine, just make sure you have `npx react-native start` already running in another terminal.
1. The app should now be up and running on your android device
1. Changes made to any of the app typescript code should appear instantly upon saving.

## Deployment

If you'd like to deploy the release version of the app to an actual phone, you can either deploy
to an individual device directly, or submit the app to the Google Play Store, and download it to
any number of devices from there.

### Deploying to a Phone

1. Connect your Android phone to your computer via USB cable
2. Enable USB debugging on your phone by going to Settings > Developer options > USB debugging (you may need to enable Developer options first by tapping on "Build number" in the "About phone" section of Settings multiple times)
3. Open a terminal or command prompt and navigate to the project directory
4. Run the command `npx react-native run-android --variant=release` to build and install the release version of the app on your phone
5. Once the app is installed, you should be able to find it in your app drawer

Note: If you encounter any issues while building or deploying the app, be sure to check the [React Native documentation](https://reactnative.dev/docs/running-on-device) or community forums for help.

### Publishing to the Google Play Store

 1. Create a Google Play Developer account and pay the registration fee
 2. Generate a signing key for the app by following [these instructions](https://reactnative.dev/docs/signed-apk-android)
 3. Build a release version of the app by running the command `npx react-native run-android --variant=release` in the root project directory
 4. Once you have the release APK file, log in to your Google Play Developer Console and create a new app listing
 5. Upload your APK file and fill in the app details, such as the app name, description, screenshots, and pricing information
 6. Submit your app for review and wait for it to be approved

It's important to note that publishing an app on the Google Play Store requires adherence to various policies and guidelines, so be sure to review these before submitting your app.
