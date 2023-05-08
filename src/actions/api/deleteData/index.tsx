import {api} from '../api';

interface deleteDataProps {
  url: string;
}

async function deleteDataHook<Payload>({url}: deleteDataProps): Promise<{
  data: Payload | null;
  success: boolean;
}> {
  let data: Payload | null = null;
  let success: boolean = false;

  try {
    await api
      .delete(url)
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

export default deleteDataHook;
