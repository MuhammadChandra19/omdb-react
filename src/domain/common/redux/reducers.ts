import { Reducer } from "@app/utils/redux/reducer";
import { Dict, SingleReducer } from "@app/utils/types";
import { SET_LOADING, SET_VISIBLE } from "./actions";
import { CommonState } from "./states";

export class CommonReducer extends Reducer<CommonState> {
  constructor() {
    super({
      loading: {},
      visible: {},
    })
  }

  public setLoading(state: CommonState, payload: any): CommonState {
    return {
      ...state,
      loading: {
        ...state.loading,
        [payload.key]: payload.value,
      },
    }
  }

  public setVisible(state: CommonState, payload: any): CommonState {
    return {
      ...state,
      visible: {
        ...state.visible,
        [payload.key]: payload.value,
      }
    }
  }

  get actions(): Dict<SingleReducer<CommonState>> {
    return {
      [SET_LOADING]: this.setLoading,
      [SET_VISIBLE]: this.setVisible
    };
  }
}
