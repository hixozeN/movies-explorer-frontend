import { useEffect } from "react";
import './Popup.css';

const Popup = ({ isOpen, name, onClose, children }) => {
  useEffect(() => {
    if (!isOpen) return;
    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    }
 
    document.addEventListener('keydown', closeByEscape)
    return () => document.removeEventListener('keydown', closeByEscape)
}, [isOpen, onClose])
 
// создаем обработчик оверлея
  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) {
        onClose();
    }
  }
 
  return (
    <div
      className={`popup ${isOpen ? "popup_opened" : ""} popup_type_${name}`}
      onMouseDown={handleOverlay}
    >
      <div className='popup__content'>
        {children}
        <button
          type="button"
          name="button_form_close"
          id="button_form-add_close"
          className="popup__close-button"
          aria-label="Закрыть"
          onClick={onClose}
        />
      </div>
    </div>
  );
};

export default Popup;