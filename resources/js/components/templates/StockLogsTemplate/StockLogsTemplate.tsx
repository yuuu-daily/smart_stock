// StockLogsTemplate.tsx
import { FC, useEffect, useRef } from "react";
import { useStockLogsTemplate } from "./useStockLogsTemplate";
import { BaseTableLayout } from "../../../components/organisms/BaseTableLayout/BaseTableLayout";
import { Navigation } from "../../../components/molecules/Navigation/Navigation";
import { CreateButton } from "../../../components/atoms/CreateButton/CreateButton";
import { CustomModal } from "../../../components/atoms/Modal/Modal";
import styles from "./style.module.css";
import { ColumnDef } from "@tanstack/react-table";
import { Log } from "../../../Types";
import myutils from "../../../myutils";

const columns: ColumnDef<Log>[] = [
    { header: "No.", accessorKey: "id", meta: { thClass: styles.thSm } },
    { header: "書籍名", accessorKey: "title", meta: { thClass: styles.thWide } },
    { header: "数量", accessorKey: "quantity", meta: { thClass: styles.thMd1 } },
    {
        header: "出/入庫",
        accessorKey: "status",
        meta: { thClass: styles.thMd1 },
        cell: (info) => {
            const status = info.row.original.status;
            const label = status === 0 ? "入庫" : "出庫";
            const badgeClass = status === 0 ? styles.badgeGreen : styles.badgeRed;
            return <span className={`${styles.badge} ${badgeClass}`}>{label}</span>;
        },
    },
    { header: "届け先名(法人名・会社名)", accessorKey: "company_name", meta: { thClass: styles.thLg } },
    { header: "住所①", accessorKey: "address_1", meta: { thClass: styles.thMd1 } },
    { header: "住所②", accessorKey: "address_2", meta: { thClass: styles.thWide } },
    { header: "電話番号", accessorKey: "phone_number", meta: { thClass: styles.thLg } },
    { header: "名前", accessorKey: "name", meta: { thClass: styles.thMd2 } },
    { header: "メールアドレス", accessorKey: "email" },
    {
        header: "出庫日",
        accessorKey: "shipping_at",
        cell: (info) => myutils.getShortDateStr(info.row.original.shipping_at),
    },
    {
        header: "進捗",
        accessorKey: "progress",
        meta: { thClass: styles.thMd1 },
        cell: (info) => {
            const { label, badgeClass } = myutils.getProgressLabelAndClass(info.row.original.progress);
            return <span className={`${styles.badge} ${styles[badgeClass]}`}>{label}</span>;
        },
    },
];

export const StockLogsTemplate: FC = () => {
    const {
        logs,
        selectedUser,
        setSelectedUser,
        modalIsOpen,
        openModal,
        closeModal,
        handleAddUser,
        userOptions,
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
                <CreateButton onClick={openModal}>新規作成</CreateButton>

                <BaseTableLayout
                    data={logs}
                    columns={columns}
                    selectedBook={null}
                    onSelect={() => {}}
                />
            </div>

            <CustomModal
                isOpen={modalIsOpen}
                onClose={closeModal}
                userOptions={userOptions}
                selectedUser={selectedUser}
                setSelectedUser={setSelectedUser}
                onAdd={handleAddUser}
            />
        </>
    );
};
