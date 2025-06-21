// src/utils/myutils.js
import dayjs from 'dayjs';

/**
 * 25/6/20 の形式に変換
 */
export function getShortDateStr(val) {
    if (!val) return '';
    return dayjs(val).format('YYYY/M/D'); // 年(下2桁)/月/日
}

/**
 * その他再利用したい関数も移植可能
 */
export function getFileNameFromPath(path) {
    return path.split('/').pop();
}

export function getStatusBadgeClass(number) {
    switch (number) {
        case 0:
            return styles.badgeGreen;
        case 1:
            return styles.badgeRed;
        case 2:
            return styles.badgeIndigo;
        default:
            return styles.badgeGray;
    }
}

export function getProgressLabelAndClass(progress) {
    let label = '';
    let badgeClass = '';

    switch (progress) {
        case 1:
            label = '緊急';
            badgeClass = 'badgeRed';
            break;
        case 2:
            label = '完了';
            badgeClass = 'badgeGreen';
            break;
        case 3:
            label = '進行中';
            badgeClass = 'badgeIndigo';
            break;
        default:
            label = '未設定';
            badgeClass = 'badgeGray';
            break;
    }

    return { label, badgeClass };
}


// 必要に応じてエクスポート
export default {
    getShortDateStr,
    getFileNameFromPath,
    getStatusBadgeClass,
    getProgressLabelAndClass,
    // 他の関数...
};
