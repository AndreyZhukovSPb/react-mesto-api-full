import React from 'react';

const InfoTooltip = props => {
  const { message, type, onClose, isOpen} = props;

  return (
    <div className={`popup ${isOpen ? "popup_opened" : ''}`} >  
      <div className="popup__container">
        <button 
          aria-label="Close" 
          type="button" 
          className="popup__close-button"
          onClick={onClose}
        >
        </button>
        <div className={`toolTip__sign toolTip__sign_type_${type}`} ></div>
        <p className='toolTip__text'>{message}</p>
        
      </div>
    </div>
  )

}

export default InfoTooltip;