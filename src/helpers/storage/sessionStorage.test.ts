import testBundle from '../../z_test';

const {
  MarkerData,
  data: { title, labelId, markerId },
  creators: { createInitMarkerData, createMarker },
} = testBundle;


const markers = [createMarker()];

window.crypto = {
  ...window.crypto,
  randomUUID: () => 'test',
};
globalThis.Storage.prototype.getItem = jest.fn(() => JSON.stringify(markers));


describe('sessionStorage', () => {
  const instance = new MarkerData();

  it('корректаня работа getAll', () => {
    const resualt = instance.getAll();
    expect(resualt).toEqual(markers);
  });

  it('корректаня работа updateLabelTitle', () => {
    let new_title;
    let resualt;

    new_title = 'new_title';
    resualt = instance.updateLabelTitle(new_title, markerId, labelId)!;
    expect(resualt['label']['title']).not.toBe(title);
  });

  it('корректаня работа removeLabel', () => {
    const [marker] = instance.removeLabel(markerId, labelId)!;
    expect(marker['labels'].length).toBe(0);
  });

  it('корректаня работа createLabel', () => {
    const [marker] = instance.createLabel(markerId, title)!;
    expect(marker['labels'].length).toBe(1);
    expect(marker['labels'][0].title).toBe(title);
  });

  it('корректаня работа updateMarkerTitle', () => {
    const new_title = 'new_title';
    const { marker } = instance.updateMarkerTitle(new_title, markerId)!;
    expect(marker.title).not.toBe(title);
  });

  it('корректаня работа removeMarker', () => {
    let all;
    all = instance.getAll();

    expect(all.length).toBeGreaterThan(0);
    instance.removeMarker(markerId)!;

    all = instance.getAll();
    expect(all).toStrictEqual([]);
  });

  it('корректаня работа createMarker', () => {
    let all;
    all = instance.getAll();

    expect(all.length).toBe(0);
    const initData = createInitMarkerData();
    instance.createMarker(initData);

    all = instance.getAll();
    expect(all.length).toBeGreaterThan(0);
  });


});
