
export const logIn = async (userData, dispatch) => {

    dispatch({
        type: "LOGIN_START"
    })

    try {
        const res = await AuthApi.logIn(userData);
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });

    } catch (error) {
        console.log(error)
        dispatch({ type: "LOGIN_FAILURE", payload: error });
    }
}




export const signUp = async (userData, dispatch) => {
    dispatch({
        type: "SIGNUP_START"
    })

    try {
        const res = await AuthApi.signUp(userData);
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });

    } catch (error) {
        console.log(error)
        dispatch({ type: "SIGNUP_FAILURE", payload: error });
    }
}


export const logOut = async (dispatch) => {
    dispatch({ type: "LOG_OUT" });
}
