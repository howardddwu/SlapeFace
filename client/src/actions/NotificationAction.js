

export const setSocket = async (socket, dispatch) => {
    dispatch({ type: "SETSOCKET_START" })

    try {

        dispatch({ type: "SETSOCKET_SUCCESS", payload: socket });
        console.log(socket)



    } catch (error) {
        // console.log(error)
        dispatch({ type: "SETSOCKET_FAILURE"});
    }
}