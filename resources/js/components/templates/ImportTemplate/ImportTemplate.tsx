
import { FC } from "react";
import { Controller } from "react-hook-form";
import { useImportTemplate } from "./useImportTemplate";

import { StockTable } from "@/components/organisms/StockTable";
import { CommonButton } from "@/components/atoms/CommonButton";
import { InputFormSection } from "@/components/molecules/InputFormSection";
import { RadioGroup } from "@/components/molecules/RadioGroup";
import { Title } from "@/components/atoms/Title";

import styles from "./style.module.css";

export const ImportPage: FC = () => {
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
            <Title>在庫インポート</Title>

            <RadioGroup mode={mode} onModeChange={handleModeChange} />

            <StockTable
                books={books}
                selectedBook={selectedBook}
                onSelect={setSelectedBook}
            />

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
