import UserActions from "./UserActions";

const userReducer = (state, action) => {
    switch (action.type) {
        case UserActions.SAVE_USER:
            return {
                ...state,
                users: [...state.users, action.payload]
            }
        case UserActions.UPDATE_USER:
            return {}
        case UserActions.DELETE_USER:
            return {}
        case UserActions.GET_USER: {
            return {}
        }
        case UserActions.GET_ALL_USERS: {
            return {
                ...state,
                users: action.payload || []
            }
        }
        default:
            return state;

    }
}

export default userReducer;