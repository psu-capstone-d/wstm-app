import {createListenerMiddleware, isAnyOf} from '@reduxjs/toolkit'
import {actions, AppStartListening} from 'src/store'
import RNFS from 'react-native-fs'
import {storagePath} from 'src/constants'

export const listenerMiddleware = createListenerMiddleware()
export const startAppListening =
  listenerMiddleware.startListening as AppStartListening

startAppListening({
  matcher: isAnyOf(
    actions.resetCourse,
    actions.saveCheckedAnswers,
    actions.setCurrentActivityId,
    actions.setShouldUseLocalStorage,
  ),
  effect: async (action, api) => {
    const {settings, progress, submittedAnswers} = api.getState()
    const data = JSON.stringify(
      settings.shouldUseLocalStorage
        ? {settings, progress, submittedAnswers}
        : {settings},
    )
    RNFS.writeFile(storagePath, data, 'utf8').catch(err => {
      console.log(err.message)
    })
  },
})
