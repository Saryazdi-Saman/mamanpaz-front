import { registerOTel } from '@vercel/otel';

export function register() {
  registerOTel(process.env.OTEL_SERVICE_NAME);
}