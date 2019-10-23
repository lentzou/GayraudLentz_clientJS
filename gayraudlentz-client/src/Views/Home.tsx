import React from "react";
import {useAuth} from "../Context/auth";

interface IProps {

}

function Home(props: IProps) {

    const { authTokens } = useAuth();

    console.log(authTokens);

    return <div>Home Page</div>;
}

export default Home;
