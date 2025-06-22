// useStockLogsTemplate.tsx
import { useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import type { Log, User } from '@/Types';

export const useStockLogsTemplate = () => {
    const logs = usePage().props.logs as Log[];
    const users = usePage().props.users as User[];

    const [selectedUser, _setSelectedUser] = useState<{ value: number; label: string } | null>(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const form = useForm({
        user_id: null as number | null,
    });
    const setSelectedUser = (user: { value: number; label: string } | null) => {
        _setSelectedUser(user);
        form.setData('user_id', user ? user.value : null);
    };

    const handleAddUser = () => {
        if (!selectedUser) {
            toast.warn('ユーザーを選択してください');
            return;
        }

        form.post('/stock/add-user', {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('ユーザーを追加しました');
                closeModal();
                setSelectedUser(null);
            },
            onError: () => {
                toast.error('ユーザー追加に失敗しました');
            },
        });
    };

    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);

    const userOptions = users.map((user) => ({
        value: user.id,
        label: `${user.company_name} ${user.name}`,
    }));

    return {
        logs,
        users,
        selectedUser,
        setSelectedUser,
        modalIsOpen,
        openModal,
        closeModal,
        handleAddUser,
        userOptions,
    };
};
