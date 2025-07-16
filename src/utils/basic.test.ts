import { describe, it, expect } from 'vitest'

describe('Basic Tests', () => {
  it('should pass basic math test', () => {
    expect(2 + 2).toBe(4)
  })

  it('should handle string operations', () => {
    expect('wool pickup tracker'.toUpperCase()).toBe('WOOL PICKUP TRACKER')
  })

  it('should work with arrays', () => {
    const clients = ['Farm A', 'Farm B', 'Farm C']
    expect(clients).toHaveLength(3)
    expect(clients[0]).toBe('Farm A')
  })

  it('should handle dates', () => {
    const now = new Date()
    expect(now).toBeInstanceOf(Date)
  })
})