import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import NavMenu from "./NavMenu";
import { renderWithProviders} from "../../store/testStore"

describe("Component Nav Menu", () => {
   test ("Should render Nav Menu", () => {
    renderWithProviders (<NavMenu isOpen={true}/>)
    const testLink = screen.getByText("Главное")
    expect(testLink).toBeInTheDocument()
   })
})