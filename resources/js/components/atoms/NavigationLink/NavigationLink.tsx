import { Link } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import { FC } from 'react';
import styles from './style.module.css';

type NavigationLinkProps = {
    title: string;
    linkPath: string;
};

export const NavigationLink: FC<NavigationLinkProps> = ({ title, linkPath }) => {
    const currentUrl = usePage().url;

    return (
        <li className={styles.li}>
            <Link
                href={linkPath}
                className={`${styles.link} ${currentUrl === linkPath ? styles.linkActive : ''}`}
            >
                {title}
            </Link>
        </li>
    );
};


