import { createContext } from 'react';
import { useContext } from 'react';

import axios  from 'axios';
import { baseURL } from 'utils/fetcher';
import { AuthenticationContext } from 'store/auth';

// create Context
// de-structure Provider from created context
// create the Provider with the various functions and values

const AuthFetchContext = createContext()

const { Provider } = AuthFetchContext

const AuthFetch = ({ children }) => {
    const { authState } = useContext(AuthenticationContext)
    const authAxios = axios.create({baseURL})
    

    authAxios.interceptors.request.use( (config) => {
        config.headers.Authorization = `Bearer ${authState.token}`
        return config
    }, (error) => {
        return Promise.reject(error)
    })

    authAxios.interceptors.response.use( (response) => { return response}, (error) => {
        const code = error && error.response ? error.response.status : 0
        if( code === 401 || code === 403) {
            console.log('error code', code);
        }

        return Promise.reject(error)
    })

    return (
        <Provider value={{authAxios}}>
            {children}
        </Provider>
    )
}

export { AuthFetchContext, AuthFetch}