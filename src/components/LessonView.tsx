
import { FC, useState } from 'react';
import { Lesson, Question, Option } from '../types';
import { ChevronRight, ChevronLeft, CheckCircle, XCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface LessonViewProps {
  lesson: Lesson;
  onComplete: (lessonId: string) => void;
  onBack: () => void;
}

const LessonView: FC<LessonViewProps> = ({ lesson, onComplete, onBack }) => {
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [completedQuiz, setCompletedQuiz] = useState(false);
  const { toast } = useToast();

  const quiz = lesson.quiz;
  const currentQuestion = quiz ? quiz.questions[currentQuestionIndex] : null;
  const isLastQuestion = quiz ? currentQuestionIndex === quiz.questions.length - 1 : false;

  const handleStartQuiz = () => {
    setShowQuiz(true);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setShowExplanation(false);
    setCorrectAnswers(0);
    setCompletedQuiz(false);
  };

  const handleOptionSelect = (optionId: string) => {
    if (selectedOption) return; // Prevent selecting multiple options
    setSelectedOption(optionId);
    
    if (currentQuestion && optionId === currentQuestion.correctOptionId) {
      setCorrectAnswers(prev => prev + 1);
      toast({
        title: "Correct!",
        description: "Good job on getting the right answer!",
        variant: "success",
      });
    } else {
      toast({
        title: "Incorrect",
        description: "That's not the right answer. Check the explanation!",
        variant: "destructive",
      });
    }
    
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      setCompletedQuiz(true);
      onComplete(lesson.id);
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    }
  };

  const isOptionCorrect = (optionId: string): boolean => {
    return showExplanation && currentQuestion?.correctOptionId === optionId;
  };

  const isOptionIncorrect = (optionId: string): boolean => {
    return showExplanation && selectedOption === optionId && currentQuestion?.correctOptionId !== optionId;
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm animate-scale-in">
      <button 
        onClick={onBack}
        className="flex items-center text-app-blue mb-4 font-medium"
      >
        <ChevronLeft size={20} /> Back
      </button>

      {!showQuiz ? (
        <div>
          <h2 className="text-2xl font-bold text-app-dark mb-4">{lesson.title}</h2>
          <div className="prose prose-blue mb-6 text-app-text-light" dangerouslySetInnerHTML={{ __html: lesson.content }} />
          <button 
            onClick={handleStartQuiz}
            className="w-full bg-app-blue text-white font-medium py-3 rounded-full"
          >
            Start Quiz
          </button>
        </div>
      ) : completedQuiz ? (
        <div className="text-center py-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={40} className="text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-app-dark mb-2">Quiz Completed!</h2>
          <p className="text-app-text-light mb-4">
            You got {correctAnswers} out of {quiz?.questions.length} questions correct.
          </p>
          <button 
            onClick={onBack}
            className="w-full bg-app-blue text-white font-medium py-3 rounded-full"
          >
            Continue Learning
          </button>
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-app-dark">Question {currentQuestionIndex + 1}/{quiz?.questions.length}</h3>
            <span className="text-sm text-app-text-light">{correctAnswers} correct</span>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-xl mb-4">
            <p className="text-app-dark font-medium">{currentQuestion?.text}</p>
          </div>
          
          <div className="space-y-3 mb-6">
            {currentQuestion?.options.map((option: Option) => (
              <button
                key={option.id}
                className={`w-full text-left p-4 rounded-xl border ${
                  isOptionCorrect(option.id) 
                    ? 'border-green-500 bg-green-50' 
                    : isOptionIncorrect(option.id)
                    ? 'border-red-500 bg-red-50'
                    : selectedOption === option.id
                    ? 'border-app-blue bg-app-light-blue'
                    : 'border-gray-200 hover:border-app-blue'
                }`}
                onClick={() => handleOptionSelect(option.id)}
                disabled={showExplanation}
              >
                <div className="flex justify-between items-center">
                  <span>{option.text}</span>
                  {isOptionCorrect(option.id) && <CheckCircle size={20} className="text-green-600" />}
                  {isOptionIncorrect(option.id) && <XCircle size={20} className="text-red-600" />}
                </div>
              </button>
            ))}
          </div>
          
          {showExplanation && (
            <div className="bg-gray-50 p-4 rounded-xl mb-4">
              <p className="text-app-text-light">{currentQuestion?.explanation}</p>
            </div>
          )}
          
          {showExplanation && (
            <button 
              onClick={handleNextQuestion}
              className="w-full bg-app-blue text-white font-medium py-3 rounded-full flex items-center justify-center"
            >
              {isLastQuestion ? 'Complete Quiz' : 'Next Question'} <ChevronRight size={20} />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default LessonView;
