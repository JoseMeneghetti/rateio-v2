import Header from "@/components/header/header";
import { render, screen } from "@testing-library/react";

describe("Header component test.", () => {
  test("should have the app name", () => {
    render(<Header />);

    const myElement = screen.getByText("Rateio");

    expect(myElement).toBeInTheDocument();
  });

  test("should have the second h1 app title", () => {
    render(<Header />);

    const myElement = screen.getByText("App");

    expect(myElement).toBeInTheDocument();
  });
});
