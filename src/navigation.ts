import { getBlogPermalink } from './utils/permalinks';

export const headerData = {
  links: [
    { text: 'トップ', href: '/' },
    { text: '政策提言', href: '/#policy' },
    { text: '活動報告', href: getBlogPermalink() },
    { text: 'プロフィール', href: '/about' },
    { text: 'お問い合わせ', href: '/contact' }, // ← ヘッダーに追加
  ],
  actions: [{ text: '公式LINE', href: 'https://line.me/R/ti/p/...', variant: 'primary' }],
};

export const footerData = {
  links: [
    {
      title: 'メインメニュー',
      links: [
        { text: 'トップ', href: '/' },
        { text: '政策提言', href: '/#policy' },
        { text: '活動報告', href: '/blog' },
      ],
    },
    {
      title: '議員紹介・連絡先',
      links: [
        { text: 'プロフィール', href: '/about' },
        { text: 'お問い合わせ', href: '/contact' }, // ← フッターのリンクを有効化
      ],
    },
  ],
  secondaryLinks: [
    { text: 'プライバシーポリシー', href: '/privacy' },
  ],
  socialLinks: [
    { ariaLabel: 'X', icon: 'tabler:brand-x', href: '#' },
    { ariaLabel: 'Facebook', icon: 'tabler:brand-facebook', href: '#' },
    { ariaLabel: 'Instagram', icon: 'tabler:brand-instagram', href: '#' },
  ],
  footNote: `
    © 2026 山下○○ All Rights Reserved.
  `,
};