# Online Safety and Privacy Learning App 

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
