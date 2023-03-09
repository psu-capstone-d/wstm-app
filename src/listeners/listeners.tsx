import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import { actions } from "src/store";
import RNFS from "react-native-fs";

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  matcher: (isAnyOf(actions.setCurrentActivityId)),
  effect: async (action, api) => {
    const path = RNFS.DocumentDirectoryPath + '/wstm-progress.txt';

    const currentId = api.getState()

    RNFS.writeFile(path, currentId, 'utf8')
      .then((success) => {
        console.log('FILE WRITTEN!');
      })
      .catch((err) => {
        console.log(err.message);
      });
  },
});
