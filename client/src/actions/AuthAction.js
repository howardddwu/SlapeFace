import * as AuthApi from "../API/AuthAPI"

export const logIn = async (userData, dispatch) => {
    console.log("LOGIN_START")
    dispatch({ type: "LOGIN_START" })

    try {
        const res = await AuthApi.logIn(userData);

        if (res.status === 200) {
            const { data } = res;
            console.log("LOGIN_SUCCESS")
            dispatch({ type: "LOGIN_SUCCESS", payload: data.user, token: data.token });
            return false;
        }
        else {
            console.log("LOGIN_FAILURE")
            dispatch({ type: "LOGIN_FAILURE" });
            return true;
        }


    } catch (error) {
        // console.log(error)
        dispatch({ type: "LOGIN_FAILURE", payload: error });
        return true;
    }
}

export const GoogleLogIn = async (userId, TOKEN, dispatch) => {
    console.log("LOGIN_START")
    dispatch({ type: "LOGIN_START" })

    try {
        const res = await AuthApi.GooglelogIn(userId, TOKEN);

        if (res.status === 200) {
            const { data } = res;
            console.log("LOGIN_SUCCESS")
            dispatch({ type: "LOGIN_SUCCESS", payload: data.user, token: data.token });
            return false;
        }
        else {
            console.log("LOGIN_FAILURE")
            dispatch({ type: "LOGIN_FAILURE" });
            return true;
        }


    } catch (error) {
        // console.log(error)
        dispatch({ type: "LOGIN_FAILURE", payload: error });
        return true;
    }
}




export const signUp = async (userData, dispatch) => {
    dispatch({ type: "SIGNUP_START" })

    try {
        const res = await AuthApi.signUp(userData);

        if (res.status === 200) {
            const { data } = res;
            dispatch({ type: "LOGIN_SUCCESS", payload: data.user, token: data.token });
            return false;
        }
        else {
            dispatch({ type: "SIGNUP_FAILURE" });
            return true;
        }

    } catch (error) {
        dispatch({ type: "SIGNUP_FAILURE", payload: error });
        return true;
    }
}


export const logOut = async (token, dispatch) => {
    console.log("LOGOUT_START")
    dispatch({ type: "LOGOUT_START" })

    try {
        const res = await AuthApi.logOut(token);

        if (res.status === 200) {
            console.log("LOGOUT_SUCCESS")
            await dispatch({ type: "LOGOUT_SUCCESS" });
        }
        else {
            console.log("LOGOUT_FAILURE")
            dispatch({ type: "LOGOUT_FAILURE" });
        }
    } catch (error) {
        console.log(error)
        console.log("LOGOUT_FAILURE")
        dispatch({ type: "LOGOUT_FAILURE" });
    }
}



export const refreshToken = async (token, dispatch) => {
    console.log("REFRESH_START")
    dispatch({ type: "REFRESH_START" })

    try {
        const res = await AuthApi.refreshToken(token);
        console.log(res)

        if (res.status === 200) {
            const { data } = res
            console.log("REFRESH_SUCCESS")
            dispatch({ type: "REFRESH_SUCCESS", token: data.token });
            return false
        }
        else {
            console.log("REFRESH_FAILURE")
            dispatch({ type: "REFRESH_FAILURE" });
            return true
        }

    } catch (error) {
        console.log(error)
        console.log("REFRESH_FAILURE")
        dispatch({ type: "REFRESH_FAILURE" });
        return true
    }
}

