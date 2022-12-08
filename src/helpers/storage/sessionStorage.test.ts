import testBundle from '../../z_test';

const {
  MarkerData,
  creators: { createInitMarkerData }
} = testBundle;

describe('sessionStorage', () => {
  const instance = new MarkerData();
  const id = 'some_test_id';
  window.crypto = { ...window.crypto, randomUUID: () => id };

  it('корректаня работа getMarkers', () => {
    const spyParse = jest.spyOn(JSON, 'parse');
    const spyStringify = jest.spyOn(JSON, 'stringify');

    const res = instance.getMarkers();

    expect(Array.isArray(res)).toBeTruthy();
    expect(spyParse).toBeCalledTimes(1);
    expect(spyStringify).toBeCalledTimes(1);
  });

  it('корректаня работа createMarker', () => {
    const data = createInitMarkerData();
    const spyArray = jest.spyOn(Array.prototype, 'push');

    const resualt = instance.createMarker(data);
    expect(resualt).toEqual({ ...data, labels: [], id });
    expect(spyArray).toBeCalled();
  });

  it('корректаня работа createLabel', () => {
    // jest.spyOn(MarkersStorage.prototype, '')
    const data = createInitMarkerData();
    const spyArray = jest.spyOn(Array.prototype, 'push');

    const resualt = instance.createMarker(data);
    expect(resualt).toEqual({ ...data, labels: [], id });
    expect(spyArray).toBeCalled();
  });

});
