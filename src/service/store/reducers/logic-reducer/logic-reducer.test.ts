import testBundle from '../../../../z_test';
import { logicReducer } from './logic-reducer';

const {
  creators: { createLocation },
  data: { markerId },
  state: { logicState, ACTIONS_CREATORS } } = testBundle;


describe('Reducer: logic-reducer', () => {

  it('Корректно возвращает state при SET_ACTIVE_MARKER', () => {
    const { activeMarker } = logicReducer(logicState, ACTIONS_CREATORS.setActiveMarker(markerId));
    expect(activeMarker).not.toBeNull();
    expect(activeMarker).toBe(markerId);
  });

  it('Корректно возвращает state при SET_MAP_CENTER', () => {
    const location = createLocation(0, 0);
    const { center } = logicReducer(logicState, ACTIONS_CREATORS.setMapCenter(location));
    expect(center).toStrictEqual(location);
  });

  it('Корректно возвращает state при APP_READY', () => {
    const { isReady } = logicReducer(logicState, ACTIONS_CREATORS.changeReady(true));
    expect(isReady).toBeTruthy();
  });

});
