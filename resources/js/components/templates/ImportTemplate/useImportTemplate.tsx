import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { usePage, router } from '@inertiajs/react';

type Mode = 0 | 1;

type Product = {
    id: number;
    title: string;
    isbn: string;
    stock: number;
};

export const useImportTemplate = () => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<{ barcode: string }>();

    const [mode, setMode] = useState<Mode>(0);
    const [selectedBook, setSelectedBook] = useState<any | null>(null); // 型があれば明示的に定義してください
    const products = usePage().props.products ?? [];

    const handleModeChange = (value: Mode) => setMode(value);

    const handleBarcodeSubmit = handleSubmit(({ barcode }) => {
        if (!selectedBook) {
            alert('本を選択してください');
            return;
        }

        router.post('/stock/barcode', {
            mode,
            isbn: barcode,
            book_id: selectedBook.id,
        }, {
            onSuccess: () => console.log('送信完了'),
            onError: (err) => console.error('送信失敗', err),
        });
    });

    return {
        control,
        errors,
        handleBarcodeSubmit,
        selectedBook,
        setSelectedBook,
        mode,
        handleModeChange,
        products,
    };
};
