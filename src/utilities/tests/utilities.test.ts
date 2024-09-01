import { describe, it, expect } from 'vitest'
import Utilities from '../utilities.js'

describe('Utilities', () => {
	describe('sleep', () => {
		it('should resolve after the specified time', async () => {
			const start = Date.now()
			const delay = 100

			await Utilities.sleep(delay)

			const end = Date.now()
			const elapsed = end - start
			expect(elapsed).toBeGreaterThanOrEqual(delay)
			expect(elapsed).toBeLessThanOrEqual(delay + 10)
		})
	})
})
