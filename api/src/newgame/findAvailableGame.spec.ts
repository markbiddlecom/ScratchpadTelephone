import "mocha";

import { assert, expect } from "chai";
import sinon, { SinonStub } from "sinon";

import * as db from "../db";
import findAvailableGame from "./findAvailableGame";

describe("findAvailableGame", function() {
  // Mock the database methods
  let stub: SinonStub;
  beforeEach(() => {
    stub = sinon.stub(db, "batchGetGames");
  });
  afterEach(() => {
    stub.restore();
  });

  it("prefers an unmatched token over an existing game", async function() {
    const existingToken = "existing";
    const unallocatedToken = "unallocated";
    stub.resolves([{ token: existingToken, timestamp: 0 }]);

    const [actualToken, actualGame] = await findAvailableGame([ existingToken, unallocatedToken ]);

    expect(actualToken).to.equal(unallocatedToken);
    expect(actualGame).to.be.null;
  });

  it("will match an expired existing game", async function() {
    const existingToken = "existing";
    const expectedGame = { token: existingToken, timestamp: 0 };
    stub.resolves([ expectedGame ]);

    const [actualToken, actualGame] = await findAvailableGame([ existingToken ]);

    expect(actualToken).to.equal(existingToken);
    expect(actualGame).to.equal(expectedGame);
  });

  it("returns null if it can't find an unused token or an expired game", async function() {
    const existingToken = "existing";
    const expectedGame = { token: existingToken, timestamp: new Date().valueOf() };
    stub.resolves([ expectedGame ]);

    const actual = await findAvailableGame([ existingToken ]);

    expect(actual).to.be.null;
  });
});
