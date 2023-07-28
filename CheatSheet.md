# setting up typescript

- installed nvm for windows
- `nvm install 20`
- `nvm use 20`
- `npm init` answer prompts to create package.json
- `npm install typescript`
- `npx tsc --init` create tsconfig.json

## commands

```bash

# use nvm to get node and npm working
nvm use $(cat .\.nvmrc)

# run the build script defined in package.json to generate our JS files
npm run build

```