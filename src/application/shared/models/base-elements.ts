export interface Options {
  tagName: keyof HTMLElementTagNameMap;
  classList?: string[];
  content?: string;
}

export interface LinkOptions extends Options {
  target?: string;
  href?: string;
}

export interface RouteOptions extends Options {
  id?: string;
}
