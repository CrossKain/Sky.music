import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import ProgressBar from "./ProgressBar";
describe("Component Progress Bar", () => {
  test("Should render Progress Bar", () => {
    const onChange = jest.fn();
    render(<ProgressBar max={20} value={13} onChange={onChange} />);
    const input = screen.getByTestId("progress-bar");
    expect(input).toBeInTheDocument();
  }),
    test("Should render Progress Bar with value 13", () => {
      const onChange = jest.fn();
      render(<ProgressBar max={20} value={13} onChange={onChange} />);
      const input = screen.getByTestId("progress-bar");
      expect(input).toHaveAttribute("value", "13");
    });
});
