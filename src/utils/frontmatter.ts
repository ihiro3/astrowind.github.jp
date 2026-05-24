import getReadingTime from 'reading-time';
import { toString } from 'mdast-util-to-string';
import { visit } from 'unist-util-visit';
import type { Plugin } from 'unified';
import type { Node, Parent } from 'unist';

type RemarkPlugin = Plugin<unknown[], unknown>;
type RehypePlugin = Plugin<unknown[], unknown>;

interface Element extends Node {
  type: 'element';
  tagName: string;
  properties?: Record<string, unknown>;
  children?: Node[];
}

interface VFileLike {
  data?: {
    astro?: {
      frontmatter?: Record<string, unknown>;
    };
  };
}

export const readingTimeRemarkPlugin: RemarkPlugin = () => {
  return function (tree: Node, file: VFileLike) {
    const textOnPage = toString(tree);
    const readingTime = Math.ceil(getReadingTime(textOnPage).minutes);

    if (typeof file?.data?.astro?.frontmatter !== 'undefined') {
      file.data.astro.frontmatter.readingTime = readingTime;
    }
  };
};

export const responsiveTablesRehypePlugin: RehypePlugin = () => {
  return function (tree: Parent) {
    if (!tree.children) return;

    for (let i = 0; i < tree.children.length; i++) {
      const child = tree.children[i] as Element;

      if (child.type === 'element' && child.tagName === 'table') {
        tree.children[i] = {
          type: 'element',
          tagName: 'div',
          properties: {
            style: 'overflow:auto',
          },
          children: [child],
        } as Element;

        i++;
      }
    }
  };
};

export const lazyImagesRehypePlugin: RehypePlugin = () => {
  return function (tree: Parent) {
    if (!tree.children) return;

    visit(tree, 'element', function (node: Element) {
      if (node.tagName === 'img') {
        node.properties = node.properties || {};
        node.properties.loading = 'lazy';
      }
    });
  };
};
