export enum Sex {
  MALE = "male",
  FEMALE = "female",
}
export interface ISearch {
  name: string;
  sex: Sex;
  schoolName: string;
  subjectCode: string;
}
