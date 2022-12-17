import './footer.scss';
import { DOMElement } from '../../../shared/components/DOMElement';
import { GitHubLink } from './gitHubLink';

export class Footer extends DOMElement {
  gitHub1: GitHubLink;
  gitHub2: GitHubLink;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'footer', ['footer'], 'this.gitHub');

    this.gitHub1 = new GitHubLink(this.node);
    this.gitHub2 = new GitHubLink(this.node);
  }
}
