const mockValidateNumber = jest.fn((value: string) => {
  const firstNumber: boolean = value.split('')[0] === '+';
  const numbers: boolean = /^\d+$/.test(value.slice(1));
  const length: boolean = value.slice(1).trim().length > 8;

  return firstNumber && numbers && length;
});

const mockValidateAdress = jest.fn((value: string) => {
  const count: boolean = value.split(' ').length > 2;
  const length: boolean = value.split(' ').filter((item) => item.trim().length < 5).length === 0;

  return count && length;
});

const mockValidateEmail = jest.fn((value: string) => {
  const specialChars = '[`!#$%^&*()_+-=[]{};\':"\\|,<>/?~]/';
  const tempInput = value;
  const secondPart = tempInput.split('@').at(-1);
  const domain = secondPart?.split('.').at(-1);
  if (
    !tempInput.includes('@') ||
    tempInput.indexOf('@') !== tempInput.lastIndexOf('@') ||
    specialChars.split('').some((specialChar) => secondPart?.includes(specialChar)) ||
    !secondPart?.includes('.') ||
    secondPart.indexOf('.') !== secondPart.lastIndexOf('.') ||
    !domain ||
    (domain && domain.length < 2)
  ) {
    return false;
  } else {
    return true;
  }
});

const mockValidateName = jest.fn((value: string) => {
  const count: boolean = value.split(' ').length > 1;
  const words: boolean = /^[a-zA-Z]+$/.test(value.split(' ').join('').trim().toLowerCase());
  const length: boolean = value.split(' ').filter((item) => item.trim().length < 3).length === 0;

  return count && words && length;
});

describe('validation personal info', () => {
  it('валидация имени: 2 слова по 5 символов', () => {
    expect(mockValidateName('dsadad dasdasd')).toBe(true);
    expect(mockValidateName('dsadad')).toBe(false);
    expect(mockValidateName('dsadad 123123123')).toBe(false);
  });

  it('валидация номера телефона: 9 цифр, должен начинаться с "+", должен состоять из цифр', () => {
    expect(mockValidateNumber('dsadad dasdasd')).toBe(false);
    expect(mockValidateNumber('6464564645645645')).toBe(false);
    expect(mockValidateNumber('123213123 12312312')).toBe(false);
    expect(mockValidateNumber('+12321312312312312')).toBe(true);
    expect(mockValidateNumber('123213123 12312312')).toBe(false);
  });

  it('валидация адреса: 3 слова, больше 5 символов каждое', () => {
    expect(mockValidateAdress('dsadad dasdasd sdsadsad')).toBe(true);
    expect(mockValidateAdress('6464564645645645')).toBe(false);
    expect(mockValidateAdress('123213123 12312312')).toBe(false);
    expect(mockValidateAdress('+12321312312312312')).toBe(false);
    expect(mockValidateAdress('123213123 12312312')).toBe(false);
    expect(mockValidateAdress('123213123 12312312')).toBe(false);
    expect(mockValidateAdress('123213123 12312312')).toBe(false);
  });

  it('валидация почты: не должно быть спец. символов, @ и . встречается только 1 раз, длина домена больше 3', () => {
    expect(mockValidateEmail('sdad@asdasd@asdsd.com')).toBe(false);
    expect(mockValidateEmail('dsasd@mail.rue')).toBe(true);
    expect(mockValidateEmail('123213123 12312312')).toBe(false);
    expect(mockValidateEmail('@da.1')).toBe(false);
  });
});