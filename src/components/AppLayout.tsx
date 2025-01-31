import NavBar from "./NavBar"
import { Outlet } from "react-router"
import { useContext, useReducer, useState } from "react";
import AllRecipes from "./AllRecipes";
import AddRecipe from "./AddRecipe";
import { UserContext } from "./userContext";
import HomePage from "./HomePage";
import { User, userReducer } from "./user";

const AppLayout = () => {
    const initialUser: User = {
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        address: '',
        phone: ''
    }
    const [user, userDispatch] = useReducer(userReducer, initialUser)
    return (
        <>
            <UserContext value={{ user, userDispatch }}>
            <HomePage/>
            <NavBar />
            <div></div>
            <Outlet />
            </UserContext>
        </>
    )
}

export default AppLayout;