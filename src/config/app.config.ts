import { AppConfig } from './app.config.interface';

export default (): AppConfig => ({
  port: parseInt(process.env.PORT) || 3000,
  DATABASE_URL: process.env.DATABASE_URL || 'mysql://root:@localhost:3306/test',

  auth: {
    google: {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    github: {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
    },
  },
});
