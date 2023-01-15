import {Activity, Course} from '../types'

const modules = [
  [
    [
      'Beans',
      'Jelly beans gummi bears fruitcake jelly-o oat cake jujubes bonbon candy. Bear claw marzipan carrot cake chocolate bar gummies gingerbread candy marzipan cake. ',
    ],
    [
      'Marshmallows',
      'Marshmallow marshmallow sweet roll cotton candy sweet roll chupa chups ice cream muffin. Tart brownie dragée chocolate biscuit donut dragée macaroon toffee.',
    ],
  ],
  [
    [
      'Donuts',
      'Donut sugar plum brownie biscuit marzipan brownie. Pastry carrot cake cake wafer gingerbread sesame snaps chocolate marzipan. ',
    ],
  ],
  [
    [
      'Tootsie',
      'Tootsie roll wafer dessert powder bear claw gingerbread danish danish. Chocolate chocolate caramels topping donut candy. ',
    ],
  ],
]

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

export const demoCourse: Course = {
  name: 'Demo Course',
  modules: modules.map((activities, i) => ({
    id: moduleIdGenerator(),
    title: `Module ${i + 1}`,
    activities: activities.map(([title, text]) => ({
      id: activityIdGenerator(),
      moduleId: lastModuleId(),
      type: 'text',
      title,
      text,
    })),
  })),
}
export const demoActivities = demoCourse.modules.reduce(
  (p, c) => [...p, ...c.activities],
  [] as Activity[],
)
