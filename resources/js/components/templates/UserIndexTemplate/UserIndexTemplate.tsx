import { FC, useEffect, useRef } from "react";
import { useUserIndexTemplate } from "./useUserIndexTemplate";
import { BaseTableLayout } from "../../../components/organisms/BaseTableLayout/BaseTableLayout";
import { Navigation } from "../../../components/molecules/Navigation/Navigation";
import styles from "./style.module.css";
import {ColumnDef} from "@tanstack/react-table";
import {Product} from "../../../Types";

const columns: ColumnDef<Product>[] = [
    {header: 'No.', accessorKey: 'id'},
    {header: '氏名', accessorKey: 'name'},
    {header: '氏名(カナ)', accessorKey: 'name_kana'},
    {header: 'メール', accessorKey: 'email'},
    {header: 'ロール', accessorKey: 'role'},
];

export const UserIndexTemplate: FC = () => {
    const {
        users,
        selectedBook,
        setSelectedBook,
    } = useUserIndexTemplate();

    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    return (
        <>
            <Navigation />
            <div className={styles.container}>
                <h1 className={styles.title}>ユーザ管理</h1>

                <BaseTableLayout
                    data={users}
                    columns={columns}
                    selectedBook={selectedBook}
                    onSelect={setSelectedBook}
                />
            </div>
        </>
    );
};
