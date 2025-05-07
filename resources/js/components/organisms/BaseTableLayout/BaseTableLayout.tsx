import React from 'react';
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';
import styles from './style.module.css'; // ← CSSモジュールを読み込む

export const BaseTableLayout = ({ onSelect, selectedBook, data }) =>  {
    const columns = [
        { header: '書籍名', accessorKey: 'title' },
        { header: 'ISBN', accessorKey: 'isbn' },
        { header: '在庫数', accessorKey: 'stock' },
    ];

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <table className={styles.table}>
            <thead>
            {table.getHeaderGroups().map(hg => (
                <tr key={hg.id}>
                    {hg.headers.map(h => (
                        <th key={h.id} className={styles.th}>
                            {flexRender(h.column.columnDef.header, h.getContext())}
                        </th>
                    ))}
                </tr>
            ))}
            </thead>
            <tbody>
            {table.getRowModel().rows.map(row => (
                <tr
                    key={row.id}
                    onClick={() => onSelect(row.original)}
                    className={`${styles.tr} ${selectedBook?.id === row.original.id ? styles.selectedRow : ''}`}
                >
                    {row.getVisibleCells().map(cell => (
                        <td key={cell.id} className={styles.td}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                    ))}
                </tr>
            ))}
            </tbody>
        </table>
    );
}

