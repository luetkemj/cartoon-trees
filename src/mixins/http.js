export const FETCH_DEFAULT_OPTIONS = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

export function checkHttpStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

export const localRequest = async (uri, options) => {
  const response = await fetch(uri, { ...FETCH_DEFAULT_OPTIONS, ...options });
  checkHttpStatus(response);
  await response.json();
};
