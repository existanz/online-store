export default class LocalStorageSvc {
  private records: { [key: string]: string };

  constructor() {
    this.records = {};
    this.load();
  }
  private save(): void {
    Object.keys(this.records).forEach((key) => {
      localStorage.setItem(key, this.records[key]);
    });
  }

  private load(): void {
    for (let i = 0; i < localStorage.length; i++) {
      const key: string | null = localStorage.key(i);
      if (key) {
        this.records[key] = localStorage.getItem(key) as string;
      } else {
        console.error('LocalStorage is empty!');
      }
    }
  }

  public getRecord(key: string): string {
    return this.records[key];
  }

  public getRecordObj(key: string): object {
    if (this.getRecord(key)) return <object>JSON.parse(this.getRecord(key));
    return {};
  }

  public setRecord(key: string, value: unknown): void {
    if (typeof value === 'string') this.records[key] = value;
    if (typeof value === 'number') this.records[key] = value.toString();
    if (typeof value === 'object') this.records[key] = JSON.stringify(value);
    this.save();
  }
}
