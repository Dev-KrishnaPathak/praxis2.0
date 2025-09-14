import React, { useState, useRef, useEffect } from 'react';

const InterviewPage = () => {
  const [code, setCode] = useState('');
  const textareaRef = useRef(null);
  const gutterRef = useRef(null);
  const timeoutRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [question, setQuestion] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const correctTimeoutRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('Hello this is a mock interview');
  const recognitionRef = useRef(null);
  const finalTranscriptRef = useRef('');

  const handleScroll = () => {
    if (textareaRef.current && gutterRef.current) {
      gutterRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  const generateQuestion = () => {
    setIsLoading(true);
    setQuestion(null);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsLoading(false);
      setQuestion({
        title: 'Question:',
        body: `Given a string, return the index of the first non-repeating character. If it doesn’t exist, return -1.`,
        example: {
          input: '"apple"',
          output: '0'
        }
      });
    }, 2500);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (correctTimeoutRef.current) clearTimeout(correctTimeoutRef.current);
      // stop speech recognition if still running
      if (recognitionRef.current) {
        try { recognitionRef.current.onresult = null; recognitionRef.current.onend = null; recognitionRef.current.stop(); } catch(e){}
        recognitionRef.current = null;
      }
    };
  }, []);

  const initRecognition = () => {
    if (recognitionRef.current) return recognitionRef.current;
    const Rec = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Rec) return null;
    const recog = new Rec();
    recog.lang = 'en-US';
    recog.interimResults = true;
    recog.continuous = true;

    recog.onresult = (e) => {
      let interim = '';
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const res = e.results[i];
        const text = res[0].transcript;
        if (res.isFinal) {
          finalTranscriptRef.current = finalTranscriptRef.current + text + '\n';
        } else {
          interim += text;
        }
      }
      // show final + interim in real-time
      setTranscript((finalTranscriptRef.current || '') + (interim || ''));
    };

    recog.onstart = () => {
      setIsRecording(true);
    };

    recog.onerror = (ev) => {
      console.error('Speech recognition error', ev);
      // surface a simple message in transcript area
      setTranscript((finalTranscriptRef.current || '') + '\n[Speech recognition error]');
      try { recog.stop(); } catch(e){}
      setIsRecording(false);
    };

    recog.onend = () => {
      // keep final transcript but flip recording state
      setIsRecording(false);
      recognitionRef.current = null;
    };

    recognitionRef.current = recog;
    return recog;
  };

  const startRecording = () => {
    const Rec = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Rec) {
      alert('Speech Recognition not supported in this browser. Use Chrome or Edge.');
      return;
    }
    // always create a fresh recognizer to avoid "already started" state issues
    recognitionRef.current = null;
    const recog = initRecognition();
    if (!recog) {
      alert('Failed to initialize Speech Recognition.');
      return;
    }
    finalTranscriptRef.current = '';
    setTranscript('');
    try {
      recog.start();
      // onstart will set isRecording
    } catch (e) {
      console.warn('startRecording error', e);
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch(e) { console.warn(e); }
      // retain final transcript
      setTranscript(finalTranscriptRef.current || transcript);
      recognitionRef.current = null;
    }
    setIsRecording(false);
  };

  const handleChange = (e) => {
    setCode(e.target.value);
  };

  const handleKeyDown = (e) => {
    if ((e.key === 'ArrowDown' || e.key === 'ArrowUp') && code.length === 0) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setCode('\n');
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
  {/* praxis label removed per request */}

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
            {/* Voice mode column (small pane) */}
            <div className="w-64 pl-4">
              <div className="h-96 bg-transparent flex flex-col items-center justify-center gap-4">
                <div className="flex flex-col items-center gap-2 w-full">
                  <button
                    onClick={() => (isRecording ? stopRecording() : startRecording())}
                    className={`w-20 h-20 rounded-full flex items-center justify-center transition-all ${isRecording ? 'bg-red-500 shadow-[0_0_20px_rgba(239,68,68,0.6)]' : 'bg-white/6'}`}
                    aria-label="Toggle recording"
                  >
                    <svg className={`w-10 h-10 ${isRecording ? 'text-white' : 'text-yellow-300'}`} viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 14a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v5a3 3 0 0 0 3 3z" />
                      <path d="M19 11a1 1 0 1 0-2 0 5 5 0 0 1-10 0 1 1 0 1 0-2 0 5 5 0 0 0 4 4.9V20a1 1 0 1 0 2 0v-4.1A5 5 0 0 0 19 11z" />
                    </svg>
                  </button>
                  <div className="text-center text-xs text-white/80">{isRecording ? 'Recording...' : 'Voice Mode'}</div>
                </div>

                <div className="w-full bg-black/70 p-3 rounded-lg text-sm text-white/90 h-48 overflow-auto">
                  <div className="text-xs text-white/60 mb-2">Transcript</div>
                  <div className="whitespace-pre-wrap">{transcript || 'No transcript yet.'}</div>
                </div>

                <div className="w-full flex gap-2">
                  <button onClick={() => { setCode(code + '\n' + (transcript || '')); }} className="flex-1 px-3 py-2 rounded-md bg-white/6 text-white text-sm">Insert</button>
                  <button onClick={() => { setTranscript(''); finalTranscriptRef.current = ''; }} className="px-3 py-2 rounded-md bg-white/6 text-white text-sm">Clear</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default InterviewPage;
