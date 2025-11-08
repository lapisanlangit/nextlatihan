// services/referensi.ts (or wherever you keep it)

import { Jns } from "@/_models/referensi";

export const getJns = async (data: Record<string, any> = {}): Promise<Jns> => {
  const apiurl = process.env.NEXT_PUBLIC_API_URL;
  const url = `${apiurl}/referensi/getJns`;
  const token = localStorage.getItem("token");
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // uncomment if needed
    },
    cache: "no-store", // remove if you want caching
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `HTTP ${response.status}: ${response.statusText} – ${errorText}`,
    );
  }

  const responseData: any = await response.json();
  return responseData;
};

export async function deleteJns(data: any): Promise<Jns> {
  const apiurl = process.env.NEXT_PUBLIC_API_URL;

  const token = localStorage.getItem("token");
  const response = await fetch(`${apiurl}/referensi/deleteJns`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // uncomment if needed
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
export async function updateJns(data: any): Promise<Jns> {
  const apiurl = process.env.NEXT_PUBLIC_API_URL;

  const token = localStorage.getItem("token");
  const response = await fetch(`${apiurl}/referensi/updateJns`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // uncomment if needed
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
export async function saveJns(data: any): Promise<Jns> {
  const apiurl = process.env.NEXT_PUBLIC_API_URL;

  const token = localStorage.getItem("token");
  const response = await fetch(`${apiurl}/referensi/saveJns`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // uncomment if needed
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
