import { AppState, AppStore } from "@app/utils/redux/store";
import { Store } from "redux";
import { SET_LOADING, SET_VISIBLE } from "../redux/actions";

export class BaseService {
  private store: Store;
  constructor() {
    this.store = AppStore;
  }

  protected setLoading(action: string, loading: boolean): void {
    this.dispatch(SET_LOADING, {
      key: action,
      value: loading
    })
  }

  protected setVisible(action: string, visible: boolean): void {
    this.dispatch(SET_VISIBLE, {
      key: action,
      value: visible
    })
  }

  protected getState(): Readonly<AppState> {
    return this.store.getState();
  }

  protected dispatch(type: string, payload: any): void {
    this.store.dispatch({ type, payload })
  }
}
