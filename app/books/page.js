"use client";
import style from "./style.module.scss";
import Image from "next/image";
import capa from "../img/book01.jpg";

const Books = () => {
  return (
    <section className={style.Books}>
      <section className={style.Book}>
        <Image
          src={capa}
          alt="Capa do álbum"
          width={640}
          height={640}
          className={style.Capa}
        />
        {/* <div>
          <h2> O Pagador de Promessas</h2>
        </div> */}
      </section>
      <section className={style.Trechos}>
        <div className={style.SlideTrecho}>
          <p>
            "Sei não... a gente nunca sabe se vai precisar. Por isso, é bom ter
            sempre as contas em dia."
          </p>
        </div>
      </section>
    </section>
  );
};

export default Books;
