import { createClient } from "microcms-js-sdk";

export const client = createClient({
  serviceDomain: import.meta.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: import.meta.env.MICROCMS_API_KEY,
});

// 型定義（議員さんが入力する項目に合わせる）
export type Blog = {
  id: string;
  title: string;
  content: string;
  date: string; // 追加したカスタムフィールド
  eyecatch?: { url: string };
};
