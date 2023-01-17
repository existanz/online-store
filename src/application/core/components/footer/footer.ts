import './footer.scss';
import { DOMElement } from '../../../shared/components/base-elements/dom-element';
import { LinkElement } from '../../../shared/components/base-elements/link-element';
import { SVG } from '../../../shared/components/svg-icons';

export class Footer extends DOMElement {
  private container: DOMElement;
  private footerLinx: DOMElement;
  private year: DOMElement;
  private footerSchoolLogo: DOMElement;

  private gitHub1: LinkElement;
  private gitHub2: LinkElement;
  private githubUser1: DOMElement;
  private githubUser2: DOMElement;
  private rsschool: LinkElement;

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

    this.gitHub1 = new LinkElement(this.footerLinx.node, {
      tagName: 'a',
      href: 'https://github.com/chervyakov-vladislav',
      classList: ['footer-links__item'],
      target: '_blank',
    });
    this.gitHub1.node.innerHTML = SVG.github;

    this.githubUser1 = new DOMElement(this.gitHub1.node, {
      tagName: 'div',
      classList: ['footer-links__text'],
      content: 'Vladislav Chervyakov',
    });

    this.gitHub2 = new LinkElement(this.footerLinx.node, {
      tagName: 'a',
      href: 'https://github.com/EXisTAnZ',
      classList: ['footer-links__item'],
      target: '_blank',
    });
    this.gitHub2.node.innerHTML = SVG.github;

    this.githubUser2 = new DOMElement(this.gitHub2.node, {
      tagName: 'div',
      classList: ['footer-links__text'],
      content: 'Magomed Oziev',
    });

    this.year = new DOMElement(this.container.node, {
      tagName: 'p',
      classList: ['footer__year'],
      content: new Date().getFullYear().toString(),
    });

    this.footerSchoolLogo = new DOMElement(this.container.node, {
      tagName: 'div',
      classList: ['footer__shcool-logo'],
    });

    this.rsschool = new LinkElement(this.footerSchoolLogo.node, {
      tagName: 'a',
      href: 'https://rs.school/',
      classList: ['shcool-logo'],
      target: '_blank',
    });
    this.rsschool.node.innerHTML = SVG.rsschool;
  }
}
