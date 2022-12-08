import testBundle from '../../z_test';
import { checkMapButtonError, delSpaces, narrowStringType } from './utils';



describe('Корректная работа утилит', () => {

  describe('checkMapButtonError', () => {

    it('Корректно возвращает ошибку при истечении timeout', async () => {
      const spyTimeout = jest.spyOn(window, 'setTimeout');
      let error: boolean;

      await checkMapButtonError('test', 200, 1000)
        .catch(err => error = err)
        .finally(() => {
          expect(error).toBeFalsy();
          expect(spyTimeout).toBeCalledTimes(5);
        });
    });

    it('Корректая работа утилиты', async () => {
      const spyTimeout = jest.spyOn(window, 'setTimeout');
      testBundle.render(<button className='test-class'> test </button>);
      let resolve: boolean;

      await checkMapButtonError('test-class', 200, 1000)
        .then(res => resolve = res)
        .finally(() => {
          expect(resolve).toBeTruthy();
          expect(spyTimeout).not.toBeCalled();
        });

    });

  });

  describe('narrowStringType', () => {

    it('Возвращает строковое значение с суженным типом', () => {
      const resualt = narrowStringType('test');
      expect(typeof resualt).toBe('string');
    });

  });

  describe('delSpaces', () => {

    it('Корректно преобразует строку', () => {
      const resualt = delSpaces('test');
      expect(resualt).toBe('test');
      expect(typeof resualt).toBe('string');

      expect(delSpaces('  test  ')).toBe('test');
      expect(delSpaces('  te   st  ')).toBe('te st');
      expect(delSpaces('  t   es  t')).toBe('t es t');
    });

  });

});
