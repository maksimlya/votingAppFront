import React from 'react';
import styles from './NavigationItem.module.css';


function handleRedirect(props) {
    props.props.history.push(props.link);

}

const navigationItem = (props) => (

    <li onClick={e=>handleRedirect(props)} className={styles.NavigationItem}>

        <a 
            href={'#'}
            className={props.active ? styles.active : null}>{props.children}</a>
    </li>
);

export default navigationItem;