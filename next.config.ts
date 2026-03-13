import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "images-assets.nasa.gov",
			},
			{
				protocol: "https",
				hostname: "images-api.nasa.gov",
			},
		],
	},
};

export default nextConfig;
