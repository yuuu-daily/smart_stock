import { FC, ReactNode } from "react";
import styles from "./style.module.css";

type TitleProps = {
    children: ReactNode;
};

export const Title: FC<TitleProps> = ({ children }) => (
    <h1 className={styles.title}>{children}</h1>
);
