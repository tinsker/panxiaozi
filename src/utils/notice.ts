import dayjs from "dayjs";

import 'dayjs/locale/zh-cn' // 导入本地化语言

dayjs.locale('zh-cn')

export const notice = async (msg: string) => {
  if (!process.env.NOTICE_API) {
    return
  }
  const timeStr = dayjs().format('YYYY-MM-DD HH:mm:ss');
  await fetch(process.env.NOTICE_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      msg: `${msg}\n时间：${timeStr}`,
    }),
  })
}