import CasperJWT from 'casper-jwt'
import type { User } from '../models/user-model.js'

// Secret key for signing and verifying JWTs, defaulting to 'secret' if not set in environment variables
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'secret'

class UserTokenManager {
	// Generates a JWT for a given user record
	// Default expiration time is 2419200 seconds (4 weeks)
	static generateToken(user: User, expirationTimeInSeconds = 2419200): string {
		const payload = {
			userId: user.user_id,
			username: user.username,
		}
		return CasperJWT.sign(payload, JWT_SECRET_KEY, {
			expiresIn: expirationTimeInSeconds,
		})
	}

	// Decodes a JWT without verifying its signature
	static decodeToken(token: string): Record<string, any> {
		return CasperJWT.decode(token) as Record<string, any>
	}

	// Verifies a JWT's signature and returns the decoded token if valid
	static verifyToken(token: string): Record<string, any> {
		return CasperJWT.verify(token, JWT_SECRET_KEY) as Record<string, any>
	}
}

export default UserTokenManager
