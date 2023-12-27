const get404Error = (queryResult: any) => {
  if (queryResult?.error?.response.status === 404) {
    return true;
  }
  return false;
};

export default get404Error;
