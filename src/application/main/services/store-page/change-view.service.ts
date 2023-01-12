import { State } from '../../../shared/services/state.service';
import { GridView } from '../../components/store-page/items/grid-view/grid-view';
import { ListView } from '../../components/store-page/items/list-view/list-view';

class ViewService {
  public currentView: 'grid' | 'list';
  public container: HTMLElement | null;
  public view: GridView | ListView;

  constructor() {
    this.currentView = 'grid';
    this.container = null;
    this.view = new GridView(this.container, State.current);
  }

  getViewState() {
    return this.currentView;
  }

  setViewState(value: 'grid' | 'list') {
    if (this.currentView !== value) {
      this.currentView = value;
      (this.container as HTMLElement).innerHTML = '';
      this.view =
        this.currentView === 'grid'
          ? new GridView(this.container, State.current)
          : new ListView(this.container, State.current);
    }
  }
}

const viewService = new ViewService();
export default viewService;
