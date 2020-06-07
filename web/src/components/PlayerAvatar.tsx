import { decompressFromBase64 } from "lz-string";
import React from "react";
import { Player } from "../store/state";

import "./PlayerAvatar.scss";

const DEFAULT_AVATAR_IMG = "default-avatar.png";

export type Props = Player & {}

export default function PlayerAvatar({ name, avatarCompressedDataUrl }: Props) {
  return <div className="PlayerAvatar">
    <img
      title={name}
      alt={`${name} avatar`}
      src={(avatarCompressedDataUrl && decompressFromBase64(avatarCompressedDataUrl)) || DEFAULT_AVATAR_IMG}
    />
  </div>
}
