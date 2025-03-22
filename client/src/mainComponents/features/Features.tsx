import { motion } from 'framer-motion';
import { ShieldCheck, MessageSquare, Clock, BarChart, Brain, Twitter } from 'lucide-react';

const FeaturesData = [
  {
    id: 1,
    name: 'Full Secure Authentication',
    description: 'Your data stays safe with secure authentication methods.',
    icon: <ShieldCheck className='w-8 h-8 text-blue-500' />,
  },
  {
    id: 2,
    name: 'Blog to X Post',
    description: 'Quickly turn long blogs into engaging X posts within 280 characters.',
    icon: <MessageSquare className='w-8 h-8 text-green-500' />,
  },
  {
    id: 3,
    name: 'Schedule Posts',
    description: 'Plan your X posts ahead and share them at the right time.',
    icon: <Clock className='w-8 h-8 text-yellow-500' />,
  },
  {
    id: 4,
    name: 'Activity Analytics',
    description: 'Track your activity and see what’s working best.',
    icon: <BarChart className='w-8 h-8 text-purple-500' />,
  },
  {
    id: 5,
    name: 'AI-Powered Summarizer',
    description: 'Effortlessly summarize long content with advanced AI.',
    icon: <Brain className='w-8 h-8 text-pink-500' />,
  },
  {
    id: 6,
    name: 'Engaging X Posts',
    description: 'Craft posts that get attention and maximize engagement.',
    icon: <Twitter className='w-8 h-8 text-cyan-500' />,
  },
];

const FeatureSectionQuickPostAI = () => {
  return (
    <div className='flex flex-col items-center justify-center py-10 px-5'>
    <h2 className='text-center text-3xl font-bold mb-6'>Why Choose QuickPostAI?</h2>
    <div>
    <div className="grid w-full grid-cols-2 gap-x-10 md:grid-cols-3">
      {FeaturesData.map((feature) => (
        <motion.div
          whileHover={{ y: -8 }}
          transition={{ type: 'spring', bounce: 0.7 }}
          key={feature.id}
          className="mt-5 text-left"
        >
          <div className="flex items-center mb-3">
            {feature.icon}
          </div>
          <div className="mb-1 text-sm font-medium text-gray-900 dark:text-gray-100">
            {feature.name}
          </div>
          <div className="max-w-[250px] text-sm font-normal text-gray-500 dark:text-gray-500">
            {feature.description}
          </div>
        </motion.div>
      ))}
    </div>
  </div>
  </div>
  );
};

export default FeatureSectionQuickPostAI;
