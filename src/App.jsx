import { useState } from 'react';
import DashboardRenderer from './components/DashboardRenderer';
import LoadingState from './components/LoadingState';

const API_URL = 'http://localhost:3001/api/query';

function App() {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      const json = await res.json();

      if (!res.ok) {
        setError(json.reason || json.error || 'Something went wrong');
      } else {
        setResult(json);
      }
    } catch (err) {
      setError('Could not reach the server.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-slate-900">Prompt2Dash</h1>
        <p className="text-sm text-slate-500">Ask a question, get an instant dashboard</p>
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g. show total revenue by region"
          className="flex-1 border border-slate-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          Ask
        </button>
      </form>

      {loading && <LoadingState />}
      {error && (
        <div className="bg-red-50 border border-red-100 text-red-600 text-sm rounded-lg p-4">
          {error}
        </div>
      )}
      {result && !loading && (
        <div>
          <DashboardRenderer result={result} />
          {result.summary && (
            <p className="text-sm text-slate-500 mt-3">{result.summary}</p>
          )}
        </div>
      )}
    </div>
  );
}

export default App;