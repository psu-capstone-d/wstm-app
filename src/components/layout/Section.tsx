import React, {type PropsWithChildren, useMemo} from 'react'
import {StyleSheet, Text, useColorScheme, View} from 'react-native'
import {Colors} from 'react-native/Libraries/NewAppScreen'

const makeStyles = (isDarkMode: boolean) =>
  StyleSheet.create({
    container: {
      marginTop: 32,
      paddingHorizontal: 24,
    },
    title: {
      fontSize: 24,
      fontWeight: '600',
      color: isDarkMode ? Colors.white : Colors.black,
    },
    description: {
      marginTop: 8,
      fontSize: 18,
      fontWeight: '400',
      color: isDarkMode ? Colors.light : Colors.dark,
    },
  })

const Section: React.FC<
  PropsWithChildren<{
    title: string
  }>
> = ({children, title}) => {
  const isDarkMode = useColorScheme() === 'dark'
  const styles = useMemo(() => makeStyles(isDarkMode), [isDarkMode])
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{children}</Text>
    </View>
  )
}

export default Section
