// import { FC, useEffect, useRef } from "react";
// import { Controller } from "react-hook-form";
// import { useImportTemplate } from "./useImportTemplate";
// import { BaseTableLayout } from "../../../components/organisms/BaseTableLayout/BaseTableLayout";
// import { CommonButton } from "../../../components/atoms/CommonButton/CommonButton";
// import { InputFormSection } from "../../../components/molecules/InputFormSection/InputFormSection";
// import { Navigation } from "../../../components/molecules/Navigation/Navigation";
// import { Inertia } from '@inertiajs/inertia';
// import {router, useForm} from '@inertiajs/react';
// import styles from "./style.module.css";
//
// export const ImportTemplate: FC = () => {
//     const {
//         control,
//         errors,
//         // handleBarcodeSubmit,
//         selectedBook,
//         setSelectedBook,
//         mode,
//         handleModeChange,
//         products,
//         // barcodeInputRef,
//     } = useImportTemplate();
//
//     const inputRef = useRef<HTMLInputElement | null>(null);
//
//     const form = useForm({
//         barcode: '',
//         mode: mode, // 0: 入庫, 1: 出庫
//     });
//
//     useEffect(() => {
//         inputRef.current?.focus();
//     }, []);
//
//     const handleBarcodeSubmit = (e?: React.FormEvent) => {
//         if (e) e.preventDefault();
//         console.log("送信データ:", form.data);
//         if (!form.data.barcode) return;
//         console.log("送信データ:", form.data);
//         form.post(route('stock.scan'), {
//             preserveScroll: true,
//             onSuccess: () => {
//                 // toaster.success("出庫処理が完了しました");
//                 form.setData('barcode', '');
//                 inputRef.current?.focus();
//             },
//             onError: () => {
//                 // toaster.error("出庫に失敗しました");
//                 inputRef.current?.focus();
//             },
//         });
//     };
//
//     return (
//         <>
//             <Navigation></Navigation>
//             <div className={styles.container}>
//                 <h1 className={styles.title}>在庫一覧</h1>
//                 <div className={styles.modeToggle}>
//                     <label>
//                         <input type="radio" name="mode" value="0" checked={mode === 0} onChange={() => handleModeChange(0)} />
//                         入庫
//                     </label>
//                     <label>
//                         <input type="radio" name="mode" value="1" checked={mode === 1} onChange={() => handleModeChange(1)} />
//                         出庫
//                     </label>
//                 </div>
//
//                 <BaseTableLayout data={products ?? []} selectedBook={selectedBook} onSelect={setSelectedBook} />
//
//                 <form className={styles.form} onSubmit={handleBarcodeSubmit}>
//                     <Controller
//                         name="barcode"
//                         control={control}
//                         render={({ field }) => (
//                             <InputFormSection
//                                 type="text"
//                                 inputRef={inputRef}
//                                 placeholder="バーコードをスキャン"
//                                 errorMessage={errors.barcode?.message}
//                                 {...field}
//                                 onChange={(e) => {
//                                     console.log("バーコード:", e.target.value); // ← ★ここ
//                                     field.onChange(e); // ← react-hook-formの内部状態を更新
//                                 }}
//                                 onKeyDown={(e) => {
//                                     if (e.key === "Enter") {
//                                         e.preventDefault();
//                                         handleBarcodeSubmit();
//                                         setTimeout(() => {
//                                             field.onChange(""); // 入力リセット
//                                             inputRef.current?.focus(); // 再フォーカス
//                                         }, 100);
//                                     }
//                                 }}
//                             />
//                         )}
//                     />
//                     <CommonButton type="submit">読み取り</CommonButton>
//                 </form>
//             </div>
//         </>
//     );
// };

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
                    <CommonButton type="submit">読み取り</CommonButton>
                </form>
            </div>
        </>
    );
};
