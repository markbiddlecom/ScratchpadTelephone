import "mocha";

import { assert, expect } from "chai";
import sinon, { SinonStub } from "sinon";

import * as db from "../db";
import * as findAvailableGame from "./findAvailableGame";

import createOrComandeerGame from "./createOrComandeerGame";

describe("createOrComandeerGame", function() {
  // Mock the database methods
  let stubs: { [stub: string]: SinonStub } = {};
  beforeEach(() => {
    stubs.createGame = sinon.stub(db, "createGame");
    stubs.updateGame = sinon.stub(db, "updateGame");
    stubs.findAvailableGame = sinon.stub(findAvailableGame, "default");
  });
  afterEach(() => {
    Object.values(stubs).forEach(v => v.restore());
  });

  it("returns null if no available token was found", async function() {
    const actual = await createOrComandeerGame("");
    expect(actual).to.be.null;
  });

  it("attempts to create a game if one does not exist", async function() {
    const expectedToken = "a token";
    stubs.findAvailableGame.resolves([expectedToken, null]);
    stubs.createGame.resolvesArg(0);

    await createOrComandeerGame("");

    assert.isTrue(
        stubs
            .createGame
            .withArgs(sinon.match({ token: expectedToken }))
            .calledOnce
    );
  });

  it("creates a new games using a current timestamp", async function() {
    const expected = new Date().valueOf();
    stubs.findAvailableGame.resolves(["a token", null]);
    stubs.createGame.resolvesArg(0);

    const actual = await createOrComandeerGame("");

    expect(actual?.timestamp).to.be.at.least(expected);
  });

  it("creates a new game using the provided sync URI", async function() {
    const expectedSyncUri = "some kinda URI";
    stubs.findAvailableGame.resolves(["a token", null]);
    stubs.createGame.resolvesArg(0);

    const actual = await createOrComandeerGame(expectedSyncUri);

    expect(actual?.syncUri).to.equal(expectedSyncUri);
  });

  it("attempts to update a game when instructed", async function() {
    const expectedToken = "a token";
    stubs.findAvailableGame.resolves([expectedToken, { token: expectedToken }]);
    stubs.updateGame.resolvesArg(0);

    await createOrComandeerGame("");

    sinon.assert.calledOnce(stubs.updateGame.withArgs(
        sinon.match({ token: expectedToken }),
        sinon.match.any
    ));
  });

  it("attempts to update a game with the correct expected timestamp", async function() {
    const expectedTimestamp = Math.random();
    stubs.findAvailableGame.resolves(["a token", { timestamp: expectedTimestamp }]);
    stubs.updateGame.resolvesArg(0);

    await createOrComandeerGame("");

    sinon.assert.calledOnce(stubs.updateGame.withArgs(
        sinon.match.any,
        sinon.match(expectedTimestamp)
    ));
  });

  it("updates a game using the current timestamp,", async function() {
    const expected = new Date().valueOf();
    stubs.findAvailableGame.resolves(["a token", {}]);
    stubs.updateGame.resolvesArg(0);

    const actual = await createOrComandeerGame("");

    expect(actual?.timestamp).to.be.at.least(expected);
  });

  it("updates a game using the provided sync URI", async function() {
    const expectedSyncUri = "some kinda URI";
    stubs.findAvailableGame.resolves(["a token", {}]);
    stubs.updateGame.resolvesArg(0);

    const actual = await createOrComandeerGame(expectedSyncUri);

    expect(actual?.syncUri).to.equal(expectedSyncUri);
  });

});
