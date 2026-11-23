# Expo's HMR client registers a bundle from another server, and the dev server exits

A blank Expo SDK 58 app (`create-expo-app --template blank`) with two changes:

- `App.js` loads `http://localhost:8082/remote.bundle` through `globalThis.__loadBundleAsync` when it mounts.
- `remote-server.js` serves that script on port 8082. It stands in for a second dev server.

## Steps

iOS simulator, Expo Go, npm.

1. `npm install`
2. `node remote-server.js`
3. In a second terminal: `npx expo start`, then press `i`.

## Result

The remote server logs `GET /remote.bundle`. The dev server on port 8081 then exits with code 7:

```
node_modules/expo/node_modules/@expo/cli/build/src/utils/errors.js:154
    throw error;
    ^

UnableToResolveError: Unable to resolve module ./remote from /path/to/expo-hmr-register-bundle-repro/.:
    at HmrServer._registerEntryPoint (node_modules/metro/src/HmrServer.js:102:35)
```

## Expected

The dev server keeps running. The remote bundle is not this dev server's bundle, so the HMR client does not register it.
