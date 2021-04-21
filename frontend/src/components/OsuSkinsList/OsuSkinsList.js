import React, { useState, useEffect } from "react";
import { ApiHandler } from "../../ApiHandler";

import PulseLoader from "react-spinners/PulseLoader";

import "./OsuSkinsList.css";

export default function OsuSkinsList() {
  const [osuSkins, setOsuSkins] = useState(null);

  useEffect(() => {
    async function getOsuSkins() {
      const skinsObj = await ApiHandler.getOsuSkins();

      setOsuSkins(skinsObj.skins);
    }

    getOsuSkins();
  }, [setOsuSkins]);

  const content =
    osuSkins == null ? (
      <div>
        <PulseLoader />
      </div>
    ) : (
      <div className="SkinsContainer">
        <h1>Top osu! skins from /r/OsuSkins</h1>
        <ol className="SkinsList">
          {osuSkins.map((skin) => (
            <li>
              <a href={skin.link}>{skin.title}</a> {skin.nsfw ? "NSFW" : ""}
            </li>
          ))}
        </ol>
      </div>
    );

  return <div>{content}</div>;
}
