import axios from 'axios';
window.axios = axios;

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// window.toaster に toast をそのままセット（使い方：window.toaster.success("保存完了")）
window.toaster = toast;

// ✅ dayjs (変更なし)
import dayjs from 'dayjs';
import ja from 'dayjs/locale/ja';
dayjs.locale(ja);
window.dayjs = dayjs;
