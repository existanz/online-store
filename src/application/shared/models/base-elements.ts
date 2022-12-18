export interface Options {
  tagName: keyof HTMLElementTagNameMap;
  classList?: string[];
  content?: string;
  href?: string;
  src?: string;
  target?: string;
}
