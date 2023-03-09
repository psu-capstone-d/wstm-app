import { createListenerMiddleware } from "@reduxjs/toolkit";
import { actions } from "src/store";
import RNFS from "react-native-fs";


// TODO: This could be refactored or moved if parts of this logic ought
//       to live elsewhere. Also files can be renamed, etc. Should the listener
//       passed to effect live in the listeners directory?

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  predicate: (action, currentState, originalState) => {
    return action == actions.setCurrentActivityId && currentState != originalState;
  },
  effect: async (action, listenerApi) => {
    const path = RNFS.DocumentDirectoryPath + '/wstm-progress.txt';

    RNFS.writeFile(path, 'some text that I wrote', 'utf8')
      .then((success) => {
        console.log('FILE WRITTEN!');
      })
      .catch((err) => {
        console.log(err.message);
      });
  },
});

