import randomNames from "../randomNames.json";

export default function generateRandomPlayerName() {
  let name = "";
  for (let part of randomNames.parts) {
    name += part[Math.floor(Math.random() * part.length)];
  }
  return name;
}
