import { describe, it, expect } from 'vitest'
import Validator from '../validator.js'
import { ValidationError } from '../../errors/default-errors.js'

describe('Validator', () => {
	describe('validateUsername', () => {
		it('should throw ValidationError if username does not match pattern', () => {
			expect(() => Validator.validateUsername('short')).toThrow(ValidationError)
			expect(() =>
				Validator.validateUsername('thisusernameiswaytoolong')
			).toThrow(ValidationError)
		})

		it('should return true if username is valid', () => {
			expect(Validator.validateUsername('ValidUser123')).toBe(true)
		})
	})

	describe('validatePassword', () => {
		it('should throw ValidationError if password does not match pattern', () => {
			expect(() => Validator.validatePassword('short')).toThrow(ValidationError)
			expect(() => Validator.validatePassword('onlyletters')).toThrow(
				ValidationError
			)
			expect(() =>
				Validator.validatePassword('123456789012345678901234567890123')
			).toThrow(ValidationError)
		})

		it('should return true if password is valid', () => {
			expect(Validator.validatePassword('Valid1234')).toBe(true)
		})
	})
})
