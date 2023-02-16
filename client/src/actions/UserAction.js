import * as UserAPI from "../API/UserAPI"




export const editProfile = async (userData, userId, dispatch) => {
    console.log("EDITPROFILE_START")
    dispatch({ type: "EDITPROFILE_START" })

    try {
        const res = await UserAPI.editProfile(userData, userId);

        if (res.status === 200) {
            const { data } = res;
            console.log("EDITPROFILE_SUCCESS")
            dispatch({ type: "EDITPROFILE_SUCCESS", payload: data });
            return false;
        }
        else {
            console.log("EDITPROFILE_FAILURE")
            dispatch({ type: "EDITPROFILE_FAILURE" });
            return true;
        }

    } catch (error) {
        dispatch({ type: "EDITPROFILE_FAILURE", payload: error });
        return true;
    }
}
