import { withAuthSsr } from '@voai/shared'

async function HomePage({ user }: { user: any }) {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <p className="text-gray-600">Willkommen, {user.email}!</p>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Aktive Workflows</h2>
          <p className="text-3xl font-bold">0</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Ersparnisse</h2>
          <p className="text-3xl font-bold">€0</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Erfolgsrate</h2>
          <p className="text-3xl font-bold">0%</p>
        </div>
      </div>
    </div>
  )
}

export default withAuthSsr(HomePage)
