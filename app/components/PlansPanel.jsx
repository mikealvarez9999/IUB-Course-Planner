'use client';

import DayTabs from './DayTabs';
import Schedule from './Schedule';

export default function PlansPanel() {
  return (
    <div className="panel" id="planPanel">
      <div className="body">
        <h2>Plans</h2>
        <div className="row" style={{ marginBottom: '8px' }}>
          <div className="plans" id="plans" />
          <button className="btn plan new" id="btnQuickAddPlan" title="New plan">
            + New Plan
          </button>
        </div>
        <div className="row" style={{ marginBottom: '8px' }}>
          <input type="text" id="newPlanName" placeholder="New plan name (optional)" />
          <button className="btn accent" id="btnAddPlan">
            Add Plan
          </button>
          <button className="btn" id="btnRenamePlan">
            Rename
          </button>
          <button className="btn" id="btnDuplicatePlan">
            Duplicate
          </button>
          <button className="btn danger" id="btnDeletePlan">
            Delete
          </button>
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

        <div className="plan-title" id="planTitle">
          Plan A
        </div>
        <DayTabs />
        <Schedule />

        <div style={{ marginTop: '12px' }}>
          <div className="row" style={{ justifyContent: 'space-between' }}>
            <div className="small">Conflicts are prevented on add.</div>
            <button className="btn" id="btnExportPlan">
              Export this plan (JPG)
            </button>
            <button className="btn" id="btnClearActive">
              Clear active plan
            </button>
          </div>
          <div className="section-list" id="planList" style={{ marginTop: '8px' }} />
        </div>
      </div>
    </div>
  );
}
