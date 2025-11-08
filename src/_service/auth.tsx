import { Login } from "@/_models/auth";

export async function login(data: any): Promise<Login> {
  const apiurl = process.env.NEXT_PUBLIC_API_URL;
  const response = await fetch(`${apiurl}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    cache: "no-store", // Important for mutations
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(
      `HTTP ${response.status}: ${response.statusText} – ${error}`,
    );
  }

  return response.json();
}
