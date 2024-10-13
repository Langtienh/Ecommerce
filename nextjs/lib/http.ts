import envConfig from "@/config";
import { BaseReponse, ReponseError, ReponseSuccess } from "@/types/response";

export class HttpError extends Error {
  status: number;
  payload: ReponseError;

  constructor({ status, payload }: { status: number; payload: ReponseError }) {
    super(payload.message);
    this.status = status;
    this.payload = payload;
  }
}

interface CustomRequestInit extends RequestInit {
  baseUrl?: string;
}

const request = async <T>(
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
  url: string,
  option?: CustomRequestInit
) => {
  const body = option?.body ? JSON.stringify(option.body) : undefined;

  const baseHeaders = {
    "Content-Type": "application/json",
  };
  const baseUrl = option?.baseUrl || envConfig.NEXT_PUBLIC_API_URL;

  const fullUrl = url.startsWith("/")
    ? `${baseUrl}${url}`
    : `${baseUrl}/${url}`;

  const res = await fetch(fullUrl, {
    method,
    body,
    headers: {
      ...baseHeaders,
      ...option?.headers,
    },
  });
  const payload: BaseReponse = await res.json();
  if (!res.ok) {
    throw new HttpError({ status: res.status, payload } as {
      status: number;
      payload: ReponseError;
    });
  }
  return payload as ReponseSuccess<T>;
};

type NoBody = Omit<CustomRequestInit, "body">;
const http = {
  get: <T>(url: string, option?: NoBody) => request<T>("GET", url, option),
  post: <T>(url: string, body: any, option?: NoBody) =>
    request<T>("POST", url, { ...option, body }),
  put: <T>(url: string, body: any, option?: NoBody) =>
    request<T>("PUT", url, { ...option, body }),
  patch: <T>(url: string, body: any, option?: NoBody) =>
    request<T>("PATCH", url, { ...option, body }),
  delete: <T>(url: string, option?: NoBody) =>
    request<T>("DELETE", url, option),
};

export default http;
