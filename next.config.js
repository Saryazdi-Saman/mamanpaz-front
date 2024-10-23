// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack(config) {
        // Find existing file loader rule that handles SVG files
        const fileLoaderRule = config.module.rules.find((rule) =>
            rule.test?.test?.('.svg'),
        )

        config.module.rules.push(
            // Reapply the existing rule, but only for svg imports ending in ?url
            {
                ...fileLoaderRule,
                test: /\.svg$/i,
                resourceQuery: /url/, // *.svg?url
            },
            // Convert all other SVG imports to React components
            {
                test: /\.svg$/i,
                issuer: /\.[jt]sx?$/,
                resourceQuery: { not: /url/ }, // exclude if *.svg?url
                use: [{
                    loader: '@svgr/webpack',
                    options: {
                        typescript: true, // Generate .d.ts files
                        dimensions: true, // Keep dimensions but allow overriding
                        svgo: true, // Enable optimization
                        svgoConfig: {
                            plugins: [
                                {
                                    name: 'preset-default',
                                    params: {
                                        overrides: {
                                            removeViewBox: false,
                                        }
                                    }
                                }
                            ]
                        }
                    }
                }]
            }
        )

        // Modify the file loader rule to ignore *.svg, since we have it handled now.
        fileLoaderRule.exclude = /\.svg$/i

        return config
    },
    experimental: {
        turbo: {
            rules: {
                '*.svg': {
                    loaders: [{
                        loader: '@svgr/webpack',
                        options: {
                            // exportType: 'default',
                            typescript: true,
                            dimensions: true,
                            svgo: true, // Enable optimization
                            svgoConfig: {
                                plugins: [
                                    {
                                        name: 'preset-default',
                                        params: {
                                            overrides: {
                                                // Keep the viewBox attribute
                                                removeViewBox: false,
                                            }
                                        },
                                    },
                                ]
                            }
                        }
                    }],
                    as: '*.js',
                },
            },
        }
    }
}

module.exports = nextConfig