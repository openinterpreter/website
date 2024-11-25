/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Generate static HTML/CSS
  // Don't generate /desktop route statically
  excludePages: ['/desktop/**'],
}

module.exports = nextConfig 