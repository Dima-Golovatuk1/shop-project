import { useState } from "react";
import "./header.css";

function Header() {
  const [activBurger, setActivBurger] = useState(false);

  function onClickBurger(e) {
    e.preventDefault();
    setActivBurger(true);
  }

  function onCloseBurger() {
    setActivBurger(false);
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
                  className="header__nav__item__btn"
                >
                  <svg className="header__nav__item__link__svg">
                    <use href="../../public/img/svg/symbol-defs.svg#icon-burger"></use>
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
                <a
                  className="header__nav__item__link"
                  href="/cart"
                >
                  <svg className="header__nav__item__link__svg">
                    <use href="../../public/img/svg/symbol-defs.svg#icon-basket"></use>
                  </svg>
                </a>
              </li>
              <li className="header__nav__item">
                <a className="header__nav__item__link" href="{%if user%} /user/login {%else%} /user/register">
                  <svg className="header__nav__item__link__svg">
                    <use href="../../public/img/svg/symbol-defs.svg#icon-user"></use>
                  </svg>
                </a>
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
                <a href="/">Home</a>
              </li>
              <li className="aside__nav__item">
                <a href="/cart">Cart</a>
              </li>
            </ul>
          </nav>
        </aside>
      </div>
    </>
  );
}

export default Header;
