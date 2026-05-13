import { describe, expect, it } from "vitest";
import { TETROMINO_CLASSES } from "@/lib/game/constants.ts";

describe("constants.ts", () => {
  it("should exist", () => {
    expect(TETROMINO_CLASSES).toBeDefined();
  });
});
