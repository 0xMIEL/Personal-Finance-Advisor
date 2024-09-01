import { describe, it, expect } from 'vitest'
import PasswordManager from '../password-manager.js'

describe('PasswordManager', () => {
	const password = 'securePassword123'
	let hashedPassword: string

	it('should hash a password correctly', async () => {
		hashedPassword = await PasswordManager.hashPassword(password)

		expect(typeof hashedPassword).toBe('string')
		expect(hashedPassword).not.toBe(password)
		expect(hashedPassword.length).toBeGreaterThan(0)
	})

	it('should compare the correct password with the hash and return true', async () => {
		const isMatch = await PasswordManager.comparePasswords(
			password,
			hashedPassword
		)

		expect(isMatch).toBe(true)
	})

	it('should compare an incorrect password with the hash and return false', async () => {
		const wrongPassword = 'wrongPassword123'
		const isMatch = await PasswordManager.comparePasswords(
			wrongPassword,
			hashedPassword
		)

		expect(isMatch).toBe(false)
	})
})
