export const defaulterReducer = (state, action) => {
    switch(action.type){
        case 'DEFAULTERS_FETCH_INIT':
            return {
                ...state,
                isLoading: true,
                isError: false
            }
        case 'DEFAULTERS_FETCH_SUCCESS':
            return {
                ...state,
                isLoading: false,
                isError: false,
                data: action.payload
            }

        case 'DEFAULTER_ADD_SUCCESS':
            return {
                ...state,
                isLoading: false,
                isError: false,
                data: action.payload
            }

        case 'DEFAULTERS_FETCH_FAILURE':
            return {
                ...state,
                isLoading: false,
                isError: true
            }

        default:
            throw new Error()
    }

}