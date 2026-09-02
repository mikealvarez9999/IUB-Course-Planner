'use client';

import AuthBox from './AuthBox';
import ThemeToggle from './ThemeToggle';
import nestAuthLogo from '../../assets/icons/IMG_8338.PNG';
const logoDark = '/logos/logo-white.png';
const logoLight = '/logos/logo-black.png';

export default function Header() {
  return (
    <header id="appHeader">
      <div className="brand">
        <div className="logo-wrapper">
          <img className="logo-dark" src={logoDark} alt="IUB Course Planner" />
          <img className="logo-light" src={logoLight} alt="IUB Course Planner" />
        </div>
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
