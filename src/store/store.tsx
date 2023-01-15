import {
  AnyAction,
  combineReducers,
  createAsyncThunk,
  createSlice,
  PayloadAction,
  ThunkDispatch,
  TypedStartListening,
} from '@reduxjs/toolkit'
import {Screen} from '../types'
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux'
import {DrawerState} from 'react-native-gesture-handler/DrawerLayout'
import {demoCourse} from '../fixtures/fixtures'

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

export const progressState = createSlice({
  name: 'progress',
  initialState: {
    currentActivityId: demoCourse.modules[0].activities[0].id,
  },
  reducers: {
    setCurrentActivityId: (
      state,
      {payload: currentActivityId}: PayloadAction<number>,
    ) => ({
      ...state,
      currentActivityId,
    }),
  },
})

export const actions = {
  ...uiSlice.actions,
  ...progressState.actions,
}

export const reducer = combineReducers({
  [uiSlice.name]: uiSlice.reducer,
  [progressState.name]: progressState.reducer,
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
