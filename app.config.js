import 'dotenv/config';

export default {
   expo: {
      name: 'Economiza',
      slug: 'Economiza',
      version: '1.0.0',
      newArchEnabled: true,

      android: {
         package: 'com.gabriell_a.Economiza',
      },
      updates: {
         url: 'https://u.expo.dev/fdcf3d9d-b03e-4304-9a8e-6052743771ae',
         enabled: true,
         runtimeVersion: '1.0.0',
         fallbackToCacheTimeout: 0,
      },

      web: {
         favicon: './assets/favicon.png',
      },

      packagerOpts: {
         config: 'metro.config.js',
         sourceExts: ['js', 'jsx', 'ts', 'tsx', 'svg'],
      },

      extra: {
         eas: {
            projectId: 'fdcf3d9d-b03e-4304-9a8e-6052743771ae',
         },
         API_KEY: process.env.API_KEY,
         AUTH_DOMAIN: process.env.AUTH_DOMAIN,
         PROJECT_ID: process.env.PROJECT_ID,
         STORAGE_BUCKET: process.env.STORAGE_BUCKET,
         MESSAGING_SENDER_ID: process.env.MESSAGING_SENDER_ID,
         APP_ID: process.env.APP_ID,
         MEASUREMENT_ID: process.env.MEASUREMENT_ID,
      },
   },
};
