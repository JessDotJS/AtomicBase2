// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
    production: false,
    firebase: {
        apiKey: "AIzaSyBchNdBC4jJcVTt_u-7zgLjzxxFzzvWyTo",
        authDomain: "atomicbase2sampleapp.firebaseapp.com",
        databaseURL: "https://atomicbase2sampleapp.firebaseio.com",
        projectId: "atomicbase2sampleapp",
        storageBucket: "atomicbase2sampleapp.appspot.com",
        messagingSenderId: "1007791672205"
    }
};
