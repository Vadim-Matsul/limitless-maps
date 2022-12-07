import type { RootState } from '../../../types/state-manager';
import type { Actions } from '../actions/actions';

import { logicReducer } from './logic-reducer/logic-reducer';
import { dataReducer } from './data-reducer/data-reducer';

export const mainReducer = ({ data, logic }: RootState, action: Actions): RootState => ({
  data: dataReducer(data, action),
  logic: logicReducer(logic, action),
});
