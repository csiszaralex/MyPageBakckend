export interface AppConfig {
  port: number;
  DATABASE_URL: string;

  auth: {
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
  'auth.google.clientID'?: string;
  'auth.google.clientSecret'?: string;
  'auth.google.callbackURL'?: string;
  'auth.github.clientID'?: string;
  'auth.github.clientSecret'?: string;
  'auth.github.callbackURL'?: string;
}
