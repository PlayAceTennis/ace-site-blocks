import { describe, expect, test } from "bun:test";
import { BLOCK_REGISTRY, BLOCK_TYPES, createBlock, parseBlocks } from "../block";

describe("blocks", () => {
  test("default props of every block type parse", () => {
    for (const type of BLOCK_TYPES) {
      expect(parseBlocks([createBlock(type)]).success).toBe(true);
      expect(BLOCK_REGISTRY[type].schema.safeParse(BLOCK_REGISTRY[type].defaults()).success).toBe(true);
    }
  });

  test("javascript: href is rejected", () => {
    const block = createBlock("cta");
    block.props.button.href = "javascript:alert(1)";
    expect(parseBlocks([block]).success).toBe(false);
  });

  test("unknown block type is rejected", () => {
    expect(parseBlocks([{ id: "a", type: "nope", props: {} }]).success).toBe(false);
  });
});
