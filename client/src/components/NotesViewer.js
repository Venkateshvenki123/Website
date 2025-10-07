import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

// Configure worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function NotesViewer({ pdfUrl, onClose }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  return (
    <div className="notes-viewer-overlay" style={{
      position: 'fixed', top: 0, left: 0, right:0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.75)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1500
    }}>
      <div style={{
        backgroundColor: 'white', padding: 20, borderRadius: 8, maxWidth: '90%', maxHeight: '90%',
        display: 'flex', flexDirection: 'column', alignItems: 'center'
      }}>
        <button onClick={onClose} style={{
          alignSelf: 'flex-end', fontSize: 20, cursor: 'pointer', background: 'none', border: 'none'
        }}>Close ✕</button>

        <Document
          file={pdfUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          loading="Loading PDF..."
          error="Failed to load PDF."
        >
          <Page pageNumber={pageNumber} width={600} />
        </Document>

        {numPages && (
          <div style={{ marginTop: 10 }}>
            <button onClick={() => setPageNumber(p => Math.max(p - 1, 1))} disabled={pageNumber <= 1}>
              Prev
            </button>
            <span style={{ margin: '0 10px' }}>Page {pageNumber} of {numPages}</span>
            <button onClick={() => setPageNumber(p => Math.min(p + 1, numPages))} disabled={pageNumber >= numPages}>
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default NotesViewer;
