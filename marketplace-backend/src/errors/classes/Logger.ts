class Logger {
  public async logError(error: Error) {
    console.log("error: ", error);
    console.error(error.message);
  }
}

export default Logger;
