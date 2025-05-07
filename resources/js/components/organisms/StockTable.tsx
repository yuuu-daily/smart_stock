import React from "react";

type Book = {
    id: number;
    title: string;
    isbn: string;
    stock: number;
};

type Props = {
    books: Book[];
    selectedBook: Book | null;
    onSelect: (book: Book) => void;
};

export const StockTable: React.FC<Props> = ({ books, selectedBook, onSelect }) => {
    return (
        <table>
            <thead>
            <tr>
                <th>書名</th>
                <th>ISBN</th>
                <th>在庫数</th>
            </tr>
            </thead>
            <tbody>
            {books.map((book) => (
                <tr
                    key={book.id}
                    onClick={() => onSelect(book)}
                    style={{
                        backgroundColor: selectedBook?.id === book.id ? "#e0f7ff" : "transparent",
                        cursor: "pointer",
                    }}
                >
                    <td>{book.title}</td>
                    <td>{book.isbn}</td>
                    <td>{book.stock}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};
