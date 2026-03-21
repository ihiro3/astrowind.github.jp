import { z, defineCollection } from 'astro:content';
import { glob } from 'astro/loaders'; // ← これがあるか確認

// 1. メタデータの定義
const metadataDefinition = z.object({
  title: z.string().optional(),
  ignoreTitleTemplate: z.boolean().optional(),
  canonical: z.string().url().optional(),
  robots: z
    .object({
      index: z.boolean().optional(),
      follow: z.boolean().optional(),
    })
    .optional(),
  description: z.string().optional(),
  openGraph: z.any().optional(),
  twitter: z.any().optional(),
});

// 2. 各コレクションに loader を追加
const post = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/post' }),
  schema: z.object({
    publishDate: z.date().optional(),
    updateDate: z.date().optional(),
    title: z.string(),
    excerpt: z.string().optional(),
    image: z.any().optional(), // image() ではなく any で一旦通すのが 5.12 では安全です
    category: z.string().optional(),
    tags: z.array(z.string()).optional(),
    author: z.string().optional(),
    draft: z.boolean().optional(),
    metadata: metadataDefinition.optional(),
  }),
});

// 3. エクスポート
export const collections = {
  post: defineCollection({
    // フォルダ(src/content/post)から読み込む設定
    loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/post' }),
    schema: z.object({
      title: z.string(),
      publishDate: z.date().optional(),
      description: z.string().optional(),
      image: z.string().optional(),
      category: z.string().optional(),
      // 必要に応じて項目を追加
    }),
  }),
};
