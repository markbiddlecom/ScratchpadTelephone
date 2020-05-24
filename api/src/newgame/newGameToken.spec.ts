import "mocha";

import { expect } from "chai";
import sinon, { SinonStub } from "sinon";

import * as randomBytes from "../randomBytes";

import newGameToken from "./newGameToken";

describe("newGameToken", function() {

  // Mock the random bytes library to just return a sequence of bytes to make testing easier.
  let stub: SinonStub;
  beforeEach(() => {
    stub = sinon.stub(randomBytes, "default").callsFake(async function(length) {
      let bytes: number[] = new Array(length);
      for(let i = 0; i < length; i++) { 
        bytes[i] = i % 256;
      }
      return Buffer.from(bytes);
    });
  });

  afterEach(() => {
    stub.restore();
  });

  it("produces tokens of the correct length", async function() {
    const actual = await newGameToken(10, "x");
    expect(actual.length).to.equal(10);
  });

  it("uses only the characters from the provided list", async function() {
    const actual = await newGameToken(10, "x");
    expect(actual).to.equal("xxxxxxxxxx");
  });

  it("uses random data to decide the key", async function() {
    const actual = await newGameToken(10, "1234567890");
    expect(actual).to.equal("1234567890");
  });

  it("handles random data beyond the character range", async function() {
    const actual = await newGameToken(10, "1234");
    expect(actual).to.equal("1234123412");
  });

});
