'use client';

export default function Filters() {
  return (
    <>
      <div id="filtersBackdrop" aria-hidden="true" />
      <div className="filtersWrap" id="filtersWrap">
        <select id="filterDay" aria-label="Filter by schedule">
          <option value="">All schedules</option>
          <option value="ST">ST (Sun-Tue)</option>
          <option value="MW">MW (Mon-Wed)</option>
          <option value="AR">AR (Sat-Thu)</option>
        </select>
        <select id="filterStatus" className="desktop-only" aria-label="Filter by course status">
          <option value="">All eligibility</option>
          <option value="eligible">Eligible only</option>
          <option value="blocked">Prereq blocked only</option>
          <option value="gradeA">Grade A only</option>
        </select>
        <select id="filterAvail" aria-label="Filter by availability">
          <option value="">Any availability</option>
          <option value="open">Open seats</option>
          <option value="full">Full</option>
        </select>
        <button className="btn alt mobile-only" id="btnCloseFilters">
          Done
        </button>
        <div className="desk-auth-wrap">
          <button id="btnIRASLoginDesk" className="btn iras" type="button" title="Sign in with IRAS" style={{ display: 'none' }}>
            IRAS Login
          </button>
        </div>
      </div>
    </>
  );
}
