function LoginPage({ onLogin }) {
  function handleSubmit(event) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    const email = formData.get("email")
    const password = formData.get("password")

    onLogin(email, password)
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email</label>
      <input
        id="email"
        name="email"
        type="email"
        required
      />

      <label htmlFor="password">Password</label>
      <input
        id="password"
        name="password"
        type="password"
        required
      />

      <button type="submit">Login</button>
    </form>
  )
}

export default LoginPage