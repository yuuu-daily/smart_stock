import { NavigationLink } from "../../atoms/NavigationLink";
import { NAVIGATION_PATH } from "../../../constants/navigation";
import { useAuthContext } from "../../../hooks/useAuthContext";
import styles from "./style.module.css";
import { router } from "@inertiajs/react";

export const Navigation = () => {
    const { isAuthenticated } = useAuthContext(); // ← ログイン状態を取得

    const handleLogout = () => {
        router.visit("/logout", { method: "post" });
    };

    return (
        <div className={styles.header}>
            <div className={styles.nav}>
                <div className={styles.left}>
                    <img src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600" alt="Logo" className={styles.logo} />
                    <ul className={styles.ul}>
                        <NavigationLink title="在庫一覧" linkPath={NAVIGATION_PATH.PRODUCT} />
                        <NavigationLink title="在庫入出庫履歴" linkPath={NAVIGATION_PATH.STOCK_LOGS} />
                        <NavigationLink title="ユーザ管理" linkPath={NAVIGATION_PATH.USERS} />
                        {/*<NavigationLink title="カテゴリ管理" linkPath={NAVIGATION_PATH.CATEGORIES} />*/}
                    </ul>
                </div>

                <div className={styles.right}>
                    {isAuthenticated ? (
                        <button onClick={handleLogout} className={styles.logoutButton}>
                            Log out →
                        </button>
                    ) : (
                        <NavigationLink title="Log in →" linkPath={NAVIGATION_PATH.LOGIN} />
                    )}
                </div>
            </div>
        </div>
    );
};


