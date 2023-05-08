import {api} from '../api';

export async function fetchDataHook<Payload>(
  url: string,
): Promise<{data: Payload | null; success: boolean}> {
  let data: Payload | null = null;
  let success: boolean = false;

  try {
    await api
      .get(url)
      .then(res => {
        data = res.data;
        success = true;
      })
      .catch(err => console.warn(err.message));

    return {data, success};
  } catch (error) {
    data = null;
    success = false;

    return {data, success};
  }
}
