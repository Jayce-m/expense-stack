import { createRootRouteWithContext, Link, Outlet } from '@tanstack/react-router'
import { type QueryClient } from "@tanstack/react-query"
// import { TanStackRouterDevtools } from '@tanstack/router-devtools'

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <>
    <NavBar />
    <Root />
</>
  ),
})

const NavBar = () => {
  return (
      <div className="p-2 flex gap-2">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>{' '}
        <Link to="/about" className="[&.active]:font-bold">
          About
        </Link>
        <Link to="/expenses" className="[&.active]:font-bold">
          Expenses
        </Link>
        <Link to="/create-expense" className="[&.active]:font-bold">
          Create Expenses
        </Link>
        <Link to="/profile" className="[&.active]:font-bold">
          Profile 
        </Link>
      </div>
  )
}

const Root = () => {
  return (
    <>
      <hr />
      <Outlet />
      {/* <TanStackRouterDevtools /> */}
    </>
  )
}