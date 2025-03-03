import { Module, Category, User, LeaderboardUser, TriviaEvent, Badge, Lesson, Quiz, Question, Reward, Notification, FAQ } from '../types';

export const currentUser: User = {
  id: '1',
  name: 'Bilbo',
  avatar: '/lovable-uploads/37933159-2c9d-4a32-8c8b-d731a46b6ccf.png',
  coins: 404,
  xp: 14250,
  streak: 0,
  hearts: 5,
  joinedDate: 'Jan 14, 2025',
  completedModules: 3,
  totalEarned: 404,
  badges: []
};

const savingLessons: Lesson[] = [
  {
    id: 'l1',
    moduleId: '1',
    title: 'Why Saving Matters',
    content: `
      <p>Saving money is one of the most important financial habits you can develop. When you save, you're setting aside money for future needs rather than spending it immediately.</p>
      <h3>Benefits of saving include:</h3>
      <ul>
        <li>Building an emergency fund for unexpected expenses</li>
        <li>Achieving financial goals like buying a car or house</li>
        <li>Reducing financial stress</li>
        <li>Preparing for retirement</li>
      </ul>
      <p>Financial experts recommend saving at least 20% of your income. Even starting with just 5-10% can make a big difference over time.</p>
    `,
    order: 1,
    completed: false,
    quiz: {
      id: 'q1',
      lessonId: 'l1',
      questions: [
        {
          id: 'q1-1',
          text: 'What percentage of your income do financial experts recommend saving?',
          options: [
            { id: 'o1', text: '5%' },
            { id: 'o2', text: '10%' },
            { id: 'o3', text: '20%' },
            { id: 'o4', text: '50%' }
          ],
          correctOptionId: 'o3',
          explanation: 'Financial experts typically recommend saving at least 20% of your income, although starting with any amount is better than nothing.'
        },
        {
          id: 'q1-2',
          text: 'Which of the following is NOT a benefit of saving money?',
          options: [
            { id: 'o1', text: 'Building an emergency fund' },
            { id: 'o2', text: 'Increasing your current spending power' },
            { id: 'o3', text: 'Achieving financial goals' },
            { id: 'o4', text: 'Reducing financial stress' }
          ],
          correctOptionId: 'o2',
          explanation: 'Saving money actually reduces your current spending power in favor of future financial security and goals.'
        },
        {
          id: 'q1-3',
          text: 'What is an emergency fund?',
          options: [
            { id: 'o1', text: 'Money set aside for vacation' },
            { id: 'o2', text: 'Money set aside for unexpected expenses' },
            { id: 'o3', text: 'Money invested in the stock market' },
            { id: 'o4', text: 'Money loaned to friends' }
          ],
          correctOptionId: 'o2',
          explanation: 'An emergency fund is money set aside specifically for unexpected expenses or financial emergencies like medical bills or car repairs.'
        }
      ]
    }
  },
  {
    id: 'l2',
    moduleId: '1',
    title: 'Setting Savings Goals',
    content: `
      <p>Having clear savings goals helps you stay motivated and on track with your financial plans.</p>
      <h3>Effective savings goals are:</h3>
      <ul>
        <li><strong>Specific:</strong> Define exactly what you're saving for</li>
        <li><strong>Measurable:</strong> Set a specific dollar amount</li>
        <li><strong>Achievable:</strong> Be realistic about what you can save</li>
        <li><strong>Relevant:</strong> Make sure it matters to you</li>
        <li><strong>Time-bound:</strong> Set a deadline</li>
      </ul>
      <p>Examples of good savings goals include saving $1,000 for an emergency fund in 6 months, or saving $5,000 for a car down payment in 2 years.</p>
    `,
    order: 2,
    completed: false,
    quiz: {
      id: 'q2',
      lessonId: 'l2',
      questions: [
        {
          id: 'q2-1',
          text: 'What does the "M" in SMART goals stand for?',
          options: [
            { id: 'o1', text: 'Manageable' },
            { id: 'o2', text: 'Measurable' },
            { id: 'o3', text: 'Meaningful' },
            { id: 'o4', text: 'Motivational' }
          ],
          correctOptionId: 'o2',
          explanation: 'The "M" in SMART goals stands for Measurable, meaning you should be able to track your progress with specific numbers or amounts.'
        },
        {
          id: 'q2-2',
          text: 'Which of these is an example of a specific savings goal?',
          options: [
            { id: 'o1', text: 'Save more money' },
            { id: 'o2', text: 'Save for a vacation' },
            { id: 'o3', text: 'Save $2,000 for a vacation to Europe next summer' },
            { id: 'o4', text: 'Start saving soon' }
          ],
          correctOptionId: 'o3',
          explanation: 'A specific savings goal includes details like the exact amount, purpose, and timeframe. "Save $2,000 for a vacation to Europe next summer" is specific and measurable.'
        }
      ]
    }
  },
  {
    id: 'l3',
    moduleId: '1',
    title: 'Creating a Savings Plan',
    content: `
      <p>A savings plan is your roadmap to achieving your financial goals.</p>
      <h3>Steps to create an effective savings plan:</h3>
      <ol>
        <li>Calculate your monthly income after taxes</li>
        <li>Track your expenses for a month</li>
        <li>Identify areas where you can reduce spending</li>
        <li>Set up automatic transfers to your savings account</li>
        <li>Review and adjust your plan regularly</li>
      </ol>
      <p>Remember, consistency is key when it comes to saving. Even small amounts add up over time through the power of compound interest.</p>
    `,
    order: 3,
    completed: false,
    quiz: {
      id: 'q3',
      lessonId: 'l3',
      questions: [
        {
          id: 'q3-1',
          text: 'What is an effective way to ensure consistent savings?',
          options: [
            { id: 'o1', text: 'Only save when you have extra money' },
            { id: 'o2', text: 'Set up automatic transfers to your savings account' },
            { id: 'o3', text: 'Keep all your money in a checking account' },
            { id: 'o4', text: 'Spend first, save what\'s left' }
          ],
          correctOptionId: 'o2',
          explanation: 'Setting up automatic transfers ensures you save consistently without having to remember or make the decision each time you get paid.'
        },
        {
          id: 'q3-2',
          text: 'What is compound interest?',
          options: [
            { id: 'o1', text: 'Interest earned only on your initial deposit' },
            { id: 'o2', text: 'Interest earned on both your initial deposit and previously earned interest' },
            { id: 'o3', text: 'A fee charged by banks' },
            { id: 'o4', text: 'A one-time bonus when opening an account' }
          ],
          correctOptionId: 'o2',
          explanation: 'Compound interest is when you earn interest not just on your initial deposit but also on the interest you\'ve already earned, helping your money grow faster over time.'
        },
        {
          id: 'q3-3',
          text: 'What should you do if you find you can\'t stick to your savings plan?',
          options: [
            { id: 'o1', text: 'Give up on saving entirely' },
            { id: 'o2', text: 'Borrow money to reach your goals faster' },
            { id: 'o3', text: 'Review and adjust your plan to make it more realistic' },
            { id: 'o4', text: 'Keep the same plan but feel guilty about not following it' }
          ],
          correctOptionId: 'o3',
          explanation: 'If you\'re struggling to stick to your savings plan, it may be too ambitious. Review and adjust it to make it more realistic based on your income and expenses.'
        }
      ]
    }
  }
];

const insuranceLessons: Lesson[] = [
  {
    id: 'l4',
    moduleId: '3',
    title: 'Insurance Basics',
    content: `
      <p>Insurance is a way to protect yourself financially from unexpected events. You pay a premium (a regular payment) to an insurance company, and in return, they agree to cover certain costs if something goes wrong.</p>
      <h3>Common types of insurance include:</h3>
      <ul>
        <li><strong>Health insurance:</strong> Covers medical expenses</li>
        <li><strong>Auto insurance:</strong> Covers damages from car accidents</li>
        <li><strong>Home/renters insurance:</strong> Protects your home and belongings</li>
        <li><strong>Life insurance:</strong> Provides for your dependents if you die</li>
      </ul>
      <p>Insurance works by pooling risk across many people. Not everyone will need to make claims, which allows the company to pay out when needed.</p>
    `,
    order: 1,
    completed: false,
    quiz: {
      id: 'q4',
      lessonId: 'l4',
      questions: [
        {
          id: 'q4-1',
          text: 'What is a premium?',
          options: [
            { id: 'o1', text: 'The amount an insurance company pays you' },
            { id: 'o2', text: 'A regular payment you make to the insurance company' },
            { id: 'o3', text: 'A one-time fee when you start an insurance policy' },
            { id: 'o4', text: 'The maximum coverage amount' }
          ],
          correctOptionId: 'o2',
          explanation: 'A premium is the regular payment (monthly, quarterly, or annually) that you make to the insurance company to maintain your coverage.'
        },
        {
          id: 'q4-2',
          text: 'How does insurance work?',
          options: [
            { id: 'o1', text: 'It guarantees you\'ll never face financial loss' },
            { id: 'o2', text: 'It pools risk across many people, using premiums from everyone to pay claims as needed' },
            { id: 'o3', text: 'It\'s a savings account that you can withdraw from at any time' },
            { id: 'o4', text: 'It\'s an investment that always grows in value' }
          ],
          correctOptionId: 'o2',
          explanation: 'Insurance works by pooling risk across a large group of people. The premiums paid by everyone create a fund that the insurance company uses to pay claims as needed.'
        },
        {
          id: 'q4-3',
          text: 'Which of these is NOT a common type of insurance?',
          options: [
            { id: 'o1', text: 'Health insurance' },
            { id: 'o2', text: 'Car insurance' },
            { id: 'o3', text: 'Pet insurance' },
            { id: 'o4', text: 'Happiness insurance' }
          ],
          correctOptionId: 'o4',
          explanation: 'Happiness insurance is not a real insurance product. While you can insure your health, car, and even pets, there\'s no insurance that guarantees happiness!'
        }
      ]
    }
  }
];

export const modules: Module[] = [
  {
    id: '1',
    title: 'Save Money',
    icon: 'dollar-sign',
    category: 'Popular',
    coins: 700,
    progress: 20,
    totalParts: 15,
    currentPart: 3,
    timeEstimate: 5,
    status: 'in-progress',
    lessons: savingLessons
  },
  {
    id: '2',
    title: 'Shop Smartly',
    icon: 'credit-card',
    category: 'Popular',
    coins: 1000,
    progress: 0,
    totalParts: 22,
    currentPart: 0,
    timeEstimate: 5,
    status: 'not-started'
  },
  {
    id: '3',
    title: 'Get Insured',
    icon: 'shield',
    category: 'Popular',
    coins: 900,
    progress: 0,
    totalParts: 18,
    currentPart: 0,
    timeEstimate: 5,
    status: 'not-started',
    lessons: insuranceLessons
  },
  {
    id: '4',
    title: 'Get Health Insurance',
    icon: 'heart',
    category: 'Popular',
    coins: 1000,
    progress: 0,
    totalParts: 20,
    currentPart: 0,
    timeEstimate: 5,
    status: 'not-started'
  },
  {
    id: '5',
    title: 'Apply for Credit',
    icon: 'credit-card',
    category: 'Popular',
    coins: 1000,
    progress: 0,
    totalParts: 22,
    currentPart: 0,
    timeEstimate: 5,
    participants: 165900,
    status: 'not-started'
  },
  {
    id: '6',
    title: 'Start Investing',
    icon: 'trending-up',
    category: 'Popular',
    coins: 900,
    progress: 0,
    totalParts: 18,
    currentPart: 0,
    timeEstimate: 5,
    participants: 84000,
    status: 'not-started'
  },
  {
    id: '7',
    title: 'Pay For College',
    icon: 'graduation-cap',
    category: 'Popular',
    coins: 800,
    progress: 0,
    totalParts: 18,
    currentPart: 0,
    timeEstimate: 5,
    participants: 110800,
    status: 'completed'
  },
  {
    id: '8',
    title: 'Spot Fraud Before It Happens',
    icon: 'search',
    category: 'Popular',
    coins: 900,
    progress: 0,
    totalParts: 16,
    currentPart: 0,
    timeEstimate: 5,
    status: 'not-started'
  },
  {
    id: '9',
    title: 'Choose a Financial Institution',
    icon: 'building',
    category: 'Savings and Spending',
    coins: 600,
    progress: 0,
    totalParts: 11,
    currentPart: 0,
    timeEstimate: 5,
    participants: 167900,
    status: 'not-started'
  },
  {
    id: '10',
    title: 'Live on a Budget',
    icon: 'piggy-bank',
    category: 'Savings and Spending',
    coins: 500,
    progress: 0,
    totalParts: 16,
    currentPart: 0,
    timeEstimate: 5,
    participants: 35800,
    status: 'not-started'
  },
  {
    id: '11',
    title: 'How to Do Your Taxes',
    icon: 'file-text',
    category: 'Tax',
    coins: 90,
    progress: 0,
    totalParts: 1,
    currentPart: 0,
    timeEstimate: 2,
    participants: 2000,
    status: 'not-started'
  },
  {
    id: '12',
    title: 'Marginal Tax Rates',
    icon: 'file-text',
    category: 'Tax',
    coins: 90,
    progress: 0,
    totalParts: 1,
    currentPart: 0,
    timeEstimate: 2,
    participants: 1700,
    status: 'not-started'
  },
  {
    id: '13',
    title: 'Tax-Efficient Investments',
    icon: 'file-text',
    category: 'Tax',
    coins: 100,
    progress: 0,
    totalParts: 1,
    currentPart: 0,
    timeEstimate: 2,
    participants: 1800,
    status: 'not-started'
  }
];

export const categories: Category[] = [
  {
    id: '1',
    title: 'Popular',
    icon: 'trending-up',
    totalSkills: 16,
    totalModules: 233
  },
  {
    id: '2',
    title: 'Financial Basics',
    icon: 'sun',
    totalSkills: 10,
    totalModules: 120
  },
  {
    id: '3',
    title: 'Major Milestones',
    icon: 'flag',
    totalSkills: 8,
    totalModules: 95
  },
  {
    id: '4',
    title: 'Investing',
    icon: 'clock',
    totalSkills: 14,
    totalModules: 185
  },
  {
    id: '5',
    title: 'Career',
    icon: 'briefcase',
    totalSkills: 12,
    totalModules: 145
  },
  {
    id: '6',
    title: 'College',
    icon: 'at-sign',
    totalSkills: 9,
    totalModules: 110
  },
  {
    id: '7',
    title: 'Risk Management',
    icon: 'clock',
    totalSkills: 11,
    totalModules: 130
  },
  {
    id: '8',
    title: 'Entrepreneurship',
    icon: 'zap',
    totalSkills: 13,
    totalModules: 160
  }
];

export const leaderboardUsers: LeaderboardUser[] = [
  {
    id: '1',
    name: 'Dana J',
    avatar: '/lovable-uploads/952baaf1-3300-479d-bc39-0620cd3245c4.png',
    coins: 4600,
    position: 1
  },
  {
    id: '2',
    name: 'Amanda D',
    avatar: '/lovable-uploads/370b4395-13f8-44ab-af20-7d4025c1a871.png',
    coins: 2600,
    position: 2
  },
  {
    id: '3',
    name: 'Madison M',
    avatar: '/lovable-uploads/4ab33fd4-b662-40e2-849e-b8972ae3bb31.png',
    coins: 2600,
    position: 3
  },
  {
    id: '4',
    name: 'Zeroxyyy P',
    avatar: '/lovable-uploads/ea0fa254-09b7-46aa-a906-16282dc66579.png',
    coins: 2600,
    position: 4
  },
  {
    id: '5',
    name: 'Kendra K',
    avatar: '/lovable-uploads/4337a96e-fcbc-405b-b65a-c19f7eb95f9b.png',
    coins: 2600,
    position: 5
  }
];

export const triviaEvents: TriviaEvent[] = [
  {
    id: '1',
    title: 'Trivia Party',
    description: 'Join the daily financial trivia party and win prizes up to',
    date: 'Feb 27, 2025',
    prize: 5000,
    participants: 645,
    icon: '/lovable-uploads/0c7467f7-361d-4300-9676-24e68102a1f0.png'
  }
];

export const rewards: Reward[] = [
  {
    id: 'r1',
    title: 'Basic Premium Subscription',
    description: '1 month of premium content access',
    cost: 500,
    image: '/lovable-uploads/37933159-2c9d-4a32-8c8b-d731a46b6ccf.png',
    type: 'subscription'
  },
  {
    id: 'r2',
    title: 'Pro Premium Subscription',
    description: '3 months of premium content access',
    cost: 1200,
    image: '/lovable-uploads/37933159-2c9d-4a32-8c8b-d731a46b6ccf.png',
    type: 'subscription'
  },
  {
    id: 'r3',
    title: 'Advanced Investment Course',
    description: 'Special course on stock market investing',
    cost: 800,
    image: '/lovable-uploads/37933159-2c9d-4a32-8c8b-d731a46b6ccf.png',
    type: 'premium-content'
  },
  {
    id: 'r4',
    title: 'Exclusive Webinar Access',
    description: 'Join our financial experts for live Q&A sessions',
    cost: 650,
    image: '/lovable-uploads/37933159-2c9d-4a32-8c8b-d731a46b6ccf.png',
    type: 'premium-content'
  }
];

export const notifications: Notification[] = [
  {
    id: 'n1',
    title: 'New Badge Earned!',
    message: 'Congratulations! You earned the "Savings Master" badge.',
    type: 'achievement',
    read: false,
    date: '2023-04-15T10:30:00Z'
  },
  {
    id: 'n2',
    title: 'Streak Bonus',
    message: 'You\'ve maintained a 3-day streak! Earned 50 extra coins.',
    type: 'reward',
    read: true,
    date: '2023-04-14T09:15:00Z'
  },
  {
    id: 'n3',
    title: 'New Module Available',
    message: 'Check out our new "Cryptocurrency Basics" module!',
    type: 'update',
    read: false,
    date: '2023-04-13T14:45:00Z'
  }
];

export const faqs: FAQ[] = [
  {
    id: 'f1',
    question: 'How do I earn coins?',
    answer: 'You can earn coins by completing modules, maintaining daily streaks, and participating in quizzes. Invite friends to earn bonus coins!',
    category: 'Rewards'
  },
  {
    id: 'f2',
    question: 'What can I do with my coins?',
    answer: 'Coins can be exchanged for premium subscriptions, access to exclusive content, and other rewards in the Rewards section.',
    category: 'Rewards'
  },
  {
    id: 'f3',
    question: 'How do I reset my password?',
    answer: 'Go to the Profile page, select Settings, and choose "Reset Password". Follow the instructions sent to your email.',
    category: 'Account'
  },
  {
    id: 'f4',
    question: 'Can I use the app offline?',
    answer: 'Yes, basic features are available offline. Your progress will sync when you reconnect to the internet.',
    category: 'Technical'
  },
  {
    id: 'f5',
    question: 'How do I invite friends?',
    answer: 'Go to your Profile and select "Invite Friends". You can share your referral link via email, social media, or text message.',
    category: 'Referrals'
  }
];
