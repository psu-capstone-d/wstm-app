import {ModuleFixtures} from 'src/types'

export const module1: ModuleFixtures = {
  title: 'Module 1',
  activities: [
    {
      type: 'question',
      text: 'When creating a new account which of the below options is considered best practice?',
      choice: 'single',
      answers: [
        {
          text: 'Assume all information provided will be public and cater accordingly, choose a unique password for the website, and act as if your employer will see your account.',
          isCorrect: true,
        },
        {
          text: 'Make a funny inappropriate username and enter fake employment information.',
          isCorrect: false,
        },
        {
          text: 'Enter all your accurate information but use the same password you use for everything else.',
          isCorrect: false,
        },
        {
          text: 'Make an account using all your friend’s information to be more secure.',
          isCorrect: false,
        },
      ],
    },
    {
      type: 'question',
      text: 'When is it okay to share your login information with other people?',
      choice: 'single',
      answers: [
        {text: "As long as it's a close friend it's okay", isCorrect: false},
        {text: 'Only your significant other', isCorrect: false},
        {
          text: 'Never, you should never share login information',
          isCorrect: true,
        },
        {text: 'With someone claiming to be tech support', isCorrect: false},
      ],
    },
    {
      type: 'question',
      text: 'What is the best practice for creating passwords?',
      choice: 'single',
      answers: [
        {
          text: 'Use a password manager or create a password using letters, numbers, and symbols',
          isCorrect: true,
        },
        {text: 'Use the name of your first pet', isCorrect: false},
        {
          text: "Choose 'Password' so I don't have to remember it",
          isCorrect: false,
        },
        {
          text: 'Create a password using personal information only my friends know',
          isCorrect: false,
        },
      ],
    },
    {
      type: 'question',
      text: 'What are some alternative ways to log in to an account instead of using a password?',
      choice: 'single',
      answers: [
        {text: 'Thumbprint ID, Face ID, and Pattern Locks', isCorrect: true},
        {
          text: "Never logout of online accounts so you don't have to log back in",
          isCorrect: false,
        },
        {
          text: 'Store a file with all your passwords in it so you can copy and paste them when needed',
          isCorrect: false,
        },
        {
          text: "There's no other way to log in unless you have an alphanumeric password",
          isCorrect: false,
        },
      ],
    },
    {
      type: 'question',
      text: 'When is the best time to enable two-factor authentication?',
      choice: 'single',
      answers: [
        {text: 'Never, it takes too long', isCorrect: false},
        {text: 'Only for online banking', isCorrect: false},
        {text: 'Whenever possible', isCorrect: true},
        {text: 'What is two factor authentication?', isCorrect: false},
      ],
    },
    {
      type: 'question',
      text: 'What is an example of a good username for John Smith',
      choice: 'single',
      answers: [
        {text: 'JohnSmith1', isCorrect: true},
        {text: 'x_xGGbuddyx_x', isCorrect: false},
        {text: 'username', isCorrect: false},
        {text: 'sjjdkajkjdkfjk', isCorrect: false},
      ],
    },
    {
      type: 'question',
      text: 'What should you do with all social media accounts to stay safe online?',
      choice: 'single',
      answers: [
        {
          text: 'Put all your private information on your profile',
          isCorrect: false,
        },
        {
          text: 'Post pictures of your house and post them on your profile',
          isCorrect: false,
        },
        {
          text: 'Make public posts about where you are and what you are doing',
          isCorrect: false,
        },
        {
          text: 'Set your account to private and only post content that does not give away your personal whereabouts',
          isCorrect: true,
        },
      ],
    },
    {
      type: 'question',
      text: 'When should you share personal information with applications?',
      choice: 'single',
      answers: [
        {
          text: 'When it is a trusted application with good reviews from a reputable App Store',
          isCorrect: false,
        },
        {text: 'Whenever they ask for it', isCorrect: false},
        {
          text: 'When it is a trusted appllication with good reviews from a reputable App Store and I want to share information with them',
          isCorrect: true,
        },
        {
          text: 'When I find a cool app I downloaded from a website',
          isCorrect: false,
        },
      ],
    },
  ],
}
