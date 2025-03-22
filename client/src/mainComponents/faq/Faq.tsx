import { motion, Variants } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import React, { useState } from 'react'

interface AccordionItemProps {
  title: string
  content: string
  isExpanded: boolean
  onToggle: () => void
}

interface AccordionProps {
  items: Array<{
    title: string
    content: string
  }>
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  content,
  isExpanded,
  onToggle,
}) => {
  const cardVariants: Variants = {
    collapsed: {
      height: '60px',
      transition: { type: 'spring', stiffness: 300, damping: 15 },
    },
    expanded: {
      height: 'auto',
      transition: { type: 'spring', stiffness: 300, damping: 15 },
    },
  }

  const contentVariants: Variants = {
    collapsed: { opacity: 0 },
    expanded: {
      opacity: 1,
      transition: { delay: 0.1 },
    },
  }

  const chevronVariants: Variants = {
    collapsed: { rotate: 0 },
    expanded: { rotate: 180 },
  }

  return (
    <motion.div
      className="w-full max-w-2xl my-3 cursor-pointer select-none overflow-hidden rounded-lg border border-gray-700 bg-white dark:bg-[#09080A] shadow-sm"
      variants={cardVariants}
      initial="collapsed"
      animate={isExpanded ? 'expanded' : 'collapsed'}
      onClick={onToggle}
    >
      <div className="flex items-center justify-between p-4">
        <h2 className="text-base font-semibold text-gray-800 dark:text-gray-100">{title}</h2>
        <motion.div 
          variants={chevronVariants}
          className="text-gray-600 dark:text-gray-300"
        >
          <ChevronDown size={20} />
        </motion.div>
      </div>
      <motion.div
        className="px-4 pb-4"
        variants={contentVariants}
        initial="collapsed"
        animate={isExpanded ? 'expanded' : 'collapsed'}
      >
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {content}
        </p>
      </motion.div>
    </motion.div>
  )
}

const Accordion: React.FC<AccordionProps> = ({ items }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  const handleToggle = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index)
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          content={item.content}
          isExpanded={expandedIndex === index}
          onToggle={() => handleToggle(index)}
        />
      ))}
    </div>
  )
}

const accordionItems = [
    {
      title: 'How does QuickPostAI work?',
      content: 'QuickPostAI extracts content from blog URLs, summarizes it, and creates X posts under 280 characters for easy sharing.',
    },
    {
      title: 'Can I schedule X posts using QuickPostAI?',
      content: 'Yes! You can schedule your X posts to go live whenever you want, saving you time and effort.',
    },
    {
      title: 'Is QuickPostAI free to use?',
      content: 'Yes! QuickPostAI is completely free for all users.',
    },
    {
      title: 'Does QuickPostAI analyze my activities?',
      content: 'Absolutely! You can view a detailed history of your past blog URLs, summaries, and X posts for better insights.',
    },
    {
      title: 'Will my blog data stay secure with QuickPostAI?',
      content: 'Yes! We use secure authentication and data encryption to ensure your information remains safe and private.',
    },
    {
      title: 'Can AI generate X posts that engage more?',
      content: 'Yes! Our AI-powered summarizer crafts engaging and impactful X posts that connect with your audience.',
    },
  ];
  

const Faq: React.FC = () => {
  return (
    <section className="py-12 px-4 bg-gray-50 dark:bg-[#09080A]">
      <div className="container mx-auto">
        <h2 className="text-center text-3xl font-bold mb-8 text-gray-900 dark:text-white">
          Everything You Need to Know About QuickPostAI!
        </h2>
        <Accordion items={accordionItems} />
      </div>
    </section>
  )
}

export default Faq