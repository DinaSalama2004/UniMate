export const API_URL = "http://127.0.0.1:8000";

export async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem("token");
  const headers = new Headers(options.headers || {});
  
  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }
  
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => null);
  if (!response.ok) {
    throw data || { detail: { message: "An unexpected error occurred" } };
  }
  return data;
}

// Reusable extract error message to handle FastAPI format
export function extractErrorMessage(error: any): string {
  if (error?.detail?.message) return error.detail.message;
  if (error?.detail?.code) return error.detail.code;
  if (error?.error) return error.error;
  if (Array.isArray(error?.detail) && error.detail.length > 0) {
    // Pydantic validation error format
    return error.detail[0].msg;
  }
  return "An unexpected request error occurred.";
}
