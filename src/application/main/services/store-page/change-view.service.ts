import { State } from '../../../shared/services/state.service';
import { GridView } from '../../components/store-page/items/grid-view/grid-view';
import { ListView } from '../../components/store-page/items/list-view/list-view';

export abstract class ViewService {
  static currentView: 'grid' | 'list' = 'grid';
  static container: HTMLElement;
  static view: GridView | ListView = new GridView(ViewService.container, State.current);

  static getViewState() {
    return this.currentView;
  }

  static setViewState(value: 'grid' | 'list') {
    if (this.currentView !== value) {
      this.currentView = value;
      this.container.innerHTML = '';
      this.view =
        this.currentView === 'grid'
          ? new GridView(ViewService.container, State.current)
          : new ListView(ViewService.container, State.current);
    }
  }
}
