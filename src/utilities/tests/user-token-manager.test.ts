import { describe, it, expect, beforeAll } from 'vitest'
import UserTokenManager from '../user-token-manager.js'
import type { User } from '../../models/user-model.js'

describe('UserTokenManager', () => {
	let user: User
	let token: string

	beforeAll(() => {
		user = {
			user_id: 12345,
			username: 'testuser',
		}
	})

	it('should generate a token with correct payload', () => {
		token = UserTokenManager.generateToken(user)
		expect(typeof token).toBe('string')
	})

	it('should decode a token correctly', () => {
		const decoded = UserTokenManager.decodeToken(token)

		expect(decoded).toMatchObject({
			userId: user.user_id,
			username: user.username,
		})
	})

	it('should verify a token correctly', () => {
		const isValid = UserTokenManager.verifyToken(token)
		expect(isValid).toMatchObject({
			userId: user.user_id,
			username: user.username,
		})
	})

	it('should handle an invalid token correctly', () => {
		const invalidToken = 'invalidToken123'
		expect(() => UserTokenManager.verifyToken(invalidToken)).toThrow()
	})
})
