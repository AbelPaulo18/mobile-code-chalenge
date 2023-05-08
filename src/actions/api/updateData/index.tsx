import {api} from '../api';

interface updateDataProps {
  url: string;
  bodyObject: object;
}

async function updateDataHook<Payload>({
  url,
  bodyObject,
}: updateDataProps): Promise<{
  data: Payload | null;
  success: boolean;
}> {
  let data: Payload | null = null;
  let success: boolean = false;

  try {
    await api
      .patch(url, bodyObject)
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

export default updateDataHook;
