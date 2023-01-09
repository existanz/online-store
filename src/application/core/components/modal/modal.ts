import './modal.scss';
import { DOMElement } from '../../../shared/components/base-elements/dom-element';
import { Page } from '../../../shared/components/page';
import { FormElement } from '../../../shared/components/base-elements/form-element';
import { ButtonElement } from '../../../shared/components/base-elements/button-element';
import { PersonalInfo } from './personal-info/personal-info';
import { CardInfo } from './card-info/card-info';
import { ModalService } from '../../services/modal.service';
import { BlueButton } from '../../../shared/components/buttons/blue-button';
import { Validation } from '../../services/validation.service';

export class ModalPage extends Page {
  private container: DOMElement;
  private close: DOMElement;
  private form: FormElement;
  private personalInfoContainer: DOMElement;
  private cardInfoContainer: DOMElement;
  public personalInfo: PersonalInfo;
  public cardInfo: CardInfo;
  public submit: BlueButton;

  constructor(id: string) {
    super(id);

    this.container = new DOMElement(this.node, {
      tagName: 'div',
      classList: ['modal__container'],
    });

    this.close = new ButtonElement(this.container.node, {
      tagName: 'button',
      classList: ['modal__close'],
      content: 'Close',
    });

    this.node.addEventListener('click', (e: Event) => {
      if (e.target === this.container.node) {
        e.stopPropagation();
      }
      if (e.target === this.node) {
        ModalService.removeModal();
      }
    });
    this.close.node.addEventListener('click', () => ModalService.removeModal());

    this.form = new FormElement(this.container.node, {
      tagName: 'form',
      classList: ['model__form'],
    });
    this.form.node.addEventListener('submit', (e) => e.preventDefault());

    this.personalInfoContainer = new DOMElement(this.form.node, {
      tagName: 'div',
      classList: ['modal__personal-info'],
    });

    this.cardInfoContainer = new DOMElement(this.form.node, {
      tagName: 'div',
      classList: ['modal__card-info'],
    });

    this.submit = new BlueButton(this.form.node, {
      tagName: 'button',
      type: 'submit',
      classList: ['modal__submit'],
      content: 'Submit',
    });

    this.personalInfo = new PersonalInfo(this.personalInfoContainer.node);
    this.cardInfo = new CardInfo(this.cardInfoContainer.node);
    Validation.addListeners(this);
  }
}
