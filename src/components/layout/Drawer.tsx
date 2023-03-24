import React, {forwardRef, Fragment, PropsWithChildren, useMemo} from 'react'
import {ScrollView, StyleSheet, View} from 'react-native'

import DrawerLayout from 'react-native-gesture-handler/DrawerLayout'
import {
  PaletteColor,
  Pressable,
  Spacer,
  Text,
  usePaletteColor,
} from '@react-native-material/core'
import {actions, useAppDispatch, useAppSelector} from 'src/store'
import {useCurrentActivity, useForwardRef, useIsDarkMode} from 'src/hooks'
import {Colors} from 'react-native/Libraries/NewAppScreen'
import {course} from 'src/fixtures'

const makeStyles = (isDarkMode: boolean, primaryColor: PaletteColor) =>
  StyleSheet.create({
    drawerContainer: {
      flex: 1,
      paddingTop: 10,
      backgroundColor: primaryColor.main,
    },
    drawerText: {
      color: primaryColor.on,
    },
    courseTitle: {
      alignItems: 'center',
      marginBottom: 20,
    },
    moduleContainer: {
      backgroundColor: primaryColor.main,
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 20,
    },
    activityContainer: {
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 42,
    },
    selectedActivity: {
      backgroundColor: isDarkMode ? Colors.black : Colors.white,
    },
    selectedActivityText: {
      color: isDarkMode ? Colors.white : Colors.black,
    },
    disabledActivityText: {
      color: 'gray',
    },
  })

const Drawer: React.ForwardRefRenderFunction<
  DrawerLayout,
  PropsWithChildren
> = ({children}, ref) => {
  const drawerRef = useForwardRef<DrawerLayout>(ref)
  const dispatch = useAppDispatch()
  const primaryColor = usePaletteColor('primary')
  const isDarkMode = useIsDarkMode()

  const highestActivityId = useAppSelector(
    state => state.progress.highestActivityId,
  )
  const currentActivity = useCurrentActivity()
  const styles = useMemo(
    () => makeStyles(isDarkMode, primaryColor),
    [isDarkMode, primaryColor],
  )
  const setActivity = (activityId: number) => {
    dispatch(actions.setCurrentActivityId(activityId))
    drawerRef.current?.closeDrawer()
  }

  const renderDrawer = () => {
    return (
      <ScrollView style={styles.drawerContainer}>
        <View style={styles.courseTitle}>
          <Text variant="h4" style={styles.drawerText}>
            {course.name}
          </Text>
        </View>
        {course.modules.map(module => (
          <Fragment key={module.id}>
            <View style={styles.moduleContainer}>
              <Text variant="h6" style={styles.drawerText}>
                {module.title}
              </Text>
            </View>
            <View>
              {module.activities.map(activity => (
                <Pressable
                  key={activity.id}
                  disabled={highestActivityId < activity.id}
                  style={[
                    styles.activityContainer,
                    activity.id == currentActivity.activity.id &&
                      styles.selectedActivity,
                  ]}
                  onPress={() =>
                    highestActivityId >= activity.id && setActivity(activity.id)
                  }>
                  <Text
                    style={[
                      styles.drawerText,
                      activity.id == currentActivity.activity.id &&
                        styles.selectedActivityText,
                      highestActivityId < activity.id &&
                        styles.disabledActivityText,
                    ]}>
                    {activity.title}
                  </Text>
                </Pressable>
              ))}
            </View>
          </Fragment>
        ))}
        <Spacer />
      </ScrollView>
    )
  }

  return (
    <DrawerLayout
      ref={drawerRef}
      drawerWidth={300}
      keyboardDismissMode="on-drag"
      onDrawerStateChanged={(drawerState, drawerWillShow) =>
        dispatch(actions.setDrawerState({drawerState, drawerWillShow}))
      }
      onDrawerOpen={() => dispatch(actions.setDrawerIsOpen(true))}
      onDrawerClose={() => dispatch(actions.setDrawerIsOpen(false))}
      drawerPosition="right"
      drawerType="slide"
      drawerBackgroundColor="#fff"
      overlayColor="#00000000"
      renderNavigationView={renderDrawer}>
      {children}
    </DrawerLayout>
  )
}

export default forwardRef(Drawer)
