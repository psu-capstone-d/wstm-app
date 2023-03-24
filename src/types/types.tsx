export type ColorTheme = 'dark' | 'light' | 'system'

export type Screen = 'course' | 'settings' | 'developer' | 'results'

export type ActivityType = 'text' | 'question'

export type CheckedAnswers = boolean[]

export type BaseActivity = {
  type: ActivityType
  id: number
  moduleId: number
  title: string
}

export type TextActivity = BaseActivity & {
  type: 'text'
  text: string
}

export type Answer = {
  text: string
  isCorrect: boolean
  explanation?: string
}
export type ChoiceType = 'single' | 'multi'
export type QuestionActivity = BaseActivity & {
  type: 'question'
  text: string
  answers: Answer[]
  choice: ChoiceType
}

export type Activity = TextActivity | QuestionActivity

export type Module = {
  id: number
  title: string
  activities: Activity[]
}

export type Course = {
  name: string
  modules: Module[]
}

export type ModuleFixtures = {
  title: string
  activities: Partial<Activity>[]
}
