import { Outlet, createFileRoute } from "@tanstack/react-router"
import { userQueryOptions } from "@/lib/api"

const Login = () => {
    return (
        <div>
            You have to  
            <a href="/api/login"> Login!</a>
        </div>
    )
}

function Component() {
    const { user } = Route.useRouteContext();

    if (!user) {
        return <Login />
    }
    return <Outlet />
}

// src/routes/_authenticated.tsx
export const Route = createFileRoute('/_authenticated')({
    beforeLoad: async ({ context }) => {
        const queryClient = context.queryClient

        try {
        const data = await queryClient.fetchQuery(userQueryOptions)
        return data
        } catch (e) {
            console.error(e);
            return { user: null }
        }
    },
    component: Component,
  })