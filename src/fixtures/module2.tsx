import {ModuleFixtures} from 'src/types'

export const module2: ModuleFixtures = {
  title: 'Phishing',
  activities: [
    {
      type: 'text',
      title: 'What is Phishing',
      text: "Phishing is a a form of social engineering that heavily relies on human interaction to get users to divulge sensitive information. In laymans terms, it's and attack designed to trick a person into divulging sensitive information.",
    },
    {
      type: 'text',
      title: 'A Phishing example',
      text: 'Phishing example: You receive an email from someone claiming to be your bank. It looks legit with a header with your banks logo and professional language. It tells you that your bank account has been compromised and you must act quickly by following the link provided to reset your password. This attack is designed to get you divulge your login information.',
    },
    {
      type: 'question',
      text: 'Phishing is',
      choice: 'single',
      answers: [
        {
          text: 'A form of social engineering that heavily relies on human interaction to get users to divulge sensitive information.',
          isCorrect: true,
        },
        {text: 'A great activity to enjoy the outdoors', isCorrect: false},
        {
          text: 'A type of virus that can take control of your computer.',
          isCorrect: false,
        },
        {text: 'A and C', isCorrect: false},
      ],
    },
    {
      type: 'text',
      title: 'Types of phishing',
      text:
        'Phishing is most commonly associated with email, but it can come in many different forms. Here are some of the different subtypes of phishing attacks.\n' +
        'Spear Phishing - Directly targeting a specific user or subset of users. Examples could be a system administrator or anyone with some type of elevated privileges within a company. Can also be targeted at individual users at home, but is far less common.\n' +
        'Whaling - Targeted attack like spear phishing, targeted at CEO’s and other high level executives.\n' +
        'Smishing - Phishing through SMS/Text messaging\n' +
        'Vishing - Phishing through voice calls\n' +
        'Search Engine Optimization Poisoning - Boosting results within search engines to redirect users to malicious web sites',
    },
    {
      type: 'question',
      text: 'Select all of the subcategories of phishing',
      choice: 'multi',
      answers: [
        {text: 'Smishing - Phishing through text messaging', isCorrect: true},
        {text: 'Vishing - Phishing through voice calls', isCorrect: true},
        {
          text: 'Fly Phishing - Phishing through snail mail',
          isCorrect: false,
        },
        {
          text: 'Spear Phishing - Targeted phishing to users with high level clearance/access like system administrators and developers',
          isCorrect: true,
        },
        {
          text: 'Deep Sea Phishing - Targeted attack like spear phishing, but focusing on corporate accounts like CEOs and other executives',
          isCorrect: false,
        },
      ],
    },
    {
      type: 'question',
      text: 'Google results are always safe as Google will monitor and eliminate malicious links',
      choice: 'single',
      answers: [
        {text: 'True', isCorrect: false},
        {text: 'False', isCorrect: false},
      ],
    },
    {
      type: 'question',
      text: 'You receive an email that is from Amazon asking you to reset your password due to a recent security breach. What action do you take?',
      choice: 'single',
      answers: [
        {
          text: 'Click the link in your email and update your password',
          isCorrect: false,
        },
        {
          text: 'Do absolutely nothing. Don’t open the email, it’s probably malicious and you don’t want to get a virus.',
          isCorrect: false,
        },
        {
          text: 'Call your technically minded nephew and see what they say.',
          isCorrect: false,
        },
        {
          text: 'Go directly to Amazon.com by typing the URL in your browser and update your password directly on the website.',
          isCorrect: true,
        },
      ],
    },
    {
      type: 'question',
      text: 'Identify all of the common indicators of phishing',
      choice: 'multi',
      answers: [
        {
          text: 'An urgent call to action',
          isCorrect: true,
        },
        {
          text: 'An email from an unexpected sender',
          isCorrect: true,
        },
        {
          text: 'Bad Spelling or grammar from a professional account',
          isCorrect: true,
        },
        {
          text: 'An unexpected domain',
          isCorrect: true,
        },
      ],
    },
    {
      type: 'question',
      text: 'I can only be phished through my email',
      choice: 'single',
      answers: [
        {
          text: 'True',
          isCorrect: false,
        },
        {
          text: 'False',
          isCorrect: true,
        },
      ],
    },
    {
      type: 'question',
      text: "I have already clicked on a link that I shouldn't have and updated my password for my bank. After realizing the mistake, what action should you take?",
      choice: 'single',
      answers: [
        {
          text: "Commit to not doing it again. One slip up can't lead to a compromise in your security",
          isCorrect: false,
        },
        {
          text: 'Call the bank, inform their team of fraudulent activity, take whatever action they tell you to, and update all websites that use the same password',
          isCorrect: true,
        },
        {
          text: 'Call and close your bank account. If your account is closed nothing bad can happen to you.',
          isCorrect: false,
        },
        {
          text: 'Go to the banks website, attempt to update your password, if you can no further action is required',
          isCorrect: false,
        },
      ],
    },
    {
      type: 'question',
      text: 'The best passwords are',
      choice: 'single',
      answers: [
        {
          text: "The ones that you have on a sticky note under your keyboard. Since they're not stored digitally, they're safe",
          isCorrect: false,
        },
        {
          text: "One complex password that's not able to be brute forced. By only using one password you're able to remember it without writing it down.",
          isCorrect: false,
        },
        {
          text: 'A concatenation of of personal info. ex: your cats birthday and your mothers maiden name.',
          isCorrect: false,
        },
        {
          text: 'Unique passwords for every login  that you remember either through using a reputable password manager or by utilizing passphrases.',
          isCorrect: true,
        },
      ],
    },
  ],
}
