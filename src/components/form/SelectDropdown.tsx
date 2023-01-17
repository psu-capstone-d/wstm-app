import React, {useMemo, useState} from 'react'
import DropDownPicker from 'react-native-dropdown-picker'
import {StyleSheet} from 'react-native'
import {Colors} from 'react-native/Libraries/NewAppScreen'
import {useIsDarkMode} from 'src/hooks'

const makeStyles = (isDarkMode: boolean) =>
  StyleSheet.create({
    container: {
      backgroundColor: isDarkMode ? Colors.black : Colors.white,
    },
  })

const SelectDropdown: React.FC<{
  value: string
  items: {label: string; value: string}[]
  onChange: (value: string) => void
}> = ({value, items, onChange}) => {
  const isDarkMode = useIsDarkMode()
  const styles = useMemo(() => makeStyles(isDarkMode), [isDarkMode])
  const [open, setOpen] = useState(false)
  return (
    <DropDownPicker
      dropDownContainerStyle={styles.container}
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={() => undefined}
      onSelectItem={({value}) => {
        onChange(value as unknown as string)
      }}
    />
  )
}

export default SelectDropdown
