// The Vercel Node launcher passes HTTP streams; the portable counter API takes a standard Request.
import { Readable } from "node:stream";
import { handle } from "./stats.mjs";

export default async function stats(request, response) {
  const protocol = (request.headers["x-forwarded-proto"] ?? "https").split(",")[0];
  const web = new Request(`${protocol}://${request.headers.host}${request.url}`, {
    method: request.method,
    headers: request.headers,
    body: ["GET", "HEAD"].includes(request.method) ? undefined : Readable.toWeb(request),
    duplex: "half",
  });
  const result = await handle(web);
  response.writeHead(result.status, Object.fromEntries(result.headers));
  response.end(await result.text());
}
