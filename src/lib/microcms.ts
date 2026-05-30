import { createClient } from 'microcms-js-sdk';

const serviceDomain = import.meta.env.MICROCMS_SERVICE_DOMAIN;
const apiKey = import.meta.env.MICROCMS_API_KEY;
const isMicroCMSConfigured = Boolean(serviceDomain && apiKey);

type MicroCMSClient = {
  get<T>(args: { endpoint: string; queries?: Record<string, unknown>; contentId?: string }): Promise<T>;
};

const emptyResponse = <T>(contents: T[] = []): { contents: T[] } => ({
  contents,
});

const fallbackClient: MicroCMSClient = {
  async get<T>({ contentId }: { endpoint: string; queries?: Record<string, unknown>; contentId?: string }): Promise<T> {
    if (contentId) {
      return {
        id: '',
        title: '',
        content: '',
        date: '',
      } as T;
    }

    return emptyResponse<T>() as T;
  },
};

export const client: MicroCMSClient = isMicroCMSConfigured
  ? (createClient({
      serviceDomain,
      apiKey,
    }) as MicroCMSClient)
  : fallbackClient;

// 型定義（議員さんが入力する項目に合わせる）
export type Blog = {
  id: string;
  title: string;
  content?: string;
  date?: string; // 追加したカスタムフィールド
  eyecatch?: { url: string };
};

export type BlogListResponse = {
  contents: Blog[];
};

export const fetchBlogs = async (queries?: Record<string, unknown>): Promise<BlogListResponse> => {
  return client.get<BlogListResponse>({
    endpoint: 'blogs',
    queries,
  });
};

export const fetchBlog = async (contentId?: string): Promise<Blog> => {
  return client.get<Blog>({
    endpoint: 'blogs',
    contentId,
  });
};
