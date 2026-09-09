import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"

import TaskCard from "./TaskCard"

describe("TaskCard", () => {
  it("renders title, assignee, due date, status, and priority", () => {
    render(
      <TaskCard
        title="Write tests"
        assignee="Nimali"
        due="Friday"
        done={false}
        status="todo"
        priority="high"
      />
    )

    expect(
      screen.getByRole("heading", { name: "Write tests" })
    ).toBeInTheDocument()

    expect(screen.getByText("Nimali")).toBeInTheDocument()
    expect(screen.getByText("Due Friday")).toBeInTheDocument()
    expect(screen.getByText("todo")).toBeInTheDocument()
    expect(screen.getByText("high")).toBeInTheDocument()
  })

  it("marks completed tasks with the done class", () => {
    const { container } = render(
      <TaskCard
        title="Done task"
        assignee="A"
        due="—"
        done
      />
    )

    expect(container.firstChild).toHaveClass("task-card", "done")
  })
})