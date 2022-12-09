import { dataReducer } from './data-reducer';
import testBundle from '../../../../z_test';

const {
  creators: { createMarker, createLabel },
  data: { title, markerId },
  state: { dataState, ACTIONS_CREATORS } } = testBundle;


describe('Reducer: dataReducer', () => {

  it('Корректно возвращает state при CREATE_MARKER', () => {
    const markers = dataState.markers;
    expect(markers.length).toBe(1);

    const marker = createMarker();
    const { markers: update } = dataReducer(dataState, ACTIONS_CREATORS.createMarker(marker));

    expect(update[1]).toStrictEqual(marker);
    expect(update.length).toBe(2);
  });

  it('Корректно возвращает state при INITIALIZATION_MARKERS', () => {
    const fake = new Array(5).fill(null).map(() => createMarker());
    const { markers: update } = dataReducer(dataState, ACTIONS_CREATORS.initializationMarkers(fake));

    expect(update).toStrictEqual(fake);
    expect(update.length).toBe(5);
  });

  it('Корректно возвращает state при ADD_LABEL', () => {
    const titleUpdate = 'some title';
    const marker = createMarker({ title: titleUpdate });
    const { markers: update } = dataReducer(dataState, ACTIONS_CREATORS.addLabel([marker, 0]));

    expect(update[0]).toStrictEqual(marker);
    expect(update[0].title).not.toBe(title);
  });

  it('Корректно возвращает state при EDIT_LABEL_TITLE', () => {
    const titleUpdate = 'some title';
    const label = createLabel({ title: titleUpdate });
    const { markers } = dataReducer(dataState, ACTIONS_CREATORS.editLabelTitle({
      label, l_inx: 0, m_inx: 0,
    }));

    const update_label = markers[0]['labels'][0];

    expect(update_label).toStrictEqual(label);
    expect(update_label.title).not.toBe(title);
  });

  it('Корректно возвращает state при EDIT_MARKER_TITLE', () => {
    const titleUpdate = 'some title';
    const marker = createMarker({ title: titleUpdate });

    const { markers } = dataReducer(dataState, ACTIONS_CREATORS.editMarkerTitle({ marker, m_inx: 0 }));

    const update_marker = markers[0];

    expect(update_marker).toStrictEqual(marker);
    expect(update_marker.title).not.toBe(title);
  });

  it('Корректно возвращает state при DELETE_MARKER', () => {
    const { markers } = dataReducer(dataState, ACTIONS_CREATORS.deleteMarker(markerId));
    expect(markers).toStrictEqual([]);
  });

  it('Корректно возвращает state при DELETE_LABEL', () => {
    const marker = createMarker();
    delete marker.labels[0];
    const { markers } = dataReducer(dataState, ACTIONS_CREATORS.deleteLabel([marker, 0]));

    expect(markers[0]['labels'][0]).toBeUndefined();
  });

});
