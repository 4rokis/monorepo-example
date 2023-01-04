## Monorepo example 

#### Getting started
1. `npm i`
2. `npm run dev`
3. Go to http://localhost:3000


## Project structure

- apps
    - web
    - docs
- packages
    - components

      Shared codebase. Design system, shared react components, custom libraries, …
        
    - tsconfig

      Typescript configuration
        
    - eslint-config-custom
        
      Linter configuration
        

NextJs apps are fully autonomous NextJS applications that runs next to each other as zones. Master app(web) handles the zone configuration and user doesn’t know that the app/zone he interacts with has changed.

<aside>
💡 A zone is a single deployment of a NextJS app. You can have multiple zones and merge them as a single app.

[Advanced Features: Multi Zones | Next.js](https://nextjs.org/docs/advanced-features/multi-zones#how-to-merge-zones)

</aside>

## Zone configuration

The master app/zone hold the configuration. Officially user interacts with this app only and we use the power of rewrites to serve user with a different zone.

```jsx
// /apps/web/next.config.js

const {
  DOCS_URL = 'http://localhost:3001',
  STORE_URL = 'http://localhost:3002',
} = process.env

module.exports = {
  transpilePackages: ['@shared/components'],
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: `/:path*`,
      },
      // Docs
      {
        source: '/docs',
        destination: `${DOCS_URL}/docs`,
      },
      {
        source: '/docs/:path*',
        destination: `${DOCS_URL}/docs/:path*`,
      },
      // Store
      {
        source: '/store',
        destination: `${STORE_URL}/store`,
      },
      {
        source: '/store/:path*',
        destination: `${STORE_URL}/store/:path*`,
      },
    ]
  },
}
```

Every time user goes to subsection of /docs route it will get served with the docs application and so on.

Each of the zones need to have a *basePath* set to that path.

```jsx
// /apps/docs/next.config.js
module.exports = {
  basePath: '/docs',
}
```


## NPM workspace configuration

<aside>
💡 Workspaces is a generic term that refers to the set of features in the npm cli that provides support to managing multiple packages from your local files system from within a singular top-level, root package.

[workspaces | npm Docs](https://docs.npmjs.com/cli/v7/using-npm/workspaces)

</aside>

```jsx
// Root package.json
{
  "name": "my-monorepo",
  "version": "1.0.0",
  "description": "",
  "devDependencies": {
  },
  "dependencies": {
  },
  "workspaces": [
    "apps/*",
    "packages/*"
  ]
}
```

This simple configuration will add everything in *apps* and *packages* folder to the workspace. NPM will then do its magic and link the subproject and shared dependencies.

<aside>
💡 If your shared codebase project name in the package.json is “my-shared-project". NPM will create a folder in the root node_modules with that name “/node_modules/my-shared-project”. The apps can then access that codebase.

</aside>

Sub apps that want to use that shared codebase now only need to add it to package.json

```json
// /apps/docs/package.json
{
  "name": "docs",
  "dependencies": {
    "@shared/components": "*",
  },
}
```

and to the NextJS config.

```js
// /apps/docs/next.config.js
module.exports = {
  basePath: '/docs',
  transpilePackages: ['@shared/components'],
}

```

This simple configuration will allow you to have multi-zone NextJS monorepo.

## Turborepo

Turborepo is a build system for JS codebases. It allows for easier control of the packages as well as running custom scripts.

[Turborepo](https://turbo.build/repo)

The configuration is quite straightforward. 

```jsx
// root turbo.json
{
    "$schema": "https://turbo.build/schema.json",
    "pipeline": {
      "build": {
        "dependsOn": ["^build"],
        "outputs": ["dist/**", ".next/**"]
      },
      "tsc": {
        "outputs": []
      },
      "test": {
        "outputs": []
      },
      "lint": {
        "outputs": []
      },
      "dev": {
        "cache": false
      },
      "start": {
        "cache": false
      }
    }
  }
```

You can specify commands that will run in each of the sub-projects and cache the results for faster second run if nothing has changed.

## Shared configuration

### Typescript

3 different configs. One is a shared base between environments and 2 for each environment.

#### **Base config**
Shared base config

```jsx
// packages/tsconfig/base.json
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "display": "Default",
  "compilerOptions": {
    "resolveJsonModule": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "module": "CommonJS",
    "lib": [
      "es2017",
      "dom"
    ],
    "target": "es5",
    "moduleResolution": "node",
    "skipLibCheck": true,
    "isolatedModules": true,
    "strict": true,
    "incremental": true
  },
  "include": [
    "**/*.ts",
    "**/*.tsx"
  ],
  "exclude": [
    "./node_modules/*"
  ]
}
```

#### **NextJS**
Configuration for NextJs environment
    
    ```jsx
    // packages/tsconfig/nextjs.json
    {
      "$schema": "https://json.schemastore.org/tsconfig",
      "display": "Next.js",
      "extends": "@shared/tsconfig/base.json",
      "compilerOptions": {
        "experimentalDecorators": true,
        "emitDecoratorMetadata": true,
        "sourceMap": true,
        "keyofStringsOnly": true,
        "noEmit": true,
        "target": "es6",
        "jsx": "preserve",
        "allowJs": true,
        "forceConsistentCasingInFileNames": true,
        "strictNullChecks": true,
        "noImplicitAny": true
      },
      "include": [
    		"next-env.d.ts"
        "**/*.ts",
        "**/*.tsx"
      ],
    }
    ```
    
#### **React**
Configuration for shared react library (Design System) and unit tests
    
    ```jsx
    // packages/tsconfig/react.json
    {
      "$schema": "https://json.schemastore.org/tsconfig",
      "display": "React",
      "extends": "@shared/tsconfig/base.json",
      "compilerOptions": {
        "declaration": true,
        "composite": true,
        "downlevelIteration": true,
        "outDir": "./dist",
        "jsx": "react",
        "baseUrl": "./src"
      }
    }
    ```

Projects then need to add `"@shared/tsconfig": "*",` into dev-dependencies and extend the config

```jsx
// /apps/docs/tsconfig.json
// include & exclude need to be redefined to point to this directory
{
  "extends": "@shared/tsconfig/nextjs.json",
	"include": [
    "**/*.ts",
    "**/*.tsx",
    "next-endv.d.ts"
  ],
  "exclude": [
    "node_modules"
  ]
}
```

### Linter
It is required that the name of the package starts with `eslint-config-`

We are using prettier and eslint mix.

```jsx
// /packages/eslint-config-custom/package.json
{
  "name": "eslint-config-custom",
  "version": "0.0.0",
  "main": "index.js",
  "license": "MIT",
  "dependencies": {
    "eslint": "7.14.0",
    "@next/eslint-plugin-next": "12.1.0",
    "eslint-config-prettier": "6.15.0",
    "eslint-plugin-import": "2.22.1",
    "eslint-plugin-prettier": "3.1.4",
    "eslint-plugin-react": "7.21.5",
    "prettier": "2.2.1",
    "@typescript-eslint/eslint-plugin": "5.27.1",
    "@typescript-eslint/parser": "5.27.1"
  },
  "files": [
    "prettier.json",
    "eslint"
  ],
  "publishConfig": {
    "access": "public"
  }
}
```

```jsx

// /packages/eslint-config-custom/index.js
module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ["import", "@typescript-eslint"],
  ignorePatterns: [
    "node_modules/**",
    "storybook-static/**",
    ".next/**",
    "out/**",
    "dist/**",
  ],
  extends: ["plugin:prettier/recommended", "plugin:@next/next/recommended"],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
  }
};
```

```jsx

// /packages/eslint-config-custom/prettier.js
module.exports = {
  printWidth: 80,
  singleQuote: true,
  trailingComma: "all",
  parser: "typescript",
};
```

```jsx
// /.eslintrc.js
module.exports = {
  root: true,
  extends: ["custom"],
  settings: {
    next: {
      rootDir: ["apps/*/"],
    },
  },
};
```

Apps then need to add `"eslint-config-custom": "*",` into dev-dependencies and extend the config

```jsx
// /apps/docs/.eslintrc.js
module.exports = {
  root: true,
  extends: ['custom'],
}
```

```jsx
// /apps/docs/.prettierrc.js
module.exports = {
  ...require("eslint-config-custom/prettier.js"),
};
```
