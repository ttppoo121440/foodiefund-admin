import { notification } from 'antd';

type NotificationMode = 'success' | 'info' | 'error';
type NotificationType =
  | '失敗'
  | '新增成功'
  | '新增失敗'
  | '修改成功'
  | '修改失敗'
  | '刪除成功'
  | '刪除失敗';
type NotificationMessage =
  | '新增資料成功'
  | '新增資料失敗'
  | '修改資料成功'
  | '修改資料失敗'
  | '刪除資料成功'
  | '刪除資料失敗'
  | '資料格式無效'
  | '黑名單成功'
  | '黑名單失敗';

export function Notification(
  mode: NotificationMode,
  type: NotificationType,
  message: NotificationMessage | string,
): void {
  const isCustomMessage = ![
    '新增資料成功',
    '新增資料失敗',
    '修改資料成功',
    '修改資料失敗',
    '刪除資料成功',
    '刪除資料失敗',
    '資料格式無效',
    '黑名單成功',
    '黑名單失敗',
  ].includes(message as NotificationMessage);

  const description = isCustomMessage
    ? message
    : (message as NotificationMessage);
  notification[mode]({
    message: type,
    description: description,
  });
}
