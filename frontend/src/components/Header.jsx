import React from 'react';
import headerLogo from '../images/logo1.svg'
import { Link } from 'react-router-dom';


const Header = props => {
  const {title, link, userEmail, onClick} = props;

  return (
    <header className="header page__header">
      <img className="header__logo" src={headerLogo} alt="лого" />
      <div className='header__container'>
        <p className='header__user-email'>{userEmail}</p>
        <Link to={link} className="header__title" onClick={onClick}>{title}</Link>
      </div>
    </header>
  );
}

export default Header;

