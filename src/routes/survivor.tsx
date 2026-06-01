import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/survivor')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <h1 className='text-9xl'>Surv</h1>
    </div>
  )
}
