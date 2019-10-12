export class Career {
  private _careerId: number;
  private _name: string;

  constructor(careerId?: number, name?: string) {
    this._careerId = careerId;
    this._name = name;
  }

  public get careerId(): number {
    return this._careerId;
  }

  public get name(): string {
    return this._name;
  }

  public set careerId(value: number) {
    this._careerId = value;
  }

  public set name(value: string) {
    this._name = value;
  }
}
