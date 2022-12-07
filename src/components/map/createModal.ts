import config from '../../helpers/const';


export const createModal = (): Promise<string | void> =>
  new Promise((res, rej) => {
    const modal = document.createElement('div');
    modal.setAttribute('class', 'modal');

    const input = document.createElement('input');
    input.placeholder = config.modal.placeholder;
    input.setAttribute('maxlength', '15');

    const success = document.createElement('button');
    success.textContent = config.modal.successText;
    success.onclick = () => { clear(); res(input.value); };

    const reject = document.createElement('button');
    reject.textContent = config.modal.rejectText;
    reject.onclick = () => { clear(); rej(false); };

    const center = document.createElement('div');
    center.appendChild(input);

    const btn_wrapper = document.createElement('div');
    btn_wrapper.appendChild(success);
    btn_wrapper.appendChild(reject);
    center.appendChild(btn_wrapper);

    modal.appendChild(center);

    document.body.appendChild(modal);

    function clear() {
      [success, reject, btn_wrapper, input, center, modal].forEach(el => el.remove());
    }
  });
