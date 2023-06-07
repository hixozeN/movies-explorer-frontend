import NavMenu from '../NavMenu/NavMenu';
import './BurgerMenu.css';

const BurgerMenu = () => {
  return (
    <div className='menu'>
      <div className="menu__blur">
        <div className="menu__content">
          <button type='button' aria-label='Закрыть меню' className='menu__close-button' />
          <NavMenu />
        </div>
      </div>
    </div>
  )
}

export default BurgerMenu