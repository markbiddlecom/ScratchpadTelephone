import crypto from "crypto";

export default function randomBytes(length: number): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(length, (err: any, buffer: Buffer) => {
       if (err) {
         reject(err);
       } else {
         resolve(buffer);
       }
    });
  });
};
