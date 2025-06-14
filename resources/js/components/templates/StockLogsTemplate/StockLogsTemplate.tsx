import { FC, useEffect, useRef } from "react";
import { useStockLogsTemplate } from "./useStockLogsTemplate";
import { BaseTableLayout } from "../../../components/organisms/BaseTableLayout/BaseTableLayout";
import { Navigation } from "../../../components/molecules/Navigation/Navigation";
import styles from "./style.module.css";
import {ColumnDef} from "@tanstack/react-table";
import {Product} from "../../../Types";

const columns: ColumnDef<Product>[] = [
    {header: 'No.', accessorKey: 'ID'},
    {header: '郵便番号', accessorKey: 'post_code'},
    {header: '住所①', accessorKey: 'address1'},
    {header: '住所②(建物名)', accessorKey: 'address2'},
    {header: '住所②', accessorKey: 'address2'},
    {header: '届け先名(法人名・会社名)', accessorKey: 'company'},
    {header: 'お名前', accessorKey: 'name'},
    {header: '電話番号', accessorKey: 'telephone'},
    {header: '発送日', accessorKey: 'export_at'},
    {header: 'KintoneレコードURL', accessorKey: 'URL'},
    {header: '備考', accessorKey: 'memo'},
    {header: 'メールアドレス', accessorKey: 'email'},
    {header: '進捗', accessorKey: 'progress'},
];

export const StockLogsTemplate: FC = () => {
    const {
        selectedBook,
        setSelectedBook,
        products,
    } = useStockLogsTemplate();

    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    return (
        <>
            <Navigation />
            <div className={styles.container}>
                <h1 className={styles.title}>在庫入出庫履歴</h1>

                <BaseTableLayout
                    data={products}
                    columns={columns}
                    selectedBook={selectedBook}
                    onSelect={setSelectedBook}
                />
            </div>
        </>
    );
};
