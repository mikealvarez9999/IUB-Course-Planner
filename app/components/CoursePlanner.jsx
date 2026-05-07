'use client';

import { useEffect, useRef } from 'react';
import html2canvas from 'html2canvas';
import { initPlannerRuntime } from '../lib/plannerRuntime';
import nestAuthLogo from '../../assets/icons/IMG_8338.PNG';

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
      <header id="appHeader">
        <div className="brand">
          <h1>IUB Course Planner</h1>
          <div className="creator-line">
            <div className="sub">Created with curiosity by Raiyan Bin Rais</div>
            <img className="nest-auth-logo nest-auth-logo-mobile" src={nestAuthLogo.src} alt="IUB NEST auth logo" />
          </div>
        </div>
        <div className="spacer" />

        <div id="authBox" className="auth-box">
          <button id="btnIRASLoginHeader" className="btn small iras" type="button" title="Sign in with IRAS">IRAS Login</button>
          <div id="authInfo" className="auth-info" style={{ display: 'none' }}>
            <span id="authChip" className="auth-chip" title="Signed in" />
            <button id="btnIRASLogout" className="btn alt small" type="button">Logout</button>
          </div>
        </div>

        <button id="themeToggleBtn" className="theme-switch" aria-label="Toggle theme" title="Toggle theme">
          <span className="ts-icon ts-moon" aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 1 0 9.79 9.79z" />
            </svg>
          </span>
          <span className="ts-icon ts-sun" aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M6.76 4.84l-1.8-1.79L3.17 4.84l1.79 1.79 1.8-1.79zM1 13h3v-2H1v2zm10 10h2v-3h-2v3zm9.83-3.16l-1.79-1.79-1.8 1.79 1.8 1.79 1.79-1.79zM20 11v2h3v-2h-3zM12 1h-2v3h2V1zm6.24 3.84l1.79-1.79-1.79-1.79-1.8 1.79 1.8 1.79zM12 6a6 6 0 100 12 6 6 0 000-12zM4.84 17.24l-1.79 1.79 1.79 1.79 1.79-1.79-1.79-1.79z" />
            </svg>
          </span>
          <span className="ts-knob" aria-hidden="true" />
        </button>

        <img className="nest-auth-logo nest-auth-logo-desktop" src={nestAuthLogo.src} alt="IUB NEST auth logo" />
      </header>

      <div className="container">
        <div className="panel courses" id="coursesPanel">
          <div className="body">
            <h2>Courses</h2>
            <div className="mobile-hint mobile-only small">Course list is really long, I'd suggest searching for specific courses instead of scrolling down manually.</div>
            <div className="toolbar">
              <input type="text" id="search" placeholder="Search course code/title/faculty" />
              <button className="btn" id="btnToggleFilters" aria-expanded="false" aria-controls="filtersWrap">Filters</button>
            </div>

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
              <button className="btn alt mobile-only" id="btnCloseFilters">Done</button>
              <div className="desk-auth-wrap">
                <button id="btnIRASLoginDesk" className="btn iras" type="button" title="Sign in with IRAS" style={{ display: 'none' }}>IRAS Login</button>
              </div>
            </div>

            <div className="row" style={{ gap: '8px', alignItems: 'center', marginTop: '6px' }}>
              <div id="courseRefreshInfo" className="footnote" style={{ marginTop: 0 }} />
              <div id="loadingSpinner" className="loading" style={{ display: 'none' }}>
                <span className="spinner" aria-hidden="true" />
                <span className="small">Loading courses...</span>
              </div>
              <div id="backupBadge" className="pill small" style={{ display: 'none' }}>Showing last saved backup</div>
            </div>

            <div id="courseError" className="footnote" style={{ display: 'none', color: '#ff4d4f' }} />

            <div className="course-legend" aria-label="Course status legend">
              <div className="legend-item"><span className="legend-swatch legend-eligible" aria-hidden="true" /> <span>Eligible</span></div>
              <div className="legend-item"><span className="legend-swatch legend-blocked" aria-hidden="true" /> <span>Prerequisite Not Done</span></div>
              <div className="legend-item"><span className="legend-swatch legend-gradea" aria-hidden="true" /> <span>Grade A</span></div>
            </div>

            <div className="table-wrap" id="tableWrap">
              <table className="table" id="courseTable" role="table" aria-label="Courses">
                <colgroup>
                  <col className="col-course" />
                  <col className="col-sec" />
                  <col className="col-time" />
                  <col className="col-faculty" />
                  <col className="col-title" />
                  <col className="col-seats" />
                  <col className="col-actions" />
                </colgroup>
                <thead>
                  <tr>
                    <th>Course</th>
                    <th>Sec</th>
                    <th>Days/Time</th>
                    <th>Faculty</th>
                    <th>Title</th>
                    <th className="right">Enrolled</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody id="courseTbody">
                  <tr><td colSpan="7" className="small">Loading courses...</td></tr>
                </tbody>
              </table>
            </div>

            <div className="cards" id="courseCards" aria-live="polite" />
            <div className="footnote">Course list can be shown from IRAS when you're signed in. Plans you make are saved locally (temporarily, if you sign out they're gone). I'm currently working to make them stick to your account (will be in future updates, soon).</div>
          </div>
        </div>

        <div className="panel" id="planPanel">
          <div className="body">
            <h2>Plans</h2>
            <div className="row" style={{ marginBottom: '8px' }}>
              <div className="plans" id="plans" />
              <button className="btn plan new" id="btnQuickAddPlan" title="New plan">+ New Plan</button>
            </div>
            <div className="row" style={{ marginBottom: '8px' }}>
              <input type="text" id="newPlanName" placeholder="New plan name (optional)" />
              <button className="btn accent" id="btnAddPlan">Add Plan</button>
              <button className="btn" id="btnRenamePlan">Rename</button>
              <button className="btn" id="btnDuplicatePlan">Duplicate</button>
              <button className="btn danger" id="btnDeletePlan">Delete</button>
            </div>

            <div style={{ borderTop: '1px solid var(--border)', margin: '10px 0' }} />

            <div className="legend">
              <div className="pill">A: Sat</div>
              <div className="pill">S: Sun</div>
              <div className="pill">M: Mon</div>
              <div className="pill">T: Tue</div>
              <div className="pill">W: Wed</div>
              <div className="pill">R: Thu</div>
            </div>

            <div className="plan-title" id="planTitle">Plan A</div>
            <div className="day-tabs" id="dayTabs" aria-label="Select day" />
            <div className="schedule desktop" id="schedule" />
            <div className="m-schedule" id="mSchedule" style={{ display: 'none' }} />

            <div style={{ marginTop: '12px' }}>
              <div className="row" style={{ justifyContent: 'space-between' }}>
                <div className="small">Conflicts are prevented on add.</div>
                <button className="btn" id="btnExportPlan">Export this plan (JPG)</button>
                <button className="btn" id="btnClearActive">Clear active plan</button>
              </div>
              <div className="section-list" id="planList" style={{ marginTop: '8px' }} />
            </div>
          </div>
        </div>
      </div>

      <div id="toast" role="status" aria-live="polite" />
    </>
  );
}
