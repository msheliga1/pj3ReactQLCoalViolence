import { useEffect } from "react";
import Auth from "../utils/auth";
import { redirect } from "react-router-dom";
import SearchBooks from "./SearchBooks";

const Homepage = () => {

    return <>{Auth.loggedIn() ? <SearchBooks /> : <div>Login to access the page</div>}</>
}


export default Homepage;