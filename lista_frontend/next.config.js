/** @type {import('next').NextConfig} */
const DEV_URL_API ="http://localhost:3001"
const nextConfig = {
  reactStrictMode: true,
  env:{urlApi:DEV_URL_API}
}

module.exports = nextConfig
