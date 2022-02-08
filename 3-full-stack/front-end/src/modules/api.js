// const basePath = 'http://localhost:5000/api'; // use localhost when local
const basePath = '/api'; // switch to /api before deploying to ec2

export const API = async(method, path, payload) => {
  const url = `${basePath}${path}`;

  const options = {
    method,
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
  };
  if (payload) options.body = JSON.stringify(payload);

  const response = await fetch(url, options);
  return response.json();
}
