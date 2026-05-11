'use client';

import { useEffect, useRef } from 'react';
import html2canvas from 'html2canvas';
import { initPlannerRuntime } from '../lib/plannerRuntime';
import Header from './Header';
import CoursesPanel from './CoursesPanel';
import PlansPanel from './PlansPanel';

export default function CoursePlanner() {
  const cleanupRef = useRef(null);

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
        <PlansPanel />
      </div>

      <div id="toast" role="status" aria-live="polite" />
    </>
  );
}
