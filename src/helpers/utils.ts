type Button = HTMLButtonElement | undefined;

export const checkMapButtonError = (
  className: string,
  delay: number,
  total = 6000,
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

export const narrowStringType = <T extends string>(str: T): T => str;
export const delSpaces = (str: string): string => str.trim().replace(/\s+/g, ' ');
