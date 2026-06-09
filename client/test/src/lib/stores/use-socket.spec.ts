import { toast } from "sonner";

const { mockSocket, mockIo } = vi.hoisted(() => {
  const handlers: Record<string, ((...args: unknown[]) => void)[]> = {};
  const mockSocket = {
    id: "socket-123",
    on: vi.fn((event: string, handler: (...args: unknown[]) => void) => {
      handlers[event] = handlers[event] ?? [];
      handlers[event].push(handler);
    }),
    connect: vi.fn(),
    emit: vi.fn(),
    off: vi.fn(),
    trigger: (event: string, ...args: unknown[]) => {
      (handlers[event] ?? []).forEach((handler) => handler(...args));
    },
  };
  return { mockSocket, mockIo: vi.fn(() => mockSocket) };
});

vi.mock("socket.io-client", () => ({ io: mockIo }));

vi.mock("sonner", () => ({
  toast: { success: vi.fn(), error: vi.fn() },
}));

const { useSocket } = await import("@/lib/stores/use-socket.ts");

describe("useSocket store", () => {
  afterEach(() => {
    mockSocket.connect.mockReset();
    mockSocket.emit.mockReset();
    mockSocket.off.mockReset();
    mockSocket.on.mockClear();
    vi.mocked(toast.error).mockClear();
  });

  it("registers connect/disconnect handlers and updates socketId accordingly", () => {
    expect(mockSocket.on).toHaveBeenCalledWith("connect", expect.any(Function));
    expect(mockSocket.on).toHaveBeenCalledWith(
      "disconnect",
      expect.any(Function),
    );

    mockSocket.trigger("connect");
    expect(useSocket.getState().socketId).toBe(mockSocket.id);

    mockSocket.trigger("disconnect");
    expect(useSocket.getState().socketId).toBeUndefined();
  });

  it("connect calls socket.connect", () => {
    useSocket.getState().connect();
    expect(mockSocket.connect).toHaveBeenCalledTimes(1);
  });

  it("shows a toast error when connect throws", () => {
    mockSocket.connect.mockImplementationOnce(() => {
      throw new Error("boom");
    });
    useSocket.getState().connect();
    expect(toast.error).toHaveBeenCalledWith("Failed to connect to socket");
  });

  it("emit forwards the event and arguments to the socket", () => {
    useSocket.getState().emit("start_game", "room-1");
    expect(mockSocket.emit).toHaveBeenCalledWith("start_game", "room-1");
  });

  it("shows a toast error when emit throws", () => {
    mockSocket.emit.mockImplementationOnce(() => {
      throw new Error("boom");
    });
    useSocket.getState().emit("death");
    expect(toast.error).toHaveBeenCalledWith("Failed to connect to socket");
  });

  it("listen registers the handler on the socket", () => {
    const handler = vi.fn();
    useSocket.getState().listen("game_started" as never, handler as never);
    expect(mockSocket.on).toHaveBeenCalledWith("game_started", handler);
  });

  it("shows a toast error when listen throws", () => {
    mockSocket.on.mockImplementationOnce(() => {
      throw new Error("boom");
    });
    useSocket.getState().listen("game_started" as never, vi.fn() as never);
    expect(toast.error).toHaveBeenCalledWith("Failed to connect to socket");
  });

  it("off removes the handler from the socket", () => {
    const handler = vi.fn();
    useSocket.getState().off("game_started" as never, handler as never);
    expect(mockSocket.off).toHaveBeenCalledWith("game_started", handler);
  });

  it("shows a toast error when off throws", () => {
    mockSocket.off.mockImplementationOnce(() => {
      throw new Error("boom");
    });
    useSocket.getState().off("game_started" as never);
    expect(toast.error).toHaveBeenCalledWith("Failed to connect to socket");
  });
});
