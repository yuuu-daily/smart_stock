// components/atoms/Modal/Modal.tsx
import { FC } from "react";
import Modal from "react-modal";
import Select from "react-select";
import styles from "./style.module.css";

type UserOption = {
    value: number;
    label: string;
};

type Props = {
    isOpen: boolean;
    onClose: () => void;
    userOptions: UserOption[];
    selectedUser: UserOption | null;
    setSelectedUser: (user: UserOption | null) => void;
    onAdd: () => void;
};

const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        width: "400px",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
    },
};

export const CustomModal: FC<Props> = ({
   isOpen,
   onClose,
   userOptions,
   selectedUser,
   setSelectedUser,
   onAdd,
}) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            style={customStyles}
            contentLabel="在庫モーダル"
            ariaHideApp={false}
        >
            <h3>新規追加</h3>
            <p>出庫先の担当者を選択してください</p>
            <div className={styles.modalSelect}>
                <Select
                    options={userOptions}
                    value={selectedUser}
                    onChange={(selected) => setSelectedUser(selected)}
                    menuPortalTarget={document.body}
                    styles={{
                        menuPortal: (base) => ({ ...base, zIndex: 2 }),
                    }}
                />
            </div>

            <div className={styles.modalButtons}>
                <button onClick={onAdd} className={styles.addButton}>
                    追加
                </button>
                <button onClick={onClose} className={styles.closeButton}>
                    閉じる
                </button>
            </div>
        </Modal>
    );
};
