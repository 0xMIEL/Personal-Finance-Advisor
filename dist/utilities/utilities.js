class Utilities {
    static sleep(time) {
        return new Promise(resolve => setTimeout(resolve, time));
    }
    static throwCatchedError(errorType, customMessage, error) {
        if (error instanceof Error) {
            throw new errorType(`${customMessage}.\n Original message: ${error.message}`);
        }
        throw new Error('An unknown error occurred.');
    }
}
export default Utilities;
