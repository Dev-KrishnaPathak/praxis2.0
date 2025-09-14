import React, { useState, useRef, useEffect } from 'react';

/**
 * A React component for a practice page which generates coding questions and provides a code editor interface.
 * 
 * @example
 * PractisePage()
 * Returns a JSX element representing the page with a question generator and code editor.
 * 
 * @returns {JSX.Element} JSX representing the practice page interface, including a question generator and code editor.
 */
const PractisePage = () => {
  const [code, setCode] = useState('');
  const textareaRef = useRef(null);
  const gutterRef = useRef(null);
  const timeoutRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [question, setQuestion] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const correctTimeoutRef = useRef(null);

  const handleScroll = () => {
    if (textareaRef.current && gutterRef.current) {
      gutterRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  /**
   * Simulates the loading and displays a question with a delay.
   * @example
   * functionName()
   * // After 2500ms, question state is set with a new question description.
   * @param {void} None - This function does not take any arguments.
   * @returns {void} This function does not return any value, it sets component state.
   */
  const generateQuestion = () => {
    // start loading, clear previous question
    setIsLoading(true);
    setQuestion(null);
    // simulate network/generation delay
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsLoading(false);
      setQuestion({
        title: 'Question:',
        body: 'You are given an array of integers. Write a function that returns the length of the longest substring (contiguous sequence) where the numbers are strictly increasing.',
        example: {
          input: '[10, 20, 30, 10, 40, 50, 60, 20]',
          output: '4'
        }
      });
    }, 2500);
  };

  useEffect(() => {
    return () => {
  if (timeoutRef.current) clearTimeout(timeoutRef.current);
  if (correctTimeoutRef.current) clearTimeout(correctTimeoutRef.current);
    };
  }, []);

  const handleChange = (e) => {
    setCode(e.target.value);
  };

  /**
   * Handles key events for ArrowUp and ArrowDown to manage cursor behavior in an empty editor.
   * @example
   * handleArrowKeyEvent(event)
   * // If code is empty and ArrowDown is pressed, it creates a new line and moves the caret to the second line.
   * @param {Object} e - The key event object that contains information about the key event, including the key pressed.
   * @returns {void} Does not return a value; instead, it handles the event and updates the editor's state.
   **/
  const handleKeyDown = (e) => {
    // If editor is empty, allow ArrowDown to create a blank line so caret can move
    if ((e.key === 'ArrowDown' || e.key === 'ArrowUp') && code.length === 0) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setCode('\n');
        // move caret to second line after DOM updates
        requestAnimationFrame(() => {
          if (textareaRef.current) {
            textareaRef.current.focus();
            textareaRef.current.setSelectionRange(1, 1);
            handleScroll();
          }
        });
      }
    }
  };

  

  const codeLines = code.split('\n');
  const lineCount = Math.max(20, codeLines.length);

  return (
    <main className="min-h-screen bg-black text-white py-12 relative">
      <div className="max-w-6xl mx-auto px-6">
        {/* Dashboard button top-left */}
        <div className="fixed top-3 left-6 z-40">
          <span className="absolute -inset-6 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(250,254,136,0.28),rgba(250,254,136,0.06),transparent)] filter blur-3xl opacity-40 z-40 animate-pulse-slow" />
          <span className="absolute -inset-2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(250,254,136,0.35),rgba(250,254,136,0.05),transparent)] filter blur-xl opacity-60 z-30" />
          <button
            onClick={() => { window.history.pushState({}, '', '/dashboard'); window.dispatchEvent(new PopStateEvent('popstate')); }}
            className="relative z-50 px-3 py-1.5 rounded-full bg-white/6 backdrop-blur-sm text-white text-sm border border-white/10 hover:bg-white/8 transition"
          >
            Dashboard
          </button>
        </div>
        {/* Top rectangle */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 mb-8">
          <div className="w-full bg-transparent rounded-lg grid grid-cols-1 md:grid-cols-2 gap-4 px-4 py-3">
            <div className="flex flex-col gap-3">
              <div className="flex items-center">
                <label className="text-sm text-white/80 mr-4 w-36">Company selector</label>
                <select className="flex-1 bg-black/80 text-white rounded-md p-2 pl-3 pr-4 outline-none border border-white/10 caret-white">
                  <option>Google</option>
                  <option>Microsoft</option>
                  <option>Meta</option>
                  <option>Apple</option>
                  <option>Netflix</option>
                  <option>Startup</option>
                </select>
              </div>

              <div className="flex items-center">
                <label className="text-sm text-white/80 mr-4 w-36">Difficulty</label>
                <select className="flex-1 bg-black/80 text-white rounded-md p-2 pl-3 pr-4 outline-none border border-white/10 caret-white">
                  <option>Easy</option>
                  <option>Medium</option>
                  <option>Hard</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end md:justify-center">
              <div className="flex flex-col items-center gap-3">
                <label className="text-sm text-white/80">Role selector</label>
                <select className="bg-black/80 text-white rounded-md p-2 pl-3 pr-4 outline-none border border-white/10 caret-white w-64 text-center">
                  <option>Junior software engineer</option>
                  <option>Senior software engineer</option>
                  <option>Tester</option>
                  <option>Other</option>
                </select>

                <div className="relative mt-1">
                  <span className="absolute -inset-6 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(250,254,136,0.28),rgba(250,254,136,0.06),transparent)] filter blur-3xl opacity-40 -z-20 animate-pulse-slow" />
                  <span className="absolute -inset-2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(250,254,136,0.35),rgba(250,254,136,0.05),transparent)] filter blur-xl opacity-60 -z-10" />
                  <button
                    type="button"
                    onClick={generateQuestion}
                    disabled={isLoading}
                    className={`relative px-4 py-2 rounded-full bg-yellow-300/12 text-white border border-yellow-300/20 transition-colors ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-yellow-300/20'}`}
                  >
                    {isLoading ? 'Generating...' : 'Generate Question'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Large split area */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6">
          <div className="flex">
            <div className="w-1/2 pr-4">
              <div className="h-96 bg-transparent flex items-center justify-center">
                <div className="w-full h-full flex items-start">
                  <div className="w-full p-4">
                    {isLoading ? (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="flex flex-col items-center gap-3">
                          <div className="w-12 h-12 rounded-full border-4 border-white/20 border-t-white animate-spin" />
                          <div className="text-white/60">Generating question...</div>
                        </div>
                      </div>
                    ) : question ? (
                      <div className="text-white">
                        <h3 className="text-lg font-semibold mb-2">{question.title}</h3>
                        <p className="mb-3">{question.body}</p>
                        <div className="bg-white/3 p-3 rounded-md">
                          <div className="text-sm text-white/80">Example:</div>
                          <div className="mt-2 text-sm">
                            <div><strong>Input:</strong> {question.example.input}</div>
                            <div><strong>Output:</strong> {question.example.output}</div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-white/60">Click "Generate Question" to start.</div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* vertical divider */}
            <div className="w-px bg-white/10 mx-2" />

            <div className="w-1/2 pl-4">
              <div className="h-96 bg-transparent">
                {/* code editor area */}
                <div className="w-full h-full bg-black/80 rounded-md p-3 code-scrollbar">
                  <div className="flex h-full relative">
                    {/* line numbers gutter */}
                    <div ref={gutterRef} className="text-white/40 text-xs pr-3 select-none overflow-hidden" style={{ width: 48 }}>
                      {Array.from({ length: lineCount }).map((_, i) => (
                        <div key={i} className="leading-5">{i + 1}</div>
                      ))}
                    </div>

                    {/* textarea */}
                    <textarea
                      ref={textareaRef}
                      value={code}
                      onChange={handleChange}
                      onKeyDown={handleKeyDown}
                      onScroll={handleScroll}
                      className="flex-1 bg-transparent outline-none resize-none text-sm text-white font-mono caret-white p-0 overflow-auto"
                      placeholder="Write your code here..."
                      style={{ minHeight: '100%', lineHeight: '1.2rem' }}
                    />

                    {/* submit button appears after typing */}
                    {code.length > 0 && (
                      <div className="absolute bottom-3 right-3">
                        <button
                          type="button"
                          onClick={() => {
                              // submit: clear both question and code, show correct answer in editor
                              setQuestion(null);
                              setCode('');
                              setCorrectAnswer('correct answer');
                              if (correctTimeoutRef.current) clearTimeout(correctTimeoutRef.current);
                              correctTimeoutRef.current = setTimeout(() => setCorrectAnswer(null), 3000);
                            }}
                          className="px-3 py-1.5 rounded-full bg-green-500/90 text-white text-sm hover:bg-green-500/100 transition"
                        >
                          Submit
                        </button>
                      </div>
                    )}

                    {/* show correct answer centered in editor */}
                    {correctAnswer && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="bg-black/80 p-6 rounded-lg text-white max-w-xs text-center pointer-events-auto">
                          <div className="text-2xl font-semibold tracking-wide">{correctAnswer}</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PractisePage;
