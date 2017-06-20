// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
    production: false,
    firebase: {
        apiKey: 'AIzaSyBgD5jpW1RMJ2vWvp-M4h4GEpLWheT7RnM',
        authDomain: 'cryptotraderfetcher.firebaseapp.com',
        databaseURL: 'https://cryptotraderfetcher.firebaseio.com',
        projectId: 'cryptotraderfetcher',
        storageBucket: 'cryptotraderfetcher.appspot.com',
        messagingSenderId: '740463984281'
    }
};
