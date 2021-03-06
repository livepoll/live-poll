/*
 * Copyright © Live-Poll 2020-2021. All rights reserved
 */

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  name: 'dev',
  production: false,
  apiBaseWebsocketUrl: 'wss://localhost:8080/v1',
  apiBaseUrl: 'https://localhost:8080/v1',
  apiVersion: 'v0',
  useSecureCookies: false,
  cookieConsentUrl: 'localhost'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
