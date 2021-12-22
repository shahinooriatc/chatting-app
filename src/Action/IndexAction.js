import * as actiontype from "./Type";

export const setUser = (user) => {
    return {
        type: actiontype.SET_USER,
        payload: {
            currentUser: user
        }
    }
}

export const clearUser = () => {
    return {
        type: actiontype.CLEAR_USER,
        
    }
}