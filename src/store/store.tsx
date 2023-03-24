import {
  AnyAction,
  combineReducers,
  createAction,
  createAsyncThunk,
  createSlice,
  isAnyOf,
  PayloadAction,
  Store,
  ThunkDispatch,
  TypedStartListening,
} from '@reduxjs/toolkit'
import {CheckedAnswers, ColorTheme, Screen} from 'src/types'
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux'
import {DrawerState} from 'react-native-gesture-handler/DrawerLayout'
import {course} from 'src/fixtures'
import RNFS from 'react-native-fs'
import {constants} from 'src/constants'

const resetCourse = createAction('resetCourse')
const resume = createAction('resume')

/******* UI State *******/
// Not persisted.
// Contains state of various UI components.

const drawerStatus = {
  drawerState: 'Idle' as DrawerState,
  drawerIsIdle: true,
  drawerIsSettling: false,
  drawerIsDragging: false,
  drawerWillShow: false,
  drawerIsOpen: false,
}
const initialUiState = {
  currentScreen: 'intro' as Screen,
  devMode: false,
  savedStateIsLoaded: false,
  didLoadSavedProgress: false,
  ...drawerStatus,
}
type DrawerStateUpdate = Pick<
  typeof drawerStatus,
  'drawerState' | 'drawerWillShow'
>
export const uiSlice = createSlice({
  name: 'ui',
  initialState: initialUiState,
  reducers: {
    setScreen: (state, {payload: currentScreen}: PayloadAction<Screen>) => ({
      ...state,
      currentScreen,
    }),
    setDrawerState: (state, {payload}: PayloadAction<DrawerStateUpdate>) => ({
      ...state,
      ...payload,
      drawerIsIdle: payload.drawerState == 'Idle',
      drawerIsSettling: payload.drawerState == 'Settling',
      drawerIsDragging: payload.drawerState == 'Dragging',
    }),
    setDrawerIsOpen: (
      state,
      {payload: drawerIsOpen}: PayloadAction<boolean>,
    ) => ({
      ...state,
      drawerIsOpen,
    }),
    loadingState: state => ({
      ...state,
      savedStateIsLoaded: false,
      didLoadSavedProgress: false,
    }),
    toggleDevMode: state => ({
      ...state,
      devMode: !state.devMode,
    }),
  },
  extraReducers: builder => {
    builder.addCase(loadFromFile, (state, action) => ({
      ...state,
      savedStateIsLoaded: true,
      didLoadSavedProgress: Boolean(action.payload.progress),
    }))
    builder.addMatcher(isAnyOf(resume, resetCourse), state => ({
      ...state,
      currentScreen: 'course',
    }))
  },
})

/******* Progress State *******/
// Persisted.
// Contains state information for the progress through the course.

type ProgressState = {
  currentActivityId: number
  highestActivityId: number
}

const initialActivityId = course.modules[0].activities[0].id
const defaultProgressState: ProgressState = {
  currentActivityId: initialActivityId,
  highestActivityId: initialActivityId,
}

const noFile = 'no file'
const getFileStateAsString = async (): Promise<string> => {
  return RNFS.readDir(RNFS.DocumentDirectoryPath)
    .then(() => {
      return Promise.all([
        RNFS.stat(constants.storagePath),
        constants.storagePath,
      ])
    })
    .then(statResult => {
      if (statResult[0].isFile()) {
        // if we have a file, read it
        return RNFS.readFile(statResult[1], 'utf8')
      }
      return noFile
    })
    .then(contents => {
      return contents
    })
    .catch(() => noFile)
}
const loadFromFile = createAction<SavedState>('loadFromFileAction')

export const loadStateFromStorage = async (store: Store) => {
  const fromFile = await getFileStateAsString()
  let savedState: Partial<SavedState> = {}
  if (fromFile != noFile) {
    try {
      savedState = await JSON.parse(fromFile)
    } catch {}
  }
  setTimeout(() => store.dispatch(loadFromFile(savedState as SavedState)), 130)
}

export const progressSlice = createSlice({
  name: 'progress',
  initialState: defaultProgressState,
  reducers: {
    setHighestActivityId: (
      state,
      {payload: highestActivityId}: PayloadAction<number>,
    ) => ({
      ...state,
      highestActivityId,
      currentActivityId:
        state.currentActivityId > highestActivityId
          ? highestActivityId
          : state.currentActivityId,
    }),
    setCurrentActivityId: (
      state,
      {payload: currentActivityId}: PayloadAction<number>,
    ) => ({
      ...state,
      currentActivityId,
      highestActivityId:
        currentActivityId > state.highestActivityId
          ? currentActivityId
          : state.highestActivityId,
    }),
  },
  extraReducers: builder => {
    builder.addCase(loadFromFile, (state, action: SavedStateAction) => ({
      ...state,
      ...action.payload.progress,
    }))
    builder.addCase(resetCourse, () => defaultProgressState)
  },
})

export type SubmittedAnswers = {
  [key: number]: CheckedAnswers
}

export const submittedAnswersSlice = createSlice({
  name: 'submittedAnswers',
  initialState: {} as SubmittedAnswers,
  reducers: {
    clearCheckedAnswers: () => ({}),
    setCheckedAnswers: (state, {payload}: PayloadAction<SubmittedAnswers>) => ({
      ...state,
      ...payload,
    }),
  },
  extraReducers: builder => {
    builder.addCase(loadFromFile, (state, action: SavedStateAction) => ({
      ...state,
      ...action.payload.submittedAnswers,
    }))
    builder.addCase(resetCourse, () => ({}))
  },
})

/******* Settings State *******/
// Persisted.
// Contains user controlled settings.
export const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    colorTheme: 'system' as ColorTheme,
    shouldUseLocalStorage: true,
  },
  reducers: {
    setColorTheme: (
      state,
      {payload: colorTheme}: PayloadAction<ColorTheme>,
    ) => ({
      ...state,
      colorTheme,
    }),
    setShouldUseLocalStorage: (
      state,
      {payload: shouldUseLocalStorage}: PayloadAction<boolean>,
    ) => ({
      ...state,
      shouldUseLocalStorage,
    }),
  },
  extraReducers: builder => {
    builder.addCase(loadFromFile, (state, action: SavedStateAction) => ({
      ...state,
      ...action.payload.settings,
    }))
  },
})

export const actions = {
  ...uiSlice.actions,
  ...progressSlice.actions,
  ...settingsSlice.actions,
  ...submittedAnswersSlice.actions,
  resetCourse,
  resume,
}

export const reducer = combineReducers({
  [uiSlice.name]: uiSlice.reducer,
  [progressSlice.name]: progressSlice.reducer,
  [settingsSlice.name]: settingsSlice.reducer,
  [submittedAnswersSlice.name]: submittedAnswersSlice.reducer,
})

export type RootState = ReturnType<typeof reducer>
type SavedState = Pick<RootState, 'settings' | 'progress' | 'submittedAnswers'>
type SavedStateAction = PayloadAction<SavedState>

export type API = {getState: () => RootState; dispatch: AppDispatch}
export type AppDispatch = ThunkDispatch<RootState, any, AnyAction>
export type AppStartListening = TypedStartListening<RootState, AppDispatch>
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const thunk = createAsyncThunk.withTypes<{
  state: RootState
  dispatch: AppDispatch
}>()
