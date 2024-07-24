# App

## Bicho da Seda controle de estoque App

## RFs (Requisitos Funcionais)

- [x] Should be Able to sign up;
- [] Should be Able to Authenticate;
- [] Should be Able to get an Authenticated User Profile;
  // - [] Should be Able to get total check-ins of a User;
  // - [] Should be Able to get all check-ins list of a User;
  // - [] Should be Able to find nearby gyms;
  // - [] Should be Able to find a gym by name;
  // - [] Should be Able to check-in at gym;
  // - [] Should be Able to validate a user check-ins;
- [] Should be Able to create a product;

## RNs (Regras de Negócio)

- [x] User should not be able to sign up with duplicated e-mail;
      // - [] User should not be able to make two checkin at same day;
      // - [] User should not be able to create a checkin if distance from gym equals or more than 100m;
      // - [] Checkin must be validated within 20 minutes;
      // - [] Checkin must be valitated by Administrators;
- [] Product Must be created by Administrators;

## RNFs (Requisitos Não Funcionais)

- [x] User Password must be encripted;
- [x] Data must be Persisted at a PostgreSQL Database;
- [] All Data lists needs to be paginated with 20 items per page;
- [] User must be identified by a JWT (JSON Web Token);
