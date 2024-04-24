import { newLogger } from '../../logger'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

const log = newLogger('OffchainSignerRequests')

export const OffchainSignerEndpoint = {
  GENERATE_PROOF: 'auth/generate-address-verification-proof',
  ADDRESS_SIGN_IN: 'auth/address-sign-in',
  REFRESH_TOKEN: 'auth/refresh-token',
  REVOKE_TOKEN: 'auth/revoke-token',
  SIGNUP: 'auth/email-sign-up',
  SIGNIN: 'auth/email-sign-in',
  CONFIRM: 'auth/confirm-email',
  RESEND_CONFIRMATION: 'auth/resend-email-confirmation',
  SIGNER_SIGN: 'signer/sign',
  FETCH_MAIN_PROXY: 'signer/main-proxy-address',
} as const

export type OffchainSignerEndpoint =
  typeof OffchainSignerEndpoint[keyof typeof OffchainSignerEndpoint]

export type Method = 'GET' | 'POST'

export const setAuthOnRequest = (accessToken: string) => {
  try {
    axios.interceptors.request.use(
      async (config: AxiosRequestConfig) => {
        config.headers = config.headers ?? {}

        config.headers = {
          Authorization: accessToken,
        }

        return config
      },
      error => {
        return Promise.reject(error)
      },
    )
  } catch (err) {
    log.error('Failed setting auth header', err)
  }
}

type SendRequestProps = {
  request: () => Promise<AxiosResponse<any, any>>
  onFailedText: string
  onFaileReturnedValue?: any
}

export const sendRequest = async ({ request, onFailedText }: SendRequestProps) => {
  try {
    const res = await request()
    if (res.status !== 200) {
      console.warn(onFailedText)
    }

    return res.data
  } catch (err) {
    return Promise.reject(err)
  }
}

type GetParams = {
  url: string
  baseUrl?: string
  data?: any
  config?: any
}

export type SendHttpRequestProps = {
  params: GetParams
  onFaileReturnedValue: any
  onFailedText: string
  method: Method
  accessToken?: string
}

export const setBaseUrl = (rootUrl: string) => {
    axios.defaults.baseURL = rootUrl
}

export const sendHttpRequest = ({
  params: { url, baseUrl, data, config },
  method,
  ...props
}: SendHttpRequestProps) => {
  if (props.accessToken) setAuthOnRequest(props.accessToken)

  if (!axios.defaults.baseURL) throw new Error('Base URL is not set.')

  if (baseUrl) setBaseUrl(baseUrl)

  switch (method) {
    case 'GET': {
      return sendRequest({
        request: () => axios.get(url, config),
        ...props,
      })
    }
    case 'POST': {
      return sendRequest({
        request: () => axios.post(url, data, config),
        ...props,
      })
    }
    default: {
      return
    }
  }
}