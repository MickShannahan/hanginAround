export const dev = window.location.origin.includes('localhost')
export const host = true
export const baseURL = host ? 'https://192.168.1.159:3000' : dev ? 'http://localhost:3000' : ''
export const useSockets = true
export const domain = 'mickshanny.us.auth0.com'
export const clientId = 'luwNBP378EfKtXGGgxJj9T2kNZ1A562I'
export const audience = 'http://Sandbox.com'

