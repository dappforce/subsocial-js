import { formatEmail } from '../../email';

const formattedEmail = 'test@gmail.com'

const emailAdresss = [
  'test@gmail.com',
  't.est@gmail.com',
  'tes.t@gmail.com',
  'te.st@gmail.com',
  'TeSt@gmail.com',
  'tESt@gmail.com',
  't.e.s.t@Gmail.com',
  'tes.T@GMAIL.COm',
  'tes?T@GMAIL.COm',
  't_e_sT@GMAIL.COm',
  't_e:st@GMAIL.COm',
  't-e-s-t@GMAIL.COm',
  '"t e s t"@GMAIL.COm',
  'te----st@gmail.com'
]

emailAdresss.forEach(email => test(`Check '${email}' email`, () => {
  const res = formatEmail(email)
  expect(res).toEqual(formattedEmail)
}))