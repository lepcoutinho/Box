//import { createContext, useContext, useState } from 'react';
"use client";

import axios from "axios";
import Router from "next/router";
import { createContext, useState } from "react";
import { setCookie } from "nookies";


type GenerateAuten = {
  token: string;
  expireIn: string;
}

type AppContextType = {
  Auten: GenerateAuten | null;
  setAuten: (token: GenerateAuten | null) => void;
};

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }:any)=> {

  const [Auten, setAuten] = useState<GenerateAuten | null>(null);


  return (
    <AppContext.Provider value={{ setAuten, Auten}}>
      {children}
    </AppContext.Provider>
  );
};