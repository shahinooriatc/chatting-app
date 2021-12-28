import { combineReducers } from "redux";
import * as actionType from "../Action/Type";

const initialState = {
    currentUser: null,
    isLoading: true
}

const user_reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.SET_USER:
            return {
                currentUser: action.payload.currentUser,
                isLoading: false
            }
        case actionType.CLEAR_USER:
            return {
                ...initialState
            }
        default:
            return state;
    }
}


const initialStateGroup = {
    setCurrentGroup: null,

}
const group_reducer = (state = initialStateGroup, action) => {
    switch (action.type) {
        case actionType.SET_CURRENT_GROUP:
            return {
                ...state,
                setCurrentGroup: action.payload.currentGroup,
            }
        default:
            return state;
    }
}

//After Packing all reducers Named as 'user' in object file then export for App.js //
const rootReducer = combineReducers({
    user: user_reducer,
    group: group_reducer
})

export default rootReducer;
