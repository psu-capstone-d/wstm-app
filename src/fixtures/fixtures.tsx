import {
  Activity,
  CheckedAnswers,
  Course,
  Module,
  ModuleFixtures,
  QuestionActivity,
} from 'src/types'
import {module1} from 'src/fixtures/module1'
import {module2} from 'src/fixtures/module2'
import {module3} from 'src/fixtures/module3'
import {module4} from 'src/fixtures/module4'

const modules: ModuleFixtures[] = [module1, module2, module3, module4]

const idGenerator = () => {
  let currentId = 0
  return [
    () => {
      currentId += 1
      return currentId
    },
    () => currentId,
  ]
}
const [moduleIdGenerator, lastModuleId] = idGenerator()
const [activityIdGenerator] = idGenerator()

const titleGenerator = (moduleNum: number) => {
  const questionNum = Array(moduleNum).fill(0)
  return [
    (i: number) => {
      questionNum[i] += 1
      return `Question ${questionNum[i]}`
    },
  ]
}
const [questionTitleGenerator] = titleGenerator(modules.length)

export const course: Course = {
  name: 'Web Security Training Modules',
  modules: modules.map<Module>(({title, activities}, i) => ({
    id: moduleIdGenerator(),
    title: title,
    activities: (activities as Activity[]).map(activity => {
      const a: Activity = {
        ...activity,
        id: activityIdGenerator(),
        moduleId: lastModuleId(),
      }
      if (activity.type == 'question') {
        a.title = questionTitleGenerator(i)
      }
      return a
    }),
  })) as Module[],
}
export const courseActivities = course.modules.reduce(
  (p, c) => [...p, ...c.activities],
  [] as Activity[],
)
export const courseQuestions = courseActivities.filter(
  q => q.type == 'question',
)

export const courseModuleQuestions = course.modules
  .map(c => ({
    title: c.title,
    questions: c.activities.filter(
      a => a.type == 'question',
    ) as QuestionActivity[],
  }))
  .filter(m => m.questions.length > 0)

export const courseActivityById = courseActivities.reduce(
  (p, c) => ({
    ...p,
    [c.id]: c,
  }),
  {},
) as {[id: number]: QuestionActivity}

export const courseFirstActivityId = courseActivities[0].id
export const courseLastActivityId =
  courseActivities[courseActivities.length - 1].id

export const courseQuestionAnswers = courseActivities
  .filter(a => a.type == 'question')
  .reduce(
    (p, c) => ({
      ...p,
      [c.id]: (c as QuestionActivity).answers.map(a => a.isCorrect),
    }),
    {},
  ) as {[id: number]: CheckedAnswers}
