export function displayErrorMessage(error, enqueueSnackbar) {
    if (error.response && error.response.data && error.response.data.message) {
      // Check if the message is an array or a single string
      const errorMessage: string | string[] = error.response.data.message;
      if (Array.isArray(errorMessage)) {
        const errorMessages = error.response.data.message.map((errorObj) => errorObj.message);
        const errorMessageString = errorMessages.join("\n");
        enqueueSnackbar(errorMessageString, {
          variant: "error",
        });
      } else {
        // If it's a single string, display it directly
        enqueueSnackbar(errorMessage, {
          variant: "error",
        });
      }
    } else {
    enqueueSnackbar("An error occurred. Please try again.", {
      variant: "error",
    });
  }
}
