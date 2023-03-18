import {Activity, Course, Module, ModuleFixtures} from 'src/types'
import {module1} from 'src/fixtures/module1'
import {module2} from 'src/fixtures/module2'
import {module3} from 'src/fixtures/module3'
import {module4} from 'src/fixtures/module4'
import {result} from 'src/fixtures/result'

const modules: ModuleFixtures[] = [module1, module2, module3, module4, result]

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

export const demoCourse: Course = {
  name: 'WSTM Modules',
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
export const demoActivities = demoCourse.modules.reduce(
  (p, c) => [...p, ...c.activities],
  [] as Activity[],
)
