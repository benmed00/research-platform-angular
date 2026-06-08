import { AppEnvironment } from './environment.types';

/** Production environment — swapped in via Angular file replacement at build time. */
export const environment: AppEnvironment = {
  production: true,
  apiUrl: '/api'
};
