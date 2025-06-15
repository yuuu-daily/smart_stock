import { FC, useEffect, useRef } from "react";
import { useStockLogsTemplate } from "./useStockLogsTemplate";
import { BaseTableLayout } from "../../../components/organisms/BaseTableLayout/BaseTableLayout";
import { Navigation } from "../../../components/molecules/Navigation/Navigation";
import { CreateButton } from "../../../components/atoms/CreateButton/CreateButton";
import styles from "./style.module.css";
import {ColumnDef} from "@tanstack/react-table";
import {Log} from "../../../Types";

// const columns: ColumnDef<Log>[] = [
//     {header: 'No.', accessorKey: 'id'},
//     {header: '製品ID', accessorKey: 'product_id'},
//     {header: '数量', accessorKey: 'quantity'},
//     // {header: '郵便番号', accessorKey: 'post_code'},
//     // {header: '住所①', accessorKey: 'address1'},
//     // {header: '住所②(建物名)', accessorKey: 'address2'},
//     {header: '届け先名(法人名・会社名)', accessorKey: 'company_name'},
//     {header: 'お名前', accessorKey: 'name'},
//     // {header: '電話番号', accessorKey: 'telephone'},
//     // {header: '発送日', accessorKey: 'export_at'},
//     // {header: 'KintoneレコードURL', accessorKey: 'URL'},
//     // {header: '備考', accessorKey: 'memo'},
//     {header: 'メールアドレス', accessorKey: 'email'},
//     // {header: '進捗', accessorKey: 'progress'},
// ];
const columns: ColumnDef<Log>[] = [
    {header: 'No.', accessorKey: 'id'},
    {header: '製品名', accessorKey: 'title'},
    {header: '数量', accessorKey: 'quantity'},
    {header: '届け先名(法人名・会社名)', accessorKey: 'company_name'},
    {header: 'お名前', accessorKey: 'name'},
    {header: 'メールアドレス', accessorKey: 'email'},
];

export const StockLogsTemplate: FC = () => {
    const {
        selectedBook,
        setSelectedBook,
        logs,
    } = useStockLogsTemplate();
    console.log(logs);
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    return (
        <>
            <Navigation />
            <div className={styles.container}>
                <h1 className={styles.title}>在庫入出庫履歴</h1>
                <CreateButton>新規作成</CreateButton>
                <BaseTableLayout
                    data={logs}
                    columns={columns}
                    selectedBook={selectedBook}
                    onSelect={setSelectedBook}
                />
            </div>
        </>
    );
};
