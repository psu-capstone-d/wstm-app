import {
  ActionReducerMapBuilder,
  AnyAction,
  combineReducers, createAction,
  createAsyncThunk,
  createSlice,
  PayloadAction, Store,
  ThunkDispatch,
  TypedStartListening,
} from "@reduxjs/toolkit";
import { ColorTheme, Screen } from "src/types";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { DrawerState } from "react-native-gesture-handler/DrawerLayout";
import { demoCourse } from "src/fixtures";
import RNFS from "react-native-fs";
import { storagePath } from "src/constants";

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
  progressStateIsLoaded: false,
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
  }, extraReducers: (builder) => {
    builder.addCase(loadFromFileAction, (state) => ({
      ...state,
      progressStateIsLoaded: true,
    }));
  },
})

/******* Progress State *******/
// Persisted.
// Contains state information for the progress through the course.

type ProgressState = {
  currentActivityId: number,
  highestActivityId: number
}

const initialActivityId = demoCourse.modules[0].activities[0].id;
const defaultInitialState: ProgressState = {
  currentActivityId: initialActivityId,
  highestActivityId: initialActivityId,
};


type FileState = ProgressState & {
  shouldUseLocalStorage: boolean,
}

const defaultFileState: FileState = {
  ...defaultInitialState,
  shouldUseLocalStorage: false,
}

const getFileStateAsString = async (): Promise<string> => {
  return RNFS.readDir(RNFS.DocumentDirectoryPath)
    .then((result) => {
      console.log("GOT RESULT", result);

      return Promise.all([RNFS.stat(storagePath), storagePath]);

    })
    .then((statResult) => {
      if (statResult[0].isFile()) {
        // if we have a file, read it
        return RNFS.readFile(statResult[1], "utf8");
      }

      return "no file";
    })
    .then((contents) => {
      // log the file contents
      return contents;
    })
    .catch((err) => {
      throw new Error(err.message());
    });
};
const loadFromFileAction = createAction<FileState>("loadFromFileAction");

export const loadFromFile = async (store: Store) => {
  console.log("Loading progress from file");


    let fileState: FileState;
    try {
      const fromFile = await getFileStateAsString();
      const initialFileState = fromFile ? (JSON.parse(fromFile) as FileState) : defaultFileState;
      if (initialFileState.shouldUseLocalStorage) {
        fileState = initialFileState
        console.log("Loaded progress from file!", fileState);
      } else {
        fileState = defaultFileState;
        console.log("User requested to not load from file, setting default progress state.", fileState)
      }
    } catch (err) {
      console.log("Error loading progress from file", err);
      fileState = defaultFileState;
    }
    store.dispatch(loadFromFileAction(fileState));

};

export const progressSlice = createSlice({
  name: "progress",
  initialState: defaultInitialState,
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
  }, extraReducers: (builder) => {
    builder
      .addCase(loadFromFileAction, (
        state: ProgressState,
        { payload: progressStateFromFile }: PayloadAction<ProgressState>
      ) => ({
        highestActivityId: progressStateFromFile.highestActivityId,
        currentActivityId: progressStateFromFile.currentActivityId
      }));
  },
});

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
  }, extraReducers: (builder) => {
  builder
    .addCase(loadFromFileAction, (
      state,
      { payload: progressStateFromFile }: PayloadAction<FileState>
    ) => ({
      ...state,
      shouldUseLocalStorage: progressStateFromFile.shouldUseLocalStorage
    }));
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
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const thunk = createAsyncThunk.withTypes<{
  state: RootState
  dispatch: AppDispatch
}>()
