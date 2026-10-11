export default function ClarificationPrompt({ question, onRetry }) {
  return (
    <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 text-center">
      <p className="text-sm text-blue-800 font-medium mb-1">Could you clarify?</p>
      <p className="text-sm text-blue-700">{question}</p>
      {onRetry && (
        <p className="text-xs text-blue-400 mt-3">Try rephrasing your question above.</p>
      )}
    </div>
  );
}