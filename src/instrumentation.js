import { registerOTel } from "@vercel/otel";

export function register() {
  registerOTel({
    serviceName: "terminal-portfolio",
  });

  console.log("OpenTelemetry initialized");
}