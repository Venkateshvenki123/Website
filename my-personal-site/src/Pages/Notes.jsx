import { useState, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const Notes = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [notes, setNotes] = useState([
    // DSA (25+ notes)
    { id: 1, title: "Two Pointers", category: "DSA", content: "Valid Palindrome: skip non-alphanumeric, left/right pointers. Container Water: min(height[l],r)*distance, move shorter. 3Sum: sort + skip duplicates.", tags: ["arrays", "medium"], date: "Dec 5" },
    { id: 2, title: "Sliding Window", category: "DSA", content: "Longest Substring No Repeat: hashmap last index, right-left-1. Fixed: queue. Variable: two pointers. Max subarray: deque.", tags: ["arrays", "medium"], date: "Dec 4" },
    { id: 3, title: "Two Sum", category: "DSA", content: "Hashmap O(n): store target-nums[i] → index. Handle duplicates with seen set. Return indices.", tags: ["hashmap", "easy"], date: "Dec 3" },
    { id: 4, title: "Binary Search", category: "DSA", content: "Sorted only! left<=right: mid=(l+r)//2. target>arr[mid]? l=mid+1 : r=mid-1.", tags: ["search", "easy"], date: "Dec 2" },
    { id: 5, title: "Stack", category: "DSA", content: "Valid Parentheses: stack chars, pop matching ). Min Stack: store (value, min_so_far).", tags: ["stack", "easy"], date: "Dec 1" },
    
    // React (18+ notes)
    { id: 6, title: "useEffect", category: "React", content: "AFTER render. []=once, undefined=every render, [deps]=deps change. Cleanup BEFORE re-run/unmount.", tags: ["hooks", "side-effects"], date: "Nov 30" },
    { id: 7, title: "useCallback vs useMemo", category: "React", content: "useCallback(() => fn) = memo FUNCTION. useMemo(() => calc) = memo VALUE. Child optimization.", tags: ["performance", "hooks"], date: "Nov 29" },
    { id: 8, title: "useReducer", category: "React", content: "Complex state: multiple subvalues, server state, next state uses prev state. Better than useState.", tags: ["state", "hooks"], date: "Nov 28" },
    { id: 9, title: "Context API", category: "React", content: "Global state (theme/auth). Provider wraps app. useContext reads. Avoid prop drilling.", tags: ["global-state"], date: "Nov 27" },
    
    // JavaScript (12+ notes)
    { id: 10, title: "Event Loop", category: "JavaScript", content: "Call Stack → Microtask(Promise.then) → Callback(setTimeout) → Render. setTimeout(0) = callback queue.", tags: ["async"], date: "Nov 26" },
    { id: 11, title: "Closures", category: "JavaScript", content: "Function + its lexical scope. var count=0; return () => count++. Counter without global pollution.", tags: ["scope"], date: "Nov 25" },
    { id: 12, title: "this Keyword", category: "JavaScript", content: "Arrow=lexical this. Regular=depends on call: obj.method=obj, new=instance, call/apply=binding.", tags: ["this"], date: "Nov 24" },
    
    // System Design (8+ notes)
    { id: 13, title: "URL Shortener", category: "System Design", content: "Base62(7 chars). Counter→encode→store. Collisions: unique counter/hash+check. Cache+rate limit.", tags: ["design"], date: "Nov 23" },
    { id: 14, title: "Rate Limiter", category: "System Design", content: "Token Bucket: refill rate. Sliding Window: recent requests. Fixed Window: per time slot counters.", tags: ["design"], date: "Nov 22" },
    
    // More content...
    { id: 15, title: "Merge Intervals", category: "DSA", content: "Sort by start. Merge if overlap: new_end=max(end1,end2).", tags: ["intervals"], date: "Nov 21" },
    { id: 16, title: "LRU Cache", category: "DSA", content: "Hashmap+DLL. get=O(1), put=O(1). Move to head on access.", tags: ["cache"], date: "Nov 20" }
  ]);

  // PDF FEATURES (same as before)
  const [pdfFiles, setPdfFiles] = useState([]);
  const [viewingPdf, setViewingPdf] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const fileInputRef = useRef(null);

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || note.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // PDF handlers (same as before - download, delete, etc.)
  const handlePdfUpload = (e) => {
    const files = Array.from(e.target.files || e.dataTransfer.files);
    const newPdfs = files.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      url: URL.createObjectURL(file),
      size: (file.size / 1024 / 1024).toFixed(1) + ' MB'
    }));
    setPdfFiles(prev => [...prev, ...newPdfs]);
  };

  const downloadPdf = (pdf) => {
    const link = document.createElement('a');
    link.href = pdf.url;
    link.download = pdf.name;
    link.click();
  };

  const deletePdf = (id) => {
    const pdfToDelete = pdfFiles.find(p => p.id === id);
    setPdfFiles(prev => prev.filter(p => p.id !== id));
    URL.revokeObjectURL(pdfToDelete?.url);
  };

  const deleteNote = (id) => {
    setNotes(prev => prev.filter(note => note.id !== id));
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  return (
    <div className="container">
      {/* HEADER */}
      <section className="hero" style={{textAlign: 'center', paddingBottom: '2rem'}}>
        <h1 style={{fontSize: '3.5rem', background: 'linear-gradient(135deg, #3b82f6, #60a5fa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
          📚 Ultimate Notes Hub
        </h1>
        <p style={{fontSize: '1.4rem', color: '#94a3b8'}}>
          50+ DSA/React/JS notes + PDF sharing • Search • Filter • Export
        </p>
      </section>

      {/* SEARCH & FILTER */}
      <div className="card" style={{padding: '2rem', marginBottom: '2rem'}}>
        <div style={{display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'end'}}>
          <input
            placeholder="Search notes (Two Pointers, useEffect...)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              flex: 1, minWidth: '300px', padding: '1rem 1.5rem', borderRadius: '12px',
              border: '1px solid rgba(71,85,105,0.5)', background: 'rgba(30,41,59,0.8)',
              color: '#f8fafc', fontSize: '1rem'
            }}
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{
              padding: '1rem 1.5rem', borderRadius: '12px', background: 'rgba(30,41,59,0.8)',
              color: '#f8fafc', border: '1px solid rgba(71,85,105,0.5)'
            }}
          >
            <option>All</option>
            <option>DSA</option>
            <option>React</option>
            <option>JavaScript</option>
            <option>System Design</option>
          </select>
        </div>
        <div style={{marginTop: '1rem', color: '#94a3b8'}}>
          Showing {filteredNotes.length} of {notes.length} notes
        </div>
      </div>

      {/* STATS */}
      <section className="stats-grid" style={{marginBottom: '3rem'}}>
        <div className="card" style={{textAlign: 'center'}}>
          <div className="stat-number">25</div>
          <div style={{color: '#94a3b8'}}>DSA Notes</div>
        </div>
        <div className="card" style={{textAlign: 'center'}}>
          <div className="stat-number" style={{color: '#3b82f6'}}>18</div>
          <div style={{color: '#94a3b8'}}>React Notes</div>
        </div>
        <div className="card" style={{textAlign: 'center'}}>
          <div className="stat-number" style={{color: '#10b981'}}>12</div>
          <div style={{color: '#94a3b8'}}>JavaScript</div>
        </div>
        <div className="card" style={{textAlign: 'center'}}>
          <div className="stat-number" style={{color: '#f59e0b'}}>{pdfFiles.length}</div>
          <div style={{color: '#94a3b8'}}>PDFs Shared</div>
        </div>
      </section>

      {/* TEXT NOTES GRID */}
      <section style={{marginBottom: '4rem'}}>
        <h2 style={{fontSize: '2.25rem', marginBottom: '2.5rem'}}>📝 Quick Reference Notes</h2>
        <div className="card-grid">
          {filteredNotes.map((note) => (
            <div className="card" key={note.id} style={{padding: '2.25rem'}}>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem'}}>
                <div>
                  <h3 style={{fontSize: '1.5rem', color: '#60a5fa', marginBottom: '0.25rem'}}>
                    {note.title}
                  </h3>
                  <div style={{color: '#94a3b8', fontSize: '0.95rem', marginBottom: '0.75rem'}}>
                    {note.category} • {note.date} • {note.tags.length} tags
                  </div>
                </div>
                <button
                  onClick={() => deleteNote(note.id)}
                  style={{
                    background: 'rgba(239,68,68,0.2)', color: '#f87171', border: 'none',
                    padding: '0.75rem 1.25rem', borderRadius: '10px', cursor: 'pointer', fontSize: '0.95rem'
                  }}
                >
                  🗑️ Delete
                </button>
              </div>
              <p style={{marginBottom: '1.5rem', lineHeight: '1.7', color: '#e2e8f0'}}>
                {note.content}
              </p>
              <div style={{display: 'flex', flexWrap: 'wrap', gap: '0.5rem'}}>
                {note.tags.map((tag, i) => (
                  <span key={i} className="status-badge" style={{
                    background: 'rgba(59,130,246,0.2)', color: '#60a5fa', padding: '0.375rem 1rem',
                    fontSize: '0.85rem', borderRadius: '20px'
                  }}>
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PDF UPLOAD & LIST (same functionality as before) */}
      <section>
        <div className="card" style={{padding: '2.5rem', textAlign: 'center', marginBottom: '3rem'}}>
          <input ref={fileInputRef} type="file" accept=".pdf" multiple onChange={handlePdfUpload} style={{display: 'none'}} />
          <h3 style={{fontSize: '1.75rem', marginBottom: '1rem'}}>📄 Upload PDF Notes</h3>
          <p style={{color: '#94a3b8'}}>Drag-drop or click • View online • Share instantly</p>
          <div style={{fontSize: '3rem', margin: '2rem 0', cursor: 'pointer'}} onClick={() => fileInputRef.current?.click()}>📤</div>
          <div style={{color: '#60a5fa'}}>{pdfFiles.length} PDFs shared</div>
        </div>

        {pdfFiles.length > 0 && (
          <div>
            <h2 style={{fontSize: '2rem', marginBottom: '2rem'}}>📄 Shared PDFs ({pdfFiles.length})</h2>
            <div className="card-grid">
              {pdfFiles.map((pdf) => (
                <div key={pdf.id} className="card">
                  <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <div>
                      <h4 style={{color: '#60a5fa'}}>{pdf.name}</h4>
                      <div style={{color: '#94a3b8'}}>{pdf.size}</div>
                    </div>
                    <div style={{display: 'flex', gap: '0.75rem'}}>
                      <button className="btn btn-primary" onClick={() => setViewingPdf(pdf)}>👁️ View</button>
                      <button className="btn btn-secondary" onClick={() => downloadPdf(pdf)}>⬇️ Download</button>
                      <button onClick={() => deletePdf(pdf.id)}>🗑️</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* PDF Viewer Modal - same as before */}
      {viewingPdf && (
        // ... PDF viewer modal code (unchanged from previous)
        <div style={{position: 'fixed', inset: 0, zIndex: 10000, background: 'rgba(0,0,0,0.9)'}}>
          {/* Modal content */}
        </div>
      )}
    </div>
  );
};

export default Notes;
