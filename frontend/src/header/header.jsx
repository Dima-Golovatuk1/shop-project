import { useState} from "react";
import { Link, useNavigate  } from "react-router-dom";
import "./header.css";
import Registration from "../registration/registration";

function Header({ setActivLoginForm , dataAuthenticated, setActivCart}) {
  const [searchValue, setSearchValue] = useState('');
  const [activBurger, setActivBurger] = useState(false);
  const navigate = useNavigate();
  console.log(dataAuthenticated);

  function onClickBurger(e) {
    e.preventDefault();
    setActivBurger(true);
  }

  function onCloseBurger() {
    setActivBurger(false);
  }

  function onCloseCart(){
    setActivCart(true)
  }

  function homeClick() {
    navigate('/'); 
  }

  function onSearchProduct(e) {
    e.preventDefault();
    
    if (!searchValue.trim()) {
        return;
    }
    
    navigate(`/search?q=${encodeURIComponent(searchValue.trim())}`);
  }

  function userClick() {
    if (dataAuthenticated){
      navigate('/profile'); 
    } else {
      setActivLoginForm(true)
    }
  }

  return (
    <>
      <header>
        <div className="container">
          <nav className="header__nav">
            <ul className="header__nav__list">
              <li className="header__nav__item header__nav__item--burger">
                <button
                  onClick={onClickBurger}
                  id="header-burger"
                  className="header__nav__item__button"
                >
                  <svg className="header__nav__item__button__svg">
                    <use href="../../public/img/svg/symbol-defs.svg#icon-burger"></use>
                  </svg>
                </button>
              </li>

              <li className="header__nav__item">
                <button onClick={homeClick} className="header__nav__item__button">
                  <svg className="header__nav__item__button__svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                    <polyline points="9,22 9,12 15,12 15,22"/>
                  </svg>
                </button>
              </li>

              <li className="header__nav__item">
                <form onSubmit={onSearchProduct} className="header__nav__item__form">
                  <input
                    className="header__nav__item__form__input"
                    type="text"
                    placeholder="Search..."
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                  />
                  <button className="header__nav__item__form__btn">
                    Search
                  </button>
                </form>
              </li>

              <li className="header__nav__item header__nav__item--desktop">
                <button
                  onClick={onCloseCart}
                  className="header__nav__item__button"
                >
                  <svg className="header__nav__item__button__svg">
                    <use href="../../public/img/svg/symbol-defs.svg#icon-basket"></use>
                  </svg>
                </button>
              </li>

              <li className="header__nav__item header__nav__item--desktop">
                <button onClick={userClick} className="header__nav__item__button">
                  <svg className="header__nav__item__button__svg">
                    <use href="../../public/img/svg/symbol-defs.svg#icon-user"></use>
                  </svg>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <div
        id="aside-backdrop"
        className={`backdrop ${activBurger ? "" : "is-hidden"}`}
      >
        <aside className="aside">
          <button
            id="aside-close"
            className="aside__btn-close"
            onClick={onCloseBurger}
          >
            <svg className="aside__btn-close__icon">
              <use href="../../public/img/svg/symbol-defs.svg#icon-close"></use>
            </svg>
          </button>
          <nav className="aside__nav">
            <ul className="aside__nav__list">
              <li className="aside__nav__item">
                <Link to={`/`}>Catalog</Link>
              </li>
              <li className="aside__nav__item">
                <button onClick={onCloseCart}>
                  Cart
                </button>
              </li>
              <li className="aside__nav__item">
                <button onClick={userClick}>
                  {dataAuthenticated ? 'Profile' : 'Login'}
                </button>
              </li>
            </ul>
          </nav>
        </aside>
      </div>
    </>
  );
}

export default Header;