import React from 'react';
import './Modal.css'; // Importa un archivo CSS para los estilos de la ventana modal

function Modal({ imageUrl, onClose }) {
    return (
        <div className="modal-container">
            <div className="modal-content">
                <img src={imageUrl} alt="Foto" className="modal-image" />
                <button className="modal-close-button" onClick={onClose}>
                    Cerrar
                </button>
            </div>
        </div>
    );
}

export default Modal;
