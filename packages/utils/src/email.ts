import { isEmptyStr } from "./string"

export const parseEmail = (email: string) => email?.trim().toLowerCase().split('@')

export const formatEmail = (email?: string) => {
	if (!email) return ''

	const [ username, domain ] = parseEmail(email)

	return `${username.replace(/[\W_]/g, '')}@${domain}`
}

export const validEmailProviders = [
  'gmail.com',
  'google.com',
  'yahoo.com',
  'protonmail.com',
  'hotmail.com',
  'outlook.com',
  'msn.com',
  'live.com',
  'aol.com',
  'yandex.com',
  'mail.ru'
]

const validEmailSet = new Set(validEmailProviders)

export const isValidEmailProvider = (email?: string) => {
  if (!email || isEmptyStr(email)) return false

  const [ , domain ] = parseEmail(email)

  return validEmailSet.has(domain)
}