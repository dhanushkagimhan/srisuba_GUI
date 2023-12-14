const getMutationError = (mutationResult: any) => {
  try {
    if (mutationResult?.error?.response.data.message != null) {
      return mutationResult?.error?.response.data.message;
    }
    throw new Error();
  } catch (err) {
    if (mutationResult?.error?.message != null) {
      return mutationResult?.error.message;
    }
    return "Error, Try again";
  }
};

export default getMutationError;
