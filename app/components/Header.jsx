'use client';

import AuthBox from './AuthBox';
import ThemeToggle from './ThemeToggle';
import nestAuthLogo from '../../assets/icons/IMG_8338.PNG';

export default function Header() {
  return (
    <header id="appHeader">
      <div className="brand">
        <h1>IUB Course Planner</h1>
        <div className="creator-line">
          <div className="sub">Created with curiosity by Raiyan Bin Rais</div>
          <img className="nest-auth-logo nest-auth-logo-mobile" src={nestAuthLogo.src} alt="IUB NEST auth logo" />
        </div>
      </div>
      <div className="spacer" />

      <AuthBox />
      <ThemeToggle />

      <img className="nest-auth-logo nest-auth-logo-desktop" src={nestAuthLogo.src} alt="IUB NEST auth logo" />
    </header>
  );
}
