import React from 'react';
import styles from './button.module.css'
import 'font-awesome/css/font-awesome.min.css'
import cn  from 'classnames'
import { Link } from 'react-router-dom'

const LinkButton = ({href, children, ...props}) => {
    return ( 
        <Link to={href} {...props}>{children}</Link>
     );
}

const BaseButton = ({type="button", children, ...props}) => {
    return ( 
        <button type={type} {...props}> {children} </button>
     );
}
 

 



const Button = ({children, className, isLoading=false,primary,warning, ...props}) => {
    const Comp = props.href ? LinkButton : BaseButton
    return ( 
        <Comp 
            className={cn(
                
                styles.button, 
                primary && styles.primary,
                warning && styles.warning,
                className
                )}   
                
                {...props}>

            
                
            {isLoading && <i className={cn("fa fa-spinner fa-spin", styles.fa)}></i>}
            {children}
        </Comp>
     );
}
 
export default Button;