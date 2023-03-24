import {useColorScheme} from 'react-native'
import {courseActivities, course} from 'src/fixtures'
import {useAppSelector} from 'src/store'
import {ForwardedRef, useEffect, useMemo, useRef} from 'react'
import {Module, TextActivity} from 'src/types'

export const useIsDarkMode = () => useColorScheme() === 'dark'

// temporarily use fixtures for course and activities
export const useCourse = () => course
export const useActivities = () => courseActivities

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
  const course = useCourse()
  const activities = useActivities()
  const [activity, idx] = useMemo(() => {
    const idx = activities.findIndex(a => a.id == currentActivityId)
    const activity = idx < 0 ? invalidActivity : activities[idx]
    return [activity, idx]
  }, [activities, currentActivityId])
  const module = useMemo(
    () => course.modules.find(m => m.id == activity?.moduleId) || invalidModule,
    [course, activity],
  )
  const [prev, next] = useMemo(() => {
    if (idx < 0) {
      return [null, null]
    }
    const prev = idx > 0 ? activities[idx - 1] : null
    const nextId = idx + 1
    const next = nextId < activities.length ? activities[nextId] : null
    return [prev, next]
  }, [activities, idx])
  return {
    activity,
    idx,
    module,
    prev,
    next,
  }
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
