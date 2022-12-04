type Button = HTMLButtonElement | undefined;

export const checkMapButtonError = (
  className: string,
  delay: number,
  total = 5000,
): Promise<boolean> => new Promise<boolean>((res, rej) => {
  let btn: Button;
  let totalTimeout = 0;

  (function closure() {
    if (totalTimeout >= total) return rej(false);
    btn = document.getElementsByClassName(className)[0] as Button;

    if (typeof btn === 'undefined') {
      totalTimeout += delay;
      setTimeout(closure, delay);
    } else {
      btn.click();
      res(true);
    }
  })();

});
