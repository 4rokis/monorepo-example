## Style space

### Prerequisives
* npm v8
* node v14



### Production
https://www.stylespace.com/  
Current production environment

### Staging
https://staging.stylespace.com/  
Uses staging environment of backend

### Demo
https://demo.stylespace.com/  
Uses development environment of backend  

## TurboRepo Cache
1. `npx turbo login`
2. `npm turbo link`


### Getting started
1. `npm i`
2. `npm run init` // skip if you already have custom .env files
3. `npm run dev`
4. Visit http://localhost:3000
  


### New mono-repo project
1. Create vercel deployement
2. Conenct vercel to git
3. Set project relative path
4. Add ignore build step in git subsection `git diff HEAD^ HEAD --quiet .`
5. Update domains configuration
6. Update Production branch to `production` in vercel
7. Set all nescesary environment variables
8. Copy .github/workflows CI config and update it to new project




