function TaskCard({ title, assignee, due, done, status, priority }) {
  return (
    <div className={`task-card ${done ? "done" : ""}`}>
      <h2>{title}</h2>
      <p>{assignee}</p>
      <p>Due {due}</p>
      <p>{status}</p>
      <p>{priority}</p>
    </div>
  )
}

export default TaskCard