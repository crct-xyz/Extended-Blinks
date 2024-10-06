/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {"source": "/", "destination": "http://ec2-52-59-228-70.eu-central-1.compute.amazonaws.com:8000/" },
    ]
  }
};

export default nextConfig;
