import {api} from '../api';

interface postDataProps {
  url: string;
  bodyObject: object;
}

async function postDataHook<Payload>({
  url,
  bodyObject,
}: postDataProps): Promise<{
  data: Payload | null;
  success: boolean;
}> {
  let data: Payload | null = null;
  let success: boolean = false;

  try {
    await api
      .post(url, bodyObject)
      .then(res => {
        data = res.data;
        success = true;
      })
      .catch(err => console.log(err));
    return {data, success};
  } catch (error) {
    console.log(error);
    data = null;

    return {data, success};
  }
}

export default postDataHook;
