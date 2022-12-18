import './footer.scss';
import { DOMElement } from '../../../shared/components/base-elements/dom-element';
import { SVGLink } from './SVGLink';
import { SVGs } from './SVGs';

export class Footer extends DOMElement {
  container: DOMElement;
  footerLinx: DOMElement;
  gitHub1: SVGLink;
  gitHub2: SVGLink;
  year: DOMElement;
  rsschool: SVGLink;
  ghSVG: string = SVGs.githubSVG;
  rsschoolSVG: string = SVGs.rsschoolSVG;

  constructor(parentNode: HTMLElement) {
    super(parentNode, {
      tagName: 'footer',
      classList: ['footer'],
    });

    this.container = new DOMElement(this.node, {
      tagName: 'div',
      classList: ['container', 'footer__container'],
    });
    this.footerLinx = new DOMElement(this.container.node, {
      tagName: 'div',
      classList: ['footer-links'],
    });
    this.gitHub1 = new SVGLink(
      this.footerLinx.node,
      'https://github.com/chervyakov-vladislav',
      'Vladislav Chervyakov',
      this.ghSVG
    );
    this.gitHub2 = new SVGLink(this.footerLinx.node, 'https://github.com/EXisTAnZ', 'Magomed Oziev', this.ghSVG);
    this.year = new DOMElement(this.container.node, {
      tagName: 'p',
      classList: ['footer__year'],
      content: '2023',
    });
    this.rsschool = new SVGLink(this.container.node, 'https://rs.school/js/', '', this.rsschoolSVG);
    this.rsschool.node.classList.add('footer__rsschool');
  }
}
