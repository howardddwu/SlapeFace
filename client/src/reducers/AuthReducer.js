const AuthReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN_START":
            return {
                ...state,
                user: null,
                token: null,
                isFetching: true,
                error: false,
            };
        case "LOGIN_SUCCESS":
            return {
                ...state,
                user: action.payload,
                token: action.token,
                isFetching: false,
                error: false,
                isLogin: true
            };
        case "LOGIN_FAILURE":
            return {
                ...state,
                user: null,
                token: null,
                isFetching: false,
                error: true,
            };


        case "SIGNUP_START":
            return {
                ...state,
                user: null,
                token: null,
                isFetching: true,
                error: false,
            };
        case "SIGNUP_FAILURE":
            return {
                ...state,
                user: null,
                token: null,
                isFetching: false,
                error: true,
            };



        case "LOGOUT_START":
            return {
                ...state,
                isFetching: true,
                error: false,
            };
        case "LOGOUT_SUCCESS":
            return {
                ...state,
                user: null,
                token: null,
                isFetching: false,
                error: false,
                isLogin: false,
            };
        case "LOGOUT_FAILURE":
            return {
                ...state,
                isFetching: false,
                error: true,
            };


            
        case "REFRESH_START":
            return {
                ...state,
                isFetching: true,
                error: false,
            };
        case "REFRESH_SUCCESS":
            return {
                ...state,
                token: action.token,
                isFetching: false,
                error: false,
            };
        case "REFRESH_FAILURE":
            return {
                ...state,
                isFetching: false,
                error: true,
            };


        default:
            return state;
    }
};

export default AuthReducer;