import React, { FC } from 'react';
import styles from './style.module.css';

type CreateButtonProps = {
    onClick?: () => void;
    children?: React.ReactNode;
};

export const CreateButton: FC<CreateButtonProps> = ({ onClick, children }) => {
    return (
        <button type="button" className={styles.buttonContainer} onClick={onClick}>
            {children ?? '新規追加'}
        </button>
    );
};



