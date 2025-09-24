import { useState} from "react";
import { Link, useNavigate  } from "react-router-dom";
import "./header.css";
import Registration from "../registration/registration";

function Header({ setActivLoginForm , dataAuthenticated, setActivCart }) {
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
              <li className="header__nav__item">
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
                  <button onClick={homeClick}>
                  <svg className="header__nav__item__button__svg">
                    <use href="../../public/img/svg/symbol-defs.svg#icon-user"></use>
                  </svg>
                </button>
              </li>
              <li className="header__nav__item">
                <form className="header__nav__item__form">
                  <input
                    className="header__nav__item__form__input"
                    type="text"
                  />
                  <button className="header__nav__item__form__btn">
                    Search
                  </button>
                </form>
              </li>
              <li className="header__nav__item">
                <button
                  onClick={onCloseCart}
                  className="header__nav__item__button"
                >
                  <svg className="header__nav__item__button__svg">
                    <use href="../../public/img/svg/symbol-defs.svg#icon-basket"></use>
                  </svg>
                </button>
              </li>
              <li className="header__nav__item">
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
                <Link to={`/`}>Home</Link>
              </li>
              <li className="aside__nav__item">
                                <button
                  onClick={onCloseCart}
                  className="header__nav__item__button"
                >Cart</button>
              </li>
            </ul>
          </nav>
        </aside>
      </div>
    </>
  );
}

export default Header;