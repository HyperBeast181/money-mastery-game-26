
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { BookOpen, CheckCircle, Clock, Lightbulb, FileText } from 'lucide-react';

interface LessonContentProps {
  lessonId: string;
  moduleTitle: string;
}

const LessonContent: React.FC<LessonContentProps> = ({ lessonId, moduleTitle }) => {
  const { language } = useLanguage();
  
  // Симулируем получение контента урока по ID
  // В реальном приложении это будет запрос к базе данных
  const getContentByLessonId = (id: string) => {
    const isEnglish = language === 'en';
    
    // Заготовленный контент для нескольких уроков
    const contents: Record<string, { title: string; content: string; type: 'theory' | 'practical' | 'quiz' }> = {
      'economicsaving-1': {
        title: isEnglish ? 'Importance of Saving Money' : 'Важность сбережения денег',
        content: isEnglish 
          ? `<h2>Why Saving Money Matters</h2>
             <p>Saving money is one of the most important aspects of building wealth and having a secure financial foundation. Here's why saving money is so important:</p>
             <ul>
               <li><strong>Emergency fund:</strong> Having money set aside for emergencies can help you avoid going into debt when unexpected expenses arise.</li>
               <li><strong>Financial independence:</strong> The more money you save, the less you rely on others (or debt) to support yourself.</li>
               <li><strong>Less stress:</strong> Having savings reduces anxiety about finances and unexpected expenses.</li>
               <li><strong>More opportunities:</strong> With savings, you can take advantage of opportunities like education, career changes, or investments.</li>
             </ul>
             <p>Financial experts typically recommend saving at least 20% of your income.</p>`
          : `<h2>Почему важно копить деньги</h2>
             <p>Сбережение денег — один из самых важных аспектов создания богатства и обеспечения прочной финансовой основы. Вот почему сбережение денег так важно:</p>
             <ul>
               <li><strong>Резервный фонд:</strong> Наличие отложенных денег на случай чрезвычайных ситуаций поможет вам избежать долгов при возникновении непредвиденных расходов.</li>
               <li><strong>Финансовая независимость:</strong> Чем больше денег вы откладываете, тем меньше вы зависите от других (или от долгов) для поддержки своего образа жизни.</li>
               <li><strong>Меньше стресса:</strong> Наличие сбережений снижает беспокойство о финансах и непредвиденных расходах.</li>
               <li><strong>Больше возможностей:</strong> Имея сбережения, вы можете воспользоваться такими возможностями, как образование, смена карьеры или инвестиции.</li>
             </ul>
             <p>Финансовые эксперты обычно рекомендуют откладывать не менее 20% своего дохода.</p>`,
        type: 'theory'
      },
      'economicsaving-2': {
        title: isEnglish ? 'Setting Saving Goals' : 'Постановка целей сбережений',
        content: isEnglish 
          ? `<h2>How to Set Effective Saving Goals</h2>
             <p>To make your savings journey successful, it's important to set clear, achievable goals:</p>
             <ol>
               <li><strong>Make your goals specific:</strong> Instead of "save money for a vacation," try "save $2,000 for a trip to Italy by June 2026."</li>
               <li><strong>Make your goals measurable:</strong> Track your progress regularly to stay motivated.</li>
               <li><strong>Make your goals achievable:</strong> Set realistic targets based on your income and expenses.</li>
               <li><strong>Make your goals relevant:</strong> Ensure your saving goals align with your values and long-term plans.</li>
               <li><strong>Make your goals time-bound:</strong> Set deadlines to create urgency and focus.</li>
             </ol>
             <div class="bg-yellow-50 p-4 rounded-lg border border-yellow-200 my-4">
               <h3 class="font-bold text-yellow-800 flex items-center"><span class="mr-2"><Lightbulb size={18} /></span>Pro Tip</h3>
               <p class="text-yellow-800">Create separate savings accounts for different goals to avoid the temptation of spending money earmarked for specific purposes.</p>
             </div>
             <p>Start with short-term goals to build momentum before tackling longer-term objectives.</p>`
          : `<h2>Как установить эффективные цели сбережений</h2>
             <p>Чтобы ваш путь к сбережениям был успешным, важно установить четкие, достижимые цели:</p>
             <ol>
               <li><strong>Сделайте свои цели конкретными:</strong> Вместо "накопить деньги на отпуск", попробуйте "накопить 150 000 рублей на поездку в Италию к июню 2026 года".</li>
               <li><strong>Сделайте свои цели измеримыми:</strong> Регулярно отслеживайте свой прогресс, чтобы оставаться мотивированным.</li>
               <li><strong>Сделайте свои цели достижимыми:</strong> Устанавливайте реалистичные цели, основанные на ваших доходах и расходах.</li>
               <li><strong>Сделайте свои цели значимыми:</strong> Убедитесь, что ваши цели по сбережениям соответствуют вашим ценностям и долгосрочным планам.</li>
               <li><strong>Сделайте свои цели ограниченными по времени:</strong> Установите сроки, чтобы создать срочность и сосредоточенность.</li>
             </ol>
             <div class="bg-yellow-50 p-4 rounded-lg border border-yellow-200 my-4">
               <h3 class="font-bold text-yellow-800 flex items-center"><span class="mr-2"><Lightbulb size={18} /></span>Совет</h3>
               <p class="text-yellow-800">Создавайте отдельные сберегательные счета для разных целей, чтобы избежать соблазна потратить деньги, предназначенные для конкретных целей.</p>
             </div>
             <p>Начните с краткосрочных целей, чтобы создать импульс, прежде чем приступать к долгосрочным задачам.</p>`,
        type: 'practical'
      },
      'economicsaving-3': {
        title: isEnglish ? 'Creating a Savings Plan' : 'Создание плана сбережений',
        content: isEnglish 
          ? `<h2>Building Your Savings Plan</h2>
             <p>A well-structured savings plan is your roadmap to financial security. Here's how to create one:</p>
             <h3>Step 1: Analyze Your Current Finances</h3>
             <p>Before you can save effectively, you need to understand your financial situation:</p>
             <ul>
               <li>Track your income and expenses for at least one month</li>
               <li>Identify areas where you can reduce spending</li>
               <li>Calculate how much you can realistically save each month</li>
             </ul>
             <h3>Step 2: Establish Priority Savings Categories</h3>
             <p>Organize your savings into these priority categories:</p>
             <ol>
               <li><strong>Emergency fund:</strong> Aim for 3-6 months of essential expenses</li>
               <li><strong>Retirement:</strong> Contribute to retirement accounts (401k, IRA)</li>
               <li><strong>Specific goals:</strong> Down payment, vacation, education, etc.</li>
             </ol>
             <h3>Step 3: Automate Your Savings</h3>
             <p>Set up automatic transfers to your savings accounts on payday before you have a chance to spend the money.</p>
             <h3>Step 4: Review and Adjust Regularly</h3>
             <p>Review your savings plan quarterly and adjust as your income, expenses, and goals change.</p>`
          : `<h2>Создание плана сбережений</h2>
             <p>Хорошо структурированный план сбережений — это ваша дорожная карта к финансовой безопасности. Вот как его создать:</p>
             <h3>Шаг 1: Проанализируйте свои текущие финансы</h3>
             <p>Прежде чем эффективно сберегать, вам нужно понять свое финансовое положение:</p>
             <ul>
               <li>Отслеживайте свои доходы и расходы в течение как минимум одного месяца</li>
               <li>Определите области, где вы можете сократить расходы</li>
               <li>Рассчитайте, сколько вы реально можете откладывать каждый месяц</li>
             </ul>
             <h3>Шаг 2: Установите приоритетные категории сбережений</h3>
             <p>Организуйте свои сбережения по этим приоритетным категориям:</p>
             <ol>
               <li><strong>Резервный фонд:</strong> Стремитесь к 3-6 месяцам основных расходов</li>
               <li><strong>Пенсия:</strong> Делайте взносы на пенсионные счета</li>
               <li><strong>Конкретные цели:</strong> Первоначальный взнос, отпуск, образование и т. д.</li>
             </ol>
             <h3>Шаг 3: Автоматизируйте свои сбережения</h3>
             <p>Настройте автоматические переводы на свои сберегательные счета в день зарплаты, прежде чем у вас появится шанс потратить деньги.</p>
             <h3>Шаг 4: Регулярно пересматривайте и корректируйте</h3>
             <p>Пересматривайте свой план сбережений ежеквартально и корректируйте его по мере изменения ваших доходов, расходов и целей.</p>`,
        type: 'practical'
      }
    };
    
    return contents[id] || {
      title: isEnglish ? 'Lesson Content' : 'Содержание урока',
      content: isEnglish 
        ? `<p>This lesson content is currently being developed. Check back soon!</p>` 
        : `<p>Содержание этого урока в настоящее время разрабатывается. Загляните позже!</p>`,
      type: 'theory'
    };
  };
  
  const content = getContentByLessonId(lessonId);
  
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm animate-fade-in">
      <div className="flex items-center mb-6">
        <div className="w-10 h-10 bg-app-light-blue rounded-full flex items-center justify-center mr-3">
          {content.type === 'theory' 
            ? <BookOpen size={20} className="text-app-blue" />
            : content.type === 'practical' 
              ? <FileText size={20} className="text-app-blue" />
              : <CheckCircle size={20} className="text-app-blue" />
          }
        </div>
        <div>
          <h1 className="text-2xl font-bold text-app-dark">{content.title}</h1>
          <p className="text-app-text-light">
            {moduleTitle} • <span className="flex items-center inline-flex">
              <Clock size={14} className="mr-1" /> 
              {language === 'en' ? '5 min read' : '5 мин чтения'}
            </span>
          </p>
        </div>
      </div>
      
      <div 
        className="prose prose-blue max-w-none mb-6" 
        dangerouslySetInnerHTML={{ __html: content.content }}
      />
      
      <div className="flex justify-end">
        <button className="bg-app-blue text-white font-medium py-3 px-6 rounded-full">
          {language === 'en' ? 'Continue' : 'Продолжить'}
        </button>
      </div>
    </div>
  );
};

export default LessonContent;
