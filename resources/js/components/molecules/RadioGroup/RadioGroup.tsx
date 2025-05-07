import { FC } from "react";
import { RadioButton } from "../../atoms/RadioButton";
import styles from "./style.module.css";

type RadioGroupProps = {
    mode: string;
    onModeChange: (mode: string) => void;
};

export const RadioGroup: FC<RadioGroupProps> = ({ mode, onModeChange }) => (
    <div className={styles.radioGroup}>
        <RadioButton
            name="mode"
            value="in"
            checked={mode === "in"}
            label="入庫"
            onChange={() => onModeChange("in")}
        />
        <RadioButton
            name="mode"
            value="out"
            checked={mode === "out"}
            label="出庫"
            onChange={() => onModeChange("out")}
        />
    </div>
);
