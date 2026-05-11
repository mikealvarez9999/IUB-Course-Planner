'use client';

import { useEffect, useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { initPlannerRuntime } from '../lib/plannerRuntime';
import Header from './Header';
import CoursesPanel from './CoursesPanel';
import PlansPanel from './PlansPanel';

export default function CoursePlanner() {
  const cleanupRef = useRef(null);
  const [isPlanOpen, setIsPlanOpen] = useState(false);

  useEffect(() => {
    cleanupRef.current = initPlannerRuntime(html2canvas);
    return () => {
      if (typeof cleanupRef.current === 'function') {
        cleanupRef.current();
      }
    };
  }, []);

  return (
    <>
      <Header />

      <div className="container">
        <CoursesPanel />
        <PlansPanel isMobileOpen={isPlanOpen} onClose={() => setIsPlanOpen(false)} />
      </div>

      {/* Sticky Bottom Bar for Mobile */}
      <div className="mobile-bottom-bar mobile-only">
        <button className="btn accent" onClick={() => setIsPlanOpen(true)} style={{flex: 1}}>
          View Current Plan
        </button>
        <button 
          className="btn" 
          onClick={() => {
            const expBtn = document.getElementById('btnExportPlan');
            if(expBtn) expBtn.click();
          }}
        >
          Export
        </button>
      </div>

      {/* Drawer Overlay Backdrop */}
      {isPlanOpen && (
        <div className="drawer-backdrop mobile-only" onClick={() => setIsPlanOpen(false)} />
      )}

      <div id="toast" role="status" aria-live="polite" />
    </>
  );
}
