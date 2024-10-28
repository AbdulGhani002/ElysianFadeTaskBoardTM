export const env = {
  MONGODB_URI: Deno.env.get('MONGODB_URI') || 'your_mongodb_uri',
  SESSION_SECRET: Deno.env.get('SESSION_SECRET') || 'your_session_secret',
  JWT_SECRET: Deno.env.get('JWT_SECRET') || 'your_jwt_secret',
  PORT: Deno.env.get("PORT") || "8080"
}