
import React, { useState, useEffect } from 'react';
import { ChevronLeft, Clock, Trophy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/context/LanguageContext';
import { currentUser } from '@/data/modules'; // В реальном приложении это должно быть из контекста пользователя

interface TriviaQuestion {
  id: string;
  text: string;
  options: { id: string; text: string }[];
  correctOptionId: string;
  explanation?: string;
}

interface TriviaQuizProps {
  onClose: () => void;
  onComplete: (score: number) => void;
}

const TriviaQuiz: React.FC<TriviaQuizProps> = ({ onClose, onComplete }) => {
  const [questions, setQuestions] = useState<TriviaQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(15); // 15 секунд на вопрос
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { t, language } = useLanguage();

  // Загрузка вопросов викторины
  useEffect(() => {
    // В реальном приложении здесь будет запрос к API
    const mockQuestions: TriviaQuestion[] = [
      {
        id: '1',
        text: language === 'en' ? 'What is a budget?' : 'Что такое бюджет?',
        options: [
          { id: '1a', text: language === 'en' ? 'A financial plan for managing income and expenses' : 'Финансовый план для управления доходами и расходами' },
          { id: '1b', text: language === 'en' ? 'A type of investment' : 'Вид инвестиций' },
          { id: '1c', text: language === 'en' ? 'A credit card with no fees' : 'Кредитная карта без комиссий' },
          { id: '1d', text: language === 'en' ? 'A government tax program' : 'Государственная налоговая программа' }
        ],
        correctOptionId: '1a',
        explanation: language === 'en' ? 'A budget is a financial plan that outlines expected income and expenses over a period of time.' : 'Бюджет — это финансовый план, который определяет ожидаемые доходы и расходы за определённый период времени.'
      },
      {
        id: '2',
        text: language === 'en' ? 'What is compound interest?' : 'Что такое сложный процент?',
        options: [
          { id: '2a', text: language === 'en' ? 'Interest paid only on the principal' : 'Проценты, выплачиваемые только на основную сумму' },
          { id: '2b', text: language === 'en' ? 'Interest earned on both principal and previously earned interest' : 'Проценты, начисляемые как на основную сумму, так и на ранее начисленные проценты' },
          { id: '2c', text: language === 'en' ? 'A type of loan with a fixed rate' : 'Вид кредита с фиксированной ставкой' },
          { id: '2d', text: language === 'en' ? 'A fee charged by banks for deposits' : 'Комиссия, взимаемая банками за депозиты' }
        ],
        correctOptionId: '2b',
        explanation: language === 'en' ? 'Compound interest is interest calculated on the initial principal and also on the accumulated interest of previous periods.' : 'Сложный процент — это проценты, рассчитываемые на начальную сумму, а также на накопленные проценты предыдущих периодов.'
      },
      {
        id: '3',
        text: language === 'en' ? 'What is a credit score?' : 'Что такое кредитный рейтинг?',
        options: [
          { id: '3a', text: language === 'en' ? 'The amount of money you owe to creditors' : 'Сумма денег, которую вы должны кредиторам' },
          { id: '3b', text: language === 'en' ? 'Your checking account balance' : 'Баланс вашего расчётного счёта' },
          { id: '3c', text: language === 'en' ? 'A numerical expression of your creditworthiness' : 'Числовое выражение вашей кредитоспособности' },
          { id: '3d', text: language === 'en' ? 'The interest rate on a loan' : 'Процентная ставка по кредиту' }
        ],
        correctOptionId: '3c',
        explanation: language === 'en' ? 'A credit score is a number that represents a person\'s creditworthiness based on their credit history.' : 'Кредитный рейтинг — это число, которое представляет кредитоспособность человека на основе его кредитной истории.'
      }
    ];
    
    setQuestions(mockQuestions);
    setLoading(false);
  }, [language]);

  // Таймер для вопроса
  useEffect(() => {
    if (loading || quizCompleted || selectedOption) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleNextQuestion(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [loading, currentQuestionIndex, selectedOption, quizCompleted]);

  const handleOptionSelect = (optionId: string) => {
    if (selectedOption) return;
    
    setSelectedOption(optionId);
    const currentQuestion = questions[currentQuestionIndex];
    
    if (optionId === currentQuestion.correctOptionId) {
      // Правильный ответ
      setScore(prev => prev + 100);
      toast({
        title: language === 'en' ? 'Correct!' : 'Правильно!',
        description: language === 'en' ? 'You earned 100 points!' : 'Вы заработали 100 баллов!',
        variant: 'default',
      });
    } else {
      // Неправильный ответ
      toast({
        title: language === 'en' ? 'Incorrect' : 'Неправильно',
        description: language === 'en' ? 'The correct answer has been highlighted.' : 'Правильный ответ выделен.',
        variant: 'destructive',
      });
    }
    
    // Автоматически переходим к следующему вопросу через 2 секунды
    setTimeout(() => {
      handleNextQuestion(true);
    }, 2000);
  };

  const handleNextQuestion = (userAnswered: boolean) => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setTimeLeft(15);
    } else {
      // Викторина завершена
      setQuizCompleted(true);
      const finalScore = userAnswered 
        ? score + (selectedOption === questions[currentQuestionIndex].correctOptionId ? 100 : 0)
        : score;
      
      // Обновляем счет и монеты пользователя
      onComplete(finalScore);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4 animate-scale-in">
          <div className="flex justify-center p-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-app-blue"></div>
          </div>
        </div>
      </div>
    );
  }

  if (quizCompleted) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4 animate-scale-in">
          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-app-light-blue rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy size={40} className="text-app-blue" />
            </div>
            <h2 className="text-2xl font-bold text-app-dark">
              {language === 'en' ? 'Quiz Completed!' : 'Викторина завершена!'}
            </h2>
            <p className="text-app-text-light mt-2">
              {language === 'en' 
                ? `Your score: ${score} points` 
                : `Ваш результат: ${score} баллов`}
            </p>
            <p className="text-app-text-light mt-2">
              {language === 'en' 
                ? `You earned ${Math.floor(score / 10)} coins!` 
                : `Вы заработали ${Math.floor(score / 10)} монет!`}
            </p>
          </div>
          
          <button 
            onClick={onClose}
            className="w-full bg-app-blue text-white font-medium py-3 rounded-full"
          >
            {language === 'en' ? 'Return to Community' : 'Вернуться в Сообщество'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4 animate-scale-in">
        <div className="flex items-center justify-between mb-4">
          <button onClick={onClose}>
            <ChevronLeft size={24} className="text-app-dark" />
          </button>
          <h2 className="text-xl font-bold text-app-dark">
            {language === 'en' ? 'Trivia Quiz' : 'Викторина'}
          </h2>
          <div className="flex items-center text-app-text-light">
            <Clock size={18} className="mr-1" />
            <span>{timeLeft}s</span>
          </div>
        </div>
        
        <div className="relative mb-4 pt-2">
          <div className="h-1 bg-gray-200 rounded-full">
            <div 
              className="h-1 bg-app-blue rounded-full transition-all" 
              style={{ width: `${(timeLeft / 15) * 100}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-app-text-light mt-1">
            <span>
              {language === 'en' ? 'Question' : 'Вопрос'} {currentQuestionIndex + 1}/{questions.length}
            </span>
            <span>
              {language === 'en' ? 'Score' : 'Счёт'}: {score}
            </span>
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-xl mb-4">
          <p className="text-app-dark font-medium">{currentQuestion?.text}</p>
        </div>
        
        <div className="space-y-3 mb-6">
          {currentQuestion?.options.map(option => (
            <button
              key={option.id}
              className={`w-full text-left p-4 rounded-xl border transition-all ${
                selectedOption === option.id && option.id === currentQuestion.correctOptionId
                  ? 'border-green-500 bg-green-50'
                  : selectedOption === option.id && option.id !== currentQuestion.correctOptionId
                  ? 'border-red-500 bg-red-50'
                  : selectedOption && option.id === currentQuestion.correctOptionId
                  ? 'border-green-500 bg-green-50'
                  : selectedOption
                  ? 'border-gray-200'
                  : 'border-gray-200 hover:border-app-blue'
              }`}
              onClick={() => handleOptionSelect(option.id)}
              disabled={!!selectedOption}
            >
              <span>{option.text}</span>
            </button>
          ))}
        </div>
        
        {selectedOption && (
          <div className="bg-gray-50 p-4 rounded-xl mb-4">
            <p className="text-app-text-light">{currentQuestion?.explanation}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TriviaQuiz;
