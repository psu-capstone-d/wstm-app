import {ModuleFixtures} from 'src/fixtures/fixtures'

export const module3: ModuleFixtures = {
  title: 'Password security',
  activities: [
    {
      type: 'question',
      text: 'When choosing a password for your online banking account which of the following should you not do?',
      choice: 'single',
      answers: [
        {
          text: 'Create a password consisting of letters, numbers, and symbols',
          isCorrect: false,
        },
        {
          text: 'Create a password that is at least 10 characters long.',
          isCorrect: false,
        },
        {
          text: "Create a password that includes your pets name, your own name, or an easy sequence like 'abcd' so you can remember it easier",
          isCorrect: false,
        },
        {
          text: "Create a password that includes your pets name, your own name, or an easy sequence like 'abcd' so you can remember is easier.",
          isCorrect: true,
        },
        {
          text: 'Create a oassword using the password generation function on your password manager.',
          isCorrect: false,
        },
      ],
    },
    {
      type: 'question',
      text: 'Which of the following passwords are not considered secure or best practice?',
      choice: 'multi',
      answers: [
        {
          text: 'JohnSmith1983',
          isCorrect: true,
        },
        {
          text: 'Password9876',
          isCorrect: true,
        },
        {
          text: 'Qwertyuiop',
          isCorrect: true,
        },
        {
          text: 'GGHL-aghe-iHMC-KELS-983745!@gjalx',
          isCorrect: false,
        },
      ],
    },
    {
      type: 'question',
      text: 'When visiting bank websites what steps should you take to verify the website is not a phishing site?',
      choice: 'single',
      answers: [
        {
          text: "Make sure a lock icon appears next to the URL, tha bank's name is spelled correctly, and search that you didn't access it via a suspicious link.",
          isCorrect: true,
        },
        {
          text: "I don't go fishing so I don't have anything to worry about!",
          isCorrect: false,
        },
        {
          text: 'Access the banks website only through suspicious links sent to you via text or email from an unknown sender.',
          isCorrect: false,
        },
        {
          text: 'Just type in my information and see if the website works.',
          isCorrect: false,
        },
      ],
    },
    {
      type: 'question',
      text: 'When downloading your banks app on your phone, what steps should you take to stay secure?',
      choice: 'single',
      answers: [
        {
          text: "Download the first app that shows up when you search your bank's name on the App or Play Store.",
          isCorrect: false,
        },
        {
          text: 'Verify that your bank is the publisher of the application and that you were directed to it by your banks website.',
          isCorrect: true,
        },
        {
          text: "Search 'bank' on the App/Play Store and download the first thing you see.Search 'bank' on the App/Play Store and download the first thing you see.",
          isCorrect: false,
        },
        {
          text: 'Download the app from a link you found on your friends Facebook page',
          isCorrect: false,
        },
      ],
    },
    {
      type: 'question',
      text: 'When is the best time to check your online banking website or app?',
      choice: 'single',
      answers: [
        {
          text: 'When you are at Starbucks on the public WiFi network',
          isCorrect: false,
        },
        {
          text: 'On your phone in a crowded bar',
          isCorrect: false,
        },
        {
          text: 'When you are at home on your secure private network',
          isCorrect: true,
        },
        {
          text: 'While you are sharing your screen during a zoom call',
          isCorrect: false,
        },
      ],
    },
    {
      type: 'question',
      text: 'What are the best ways to secure your online banking information?',
      choice: 'multi',
      answers: [
        {
          text: 'Use multifactor authentication for all online banking account and change your password often.',
          isCorrect: true,
        },
        {
          text: 'Sign up for account notifications to be alerted of fraudulent charges.',
          isCorrect: true,
        },
        {
          text: "Keep your account logged in so you don't have to waste time logging in",
          isCorrect: false,
        },
        {
          text: 'Write your account login information in a notebook on your desk for reference',
          isCorrect: false,
        },
        {
          text: 'Check your accounts frequently to check for unrecognized charges',
          isCorrect: true,
        },
      ],
    },
    {
      type: 'question',
      text: 'You receive a text message stating they are your bank and your account has been overdrawn with a link attached to resolve the issue if this was by mistake. What do you do?',
      choice: 'single',
      answers: [
        {
          text: 'Click the link and log in to your account through the provided link.',
          isCorrect: false,
        },
        {
          text: 'Text the number and ask for clarification.',
          isCorrect: false,
        },
        {
          text: 'Ignore it',
          isCorrect: false,
        },
        {
          text: 'Use your verified app to check your account for fraudulent or unauthorized charges and if all is normal call your bank to report the text message you received for phishing',
          isCorrect: true,
        },
      ],
    },
    {
      type: 'question',
      text: 'When using 3rd party banking apps such as Venmo, Cashapp, Earning, etc. what are good practices for providing banking information and using these apps?',
      choice: 'multi',
      answers: [
        {
          text: 'Make sure your bank is connected using a verified banking network such as Plaid or Stripe to add a safe barrier between your information and a 3rd party app.',
          isCorrect: true,
        },
        {
          text: 'Reading the terms and conditions to see if these applications will have withdrawal privileges and refund protocols',
          isCorrect: true,
        },
        {
          text: 'Only using recognized and verified applications approved by your bank.',
          isCorrect: true,
        },
        {
          text: 'If it is on the App/Play Store it must be safe for me to give them my banking information.',
          isCorrect: false,
        },
        {
          text: "These applications must be backed by the FDIC so I'm protected by up to $250,000",
          isCorrect: false,
        },
      ],
    },
    {
      type: 'question',
      text: 'When is it safe to share your social security number on the internet?',
      choice: 'single',
      answers: [
        {
          text: 'When using a verified website that shows a lock icon by the URL on a private network when applying for credit, filing taxes, or accessing your bank account',
          isCorrect: true,
        },
        {
          text: 'Never, providing your social security number is dangerous on the internet',
          isCorrect: false,
        },
        {
          text: 'When your friend on Twitter asks for it.',
          isCorrect: false,
        },
        {
          text: 'Providing it via email to someone claiming to work for the IRS.',
          isCorrect: false,
        },
      ],
    },
    {
      type: 'question',
      text: 'When using a government or school website what are things you should look for to verify the website is legitimate?',
      choice: 'multi',
      answers: [
        {
          text: 'Look for the .gov or .edu at the end of your URL.',
          isCorrect: false,
        },
        {
          text: 'Make sure the connection is secure by seeing a lock icon next to the URL.',
          isCorrect: false,
        },
        {
          text: 'It was the first result on Google search',
          isCorrect: false,
        },
        {
          text: 'There are no spelling errors in the URL',
          isCorrect: false,
        },
      ],
    },
  ],
}
