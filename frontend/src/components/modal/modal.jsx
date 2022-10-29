import React, { useContext } from 'react';
import ModalContext from '../../store/modal'
import Button from '../button/button';
import styles from './modal.module.css'
import {ReactComponent as Close } from '../../icons/close.svg'

const Modal = ({children}) => {
    const {ref, setIsComponentVisible } = useContext(ModalContext)
    return ( 
        <div className={styles.modal}>    
            <div ref={ref} className={styles.modalDialog}>
                <Button className={styles.closeButton} onClick={() => setIsComponentVisible((isOpen) => !isOpen)} >
                    <Close />
                </Button>
                {children}
            </div>
        </div>
     );
}
 
export default Modal;