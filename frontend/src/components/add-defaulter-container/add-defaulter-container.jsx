import React from 'react';
import Button from '../button/button';
import styles from './add-defaulter.module.css'

const AddDefaulterContainer = ({open}) => {
    
    return ( 
        <div className={styles.AddDefaulterContainer}>
            <Button onClick={open} primary> Add Defaulter </Button>
        </div>
     );
}
 
export default AddDefaulterContainer;