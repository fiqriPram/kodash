import { cookies } from "next/headers";

export default async function DebugCookies() {
  const cookieStore = await cookies();
  const allCookies: { name: string; value: string }[] = [];

  cookieStore.getAll().forEach((cookie) => {
    allCookies.push({ name: cookie.name, value: cookie.value });
  });

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">🔍 Debug: Cookies</h1>

      <div className="bg-gray-100 p-4 rounded mb-6">
        <h2 className="font-bold mb-2">All Cookies ({allCookies.length}):</h2>
        <div className="space-y-2">
          {allCookies.length > 0 ? (
            allCookies.map((cookie) => (
              <div
                key={cookie.name}
                className="bg-white p-2 rounded font-mono text-sm"
              >
                <span className="font-bold">{cookie.name}:</span>{" "}
                {cookie.value.substring(0, 50)}...
              </div>
            ))
          ) : (
            <p className="text-gray-500">No cookies found</p>
          )}
        </div>
      </div>

      <button
        onClick={() => {
          window.location.href = "/dashboard";
        }}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Try Dashboard
      </button>
    </div>
  );
}
