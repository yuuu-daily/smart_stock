import { FC, useEffect, useRef } from "react";
import { useStockLogsTemplate } from "./useStockLogsTemplate";
import { BaseTableLayout } from "../../../components/organisms/BaseTableLayout/BaseTableLayout";
import { Navigation } from "../../../components/molecules/Navigation/Navigation";
import { CreateButton } from "../../../components/atoms/CreateButton/CreateButton";
import styles from "./style.module.css";
import {ColumnDef} from "@tanstack/react-table";
import {Log} from "../../../Types";
import myutils from '../../../myutils';

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
    {header: 'No.', accessorKey: 'id', meta: { thClass: styles.thSm }},
    {header: '書籍名', accessorKey: 'title'},
    {header: '数量', accessorKey: 'quantity', meta: { thClass: styles.thMd1 }},
    {
        header: '出/入庫',
        accessorKey: 'status',
        meta: { thClass: styles.thMd1 },
        cell: info => {
            const status = info.row.original.status;
            const label = status === 0 ? '入庫' : '出庫';
            const badgeClass = status === 0 ? styles.badgeGreen : styles.badgeRed;

            return <span className={`${styles.badge} ${badgeClass}`}>{label}</span>;
        }
    },
    {header: '届け先名(法人名・会社名)', accessorKey: 'company_name', meta: { thClass: styles.thWide }},
    {header: '住所①', accessorKey: 'address_1', meta: { thClass: styles.thMd1 }},
    {header: '住所②', accessorKey: 'address_2', meta: { thClass: styles.thWide }},
    {header: '電話番号', accessorKey: 'phone_number', meta: { thClass: styles.thMd2 }},
    {header: 'お名前', accessorKey: 'name', meta: { thClass: styles.thMd2 }},
    {header: 'メールアドレス', accessorKey: 'email', meta: { thClass: styles.thMd1 }},
    {
        header: '出庫日',
        accessorKey: 'shipping_at',
        cell: info => myutils.getShortDateStr(info.row.original.shipping_at),
    },
    {
        header: '進捗',
        accessorKey: 'progress',
        meta: { thClass: styles.thMd1 },
        cell: info => {
            const { label, badgeClass } = myutils.getProgressLabelAndClass(info.row.original.progress);
            return <span className={`${styles.badge} ${styles[badgeClass]}`}>{label}</span>;
        }
    }
    // {
    //     header: '操作',
    //     accessorKey: 'actions',
    //     cell: info => (
    //         <div className="text-end">
    //             <a href={`/admin/company/edit/${info.row.original.id}`}>
    //                 <i className="bi bi-pencil-square"></i>
    //             </a>
    //             <span
    //                 className="cursor-pointer ms-4"
    //                 onClick={() => confirmDel(info.row.original.id, info.row.original.name)}
    //             >
    //     <i className="bi bi-trash"></i>
    //   </span>
    //         </div>
    //     )
    // }
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
