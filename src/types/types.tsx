export type Screen = 'course' | 'settings'
export type ActivityType = 'text'
export type TextActivity = BaseActivity & {
  title: string
  text: string
  type: 'text'
}
export type BaseActivity = {
  id: number
  moduleId: number
  type: ActivityType
}
export type Activity = TextActivity
export type Module = {
  id: number
  title: string
  activities: Activity[]
}
export type Course = {
  name: string
  modules: Module[]
}
