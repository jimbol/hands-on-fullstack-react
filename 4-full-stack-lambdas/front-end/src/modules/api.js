import { API as amplifyAPI } from 'aws-amplify';

const basePath = '/api';

export const API = async(method, path, payload) => {
  const url = `${basePath}${path}`;

  const apiName = 'blogapi';

  const options = {};

  if (payload) options.body = payload;

  const response = await amplifyAPI[method.toLowerCase()](apiName, url, options);
  return response;
}
