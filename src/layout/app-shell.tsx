import { Outlet } from "react-router"

function AppShell() {
  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      <main className="flex-grow-1 p-3">
        <Outlet />
      </main>
    </div>
  )
}

export default AppShell