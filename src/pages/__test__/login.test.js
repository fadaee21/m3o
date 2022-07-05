import { render, screen } from "@testing-library/react";
import { AuthProvider } from "../../context/authContext";
import Login from "../Login";
import userEvent from "@testing-library/user-event";

//https://github.com/remix-run/react-router/issues/7811
const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

test("should render login page", async () => {
  const wrapper = ({ children }) => <AuthProvider>{children}</AuthProvider>;
  render(<Login />, { wrapper });
  expect(screen.getAllByRole("heading").length).toBe(3);
  expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  expect(screen.getByTestId("passwordTest")).toBeInTheDocument();

  const user = userEvent.setup();

  // verify page content for default route
  expect(screen.getByText(/Login Page/i)).toBeInTheDocument();

  // verify page content for expected route after navigating
  await user.click(screen.getByRole("button"));

  expect(screen.getByText(/login page/i)).toBeInTheDocument();
});
