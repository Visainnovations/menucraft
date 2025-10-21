interface ScrollToTopButtonProps {
  primaryColor: string;
}

export default function ScrollToTopButton({ primaryColor }: ScrollToTopButtonProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-24 right-4 z-40 p-3 rounded-full shadow-2xl backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-95 animate-bounce"
      style={{
        backgroundColor: `${primaryColor}ee`,
        boxShadow: `0 8px 24px ${primaryColor}40`,
      }}
      aria-label="Scroll to top"
    >
      <svg
        className="w-6 h-6 text-white"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path d="M5 15l7-7 7 7"></path>
      </svg>
    </button>
  );
}