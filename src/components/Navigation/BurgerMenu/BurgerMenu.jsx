import NavMenu from '../NavMenu/NavMenu';
import './BurgerMenu.css';

const BurgerMenu = ({ active, onCloseMenu }) => {
  return (
    <div className={active ? 'menu menu_active' : 'menu'}>
      <div
        className='menu__blur'
        onClick={onCloseMenu}
      >
        <div className='menu__content' onClick={(e) => e.stopPropagation()}>
          <button
            type='button'
            aria-label='Закрыть меню'
            className='menu__close-button'
            onClick={onCloseMenu}
          />
          <NavMenu />
        </div>
      </div>
    </div>
  );
};

export default BurgerMenu;
