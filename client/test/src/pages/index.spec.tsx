import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import Index from "@/pages/index.tsx";

function renderIndex() {
  return render(
    <MemoryRouter>
      <Index />
    </MemoryRouter>,
  );
}

describe("Index page", () => {
  afterEach(() => cleanup());

  it("renders the form correctly", () => {
    renderIndex();
    expect(screen.getByText("Red Tetris - Join room")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Room name*")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Username*")).toBeInTheDocument();
    expect(screen.getByText("Join")).toBeInTheDocument();
  });

  it("shows both errors when submitting without username and roomName", () => {
    renderIndex();
    fireEvent.click(screen.getByText("Join"));
    expect(screen.getByText("Username is required")).toBeInTheDocument();
    expect(screen.getByText("Room name is required")).toBeInTheDocument();
  });

  it("shows separator when there are errors", () => {
    const { container } = renderIndex();
    fireEvent.click(screen.getByText("Join"));
    const separator = container.querySelector("[data-slot='separator']");
    expect(separator).not.toBeNull();
  });

  it("shows only room name error when only username is provided", () => {
    renderIndex();
    const usernameInput = screen.getByPlaceholderText("Username*");
    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.click(screen.getByText("Join"));
    expect(screen.getByText("Room name is required")).toBeInTheDocument();
    expect(screen.queryByText("Username is required")).toBeNull();
  });

  it("shows only username error when only roomName is provided", () => {
    renderIndex();
    const roomInput = screen.getByPlaceholderText("Room name*");
    fireEvent.change(roomInput, { target: { value: "testroom" } });
    fireEvent.click(screen.getByText("Join"));
    expect(screen.getByText("Username is required")).toBeInTheDocument();
    expect(screen.queryByText("Room name is required")).toBeNull();
  });

  it("navigates when both username and roomName are provided", () => {
    renderIndex();
    const roomInput = screen.getByPlaceholderText("Room name*");
    const usernameInput = screen.getByPlaceholderText("Username*");
    fireEvent.change(roomInput, { target: { value: "testroom" } });
    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.click(screen.getByText("Join"));
    expect(screen.queryByText("Username is required")).toBeNull();
    expect(screen.queryByText("Room name is required")).toBeNull();
  });

  it("does not show separator when there are no errors", () => {
    const { container } = renderIndex();
    const separator = container.querySelector("[data-slot='separator']");
    expect(separator).toBeNull();
  });
});
