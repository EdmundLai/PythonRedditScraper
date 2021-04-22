import React, { useState, useEffect } from "react";
import { ApiHandler } from "../../ApiHandler";

import PulseLoader from "react-spinners/PulseLoader";

import "./OsuSkinsList.css";

export default function OsuSkinsList() {
  const [osuSkins, setOsuSkins] = useState(null);
  const [nsfwOn, setNsfwOn] = useState(false);
  const [nsfwOff, setNsfwOff] = useState(false);

  useEffect(() => {
    async function getOsuSkins() {
      const skinsObj = await ApiHandler.getOsuSkins();

      setOsuSkins(skinsObj.skins);
    }

    getOsuSkins();
  }, [setOsuSkins]);

  function toggleNsfwOnCheckbox() {
    setNsfwOff(false);
    setNsfwOn(!nsfwOn);
  }

  function toggleNsfwOffCheckbox() {
    setNsfwOn(false);
    setNsfwOff(!nsfwOff);
  }

  const content =
    osuSkins == null ? (
      <div>
        <PulseLoader />
      </div>
    ) : (
      <div className="SkinsContainer">
        <h1>Top osu! skins from /r/OsuSkins</h1>
        <div className="SkinFilters">
          <label>
            <input
              type="checkbox"
              checked={nsfwOn}
              onChange={toggleNsfwOnCheckbox}
            />
            Show NSFW skins only
          </label>
          <label>
            <input
              type="checkbox"
              checked={nsfwOff}
              onChange={toggleNsfwOffCheckbox}
            />
            Show SFW skins only
          </label>
        </div>

        <ol className="SkinsList">
          {osuSkins.map((skin) => {
            const skinContent = (
              <li>
                <a href={skin.link}>{skin.title}</a> {skin.nsfw ? "NSFW" : ""}
              </li>
            );

            let content = <></>;

            if (nsfwOn) {
              if (skin.nsfw) {
                content = skinContent;
              }
            } else if (nsfwOff) {
              if (!skin.nsfw) {
                content = skinContent;
              }
            } else {
              content = skinContent;
            }

            return content;
          })}
        </ol>
      </div>
    );

  return <div>{content}</div>;
}
