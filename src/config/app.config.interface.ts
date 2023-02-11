export interface AppConfig {
  port: number;
  DATABASE_URL: string;

  auth: {
    jwt: {
      secret: string;
      expiresIn: string;
    };
    google: {
      clientID: string;
      clientSecret: string;
      callbackURL: string;
    };
    github: {
      clientID: string;
      clientSecret: string;
      callbackURL: string;
    };
  };
  frontend: {
    url: string;
    auth_url: string;
  };
  'auth.jwt.secret'?: string;
  'auth.jwt.expiresIn'?: string;
  'auth.google.clientID'?: string;
  'auth.google.clientSecret'?: string;
  'auth.google.callbackURL'?: string;
  'auth.github.clientID'?: string;
  'auth.github.clientSecret'?: string;
  'auth.github.callbackURL'?: string;
  'frontend.url'?: string;
  'frontend.auth_url'?: string;
  node_env: string;
}
