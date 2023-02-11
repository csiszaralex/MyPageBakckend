import { AppConfig } from './app.config.interface';

export default (): AppConfig => ({
  port: parseInt(process.env.PORT) || 3000,
  DATABASE_URL: process.env.DATABASE_URL || 'mysql://root:@localhost:3306/test',
  node_env: process.env.NODE_ENV || 'development',

  frontend: {
    url: process.env.FRONTEND_URL || 'http://localhost:3000',
    auth_url: process.env.FRONTEND_AUTH_URL || 'http://localhost:3000/auth',
  },

  auth: {
    jwt: {
      secret: process.env.JWT_SECRET || 'secret',
      expiresIn: process.env.JWT_EXPIRES_IN || '1d',
    },
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
