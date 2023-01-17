import React, {PropsWithChildren, useMemo} from 'react'
import {SafeAreaView, StyleSheet} from 'react-native'
import {Colors} from 'react-native/Libraries/NewAppScreen'
import {useIsDarkMode} from 'src/hooks'

const makeStyles = (isDarkMode: boolean) =>
  StyleSheet.create({
    container: {
      backgroundColor: isDarkMode ? Colors.black : Colors.white,
      flex: 1,
    },
  })

export const BaseScreen: React.FC<PropsWithChildren> = ({children}) => {
  const isDarkMode = useIsDarkMode()
  const styles = useMemo(() => makeStyles(isDarkMode), [isDarkMode])
  return <SafeAreaView style={styles.container}>{children}</SafeAreaView>
}
