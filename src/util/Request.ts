import fetch, { RequestInit, RequestInfo, Response } from "node-fetch";

export async function post (url: RequestInfo, options: RequestInit = { method: "post" }): Promise<Response> {
  return await fetch (url, options);
}
