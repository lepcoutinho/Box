"use client";
// import { NextResponse } from "next/server";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/appContext";

import NowPlay from "../components/music/NowPlay";

const login = () => {
  window.location.href = "/api/login";
};


const Music = () => {
  const { Auten } = useContext(AppContext);
  const [token, setToken] = useState();
  

  useEffect(() => {

    if (!Auten) {
      login();
    } else {
      setToken(Auten.token);
    }
  },[token]);


  return (
    <>
     { token ? <NowPlay token={token}/> : 'teste' }

    </> ) 
};

export default Music;
