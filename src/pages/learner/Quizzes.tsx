import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle2, Clock, HelpCircle, AlertCircle, 
  ChevronLeft, ChevronRight, Trophy, RefreshCcw,
  Check
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Confetti } from '@/components/ui/Confetti';
import { cn } from '@/lib/utils';

/* ============================================================
   MOCK DATA
   ============================================================ */
const quizData = {
  title: 'React Rendering Pipeline Mastery',
  course: 'Advanced React Patterns',
  totalTime: 600, // 10 minutes in seconds
  questions: [
    {
      id: 1,
      text: 'Which of the following phases in the React lifecycle is pure and should not contain side effects?',
      options: ['The Commit Phase', 'The Render Phase', 'The Mount Phase', 'The Effect Phase'],
      correctAnswer: 1
    },
    {
      id: 2,
      text: 'What data structure does React use internally to keep track of the component tree and its state?',
      options: ['Virtual DOM Array', 'React DOM Map', 'Fiber Tree', 'State Vector'],
      correctAnswer: 2
    },
    {
      id: 3,
      text: 'In React 18, concurrent features like useTransition allow React to...',
      options: [
        'Interrupt a long-running render to handle higher-priority events.',
        'Run multiple renders in parallel on different threads.',
        'Skip the commit phase entirely.',
        'Automatically memoize all components.'
      ],
      correctAnswer: 0
    }
  ]
};

export default function Quizzes() {
  const [quizState, setQuizState] = useState<'intro' | 'active' | 'results'>('intro');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState(quizData.totalTime);

  // Timer Effect
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (quizState === 'active' && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && quizState === 'active') {
      setQuizState('results');
    }
    return () => clearInterval(timer);
  }, [quizState, timeLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (optionIndex: number) => {
    setAnswers({ ...answers, [currentQuestionIndex]: optionIndex });
  };

  const handleNext = () => {
    if (currentQuestionIndex < quizData.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setQuizState('results');
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  // Calculate Score
  const calculateScore = () => {
    let correct = 0;
    quizData.questions.forEach((q, index) => {
      if (answers[index] === q.correctAnswer) correct++;
    });
    return Math.round((correct / quizData.questions.length) * 100);
  };

  return (
    <div className="max-w-[800px] mx-auto pb-12 pt-6">
      <AnimatePresence mode="wait">
        
        {/* =========================================================
            INTRO STATE
            ========================================================= */}
        {quizState === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card className="p-8 sm:p-12 text-center border-border shadow-premium bg-card relative overflow-hidden">
              <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl opacity-50 pointer-events-none" />
              
              <div className="h-20 w-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
                <HelpCircle className="h-10 w-10" />
              </div>
              
              <Badge variant="secondary" className="mb-4">{quizData.course}</Badge>
              <h1 className="text-3xl font-bold text-foreground mb-4">{quizData.title}</h1>
              <p className="text-text-secondary max-w-md mx-auto mb-8">
                Test your knowledge on the React rendering pipeline. This quiz affects your final grade and certificate eligibility.
              </p>
              
              <div className="flex flex-wrap justify-center gap-6 mb-10">
                <div className="flex items-center gap-2">
                  <HelpCircle className="h-5 w-5 text-text-secondary" />
                  <span className="font-medium text-foreground">{quizData.questions.length} Questions</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-text-secondary" />
                  <span className="font-medium text-foreground">{quizData.totalTime / 60} Minutes</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-text-secondary" />
                  <span className="font-medium text-foreground">80% to Pass</span>
                </div>
              </div>
              
              <Button 
                onClick={() => setQuizState('active')}
                className="btn-gradient h-14 px-12 rounded-xl text-lg font-bold text-white shadow-lg hover:scale-105 transition-transform"
              >
                Start Quiz
              </Button>
            </Card>
          </motion.div>
        )}

        {/* =========================================================
            ACTIVE QUIZ STATE
            ========================================================= */}
        {quizState === 'active' && (
          <motion.div
            key="active"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="space-y-6"
          >
            {/* Header & Progress */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-foreground">Question {currentQuestionIndex + 1} of {quizData.questions.length}</h2>
                <p className="text-sm text-text-secondary">{quizData.title}</p>
              </div>
              <div className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-xl font-mono text-lg font-bold shadow-sm border",
                timeLeft < 60 ? "bg-danger/10 text-danger border-danger/20 animate-pulse" : "bg-card border-border text-foreground"
              )}>
                <Clock className="h-5 w-5" />
                {formatTime(timeLeft)}
              </div>
            </div>
            
            <ProgressBar progress={((currentQuestionIndex) / quizData.questions.length) * 100} className="h-2" />

            {/* Question Card */}
            <Card className="p-6 sm:p-10 border-border shadow-sm bg-card mt-6">
              <h3 className="text-xl sm:text-2xl font-medium leading-relaxed text-foreground mb-8">
                {quizData.questions[currentQuestionIndex].text}
              </h3>
              
              <div className="space-y-3">
                {quizData.questions[currentQuestionIndex].options.map((option, idx) => {
                  const isSelected = answers[currentQuestionIndex] === idx;
                  return (
                    <label 
                      key={idx}
                      className={cn(
                        "flex items-center gap-4 p-4 rounded-xl border transition-all cursor-pointer hover:bg-muted/50",
                        isSelected ? "border-primary bg-primary/5 shadow-sm" : "border-border bg-background"
                      )}
                    >
                      <div className={cn(
                        "h-6 w-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors",
                        isSelected ? "border-primary bg-primary" : "border-border"
                      )}>
                        {isSelected && <Check className="h-3.5 w-3.5 text-white" />}
                      </div>
                      <span className={cn(
                        "text-base",
                        isSelected ? "text-foreground font-medium" : "text-text-secondary"
                      )}>{option}</span>
                      <input 
                        type="radio" 
                        name={`question-${currentQuestionIndex}`} 
                        className="sr-only"
                        checked={isSelected}
                        onChange={() => handleSelectOption(idx)}
                      />
                    </label>
                  );
                })}
              </div>
            </Card>

            {/* Navigation */}
            <div className="flex items-center justify-between pt-4">
              <Button 
                variant="outline" 
                onClick={handlePrev} 
                disabled={currentQuestionIndex === 0}
                className="h-12 px-6 rounded-xl border-border"
              >
                <ChevronLeft className="mr-2 h-4 w-4" /> Previous
              </Button>
              <Button 
                onClick={handleNext}
                className="btn-gradient h-12 px-8 rounded-xl text-white shadow-sm font-semibold"
                disabled={answers[currentQuestionIndex] === undefined}
              >
                {currentQuestionIndex === quizData.questions.length - 1 ? 'Submit Quiz' : 'Next Question'}
                {currentQuestionIndex !== quizData.questions.length - 1 && <ChevronRight className="ml-2 h-4 w-4" />}
              </Button>
            </div>
          </motion.div>
        )}

        {/* =========================================================
            RESULTS STATE
            ========================================================= */}
        {quizState === 'results' && (() => {
          const score = calculateScore();
          const passed = score >= 80;
          
          return (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {passed && <Confetti active={true} />}
              <Card className="p-8 sm:p-12 text-center border-border shadow-premium bg-card relative overflow-hidden">
                <div className={cn(
                  "absolute top-0 left-0 right-0 h-2",
                  passed ? "bg-success" : "bg-danger"
                )} />
                
                <div className={cn(
                  "h-24 w-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl border-4 border-card",
                  passed ? "bg-success text-white" : "bg-danger text-white"
                )}>
                  {passed ? <Trophy className="h-10 w-10" /> : <AlertCircle className="h-10 w-10" />}
                </div>
                
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  {passed ? 'Congratulations!' : 'Almost there!'}
                </h1>
                <p className="text-text-secondary max-w-md mx-auto mb-8">
                  {passed 
                    ? "You've successfully mastered the React Rendering Pipeline. You're ready to move on to the next module." 
                    : "You didn't quite hit the 80% passing mark. Review the material and try again."}
                </p>
                
                <div className="flex justify-center mb-10">
                  <div className="text-center p-6 bg-muted/30 rounded-3xl border border-border min-w-[200px]">
                    <span className="block text-sm font-bold text-text-secondary uppercase tracking-wider mb-2">Your Score</span>
                    <span className={cn(
                      "text-6xl font-black drop-shadow-sm",
                      passed ? "text-success" : "text-danger"
                    )}>
                      {score}%
                    </span>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  {!passed && (
                    <Button 
                      variant="outline"
                      onClick={() => {
                        setQuizState('active');
                        setCurrentQuestionIndex(0);
                        setAnswers({});
                        setTimeLeft(quizData.totalTime);
                      }}
                      className="h-12 px-8 rounded-xl border-border hover:bg-muted"
                    >
                      <RefreshCcw className="mr-2 h-4 w-4" /> Retake Quiz
                    </Button>
                  )}
                  <Button 
                    className="btn-gradient h-12 px-8 rounded-xl text-white shadow-sm font-semibold"
                  >
                    Continue to Next Lesson
                  </Button>
                </div>
              </Card>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </div>
  );
}
