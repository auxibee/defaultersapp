
import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { AuthFetchContext } from 'utils/authAxios';

export const useFetch =  (url) => {
    const {authAxios} = useContext(AuthFetchContext)
    
    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    
    useEffect( () => {
     
       const fetchData = async () => {
        setIsLoading(true)
        try {
            const { data } = await authAxios.get(url)
            setData(data)
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            setError('something went wrong')   
    }
       }

       fetchData()
     
    
    },[url,authAxios])

    return {data, isLoading, error, setData}
}

