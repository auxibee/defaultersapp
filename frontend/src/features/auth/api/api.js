import { publicFetch } from "../../../utils/fetcher";

export const register = async (values) => {
    const registeration_data = {
        'username' : values['username'],
        'password' : values['password']
    }
    const response = await publicFetch.post('signup', registeration_data)
    return response

}

export const login = async (values) => {
    const login_data = {
        'username': values['username'],
        'password': values['password']
    }

    const response = await publicFetch.post('login', login_data)
    return response
}