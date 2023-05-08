export interface IResponsePostData {
  count: number;
  next: string;
  previous?: any;
  results: IPostGetData[];
}

export interface IPostGetData {
  id: string;
  username: string;
  created_datetime: string;
  title: string;
  content: string;
}

export interface IPostData {
  username: string;
  title: string;
  content: string;
}

export interface IPostPatchData {
  title: string;
  content: string;
}
