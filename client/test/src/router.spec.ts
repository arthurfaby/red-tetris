import { describe, it, expect, vi } from "vitest";

vi.mock("@generouted/react-router/client", () => ({
  components: vi.fn(() => ({
    Link: vi.fn(),
    Navigate: vi.fn(),
  })),
  hooks: vi.fn(() => ({
    useModals: vi.fn(),
    useNavigate: vi.fn(),
    useParams: vi.fn(),
  })),
  utils: vi.fn(() => ({
    redirect: vi.fn(),
  })),
}));

import { Link, Navigate, useModals, useNavigate, useParams, redirect } from "@/router.ts";

describe("router.ts", () => {
  it("exports Link", () => {
    expect(Link).toBeDefined();
  });

  it("exports Navigate", () => {
    expect(Navigate).toBeDefined();
  });

  it("exports useModals", () => {
    expect(useModals).toBeDefined();
  });

  it("exports useNavigate", () => {
    expect(useNavigate).toBeDefined();
  });

  it("exports useParams", () => {
    expect(useParams).toBeDefined();
  });

  it("exports redirect", () => {
    expect(redirect).toBeDefined();
  });
});
