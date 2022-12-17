import './footer.scss';
import { DOMElement } from '../../../shared/components/DOMElement';

export class Footer extends DOMElement {
    constructor(parentNode: HTMLElement) {
        super(parentNode, 'footer', ['footer'], 'this is footer!');
    }
}
