export type GoogleProfile = {
  id: string;
  displayName: string;
  name: {
    givenName: string;
    familyName: string;
  };
  emails: [
    {
      value: string;
      verified: boolean;
    },
  ];
  photos: [{ value: string }];
  provider: 'google';
  _raw: string;
};
