'use client';

export default function AuthBox() {
  return (
    <div id="authBox" className="auth-box">
      <button id="btnIRASLoginHeader" className="btn small iras" type="button" title="Sign in with IRAS">
        IRAS Login
      </button>
      <div id="authInfo" className="auth-info" style={{ display: 'none' }}>
        <span id="authChip" className="auth-chip" title="Signed in" />
        <button id="btnIRASLogout" className="btn alt small" type="button">
          Logout
        </button>
      </div>
    </div>
  );
}
