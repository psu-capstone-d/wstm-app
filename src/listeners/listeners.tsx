import { createListenerMiddleware, isAnyOf, TypedStartListening } from "@reduxjs/toolkit";
import { actions, AppStartListening} from "src/store";
import RNFS from "react-native-fs";
import { storagePath } from "src/constants";

export const listenerMiddleware = createListenerMiddleware();
export const startAppListening = listenerMiddleware.startListening as AppStartListening

startAppListening({
  matcher: (isAnyOf(actions.setCurrentActivityId, actions.setShouldUseLocalStorage)),
  effect: async (action, api) => {
      console.log("beginning effect execution")

      const path = storagePath

      const newState = {
        shouldUseLocalStorage: api.getState().settings.shouldUseLocalStorage,
        currentActivityId: api.getState().progress.currentActivityId,
        highestActivityId: api.getState().progress.highestActivityId,
      };

      RNFS.writeFile(path, JSON.stringify(newState), "utf8")
        .then((success) => {
          console.log("file written hooray!")
        })
        .catch((err) => {
          console.log(err.message)
        })
  },
})

