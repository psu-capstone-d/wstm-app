import * as Progress from 'react-native-progress';

import React, {useMemo} from 'react'
import {
    PaletteColor,
    Pressable,
    Text,
    usePaletteColor,
} from '@react-native-material/core'
import {useIsDarkMode} from 'src/hooks'
import {Colors} from "react-native/Libraries/NewAppScreen";

const ModuleProgressBar = () => {
    const primaryColor = usePaletteColor('primary');
    return (
        <Progress.Bar progress={0.2} color={primaryColor.main}/>
    )
}
