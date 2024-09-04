import { Notification } from '@/components/Notification';
import { ZodSchema } from 'zod';

export function safeParseResponse<T, U>(schema: ZodSchema<T>, response: U): T {
  const result = schema.safeParse(response);
  if (!result.success) {
    Notification('error', '失敗', '資料格式無效');
    console.error('資料格式無效zod', result.error);
    throw new Error('資料格式無效');
  }
  return result.data;
}
