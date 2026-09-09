import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import "@testing-library/jest-dom"

import LoginPage from "./LoginPage"

describe("LoginPage validation", () => {
  it("requires an email and a password", () => {
    render(<LoginPage onLogin={() => {}} />)

    const email = screen.getByLabelText("Email")
    const password = screen.getByLabelText("Password")

    expect(email).toBeRequired()
    expect(password).toBeRequired()

    expect(email).toHaveAttribute("type", "email")
    expect(password).toHaveAttribute("type", "password")
  })

  it("submits the entered email and password", async () => {
    const user = userEvent.setup()
    const onLogin = jest.fn()

    render(<LoginPage onLogin={onLogin} />)

    await user.type(
      screen.getByLabelText("Email"),
      "user@nsbm.lk"
    )

    await user.type(
      screen.getByLabelText("Password"),
      "password123"
    )

    await user.click(
      screen.getByRole("button", { name: "Login" })
    )

    expect(onLogin).toHaveBeenCalledWith(
      "user@nsbm.lk",
      "password123"
    )
  })
})