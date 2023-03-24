Fixtures
---
All Fixtures are stored within this directory: `wstm-app/src/fixtures`. 
Fixtures are used within React to store static data within the application itself. They are written in JSON so they can easily be parsed and used in a standardized way within the app. Follow the example below for creating a module fixture, or [read more about Working with JSON in the Mozilla Developer Network Docs](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON).

### Types Associated with Fixtures
#### Located within `wstm-app/src/types/types.jsx` 

* BaseActivity: This is a base type that defines common properties for all activities. It includes the following properties:

	* type: An ActivityType enum value that indicates the type of the activity.
	* id: A unique identifier for the activity.
	* moduleId: The ID of the module that the activity belongs to.
	* title: A string that represents the title of the activity.
* TextActivity: This is a specific type of activity that represents a text-based activity. It extends BaseActivity and adds the following property:
	* text: A string that contains the text content of the activity.
* Answer: This is a type that represents an answer for a question. It includes the following properties:
	* text: A string that contains the text content of the answer.
	* isCorrect: A boolean value that indicates whether the answer is correct or not.
explanation: An optional string that contains an explanation for the answer.
* ChoiceType: This is a type that represents the type of choice for a question. It can be either 'single' or 'multi'.

* QuestionActivity: This is a specific type of activity that represents a question-based activity. It extends BaseActivity and adds the following properties:

	* text: A string that contains the text content of the question.
	* answers: An array of Answer objects that represent the possible answers for the question.
	* choice: A ChoiceType value that indicates the type of choice for the question.
* Activity: This is a union type that can be either TextActivity or QuestionActivity. It represents all possible activity types.

* Module: This is a type that represents a module, which contains a title and an array of Activity objects.

* Course: This is a type that represents a course, which contains a name and an array of Module objects.

* ModuleFixtures: This is a type that represents a set of fixtures for a module. It includes the following properties:

	* title: A string that represents the title of the module.
	* activities: An array of partial Activity objects that represent the activities for the module. The Partial type indicates that these objects may not contain all of the properties of a full Activity object.

### Examples of use
#### Creating a Module Fixture

---

```js
import { ModuleFixtures } from 'src/types';

const exampleModule: ModuleFixtures = {
  title: 'Example module',
  activities: [
    {
      type: 'text',
      id: 1,
      moduleId: 1,
      title: 'Introduction',
      text: 'Welcome to the example module!',
    },
    {
      type: 'question',
      id: 2,
      moduleId: 1,
      title: 'Example question',
      text: 'What is the capital of France?',
      answers: [
        {
          text: 'Madrid',
          isCorrect: false,
          explanation: 'Madrid is the capital of Spain.',
        },
        {
          text: 'Paris',
          isCorrect: true,
          explanation: 'Paris is the capital of France.',
        },
        {
          text: 'Berlin',
          isCorrect: false,
          explanation: 'Berlin is the capital of Germany.',
        },
      ],
      choice: 'single',
    },
  ],
};

```

By convention, it's recommend to write this file as the name of module type, so in this example it would `exampleModule.tsx`

#### Loading the Module into the app
Edit the `fixtures.tsx` file within the same directory like this:

```js
// Import the module that we created above.
import {exampleModule} from 'src/fixtures/exampleModule'
// Then add it to our existing list of modules
const modules: ModuleFixtures[] = [module1, module2, module3, module4, exampleModule]

```

After this, the module should appear within the application!


