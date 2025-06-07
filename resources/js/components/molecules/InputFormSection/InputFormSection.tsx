import { FC, ComponentProps } from "react";
import { InputForm } from "../../atoms/InputForm/InputForm";
import styles from "./style.module.css";

type InputFormSectionProps = ComponentProps<"input"> & {
    errorMessage?: string;
    inputRef?: React.Ref<HTMLInputElement>;
};

export const InputFormSection: FC<InputFormSectionProps> = (props) => (
    <>
        <InputForm
            placeholder={"Title"}
            {...props}
            inputRef={props.inputRef} // ★渡す
        />
        {props?.errorMessage && (
            <p className={styles.error}>{props.errorMessage}</p>
        )}
    </>
);
