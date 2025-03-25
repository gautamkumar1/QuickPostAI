
function Faq() {
  return (
    <div className="min-h-screen p-8">
      {/* Title Section */}
      <div className="text-center mb-12 relative">
        <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-4">
          Everything You Need to Know About QuickPostAI!
        </h2>
        <p className="text-lg text-gray-300 mb-2">
          Find answers to your questions below
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-600 mx-auto rounded-full"></div>
      </div>

      <div className="space-y-4 max-w-4xl mx-auto">
        {accordionItems.map((item, index) => (
          <details key={index} className="group rounded-lg bg-[#18181B] p-6 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-white">
              <h2 className="font-medium text-xl">{item.title}</h2>
              <span className="relative size-5 shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute inset-0 size-5 opacity-100 group-open:opacity-0 text-purple-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute inset-0 size-5 opacity-0 group-open:opacity-100 text-purple-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9" />
                </svg>
              </span>
            </summary>
            <p className="mt-4 leading-relaxed text-gray-300">{item.content}</p>
          </details>
        ))}
      </div>
    </div>
  );
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

export default Faq;
