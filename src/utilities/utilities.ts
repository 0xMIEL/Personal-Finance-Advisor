export default class Utilities {
	static sleep(time: number): Promise<void> {
		return new Promise(resolve => setTimeout(resolve, time))
	}
}
