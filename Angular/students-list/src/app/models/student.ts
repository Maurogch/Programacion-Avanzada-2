import { Career } from './career';

export class Student {
  constructor(
    public career: Career = new Career(),
    public studentId?: number,
    public lastName?: string,
    public firstName?: string,
    public dni?: string,
    public email?: string,
    public address?: string
  ) {}
}
