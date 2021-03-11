# fork-ts-checker-webpack-plugin ([Issue #561](https://github.com/TypeStrong/fork-ts-checker-webpack-plugin/issues/561))


## Issue

`fork-ts-checker-webpack-plugin` is not referencing module declarations as specified in **tsconfig.json** > `compilerOptions.typeRoots`.

## Reproduction steps:

1. `npm install`
2. `npm run build:tsc`
3. Observe no build error
4. `npm run build:webpack`
5. Observe build error:

```
Hash: 18f26cef5e5db950fb3c
Version: webpack 4.41.2
Time: 1962ms
Built at: 03/11/2021 9:49:16 AM
 2 assets
Entrypoint index = index.js
[1] ./src/ts/Acme.png 61 bytes {0} [built]
[2] ./src/ts/index.tsx 189 bytes {0} [built]
    + 3 hidden modules

ERROR in src/ts/index.tsx:3:22
TS2307: Cannot find module './Acme.png' or its corresponding type declarations.
    1 | import React from 'react';
    2 |
  > 3 | import AcmeLogo from './Acme.png';
      |                      ^^^^^^^^^^^^
    4 |
    5 | const IndexComponent: React.FC = () => {
    6 |   return <img src={AcmeLogo}/>;
npm ERR! code ELIFECYCLE
npm ERR! errno 2
npm ERR! delete-me-webpack-ts-type-resolution@1.0.0 build: `webpack --color --env production`
npm ERR! Exit status 2
npm ERR!
npm ERR! Failed at the delete-me-webpack-ts-type-resolution@1.0.0 build script.
npm ERR! This is probably not a problem with npm. There is likely additional logging output above.
```

### Workaround

1. Update **webpack.config.js** to add the following to the `configOverwrite.include` array passed to the `ForkTsCheckerWebpackPlugin` plugin in **webpack.config.js**:

```
'./src/types/**/*.ts'
```
2. Re-run `npm run build:webpack`
3. Observe no build error
