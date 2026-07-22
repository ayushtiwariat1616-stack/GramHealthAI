const questions = [
  "What are malaria symptoms?",
  "How to prevent dengue?",
  "Healthy diet for children",
  "Pregnancy nutrition",
  "Vaccination schedule",
  "First aid for burns",
];

export default function QuickQuestions({ onQuestion }) {
  return (
    <div className="grid grid-cols-2 gap-4 mt-10">
      {questions.map((question) => (
        <button
          key={question}
          onClick={() => onQuestion(question)}
          className="rounded-xl border bg-white p-4 text-left hover:bg-blue-50 hover:border-blue-500 transition shadow-sm"
        >
          {question}
        </button>
      ))}
    </div>
  );
}