
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-5xl rounded-xl bg-white p-8 shadow">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome to Dashboard
        </h1>

        <p className="mt-3 text-gray-600">
          Hello, {session.user.name}!
        </p>

        <p className="mt-2 text-gray-600">
          Email: {session.user.email}
        </p>

        <p className="mt-4 text-green-600">
          You are successfully logged in!
        </p>
      </div>
    </main>
  );
}
