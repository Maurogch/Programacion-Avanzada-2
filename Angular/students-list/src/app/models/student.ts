import { Career } from './career';

export class Student {
  private _studentId: number;
  private _career: Career;
  private _lastName: string;
  private _firstName: string;
  private _dni: string;
  private _email: string;
  private _address: string;

  constructor(
    studentId?: number,
    career?: Career,
    lastName?: string,
    firstName?: string,
    dni?: string,
    email?: string,
    address?: string
  ) {
    this._studentId = studentId;
    this._career = career;
    this._lastName = lastName;
    this._firstName = firstName;
    this._dni = dni;
    this._email = email;
    this._address = address;
  }

  public get studentId(): number {
    return this._studentId;
  }

  public get career(): Career {
    return this._career;
  }

  public get lastName(): string {
    return this._lastName;
  }

  public get firstName(): string {
    return this._firstName;
  }

  public get dni(): string {
    return this._dni;
  }

  public get email(): string {
    return this._email;
  }

  public get address(): string {
    return this._address;
  }

  public set studentId(value: number) {
    this._studentId = value;
  }

  public set career(value: Career) {
    this._career = value;
  }

  public set lastName(value: string) {
    this._lastName = value;
  }

  public set firstName(value: string) {
    this._firstName = value;
  }

  public set dni(value: string) {
    this._dni = value;
  }

  public set email(value: string) {
    this._email = value;
  }

  public set address(value: string) {
    this._address = value;
  }
}
