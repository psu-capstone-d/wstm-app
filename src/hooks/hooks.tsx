import {useColorScheme} from 'react-native'
import {demoActivities, demoCourse} from '../fixtures/fixtures'
import {useAppSelector} from '../store'
import {ForwardedRef, useEffect, useMemo, useRef} from 'react'
import {Activity, Module, TextActivity} from '../types'

export const useIsDarkMode = () => useColorScheme() === 'dark'
export const useCurrentCourse = () => demoCourse
const invalidActivity: TextActivity = {
  id: -1,
  moduleId: -1,
  type: 'text',
  title: 'Invalid Activity',
  text: '',
}
const invalidModule: Module = {id: -1, title: 'Invalid Module', activities: []}
export const useCurrentActivity = () => {
  const {currentActivityId} = useAppSelector(state => state.progress)
  const currentActivity = useMemo(
    () =>
      demoActivities.find(a => a.id == currentActivityId) || invalidActivity,
    [currentActivityId],
  )
  const currentModule = useMemo(
    () =>
      demoCourse.modules.find(m => m.id == currentActivity?.moduleId) ||
      invalidModule,
    [currentActivity],
  )
  return [currentActivity, currentModule] as [Activity, Module]
}
export const useForwardRef = <T,>(
  ref: ForwardedRef<T>,
  initialValue: any = null,
) => {
  const targetRef = useRef<T>(initialValue)

  useEffect(() => {
    if (!ref) {
      return
    }
    if (typeof ref === 'function') {
      ref(targetRef.current)
    } else {
      ref.current = targetRef.current
    }
  }, [ref])

  return targetRef
}
