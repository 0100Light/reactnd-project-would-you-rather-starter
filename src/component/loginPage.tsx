import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../redux/hooks";
import {loadUsers} from "../redux/userSlice";
import {_getUsers} from "../_DATA";

function LoginPage() {
    let dispatch = useAppDispatch()
    let loadedUsers = useAppSelector(state => state.user.getUsers)


    // https://medium.com/@timtan93/states-and-componentdidmount-in-functional-components-with-hooks-cac5484d22ad
    // empty dependency: same effect as ComponentDidMount
    // dependency(+): when the value updates, the function will be run again, same effect as ComponentDidUpdate
    useEffect(()=> {
        _getUsers().then(data => {
            dispatch(loadUsers(data))
        })
    }, [])

    return (
        <div>
            <h3>Login Page</h3>
        </div>
    )
}

export default LoginPage