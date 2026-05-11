'use client';

import Filters from './Filters';
import CourseTable from './CourseTable';

export default function CoursesPanel() {
  return (
    <div className="panel courses" id="coursesPanel">
      <div className="body">
        <h2>Courses</h2>
        <div className="mobile-hint mobile-only small">
          Course list is really long, I'd suggest searching for specific courses instead of scrolling down manually.
        </div>
        <div className="toolbar">
          <input type="text" id="search" placeholder="Search course code/title/faculty" />
          <button className="btn" id="btnToggleFilters" aria-expanded="false" aria-controls="filtersWrap">
            Filters
          </button>
        </div>

        <Filters />

        <div className="row" style={{ gap: '8px', alignItems: 'center', marginTop: '6px' }}>
          <div id="courseRefreshInfo" className="footnote" style={{ marginTop: 0 }} />
          <div id="loadingSpinner" className="loading" style={{ display: 'none' }}>
            <span className="spinner" aria-hidden="true" />
            <span className="small">Loading courses...</span>
          </div>
          <div id="backupBadge" className="pill small" style={{ display: 'none' }}>
            Showing last saved backup
          </div>
        </div>

        <div id="courseError" className="footnote" style={{ display: 'none', color: '#ff4d4f' }} />

        <div className="course-legend" aria-label="Course status legend">
          <div className="legend-item">
            <span className="legend-swatch legend-eligible" aria-hidden="true" /> <span>Eligible</span>
          </div>
          <div className="legend-item">
            <span className="legend-swatch legend-blocked" aria-hidden="true" /> <span>Prerequisite Not Done</span>
          </div>
          <div className="legend-item">
            <span className="legend-swatch legend-gradea" aria-hidden="true" /> <span>Grade A</span>
          </div>
        </div>

        <CourseTable />

        <div className="cards" id="courseCards" aria-live="polite" />
        <div className="footnote">
          Course list can be shown from IRAS when you're signed in. Plans you make are saved locally (temporarily, if you sign out they're gone). I'm currently working to make them stick to your account (will be in future updates, soon).
        </div>
      </div>
    </div>
  );
}
