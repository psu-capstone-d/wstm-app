import React, {PropsWithChildren, useMemo, useState} from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {BaseScreen} from 'src/components/layout/BaseScreen'
import {ColorTheme} from 'src/types'
import {Divider, Switch} from '@react-native-material/core'
import {actions, useAppDispatch, useAppSelector} from 'src/store'
import {useIsDarkMode} from 'src/hooks'
import {Colors} from 'react-native/Libraries/NewAppScreen'
import SelectDropdown from 'src/components/form/SelectDropdown'

const makeStyles = (isDarkMode: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      marginTop: 10,
    },
    divider: {
      backgroundColor: isDarkMode ? '#ccc' : '#999',
      marginHorizontal: 8,
      marginVertical: 16,
    },
    row: {
      flexDirection: 'row',
      paddingHorizontal: 20,
      paddingVertical: 5,
    },
    column: {
      flex: 1,
      justifyContent: 'center',
      flexBasis: 1,
    },
    label: {
      fontWeight: 'bold',
      fontSize: 20,
      color: isDarkMode ? Colors.white : Colors.black,
    },
    dropdownContainer: {
      backgroundColor: isDarkMode ? Colors.black : Colors.white,
    },
  })

const SettingsScreen = () => {
  const {colorTheme} = useAppSelector(state => state.settings)
  const {shouldUseLocalStorage} = useAppSelector(state => state.settings)
  const isDarkMode = useIsDarkMode()
  const styles = useMemo(() => makeStyles(isDarkMode), [isDarkMode])
  const dispatch = useAppDispatch()

  const SettingRow: React.FC<
    PropsWithChildren<{
      label: string
    }>
  > = ({label, children}) => (
    <View style={styles.row}>
      <View style={styles.column}>
        <Text style={styles.label}>{label}</Text>
      </View>
      <View style={styles.column}>{children}</View>
    </View>
  )

  return (
    <BaseScreen>
      <View style={styles.container}>
        <SettingRow label="Color Theme">
          <SelectDropdown
            value={colorTheme}
            items={[
              {label: 'System', value: 'system'},
              {label: 'Dark', value: 'dark'},
              {label: 'Light', value: 'light'},
            ]}
            onChange={value =>
              dispatch(actions.setColorTheme(value as ColorTheme))
            }
          />
        </SettingRow>
        <Divider style={styles.divider} />
        <SettingRow label="Save/Load from Local Storage">
          <Switch
            value={shouldUseLocalStorage}
            onValueChange={value => {
              dispatch(actions.setShouldUseLocalStorage(value));
            }}
          />
        </SettingRow>
      </View>
    </BaseScreen>
  )
}

export default SettingsScreen
