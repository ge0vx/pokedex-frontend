import { useEffect, useReducer } from 'react'

export interface State<T> {
  data?: T
  error?: string
  loading?: boolean
}

type Action<T> =
  | { type: 'loading' }
  | { type: 'success'; payload: T }
  | { type: 'error'; payload: string }

function useFetch<T = unknown>(
  url?: string | undefined,
  options?: RequestInit,
  responseType?: string | undefined
): State<T> {
  const initialState: State<T> = {
    data: undefined,
    error: undefined,
    loading: false,
  }

  const fetchReducer = (state: State<T>, action: Action<T>): State<T> => {
    switch (action.type) {
      case 'loading':
        return { ...initialState, loading: true }
      case 'success':
        return { ...initialState, loading: false, data: action.payload }
      case 'error':
        return { ...initialState, loading: false, error: action.payload }
      default:
        return state
    }
  }

  const [state, dispatch] = useReducer(fetchReducer, initialState)

  useEffect(() => {
    if (!url) return
    const fetchData = async () => {
      dispatch({ type: 'loading' })

      try {
        const response = await fetch(url, {
          ...options
        })
        if (response.ok) {
          const data = (await response.json()) as T;
          dispatch({ type: 'success', payload: data })
        } else {
          // eslint-disable-next-line no-console
          console.error(response.statusText)
          dispatch({ type: 'error', payload: 'Error fetching data' })
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          // eslint-disable-next-line no-console
          console.error(error)
        }
        dispatch({ type: 'error', payload: 'Error fetching data' })
      }
    }

    fetchData()
    // eslint-disable-next-line
  }, [url, JSON.stringify(options)])

  return { ...state }
}

export default useFetch
