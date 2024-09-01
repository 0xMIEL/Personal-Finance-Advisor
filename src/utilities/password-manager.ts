import bcrypt from 'bcryptjs'

class PasswordManager {
	// Hashes a plaintext password using bcrypt with a salt
	static async hashPassword(plaintextPassword: string): Promise<string> {
		const saltRounds = 10 // Number of salt rounds for bcrypt
		const salt = await bcrypt.genSalt(saltRounds)
		const hashedPassword = await bcrypt.hash(plaintextPassword, salt)
		return hashedPassword
	}

	// Compares a plaintext password with a hashed password
	static async comparePasswords(
		plaintextPassword: string,
		hashedPassword: string
	): Promise<boolean> {
		return await bcrypt.compare(plaintextPassword, hashedPassword)
	}
}

export default PasswordManager
