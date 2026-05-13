import { describe, expect, it } from "vitest";
import { cn } from "@/lib/utils.ts";

describe("utils.ts", () => {
  describe("cn", () => {
    it("should merge tailwind classes", () => {
      expect(cn(["bg-red-400", "text-sm"])).toEqual("bg-red-400 text-sm");
      expect(cn("bg-red-400", "text-sm")).toEqual("bg-red-400 text-sm");
    });
  });
});
