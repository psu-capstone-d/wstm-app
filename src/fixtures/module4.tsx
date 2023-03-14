import {ModuleFixtures} from 'src/types'

export const module4: ModuleFixtures = {
  title: 'Miscellaneous Threats',
  activities: [
    {
      type: 'text',
      title: 'Social Media Introduction',
      text: "When using social media apps, a user must be aware of some " +
        "potential privacy risks. For our purposes here, \"social media\" " +
        "refers to any app or website where users are able to post to a " +
        "public or semi-public forum. Facebook and Twitter are examples of " +
        "well known social media apps, but remember that any website where " +
        "users post information publicly poses similar risks.",
    },
    {
      type: 'text',
      title: 'Social Media Privacy',
      text: "Users of social media apps should be mindful of how much personal " +
        "information they share on social media. Although visibility of posts may " +
        "be limited to a users \"friends\" or \"followers\", word travels fast " +
        "on the internet, so its best to assume that anything posted to social media " +
        "will be visible publicly. Also, make sure you know what personal information " +
        "is being shared when you post. Social media apps may share information such " +
        "as your location along with your post. You may have to look in the privacy " +
        "section of the app's settings as well to adjust what is shared."
    },
    {
      type: 'text',
      title: 'Catfishing',
      text: "Catfishing is a major problem on social media, and on dating apps in" +
        "particular. \"Catfishing\" describes an online romance scam where someone " +
        "pretends to be someone they're not to lure victims into a relationship."
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
      type: 'text',
      title: 'Dating App Safety',
      text: "Make sure to take care when using dating apps, as the information shared" +
        "on them is often very personal and private. Sometimes, information that you share" +
        "on a dating app or other social media shares more information than you think it does." +
        "For example, if you use the same photo on your dating app that you use on Facebook," +
        "a user on the dating app can trace you back to your Facebook profile, and learn much" +
        "more private information about you."
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
      type: 'text',
      title: 'Using Cloud Storage Safely',
      text: "Cloud Storage is an app or website like Google Drive, Dropbox, or iCloud" +
        "that allows you to store files online, instead of on your local computer." +
        "Remember that anyone who has access to your username and password to one of " +
        "these accounts can access your private files on them. Many of these services" +
        "also have Family Sharing options. Make sure that you're only using this feature" +
        "to share to the people you intend to."
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
      type: 'text',
      title: 'Apple AirTag Stalking',
      text: "Unfortunately, Apple AirTags have been becoming a popular way for abusers to " +
        "stalk and track people without their consent. These devices can be easily slipped" +
        "into a purse, backpack, or car, and will give away your location to the owner."
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
      type: 'text',
      title: 'Unknown Websites',
      text: "In general, be careful whenever you encounter a new app or website. If you" +
        "receive an email with a link to a website you haven't heard of, consider Googling" +
        "it or asking a trusted friend to double check that it is safe. Most importantly," +
        "don't input any personal information on a website until you are sure that it's safe."
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
