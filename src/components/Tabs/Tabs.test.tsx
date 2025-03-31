import { fireEvent, render, screen } from "@testing-library/react"
import { useSearchParams } from "next/navigation"
import { Tabs } from "./Tabs"

jest.mock("next/navigation", () => ({
  useSearchParams: jest.fn(),
}))

const mockTabs = [
  { title: "Tab One", content: <div>Content One</div> },
  { title: "Tab Two", content: <div>Content Two</div> },
]

describe("Tabs Component", () => {
  beforeEach(() => {
    ;(useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams())
  })

  it("renders the given tabs and switches content on click", () => {
    render(<Tabs tabs={mockTabs} />)

    expect(screen.getByText("Tab One")).toBeInTheDocument()
    expect(screen.getByText("Tab Two")).toBeInTheDocument()

    expect(screen.getByText("Content One")).toBeInTheDocument()
    expect(screen.queryByText("Content Two")).not.toBeInTheDocument()

    fireEvent.click(screen.getByText("Tab Two"))

    expect(screen.getByText("Content Two")).toBeInTheDocument()
    expect(screen.queryByText("Content One")).not.toBeInTheDocument()
  })

  it("applies active styles to the active tab", () => {
    render(<Tabs tabs={mockTabs} />)

    const tabOneButton = screen.getByText("Tab One")
    const tabTwoButton = screen.getByText("Tab Two")

    expect(tabOneButton).toHaveClass("border-green-600")
    expect(tabTwoButton).not.toHaveClass("border-green-600")

    fireEvent.click(tabTwoButton)

    expect(tabTwoButton).toHaveClass("border-green-600")
    expect(tabOneButton).not.toHaveClass("border-green-600")
  })

  it("selects the correct tab based on the search param", () => {
    ;(useSearchParams as jest.Mock).mockReturnValue(
      new URLSearchParams("tab=tab-two"),
    )

    render(<Tabs tabs={mockTabs} />)

    expect(screen.getByText("Tab One")).not.toHaveClass("border-green-600")
    expect(screen.queryByText("Content One")).not.toBeInTheDocument()

    expect(screen.getByText("Tab Two")).toHaveClass("border-green-600")
    expect(screen.getByText("Content Two")).toBeInTheDocument()
  })

  it("defaults to the first tab if no search param is provided", () => {
    ;(useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams())

    render(<Tabs tabs={mockTabs} />)

    expect(screen.getByText("Tab One")).toHaveClass("border-green-600")
    expect(screen.getByText("Content One")).toBeInTheDocument()

    expect(screen.getByText("Tab Two")).not.toHaveClass("border-green-600")
    expect(screen.queryByText("Content Two")).not.toBeInTheDocument()
  })
})
