jest.mock(
  "next/link",
  () => (props) => jest.requireActual("react").createElement("a", props),
)
