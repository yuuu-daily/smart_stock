import { useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import type { Log, Mode } from '@/Types';

export const useStockLogsTemplate = () => {
    const logs = usePage().props.logs as Log[];
    const [mode, setMode] = useState<Mode>(0);
    const [selectedBook, setSelectedBook] = useState<Log | null>(null);

    const form = useForm({
        barcode: '',
        mode: mode,
        product_id: null as number | null,
    });

    const handleModeChange = (value: Mode) => {
        setMode(value);
        form.setData('mode', value); // useFormのstate更新
    };

    const handleBarcodeSubmit = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!form.data.barcode) return;
        if (!selectedBook) {
            toast.warn('本を選択してください');
            return;
        }

        form.setData('mode', mode);
        form.setData('product_id', selectedBook.id);

        form.post('/stock/scan-barcode', {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('保存しました');
                form.setData('barcode', '');
            },
            onError: () => {
                toast.error('保存に失敗しました');
            },
        });
    };

    return {
        form,
        handleBarcodeSubmit,
        selectedBook,
        setSelectedBook,
        mode,
        handleModeChange,
        logs,
    };
};
