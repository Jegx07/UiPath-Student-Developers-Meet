import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Play, SkipForward, Lock, Unlock, Home } from 'lucide-react';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

const RegisterPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [videoCompleted, setVideoCompleted] = useState(false);
  const [formUnlocked, setFormUnlocked] = useState(false);
  const [player, setPlayer] = useState<any>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const steps = [
    { title: 'Watch UiPath Tutorial', icon: Play },
    { title: 'Complete Registration Form', icon: Lock },
    { title: 'Submit Registration', icon: Check },
  ];

  useEffect(() => {
    // Load YouTube Iframe API
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = () => {
        createPlayer();
      };
    } else {
      createPlayer();
    }

    const createPlayer = () => {
      if (playerRef.current && !player) {
        const newPlayer = new window.YT.Player(playerRef.current, {
          height: '315',
          width: '560',
          videoId: 'JO8eQPs31Qw',
          events: {
            onStateChange: onPlayerStateChange,
          },
        });
        setPlayer(newPlayer);
      }
    };

    const onPlayerStateChange = (event: any) => {
      if (event.data === window.YT.PlayerState.ENDED) {
        setVideoCompleted(true);
        unlockForm();
      }
    };

    return () => {
      if (player) {
        player.destroy();
      }
    };
  }, []);

  const handleSkipTutorial = () => {
    setVideoCompleted(true);
    unlockForm();
  };

  const unlockForm = () => {
    setFormUnlocked(true);
    setCurrentStep(1);
    toast.success('Tutorial completed! Registration form unlocked.');
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 500);
  };

  const handleOpenForm = () => {
    window.open('https://forms.gle/2BCXYkjDzASQrgo69', '_blank');
    setCurrentStep(2);
    toast.success('Registration form opened! Complete and submit to finish.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,107,0,0.1),transparent_70%)]" />
      <div className="absolute top-0 left-0 w-full h-full opacity-30" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0)',
        backgroundSize: '40px 40px'
      }} />

      {/* Animated background graphics */}
      <motion.div
        className="absolute top-20 left-20 w-32 h-32 bg-orange-500/10 rounded-full blur-xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-32 right-16 w-24 h-24 bg-orange-400/15 rounded-full blur-lg"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
      <motion.div
        className="absolute top-1/2 left-1/4 w-16 h-16 bg-orange-600/20 rounded-full blur-md"
        animate={{
          y: [0, -20, 0],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5
        }}
      />
      <motion.div
        className="absolute bottom-20 left-1/3 w-20 h-20 bg-orange-500/10 rounded-full blur-lg"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />

      <div className="container mx-auto px-6 py-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-display font-black text-4xl md:text-5xl lg:text-6xl mb-4">
              Event <span className="text-orange-500">Registration</span>
            </h1>
            <p className="text-white/60 text-lg">
              Complete the tutorial to unlock your registration form
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-4">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  className={`flex items-center gap-3 ${
                    index <= currentStep ? 'text-orange-500' : 'text-white/40'
                  }`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <motion.div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                      index < currentStep
                        ? 'bg-orange-500 border-orange-500'
                        : index === currentStep
                        ? 'border-orange-500'
                        : 'border-white/20'
                    }`}
                    animate={
                      index < currentStep
                        ? { scale: [0.8, 1.2, 1], opacity: [0.5, 1] }
                        : index === currentStep
                        ? { scale: [1, 1.1, 1] }
                        : {}
                    }
                    transition={
                      index < currentStep
                        ? { duration: 0.5, ease: "easeOut" }
                        : { repeat: Infinity, duration: 2 }
                    }
                  >
                    <AnimatePresence mode="wait">
                      {index < currentStep ? (
                        <motion.div
                          key="check"
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Check className="w-5 h-5" />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="icon"
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <step.icon className="w-5 h-5" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                  <span className="text-sm font-medium hidden md:block">
                    {step.title}
                  </span>
                </motion.div>
              ))}
            </div>
            <div className="w-full bg-white/10 rounded-full h-2">
              <motion.div
                className="bg-gradient-to-r from-orange-500 to-orange-600 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          {/* Tutorial Section */}
          <motion.div
            className="glass-card rounded-2xl p-8 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="font-display font-bold text-2xl mb-6 text-center">
              Step 1: Watch UiPath Tutorial
            </h2>
            <div className="flex justify-center mb-6">
              <div
                ref={playerRef}
                className="w-full max-w-2xl aspect-video rounded-xl overflow-hidden"
              />
            </div>
            <div className="text-center">
              <button
                onClick={handleSkipTutorial}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl transition-colors"
              >
                <SkipForward className="w-5 h-5" />
                Skip Tutorial
              </button>
            </div>
          </motion.div>

          {/* Registration Form */}
          <motion.div
            ref={formRef}
            className="relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {!formUnlocked && (
              <div className="absolute inset-0 bg-black/50 backdrop-blur-sm rounded-2xl flex items-center justify-center z-10">
                <motion.div
                  className="text-center"
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                >
                  <Lock className="w-16 h-16 text-orange-500 mx-auto mb-4" />
                  <p className="text-white/80 text-lg">
                    Complete the tutorial to unlock the registration form
                  </p>
                </motion.div>
              </div>
            )}
            <div className={`glass-card rounded-2xl p-8 ${!formUnlocked ? 'pointer-events-none' : ''}`}>
              <h2 className="font-display font-bold text-2xl mb-6 text-center">
                Step 2: Complete Registration Form
              </h2>
              {formUnlocked && (
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <button
                    onClick={handleOpenForm}
                    className="px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 rounded-xl font-bold text-white transition-all transform hover:scale-105 glow-orange"
                  >
                    Open Registration Form
                  </button>
                  <p className="text-white/60 text-sm mt-4">
                    Click to open the Google Form in a new tab
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Back to Home Button */}
          {formUnlocked && (
            <motion.div
              className="text-center mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Link to="/">
                <button className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl transition-colors">
                  <Home className="w-5 h-5" />
                  Back to Home
                </button>
              </Link>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default RegisterPage;
