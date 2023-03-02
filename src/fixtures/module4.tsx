import {ModuleFixtures} from 'src/fixtures/fixtures'

export const module4: ModuleFixtures = {
  title: 'Social Media',
  activities: [
    {
      type: 'question',
      text: 'What is catfishing',
      choice: 'single',
      answers: [
        {
          text: "An online romance scam where someone pretends to be someone they're not to lure victims into a relationship.",
          isCorrect: true,
        },
        {
          text: 'A way to safely save and download to and from the cloud.',
          isCorrect: false,
        },
        {
          text: "A way to hack where scammer puts spy apps on the victim's phone.",
          isCorrect: false,
        },
        {
          text: 'Behavior on social media that makes it easier to abusers or scammers to steal your identity',
          isCorrect: false,
        },
      ],
    },
    {
      type: 'question',
      text: 'To be safe, a user should assume that anything posted to social media will be visible to:',
      choice: 'single',
      answers: [
        {
          text: "A user's friends and family",
          isCorrect: false,
        },
        {
          text: "A user's followers or friends",
          isCorrect: false,
        },
        {
          text: 'Everyone on the internet',
          isCorrect: true,
        },
        {
          text: 'No one, social media posts are private by default',
          isCorrect: false,
        },
      ],
    },
    {
      type: 'question',
      text: 'Where should a user go to see and change what private information gets shared on a social media app?',
      choice: 'single',
      answers: [
        {
          text: 'The Privacy or Security screen of the app',
          isCorrect: false,
        },
        {
          text: 'The screen where posts are made.',
          isCorrect: false,
        },
        {
          text: 'Wherever private information is on the screen.',
          isCorrect: false,
        },
        {
          text: 'All of the above',
          isCorrect: true,
        },
      ],
    },
    {
      type: 'question',
      text: 'Which of these are social media apps? Check all that apply',
      choice: 'multi',
      answers: [
        {
          text: 'Yelp',
          isCorrect: true,
        },
        {
          text: 'LastPass',
          isCorrect: false,
        },
        {
          text: 'Venmo',
          isCorrect: true,
        },
        {
          text: 'Facebook',
          isCorrect: true,
        },
      ],
    },
    {
      type: 'question',
      text: 'To increase privacy, a photo posted to a dating app or website should be',
      choice: 'single',
      answers: [
        {
          text: 'Taken near a public location',
          isCorrect: false,
        },
        {
          text: 'Dimly lit',
          isCorrect: false,
        },
        {
          text: 'Taken recently',
          isCorrect: false,
        },
        {
          text: 'Unique and not used on other social media apps',
          isCorrect: true,
        },
      ],
    },
    {
      type: 'question',
      text: 'Usually, private location sharing on a social media or dating app is:',
      choice: 'single',
      answers: [
        {
          text: 'Off, except when you make a post',
          isCorrect: false,
        },
        {
          text: "Hidden from other users while you aren't using the app",
          isCorrect: false,
        },
        {
          text: 'Optional, and can be changed in settings',
          isCorrect: true,
        },
        {
          text: 'Shown on the home screen of the app or website',
          isCorrect: false,
        },
      ],
    },
    {
      type: 'question',
      text: 'Which of these are Cloud Storage services? Check all that apply.',
      choice: 'multi',
      answers: [
        {
          text: 'Dropbox',
          isCorrect: true,
        },
        {
          text: 'Google Drive',
          isCorrect: true,
        },
        {
          text: 'Tinder',
          isCorrect: false,
        },
        {
          text: 'TikTok',
          isCorrect: false,
        },
      ],
    },
    {
      type: 'question',
      text: 'Who can see and use files on a users cloud storage account',
      choice: 'single',
      answers: [
        {
          text: 'Anyone who has the username and password of the account.',
          isCorrect: false,
        },
        {
          text: "Anyone who can see and use the account through 'Family Sharing', etc.",
          isCorrect: false,
        },
        {
          text: "Anyone who has the link to a file marked as 'Anyone with a link can open', etc.",
          isCorrect: false,
        },
        {
          text: 'All of the above',
          isCorrect: true,
        },
      ],
    },
    {
      type: 'question',
      text: 'How can Apple AirTags be used by abusers to easily stalk people?',
      choice: 'single',
      answers: [
        {
          text: 'AirTags have remote cameras in them.',
          isCorrect: false,
        },
        {
          text: "AirTags are easily hidden, and can be used to track a person's location via Apple's Find My Network.",
          isCorrect: true,
        },
        {
          text: 'AirTags can be used to hack into iPhones',
          isCorrect: false,
        },
        {
          text: 'Eating AirTags gives you X-Ray vision!',
          isCorrect: false,
        },
      ],
    },
    {
      type: 'question',
      text: 'What should you do about unknown websites?',
      choice: 'single',
      answers: [
        {
          text: "Try not to click on links to unknown websites. Ask others you trust to see if unknown websites are safe. Search Google about the website. Don't put and personal information on websites that you don't really trust",
          isCorrect: true,
        },
        {
          text: "Never click on a link unless you've been to the website before.",
          isCorrect: false,
        },
        {
          text: "Never click on the link of a website you've been to before.",
          isCorrect: false,
        },
        {
          text: 'Click on every link in the Promotions folder of your email Inbox!',
          isCorrect: false,
        },
      ],
    },
  ],
}
