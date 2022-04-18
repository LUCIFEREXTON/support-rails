import React from 'react'
const Modal = ({children, id}) => {
    return (
        <div 
        className="modal fade new-ticket-container"
        id={id}
        tabIndex="-1"
        aria-labelledby={id} 
        aria-hidden="true" 
        >
            <button type="button" className="close modal-close-btn text-light" data-dismiss="modal" aria-label="Close">X</button>
            <div className="modal-dialog modal-dialog-centered">
                {children}
            </div>
        </div>
    )
}

export default Modal;
