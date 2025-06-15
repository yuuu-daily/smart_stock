import React from 'react';
import styles from './style.module.css';

export const CreateButton = () => {

    return (
        <div className={styles.buttonContainer}>
            <a href="/stock_logs/create">
                新規追加
            </a>
        </div>
    );
};


