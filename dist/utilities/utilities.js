export default class Utilities {
    static sleep(time) {
        return new Promise(resolve => setTimeout(resolve, time));
    }
}
