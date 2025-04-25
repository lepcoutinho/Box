"use client";

import { useContext, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { AppContext } from "../context/appContext";

const Autentificado = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { setAuten } = useContext(AppContext);

  const token = searchParams.get("token");

  useEffect(() => {
    if (token) {
      const GenerateToken = {
        token: token,
        expireIn: "3600",
      };

      setAuten(GenerateToken);
      router.push("/music");
    } else {
      router.push("/erro");
    }
  }, [searchParams, router]);

  return (
    <>
      <p>Auntentificado</p>
    </>
  );
};

export default Autentificado;
