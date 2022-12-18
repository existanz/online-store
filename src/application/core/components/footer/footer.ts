import './footer.scss';
import { DOMElement } from '../../../shared/components/DOMElement';
import { SVGLink } from './SVGLink';
import { SVGs } from './SVGs';

export class Footer extends DOMElement {
  gitHub1: SVGLink;
  gitHub2: SVGLink;
  year: DOMElement;
  rsschool: SVGLink;
  ghSVG: string = SVGs.githubSVG;
  rsschoolSVG: string = SVGs.rsschoolSVG;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'footer', ['footer']);

    this.gitHub1 = new SVGLink(this.node, 'https://github.com/chervyakov-vladislav', 'Владислав Червяков', this.ghSVG);
    this.gitHub2 = new SVGLink(this.node, 'https://github.com/EXisTAnZ', 'Озиев Магомед', this.ghSVG);
    this.year = new DOMElement(this.node, 'p', ['footer__year'], '2023');
    this.rsschool = new SVGLink(this.node, 'https://rs.school/js/', '', this.rsschoolSVG);
  }
}
