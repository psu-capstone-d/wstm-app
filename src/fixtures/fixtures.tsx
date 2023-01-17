import {Activity, Course} from 'src/types'

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
      'Danish',
      'Danish dessert danish halvah marzipan pie lemon drops lollipop muffin. Fruitcake ice cream pudding shortbread halvah lollipop caramels gummies bonbon. Carrot cake icing icing topping fruitcake pie cake danish. Sweet roll brownie jelly tootsie roll pastry. Biscuit muffin macaroon jelly topping sesame snaps icing tiramisu marzipan. Brownie cupcake sugar plum cookie icing liquorice candy canes cotton candy sweet roll. Danish gingerbread gummies gummi bears carrot cake cheesecake lollipop. Jujubes fruitcake croissant gummi bears cake sweet gingerbread cake wafer. Fruitcake tootsie roll fruitcake cake topping. Jelly-o candy candy ice cream sweet bonbon wafer chocolate carrot cake. Halvah cookie shortbread tiramisu macaroon shortbread sesame snaps marzipan. Icing chocolate bar lemon drops lollipop brownie candy. Dragée cookie icing lemon drops marshmallow macaroon. Sweet brownie chocolate cake caramels sweet roll cake cookie cake powder. Carrot cake jelly-o cheesecake chocolate bonbon jelly beans. Lollipop dessert gummi bears macaroon toffee. Biscuit sugar plum chocolate gummi bears chocolate cake gingerbread chocolate bar. Apple pie halvah soufflé carrot cake croissant candy canes. Chocolate cake macaroon fruitcake gummi bears bonbon cake danish sweet jelly-o. Biscuit sweet roll wafer tart cookie fruitcake danish. Cake tootsie roll jujubes bonbon ice cream liquorice caramels gingerbread. Topping gummies cake oat cake chocolate bar tiramisu cake.',
    ],
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
