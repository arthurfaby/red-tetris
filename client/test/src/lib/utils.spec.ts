import { describe, expect, it } from "vitest";
import { cn } from "../../../src/lib/utils";

describe("utils.ts", () => {
  describe("cn", () => {
    it("should merge tailwind classes", () => {
      expect(cn(["bg-red-400", "text-sm"])).toEqual("bg-red-400 text-sm");
    });
  });
});
