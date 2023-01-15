import React, {forwardRef, PropsWithChildren, useMemo} from 'react'
import {StyleSheet, View} from 'react-native'

import DrawerLayout from 'react-native-gesture-handler/DrawerLayout'
import {
  PaletteColor,
  Pressable,
  Spacer,
  Text,
  usePaletteColor,
} from '@react-native-material/core'
import {actions, useAppDispatch} from '../../store'
import {Activity, Course} from '../../types'
import {useCurrentActivity, useCurrentCourse, useForwardRef} from '../../hooks'

const makeStyles = (primaryColor: PaletteColor, secondaryColor: PaletteColor) =>
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
    moduleItem: {
      backgroundColor: primaryColor.main,
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 10,
    },
    activityItem: {
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 20,
    },
    selectedActivity: {
      backgroundColor: secondaryColor.main,
    },
    selectedActivityText: {
      color: secondaryColor.on,
    },
  })

const renderDrawer =
  (
    styles: ReturnType<typeof makeStyles>,
    course: Course,
    setActivity: (activityId: number) => void,
    currentActivity: Activity,
  ) =>
  () => {
    return (
      <View style={styles.drawerContainer}>
        <View style={styles.courseTitle}>
          <Text variant="h4" style={styles.drawerText}>
            {course.name}
          </Text>
        </View>
        {course.modules.map(module => (
          <View key={module.id} style={styles.moduleItem}>
            <Text variant="h6" style={styles.drawerText}>
              {module.title}
            </Text>
            <View>
              {module.activities.map(activity => (
                <Pressable
                  key={activity.id}
                  style={[
                    styles.activityItem,
                    activity.id == currentActivity.id &&
                      styles.selectedActivity,
                  ]}
                  onPress={() => setActivity(activity.id)}>
                  <Text
                    style={[
                      styles.drawerText,
                      activity.id == currentActivity.id &&
                        styles.selectedActivityText,
                    ]}>
                    {activity.title}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        ))}
        <Spacer />
      </View>
    )
  }
const Drawer: React.ForwardRefRenderFunction<
  DrawerLayout,
  PropsWithChildren
> = ({children}, ref) => {
  const drawerRef = useForwardRef<DrawerLayout>(ref)
  const dispatch = useAppDispatch()

  const primaryColor = usePaletteColor('primary')

  const secondaryColor = usePaletteColor('secondary')
  const course = useCurrentCourse()
  const [currentActivity] = useCurrentActivity()
  const styles = useMemo(
    () => makeStyles(primaryColor, secondaryColor),
    [primaryColor, secondaryColor],
  )
  const setActivity = (activityId: number) => {
    dispatch(actions.setCurrentActivityId(activityId))
    drawerRef.current?.closeDrawer()
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
      drawerPosition="left"
      drawerType="slide"
      drawerBackgroundColor="#fff"
      overlayColor="#00000000"
      renderNavigationView={renderDrawer(
        styles,
        course,
        setActivity,
        currentActivity,
      )}>
      {children}
    </DrawerLayout>
  )
}

export default forwardRef(Drawer)
