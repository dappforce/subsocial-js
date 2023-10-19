import { AxiosError } from 'axios'
import { OffchainSignerEndpoint, sendHttpRequest, SendHttpRequestProps } from './utils'

type EmailSignUpProps = {
  email: string
  password: string
  accountAddress: string
  signedProof: string
  proof: string
  hcaptchaResponse: string
}

type EmailSignInProps = {
  email: string
  password: string
  hcaptchaResponse: string
}

type AddressSignInProps = {
  signedProof: string
  proof: string
  hcaptchaResponse: string
}

type ConfirmEmailProps = {
  code: string
  accessToken: string
}

type SubmitSignedCallDataProps = {
  data: string
  jwt: string
}

export type JwtPayload = {
  accountAddress: string
  accountAddressVerified: boolean
  email: string
  emailVerified: boolean
  iat: number
  exp: number
}
interface Error {
  message: string[]
  statusCode: number
}

type ErrorMessageProps = {
  error: unknown
  showError?: boolean
}

export function onErrorHandler(
  error: unknown,
  callback: (errorMessage: string) => void,
  showError?: boolean,
) {
  const errorMessage = getErrorMessage({ error, showError })
  if (errorMessage) {
    callback(errorMessage as string)
  }
}

export function getErrorMessage({ error, showError = false }: ErrorMessageProps) {
  const err = error as AxiosError<Error>
  if (!err.response?.data) return err.message
  const { message, statusCode } = err.response?.data

  // Handle specific error message from resend confirmation endpoint
  if (
    statusCode === 400 &&
    typeof message === 'string' &&
    message === 'Wait before sending another confirmation.' &&
    !showError
  )
    return

  return err.response?.data?.message ?? err.message
}

export const requestProof = async (accountAddress: string) => {
  const data = {
    accountAddress,
  }

  const res = await sendHttpRequest({
    params: {
      url: OffchainSignerEndpoint.GENERATE_PROOF,
      data,
    },
    method: 'POST',
    onFaileReturnedValue: undefined,
    onFailedText: 'Failed to generate proof',
  })

  return res
}

export const addressSignIn = async (props: AddressSignInProps) => {
  const res = await sendHttpRequest({
    params: {
      url: OffchainSignerEndpoint.ADDRESS_SIGN_IN,
      data: props,
    },
    method: 'POST',
    onFaileReturnedValue: undefined,
    onFailedText: 'Failed to sign in with address',
  })

  return res
}

export const emailSignUp = async (props: EmailSignUpProps) => {
  const res = await sendHttpRequest({
    params: {
      url: OffchainSignerEndpoint.SIGNUP,
      data: props,
    },
    method: 'POST',
    onFaileReturnedValue: undefined,
    onFailedText: 'Failed to sign up with email',
  })

  return res
}

export const confirmEmail = async ({ code, ...otherProps }: ConfirmEmailProps) => {
  const res = await sendHttpRequest({
    params: {
      url: OffchainSignerEndpoint.CONFIRM,
      data: {
        code,
      },
    },
    method: 'POST',
    onFaileReturnedValue: undefined,
    onFailedText: 'Failed to confirm email',
    ...otherProps,
  })

  return res
}

export const resendEmailConfirmation = async (accessToken: string) => {
  const res = await sendHttpRequest({
    params: {
      url: OffchainSignerEndpoint.RESEND_CONFIRMATION,
    },
    accessToken,
    method: 'POST',
    onFaileReturnedValue: undefined,
    onFailedText: 'Failed to resend email confirmation',
  })

  return res
}

export const emailSignIn = async (props: EmailSignInProps) => {
  const res = await sendHttpRequest({
    params: {
      url: OffchainSignerEndpoint.SIGNIN,
      data: props,
    },
    method: 'POST',
    onFaileReturnedValue: undefined,
    onFailedText: 'Failed to sign in with email',
  })

  return res
}

export const fetchMainProxyAddress = async (accessToken: string) => {
  const res = await sendHttpRequest({
    params: {
      url: OffchainSignerEndpoint.FETCH_MAIN_PROXY,
    },
    accessToken,
    method: 'GET',
    onFaileReturnedValue: undefined,
    onFailedText: 'Failed to fetch proxy address',
  })

  return res
}

export const submitSignedCallData = async ({ data, jwt }: SubmitSignedCallDataProps) => {
  const payload: SendHttpRequestProps = {
    params: {
      url: OffchainSignerEndpoint.SIGNER_SIGN,
      data: {
        unsigedCall: data,
      },
    },
    method: 'POST',
    accessToken: jwt,
    onFaileReturnedValue: undefined,
    onFailedText: 'Failed submitting signed call data',
  }

  const res = sendHttpRequest(payload)

  return res
}
