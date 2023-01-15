// type StorageType = Record<string, string>;

// const storage: StorageType = {};

// const MOCK_SET_DATA_LOCAL_STORAGE = jest.fn((data: StorageType, key: string): void => {
//   delete storage[key];
//   storage[key] = JSON.stringify(data);
// });

// const MOCK_CHECK_DATA_LOCAL_STORAGE = jest.fn((key: string): StorageType | null => {
//   const result: StorageType | null = key in storage ? JSON.parse(storage[key]) : null;
//   return result;
// });