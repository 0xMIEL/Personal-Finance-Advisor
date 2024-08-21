import { describe, it, vi } from 'vitest';
import connectionPool from '../../connection/connection-pool.js';
vi.mock('../../connection/connection-pool.js', () => ({
    executeQuery: vi.fn(),
}));
describe('BasicModel', () => {
    it('findBy static method', () => {
        ;
        connectionPool.executeQuery.mockResolvedValue({});
    });
});
