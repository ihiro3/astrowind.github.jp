import type { CallToAction } from './types.d.ts';
import { getBlogPermalink } from './utils/permalinks';

type HeaderLink = {
  text: string;
  href?: string;
  links?: HeaderLink[];
};

export const headerData: {
  links: HeaderLink[];
  actions: CallToAction[];
} = {
  links: [
    { text: 'トップ', href: '/' },
    { text: '政策提言', href: '/#policy' },
    { text: '活動報告', href: getBlogPermalink() },
    { text: '過去の活動報告', href: '/activities' },
    {
      text: 'プロフィール',
      links: [
        { text: '会派概要', href: '/about' },
        { text: '岡田三郎', href: '/member/okada-saburo' },
        { text: '辻井崇余', href: '/member/tsujii-mitsuyo' },
        { text: '尾崎智', href: '/member/ozaki-satoshi' },
        { text: '山下芳一', href: '/member/yamashita-yoshikazu' },
      ],
    },
    { text: 'お問い合わせ', href: '/contact' },
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
        { text: '過去の活動報告', href: '/activities' },
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
  secondaryLinks: [{ text: 'プライバシーポリシー', href: '/privacy' }],
  socialLinks: [
    { ariaLabel: 'X', icon: 'tabler:brand-x', href: '#' },
    { ariaLabel: 'Facebook', icon: 'tabler:brand-facebook', href: '#' },
    { ariaLabel: 'Instagram', icon: 'tabler:brand-instagram', href: '#' },
  ],
  footNote: `
    © 2026 精華町議会 爽風会 All Rights Reserved.
  `,
};
