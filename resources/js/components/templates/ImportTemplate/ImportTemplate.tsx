import { FC } from "react";
import { Controller } from "react-hook-form";
import { useImportTemplate } from "./useImportTemplate";

import { BaseTableLayout } from "../../../components/organisms/BaseTableLayout/BaseTableLayout";
import { CommonButton } from "../../../components/atoms/CommonButton/CommonButton";
import { InputFormSection } from "../../../components/molecules/InputFormSection/InputFormSection";

import styles from "./style.module.css";

export const ImportTemplate: FC = () => {
    const {
        control,
        errors,
        handleBarcodeSubmit,
        selectedBook,
        setSelectedBook,
        mode,
        handleModeChange,
        books,
    } = useImportTemplate();

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>在庫インポート</h1>

            <div className={styles.modeToggle}>
                <label>
                    <input type="radio" name="mode" value="in" checked={mode === "in"} onChange={() => handleModeChange("in")} />
                    入庫
                </label>
                <label>
                    <input type="radio" name="mode" value="out" checked={mode === "out"} onChange={() => handleModeChange("out")} />
                    出庫
                </label>
            </div>

            <BaseTableLayout data={books ?? []} selectedBook={selectedBook} onSelect={setSelectedBook} />

            <form className={styles.form} onSubmit={handleBarcodeSubmit}>
                <Controller
                    name="barcode"
                    control={control}
                    render={({ field }) => (
                        <InputFormSection
                            type="text"
                            placeholder="バーコードをスキャン"
                            errorMessage={errors.barcode?.message}
                            {...field}
                        />
                    )}
                />
                <CommonButton type="submit">読み取り</CommonButton>
            </form>
        </div>
    );
};

