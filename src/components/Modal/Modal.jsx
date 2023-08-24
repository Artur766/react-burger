import React from 'react';

const modalRoot = document.getElementById("react-modals");

function Modal() {
  return React.ReactDOM.createPortal(
    (
      <div style={{ width: 1000 }}>
        Modal
      </div>
    ),
    modalRoot
  )
}

export default Modal;