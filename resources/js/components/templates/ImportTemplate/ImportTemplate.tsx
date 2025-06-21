import { FC, useEffect, useRef } from "react";
import { useImportTemplate } from "./useImportTemplate";
import { BaseTableLayout } from "../../../components/organisms/BaseTableLayout/BaseTableLayout";
import { CommonButton } from "../../../components/atoms/CommonButton/CommonButton";
import { InputFormSection } from "../../../components/molecules/InputFormSection/InputFormSection";
import { Navigation } from "../../../components/molecules/Navigation/Navigation";
import { Product } from '../../../Types/index'; // 例：共通型から
import {ColumnDef} from "@tanstack/react-table";
import styles from "./style.module.css";

const columns: ColumnDef<Product>[] = [
    {header: '書籍名', accessorKey: 'title'},
    {header: 'JANコード', accessorKey: 'barcode_jan'},
    {header: 'ISBN', accessorKey: 'isbn'},
    {header: '在庫数', accessorKey: 'stock'},
];

export const ImportTemplate: FC = () => {
    const {
        form,
        handleBarcodeSubmit,
        selectedBook,
        setSelectedBook,
        mode,
        handleModeChange,
        products,
    } = useImportTemplate();

    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    return (
        <>
            <Navigation />
            <div className={styles.container}>
                <h1 className={styles.title}>在庫一覧</h1>

                <div className={styles.modeToggle}>
                    <label>
                        <input
                            type="radio"
                            name="mode"
                            value="0"
                            checked={mode === 0}
                            onChange={() => handleModeChange(0)}
                        />
                        入庫
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="mode"
                            value="1"
                            checked={mode === 1}
                            onChange={() => handleModeChange(1)}
                        />
                        出庫
                    </label>
                </div>

                <BaseTableLayout
                    data={products}
                    columns={columns}
                    selectedBook={selectedBook}
                    onSelect={setSelectedBook}
                />

                <form className={styles.form} onSubmit={handleBarcodeSubmit}>
                    <InputFormSection
                        type="text"
                        inputRef={inputRef}
                        placeholder="バーコードをスキャン"
                        value={form.data.barcode}
                        onChange={(e) => form.setData('barcode', e.target.value)}
                        errorMessage={form.errors.barcode}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                handleBarcodeSubmit();
                                setTimeout(() => {
                                    form.setData('barcode', '');
                                    inputRef.current?.focus();
                                }, 100);
                            }
                        }}
                    />
                    <div className={styles.buttonContainer}>
                        <CommonButton type="submit">読み取り</CommonButton>
                    </div>
                </form>
            </div>
        </>
    );
};
