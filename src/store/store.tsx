import {
  AnyAction,
  combineReducers,
  createAsyncThunk,
  createSlice,
  PayloadAction,
  ThunkDispatch,
  TypedStartListening,
} from '@reduxjs/toolkit'
import {ColorTheme, Screen} from 'src/types'
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux'
import {DrawerState} from 'react-native-gesture-handler/DrawerLayout'
import {demoCourse} from 'src/fixtures'

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
  currentScreen: 'course' as Screen,
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
  },
})

/******* Progress State *******/
// Persisted.
// Contains state information for the progress through the course.
// Persisted.
// Contains state information for the progress through the course.
interface ActivityProgress {
  currentActivityId: number;
  highestActivityId: number;
  answers: {[key: number]: string}; // Object to save the state for each activity
}

const initialActivityId = demoCourse.modules[0].activities[0].id;
export const progressSlice = createSlice({
  name: 'progress',
  initialState: {
    currentActivityId: initialActivityId,
    highestActivityId: initialActivityId,
    answers: {}, // Initialize answers object
  } as ActivityProgress,
  reducers: {
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
          saveAnswers: (
          state,
             {payload: currentActivityId, activityId, idx}: PayloadAction<{currentActivityId: number}>,
           ) => ({
             ...state,
             currentActivityId,
             highestActivityId:
               currentActivityId > state.highestActivityId
                 ? currentActivityId
                 : state.highestActivityId,

             answers:{
                ...state.idx,
                [activityId]: idx,
             },

           }),


  },

});

/******* Settings State *******/
// Persisted.
// Contains user controlled settings.
export const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    colorTheme: 'system' as ColorTheme,
  },
  reducers: {
    setColorTheme: (
      state,
      {payload: colorTheme}: PayloadAction<ColorTheme>,
    ) => ({
      ...state,
      colorTheme,
    }),
  },
})

export const actions = {
  ...uiSlice.actions,
  ...progressSlice.actions,
  ...settingsSlice.actions,
}

export const reducer = combineReducers({
  [uiSlice.name]: uiSlice.reducer,
  [progressSlice.name]: progressSlice.reducer,
  [settingsSlice.name]: settingsSlice.reducer,
})

export type RootState = ReturnType<typeof reducer>

export type API = {getState: () => RootState; dispatch: AppDispatch}
export type AppDispatch = ThunkDispatch<RootState, any, AnyAction>
export type AppStartListening = TypedStartListening<RootState, AppDispatch>
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const thunk = createAsyncThunk.withTypes<{
  state: RootState
  dispatch: AppDispatch
}>()
