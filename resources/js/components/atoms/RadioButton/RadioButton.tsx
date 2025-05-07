
import { FC, ChangeEvent } from "react";
import styles from "./style.module.css";

type RadioButtonProps = {
    name: string;
    value: string;
    checked: boolean;
    label: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const RadioButton: FC<RadioButtonProps> = ({
  name,
  value,
  checked,
  label,
  onChange,
}) => (
    <label className={styles.radioLabel}>
        <input
            type="radio"
            name={name}
            value={value}
            checked={checked}
            onChange={onChange}
            className={styles.radioInput}
        />
        <span className={styles.radioText}>{label}</span>
    </label>
);
