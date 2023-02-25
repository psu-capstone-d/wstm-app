import {Activity, Course, Module} from 'src/types'

type ModuleFixtures = {
    title: string
    activities: Partial<Activity>[]
}
const modules: ModuleFixtures[] = [
    {
        title: "Phishing",
        activities: [
            {
                type: 'question',
                text: 'Phishing is',
                choice: 'single',
                answers: [
                    {
                        text: "A form of social engineering that heavily relies on human interaction to get users to divulge sensitive information.",
                        isCorrect: true
                    },
                    {text: "A Ben and Jerry's Ice cream flavor.", isCorrect: false},
                    {text: "A type of virus that can take control of your computer.", isCorrect: false},
                    {text: "A and C", isCorrect: false},
                ],
            },
            {
                type: 'question',
                text: "Select all of the subcategories of phishing",
                choice: 'multi',
                answers: [
                    {text: "Smishing - Phishing through text messaging", isCorrect: true},
                    {text: "Vishing - Phishing through voice calls", isCorrect: true},
                    {text: "Fly Phishing - Phishing through snail mail", isCorrect: false},
                    {
                        text: "Spear Phishing - Targeted phishing to users with high level clearance/access like system administrators and developers",
                        isCorrect: true
                    },
                    {
                        text: "Deep Sea Phishing - Targeted attack like spear phishing, but focusing on corporate accounts like CEOs and other executives",
                        isCorrect: false
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
                        text: "Click the link in your email, update your password, pat yourself on the back for taking action in protecting your identity",
                        isCorrect: false
                    },
                    {
                        text: "Do absolutely nothing. Don’t open the email, it’s probably malicious and you don’t want to get a virus.",
                        isCorrect: false
                    },
                    {text: "Call your technically minded nephew and see what they say.", isCorrect: false},
                    {
                        text: "Go directly to Amazon.com by typing the URL in your browser and update your password directly on the website.",
                        isCorrect: true
                    },
                ],
            },
            {
                type: "question",
                text: "Identify all of the common indicators of phishing",
                choice: 'multi',
                answers: [
                    {
                        text: "An urgent call to action",
                        isCorrect: true
                    },
                    {
                        text: "An email from an unexpected sender",
                        isCorrect: true
                    },
                    {
                        text: "Bad Spelling or grammar from a professional account",
                        isCorrect: true
                    },
                    {
                        text: "An unexpected domain",
                        isCorrect: true
                    }
                ]
            },
            {
                type: 'question',
                text: 'I can only be phished through my email',
                choice: 'single',
                answers: [
                    {
                        text: "True",
                        isCorrect: false
                    },
                    {
                        text: "False",
                        isCorrect: true
                    }
                ]
            },
            {
                type: 'question',
                text: 'I have already clicked on a link that I shouldn\'t have and updated my password for my bank. After realizing the mistake, what action should you take?',
                choice: 'single',
                answers: [
                    {
                        text: "Cry",
                        isCorrect: false
                    },
                    {
                        text: "Call the bank, inform their team of fraudulent activity, take whatever action they tell you to, and update all websites that use the same password",
                        isCorrect: true
                    },
                    {
                        text: "Call and close your bank account without informing them why, or make up a reason. If your account is closed nothing bad can happen to you.",
                        isCorrect: false
                    },
                    {
                        text: "Go to the banks website, attempt to update your password, if you can no further action is required",
                        isCorrect: false
                    }
                ]
            },
            {
                type: 'question',
                text: 'The best passwords are',
                choice: 'single',
                answers: [
                    {
                        text: "The ones that you have on a sticky note under your keyboard. Since they're not stored digitally, they're safe",
                        isCorrect: false
                    },
                    {
                        text: "One complex password that's not able to be brute forced. By only using one password you're able to remember it without writing it down.",
                        isCorrect: false
                    },
                    {
                        text: "A concatenation of your cats birthday and your mothers maiden name.",
                        isCorrect: false
                    },
                    {
                        text: "Unique passwords for every login  that you remember either through using a reputable password manager or by utilizing passphrases.",
                        isCorrect: true
                    }
                ]
            }
        ]
    },
    {
        title: "Password security",
        activities: [
            {
                type: 'question',
                text: 'When choosing a password for your online banking account which of the following should you not do?',
                choice: 'single',
                answers: [
                    {
                        text: "Create a password consisting of letters, numbers, and symbols",
                        isCorrect: false
                    },
                    {
                        text: 'Create a password that is at least 10 characters long.',
                        isCorrect: false
                    },
                    {
                        text: "Create a password that includes your pets name, your own name, or an easy sequence like 'abcd' so you can remember it easier",
                        isCorrect: false
                    },
                    {
                        text: "Create a password that includes your pets name, your own name, or an easy sequence like 'abcd' so you can remember is easier.",
                        isCorrect: true
                    },
                    {
                        text: "Create a oassword using the password generation function on your password manager.",
                        isCorrect: false
                    }
                ]
            },
            {
                type: 'question',
                text: 'Which of the following passwords are not considered secure or best practice?',
                choice: 'multi',
                answers: [
                    {
                        text: "JohnSmith1983",
                        isCorrect: true
                    },
                    {
                        text: "Password9876",
                        isCorrect: true
                    },
                    {
                        text: "Qwertyuiop",
                        isCorrect: true
                    },
                    {
                        text: "GGHL-aghe-iHMC-KELS-983745!@gjalx",
                        isCorrect: false
                    }
                ]
            },
            {
                type: 'question',
                text: 'When visiting bank websites what steps should you take to verify the website is not a phishing site?',
                choice: 'single',
                answers: [
                    {
                        text: 'Make sure a lock icon appears next to the URL, tha bank\'s name is spelled correctly, and search that you didn\'t access it via a suspicious link.',
                        isCorrect: true
                    },
                    {
                        text: 'I don\'t go fishing so I don\'t have anything to worry about!',
                        isCorrect: false
                    },
                    {
                        text: 'Access the banks website only through suspicious links sent to you via text or email from an unknown sender.',
                        isCorrect: false
                    },
                    {
                        text: 'Just type in my information and see if the website works.',
                        isCorrect: false
                    }
                ]
            },
            {
                type: 'question',
                text: 'When downloading your banks app on your phone, what steps should you take to stay secure?',
                choice: 'single',
                answers: [
                    {
                        text: 'Download the first app that shows up when you search your bank\'s name on the App or Play Store.',
                        isCorrect: false
                    },
                    {
                        text: 'Verify that your bank is the publisher of the application and that you were directed to it by your banks website.',
                        isCorrect: true
                    }, {
                        text: 'Search \'bank\' on the App/Play Store and download the first thing you see.Search \'bank\' on the App/Play Store and download the first thing you see.',
                        isCorrect: false
                    }, {
                        text: 'Download the app from a link you found on your friends Facebook page',
                        isCorrect: false
                    },
                ]
            },
            {
                type: 'question',
                text: 'When is the best time to check your online banking website or app?',
                choice: 'single',
                answers: [
                    {
                        text: 'When you are at Starbucks on the public WiFi network',
                        isCorrect: false
                    },
                    {
                        text: 'On your phone in a crowded bar',
                        isCorrect: false
                    },
                    {
                        text: 'When you are at home on your secure private network',
                        isCorrect: true
                    },
                    {
                        text: 'While you are sharing your screen during a zoom call',
                        isCorrect: false
                    },
                ]
            },
            {
                type: 'question',
                text: 'What are the best ways to secure your online banking information?',
                choice: 'multi',
                answers: [
                    {
                        text: 'Use multifactor authentication for all online banking account and change your password often.',
                        isCorrect: true
                    }, {
                        text: 'Sign up for account notifications to be alerted of fraudulent charges.',
                        isCorrect: true
                    }, {
                        text: 'Keep your account logged in so you don\'t have to waste time logging in',
                        isCorrect: false
                    }, {
                        text: 'Write your account login information in a notebook on your desk for reference',
                        isCorrect: false
                    },
                    {
                        text: 'Check your accounts frequently to check for unrecognized charges',
                        isCorrect: true
                    }
                ]
            },
            {
                type: 'question',
                text: 'You receive a text message stating they are your bank and your account has been overdrawn with a link attached to resolve the issue if this was by mistake. What do you do?',
                choice: 'single',
                answers: [
                    {
                        text: 'Click the link and log in to your account through the provided link.',
                        isCorrect: false
                    }, {
                        text: 'Text the number and ask for clarification.',
                        isCorrect: false
                    }, {
                        text: 'Ignore it',
                        isCorrect: false
                    }, {
                        text: 'Use your verified app to check your account for fraudulent or unauthorized charges and if all is normal call your bank to report the text message you received for phishing',
                        isCorrect: true
                    },
                ]
            },
            {
                type: 'question',
                text: 'When using 3rd party banking apps such as Venmo, Cashapp, Earning, etc. what are good practices for providing banking information and using these apps?',
                choice: 'multi',
                answers: [
                    {
                        text: 'Make sure your bank is connected using a verified banking network such as Plaid or Stripe to add a safe barrier between your information and a 3rd party app.',
                        isCorrect: true
                    }, {
                        text: 'Reading the terms and conditions to see if these applications will have withdrawal privileges and refund protocols',
                        isCorrect: true
                    }, {
                        text: 'Only using recognized and verified applications approved by your bank.',
                        isCorrect: true
                    }, {
                        text: 'If it is on the App/Play Store it must be safe for me to give them my banking information.',
                        isCorrect: false
                    }, {
                        text: 'These applications must be backed by the FDIC so I\'m protected by up to $250,000',
                        isCorrect: false
                    }
                ]
            },
            {
                type: 'question',
                text: 'When is it safe to share your social security number on the internet?',
                choice: 'single',
                answers: [
                    {
                        text: 'When using a verified website that shows a lock icon by the URL on a private network when applying for credit, filing taxes, or accessing your bank account',
                        isCorrect: true
                    }, {
                        text: 'Never, providing your social security number is dangerous on the internet',
                        isCorrect: false
                    }, {
                        text: 'When your friend on Twitter asks for it.',
                        isCorrect: false
                    }, {
                        text: 'Providing it via email to someone claiming to work for the IRS.',
                        isCorrect: false
                    },
                ]
            },
            {
                type: 'question',
                text: 'When using a government or school website what are things you should look for to verify the website is legitimate?',
                choice: 'multi',
                answers: [
                    {
                        text: 'Look for the .gov or .edu at the end of your URL.',
                        isCorrect: false
                    }, {
                        text: 'Make sure the connection is secure by seeing a lock icon next to the URL.',
                        isCorrect: false
                    }, {
                        text: 'It was the first result on Google search',
                        isCorrect: false
                    }, {
                        text: 'There are no spelling errors in the URL',
                        isCorrect: false
                    },
                ]
            },
        ]
    },
    {
        title: "Social Media",
        activities: [
            {
                type: 'question',
                text: 'What is catfishing',
                choice: 'single',
                answers: [
                    {
                        text: 'An online romance scam where someone pretends to be someone they\'re not to lure victims into a relationship.',
                        isCorrect: true
                    }, {
                        text: 'A way to safely save and download to and from the cloud.',
                        isCorrect: false
                    }, {
                        text: 'A way to hack where scammer puts spy apps on the victim\'s phone.',
                        isCorrect: false
                    }, {
                        text: 'Behavior on social media that makes it easier to abusers or scammers to steal your identity',
                        isCorrect: false
                    },
                ]
            },
            {
                type: 'question',
                text: 'To be safe, a user should assume that anything posted to social media will be visible to:',
                choice: 'single',
                answers: [
                    {
                        text: "A user's friends and family",
                        isCorrect: false
                    }, {
                        text: "A user's followers or friends",
                        isCorrect: false
                    }, {
                        text: 'Everyone on the internet',
                        isCorrect: true
                    }, {
                        text: 'No one, social media posts are private by default',
                        isCorrect: false
                    },
                ]
            },
            {
                type: 'question',
                text: 'Where should a user go to see and change what private information gets shared on a social media app?',
                choice: 'single',
                answers: [
                    {
                        text: 'The Privacy or Security screen of the app',
                        isCorrect: false
                    }, {
                        text: 'The screen where posts are made.',
                        isCorrect: false
                    }, {
                        text: 'Wherever private information is on the screen.',
                        isCorrect: false
                    }, {
                        text: 'All of the above',
                        isCorrect: true
                    },
                ]
            },
            {
                type: 'question',
                text: 'Which of these are social media apps? Check all that apply',
                choice: 'multi',
                answers: [
                    {
                        text: 'Yelp',
                        isCorrect: true
                    }, {
                        text: 'LastPass',
                        isCorrect: false
                    }, {
                        text: 'Venmo',
                        isCorrect: true
                    }, {
                        text: 'Facebook',
                        isCorrect: true
                    },
                ]
            },
            {
                type: 'question',
                text: 'To increase privacy, a photo posted to a dating app or website should be',
                choice: 'single',
                answers: [
                    {
                        text: 'Taken near a public location',
                        isCorrect: false
                    }, {
                        text: 'Dimly lit',
                        isCorrect: false
                    }, {
                        text: 'Taken recently',
                        isCorrect: false
                    }, {
                        text: 'Unique and not used on other social media apps',
                        isCorrect: true
                    },
                ]
            },
            {
                type: 'question',
                text: 'Usually, private location sharing on a social media or dating app is:',
                choice: 'single',
                answers: [
                    {
                        text: 'Off, except when you make a post',
                        isCorrect: false
                    }, {
                        text: "Hidden from other users while you aren't using the app",
                        isCorrect: false
                    }, {
                        text: 'Optional, and can be changed in settings',
                        isCorrect: true
                    }, {
                        text: 'Shown on the home screen of the app or website',
                        isCorrect: false
                    },
                ]
            },
            {
                type: 'question',
                text: 'Which of these are Cloud Storage services? Check all that apply.',
                choice: 'multi',
                answers: [
                    {
                        text: 'Dropbox',
                        isCorrect: true
                    }, {
                        text: 'Google Drive',
                        isCorrect: true
                    }, {
                        text: 'Tinder',
                        isCorrect: false
                    }, {
                        text: 'TikTok',
                        isCorrect: false
                    },
                ]
            },
            {
                type: 'question',
                text: 'Who can see and use files on a users cloud storage account',
                choice: 'single',
                answers: [
                    {
                        text: 'Anyone who has the username and password of the account.',
                        isCorrect: false
                    }, {
                        text: "Anyone who can see and use the account through 'Family Sharing', etc.",
                        isCorrect: false
                    }, {
                        text: "Anyone who has the link to a file marked as 'Anyone with a link can open', etc.",
                        isCorrect: false
                    }, {
                        text: 'All of the above',
                        isCorrect: true
                    },
                ]
            },
            {
                type: 'question',
                text: 'How can Apple AirTags be used by abusers to easily stalk people?',
                choice: 'single',
                answers: [
                    {
                        text: 'AirTags have remote cameras in them.',
                        isCorrect: false
                    }, {
                        text: 'AirTags are easily hidden, and can be used to track a person\'s location via Apple\'s Find My Network.',
                        isCorrect: true
                    }, {
                        text: 'AirTags can be used to hack into iPhones',
                        isCorrect: false
                    }, {
                        text: 'Eating AirTags gives you X-Ray vision!',
                        isCorrect: false
                    },
                ]
            },
            {
                type: 'question',
                text: 'What should you do about unknown websites?',
                choice: 'single',
                answers: [
                    {
                        text: 'Try not to click on links to unknown websites. Ask others you trust to see if unknown websites are safe. Search Google about the website. Don\'t put and personal information on websites that you don\'t really trust',
                        isCorrect: true
                    }, {
                        text: 'Never click on a link unless you\'ve been to the website before.',
                        isCorrect: false
                    }, {
                        text: 'Never click on the link of a website you\'ve been to before.',
                        isCorrect: false
                    }, {
                        text: 'Click on every link in the Promotions folder of your email Inbox!',
                        isCorrect: false
                    },
                ]
            },
        ]
    },
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

const titleGenerator = () => {
    let questionNum = [0,0,0];
    return [(activity: Activity, i: number) => {
        if (activity.type == "question") {
            questionNum[i] += 1;
            return "Question " + questionNum[i].toString();
        }
    }];
};
const [questionActivityTitleGenerator] = titleGenerator();

export const demoCourse: Course = {
    name: 'Demo Course',
    modules: modules.map<Module>(({title,activities}, i) => ({
        id: moduleIdGenerator(),
        title: title,
        activities: (activities as Activity[]).map(activity => ({
            ...activity,
            id: activityIdGenerator(),
            moduleId: lastModuleId(),
            title: questionActivityTitleGenerator(activity, i),
        })),
    })) as Module[],
}
export const demoActivities = demoCourse.modules.reduce(
    (p, c) => [...p, ...c.activities],
    [] as Activity[],
)
