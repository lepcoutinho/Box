"use client";
import style from "./style.module.scss";

import Image from "next/image";

import ImgDisc from "../../img/disc.png"
import { Key, useEffect, useState } from "react";

function NowPlay({ token }: { token: string }) {
  const [id, setId] = useState<string | undefined>();
  const [item, setItem] = useState<any>({});
  const [playing, setPlaying] = useState<boolean | undefined>();
  const [capa, setCapa] = useState<string | undefined>();
  const [queue, setQueue] = useState<any>();

  let artists: any;
  let labelArtists;

  const Authorization = `Bearer ${token}`;

  useEffect(() => {
    const intervalo = setInterval(() => {
      fetch("https://api.spotify.com/v1/me/player", {
        method: "GET",
        headers: { Authorization },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data && data.item) {
            setId(data.item.id);
            setItem(data.item);
            setPlaying(data.is_playing);
            setCapa(data.item.album.images?.[0]?.url);
          }
        })
        .catch((error) => {
          console.error("Erro ao buscar player:", error);
        });

      fetch("https://api.spotify.com/v1/me/player/queue", {
        method: "GET",
        headers: { Authorization },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data && data.queue) {
            setQueue(data.queue);
          }
        })
        .catch((error) => {
          console.error("Erro ao buscar player:", error);
        });
    }, 2500);

    return () => clearInterval(intervalo); // importante limpar o intervalo
  }, []);

  if (id) {
    artists = item.artists;
    labelArtists = artists.map((artist: { name: any; }) => artist.name).join(", ");
  }

  return (
    <section className={style.Music}>
      {id ? (
        <>
          <div className={style.Disc}>
            <Image
              src={ImgDisc}
              className={playing ? style.DiscPlay : style.DiscPause}
              alt={"Disc"}
            />

            <div className={style.ImgMusic}>
              <span />

              {capa && (
                <Image
                  src={capa}
                  alt="Capa do álbum"
                  width={640}
                  height={640}
                  className={style.Capa}
                />
              )}
            </div>
          </div>
          <div className={style.Info}>
            <div className={style.Title}>
              <h2>{item.name && item.name}</h2>
              <h1>{labelArtists && labelArtists}</h1>
            </div>

            <div className={style.Fila}>
            <h2>fila</h2>
              {queue &&
                
                queue
                  .slice(0, 8)
                  .map((item: any, index: Key | null | undefined) => (
                    <div key={index}>
                      <p>{item.name}</p>
                    </div>
                  ))}
            </div>
          </div>
        </>
      ) : (
        <div>Sem Musica</div>
      )}
    </section>
  );
}

export default NowPlay;
