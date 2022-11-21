import React from 'react';

const Form = props => {
  const {name, onSubmit, buttonTitle, children} = props;

  return (
    <form id={name} name={name} className={`popup__form popup__form_type_${name}`} onSubmit={onSubmit} >
      {children}
      <button 
        type="submit" 
        className={`popup__submit-button popup__submit-button_type_${name}`}
      >
        {buttonTitle}
      </button>
    </form>
  )
}

export default Form;