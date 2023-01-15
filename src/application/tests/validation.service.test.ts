const MOCK_VALIDATE_NUMBER  = jest.fn((value: string) => {
  const firstNumber: boolean = value.split('')[0] === '+';
  const numbers: boolean = /^\d+$/.test(value.slice(1));
  const length: boolean = value.slice(1).trim().length > 8;

  return firstNumber && numbers && length;
});

const MOCK_VALIDATE_ADRESS = jest.fn((value: string) => {
  const count: boolean = value.split(' ').length > 2;
  const length: boolean = value.split(' ').filter((item) => item.trim().length < 5).length === 0;

  return count && length;
});

const MOCK_VALIDATE_EMAIL = jest.fn((value: string) => {
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

const MOCK_VALIDATE_NAME = jest.fn((value: string) => {
  const count: boolean = value.split(' ').length > 1;
  const words: boolean = /^[a-zA-Z]+$/.test(value.split(' ').join('').trim().toLowerCase());
  const length: boolean = value.split(' ').filter((item) => item.trim().length < 3).length === 0;

  return count && words && length;
});

describe('validation personal info', () => {
  it('валидация имени: 2 слова по 5 символов', () => {
    expect(MOCK_VALIDATE_NAME('dsadad dasdasd')).toBe(true);
    expect(MOCK_VALIDATE_NAME('dsadad')).toBe(false);
    expect(MOCK_VALIDATE_NAME('dsadad 123123123')).toBe(false);
  });

  it('валидация номера телефона: 9 цифр, должен начинаться с "+", должен состоять из цифр', () => {
    expect(MOCK_VALIDATE_NUMBER('dsadad dasdasd')).toBe(false);
    expect(MOCK_VALIDATE_NUMBER('6464564645645645')).toBe(false);
    expect(MOCK_VALIDATE_NUMBER('123213123 12312312')).toBe(false);
    expect(MOCK_VALIDATE_NUMBER('+12321312312312312')).toBe(true);
    expect(MOCK_VALIDATE_NUMBER('123213123 12312312')).toBe(false);
  });

  it('валидация адреса: 3 слова, больше 5 символов каждое', () => {
    expect(MOCK_VALIDATE_ADRESS('dsadad dasdasd sdsadsad')).toBe(true);
    expect(MOCK_VALIDATE_ADRESS('6464564645645645')).toBe(false);
    expect(MOCK_VALIDATE_ADRESS('123213123 12312312')).toBe(false);
    expect(MOCK_VALIDATE_ADRESS('+12321312312312312')).toBe(false);
    expect(MOCK_VALIDATE_ADRESS('123213123 12312312')).toBe(false);
    expect(MOCK_VALIDATE_ADRESS('123213123 12312312')).toBe(false);
    expect(MOCK_VALIDATE_ADRESS('123213123 12312312')).toBe(false);
  });

  it('валидация почты: не должно быть спец. символов, @ и . встречается только 1 раз, длина домена больше 3', () => {
    expect(MOCK_VALIDATE_EMAIL('sdad@asdasd@asdsd.com')).toBe(false);
    expect(MOCK_VALIDATE_EMAIL('dsasd@mail.rue')).toBe(true);
    expect(MOCK_VALIDATE_EMAIL('123213123 12312312')).toBe(false);
    expect(MOCK_VALIDATE_EMAIL('@da.1')).toBe(false);
  });
});