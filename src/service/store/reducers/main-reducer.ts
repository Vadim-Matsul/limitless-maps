import { RootState } from '../../../types/state-manager';
import { Actions } from '../actions/actions';
import { dataReducer } from './data-reducer/data-reducer';
import { logicReducer } from './logic-reducer/logic-reducer';

export const mainReducer = ({ data, logic }: RootState, action: Actions): RootState => ({
  data: dataReducer(data, action),
  logic: logicReducer(logic, action),
});
