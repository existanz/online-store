import { Validation } from './validation.service';

const service = new Validation();

describe('validation personal info', () => {
  it('валидация имени: 2 слова по 5 символов', () => {
    expect(service.validateNameFuntion('dsadad dasdasd')).toBe(true);
    expect(service.validateNameFuntion('dsadad')).toBe(false);
    expect(service.validateNameFuntion('dsadad 123123123')).toBe(false);
  });

  it('валидация номера телефона: 9 цифр, должен начинаться с "+", должен состоять из цифр', () => {
    expect(service.validateNumberFuntion('dsadad dasdasd')).toBe(false);
    expect(service.validateNumberFuntion('6464564645645645')).toBe(false);
    expect(service.validateNumberFuntion('123213123 12312312')).toBe(false);
    expect(service.validateNumberFuntion('+12321312312312312')).toBe(true);
    expect(service.validateNumberFuntion('123213123 12312312')).toBe(false);
  });

  it('валидация адреса: 3 слова, больше 5 символов каждое', () => {
    expect(service.validateAdressFuntion('dsadad dasdasd sdsadsad')).toBe(true);
    expect(service.validateAdressFuntion('6464564645645645')).toBe(false);
    expect(service.validateAdressFuntion('123213123 12312312')).toBe(false);
    expect(service.validateAdressFuntion('+12321312312312312')).toBe(false);
    expect(service.validateAdressFuntion('123213123 12312312')).toBe(false);
    expect(service.validateAdressFuntion('123213123 12312312')).toBe(false);
    expect(service.validateAdressFuntion('123213123 12312312')).toBe(false);
  });
});
