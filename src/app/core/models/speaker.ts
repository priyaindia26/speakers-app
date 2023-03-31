


export interface ISpeakerList {
  info: IPageInfo,
  results: ISpeaker[]
}

export interface ISpeaker {
  id: { name: string, value: string };
  role: string;
  name: { first: string, last: string };
  email: string;
  dob: { date: string };
  location: { street: { number: number, name: string }, postcode: number };
  picture: { medium: string };
  phone: string;
  gender: string;
}

export interface IPageInfo {
  page: number;
  results: number;
  seed: string;
  version: string;
}
