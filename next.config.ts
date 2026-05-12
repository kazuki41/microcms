const nextConfig = {
  output: 'export',
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'images.microcms-assets.io',
          port: '',
          pathname: '/**',
        },
      ],
    },
  };