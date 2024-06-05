import { auth } from "@/auth";

export default async function HomePage() {
  const session = await auth();
  return (
    <div>
      <h1>Bonjour, {JSON.stringify(session)}</h1>
    </div>
  )
}