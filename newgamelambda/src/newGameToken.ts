import randomBytes from "./randomBytes";

export default async function newGameToken(length: number, chars: string): Promise<string> {
  const bytes = await randomBytes(length);
  let token = "";
  for (let i = 0; i < length; i++) {
    token += chars.charAt(bytes[i] % chars.length);
  }
  return token;
}
