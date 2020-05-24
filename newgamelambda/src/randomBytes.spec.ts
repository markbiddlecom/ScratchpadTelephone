import "mocha";

import { expect } from "chai";
import randomBytes from "./randomBytes";

describe("randomBytes", function() {
  it("returns the correct number of bytes", async function() {
    const actual = await randomBytes(10);
    expect(actual.length).to.equal(10);
  });

  it("returns bytes in the expected range", async function() {
    const actual = await randomBytes(1000);
    for (let i = 0; i < actual.length; i++) {
      const byte = actual[i];
      expect(byte).to.be.within(0, 255);
    }
  });
});
