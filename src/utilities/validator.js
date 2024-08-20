class Validator {
	#usernameRegExp = /^[0-9A-Za-z]{6,16}$/
	#passwordRegExp = /^(?=.*?[0-9])(?=.*?[A-Za-z]).{8,32}$/

	#check(regExp, text) {
		return regExp.text(text)
	}

	checkUsername(text) {
		return this.#check(this.#usernameRegExp, text)
	}

	checkPassword(text) {
		return this.#check(this.#passwordRegExp, text)
	}
}
