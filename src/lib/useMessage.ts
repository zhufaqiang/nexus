import { useLocaleStore } from '@/store/useLocaleStore';
import type { MessageFile } from '@/store/useLocaleStore';

export function useMessage() {
  const { messages } = useLocaleStore(); // ✅ Hookを使用して状態を取得

  return (file: MessageFile, key: string): string => {
    return messages[file]?.[key] || `[${key}]`;
  };
}
