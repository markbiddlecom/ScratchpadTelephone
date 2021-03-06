import "mocha";

import { expect } from "chai";
import CONFIG from "./config";

describe("CONFIG", function() {
  it("defines a sufficiently large probability space", () => {
    const maxTokens = Math.pow(Object.keys(CONFIG.TOKEN_CHARS).length, CONFIG.TOKEN_LENGTH);
    function probabilityOfCollision(activeTokens: number) {
      return 1 - Math.pow(Math.E, -(activeTokens * (1 - activeTokens)) / (2 * maxTokens));
    }

    expect(probabilityOfCollision(100000)).to.be.lessThan(0.05);
  });

  describe("#TOKEN_FORMATTER", function() {
    it("formats tokens in groups of three", () => {
      const actual = CONFIG.TOKEN_FORMATTER("abcdefghi");
      expect(actual).to.equal("abc-def-ghi");
    });
  });

  describe("#TOKEN_NORMALIZER", function() {
    it("replaces upper-case values with lower-case", () => {
      const actual = CONFIG.TOKEN_NORMALIZER("AGFHYQ");
      expect(actual).to.equal("agfhyq");
    });

    it("strips out unexpected characters", () => {
      const actual = CONFIG.TOKEN_NORMALIZER("  a/g-f h:y $ ");
      expect(actual).to.equal("agfhy");
    });

    it("substitutes typo'd characters", () => {
      const actual = CONFIG.TOKEN_NORMALIZER("vji2sl");
      expect(actual).to.equal("gayqx1");
    });

    it("substitutes typo'd upper-case characters", () => {
      const actual = CONFIG.TOKEN_NORMALIZER("V");
      expect(actual).to.equal("g");
    });

    it("preserves characters that can't be typo'd", () => {
      const actual = CONFIG.TOKEN_NORMALIZER("fhrw456789");
      expect(actual).to.equal("fhrw456789");
    });
  });
});
