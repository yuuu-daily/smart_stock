import { FC, ComponentProps } from "react";

import styles from "./style.module.css";

type InputFormProps = ComponentProps<"input"> & {
    inputRef?: React.Ref<HTMLInputElement>; // ★追加
};

export const InputForm: FC<InputFormProps> = ({
  disabled = false,
  type = "text",
  value,
  placeholder,
  onChange,
  onKeyDown,
  inputRef, // ★受け取る
}) => (
    <input
        ref={inputRef} // ★ここで使う
        disabled={disabled}
        className={styles.input}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
    />
);
