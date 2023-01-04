## Style space frontend components 


### Storybook
Automatically deployed on push to master  

FYI: Version commit fail on vercel is expected

Components storybook  
https://front-space-components.vercel.app

Components lib documentation  
https://front-space-lib.vercel.app

### Getting started
Install package  
`npm i --save @style-space/front-space-components`  
  
Install peer dependencies  
`npm i --save dayjs cross-fetch react-modal @headlessui/react @style-space/front-space-lib next react react-dom styled-components`   
Refer to package.json dev dependencies




### Publish
`npm ci && npm run deploy`

### Test
`npm run test`

### Link
`npm run lint` - Check for lint errors  
`npm run lint:fix` - Auto-fix lint errors



### GIT flow
1. Create/Get a ticket in Github
2. Create branch from master as "TICKET_NUMBER/TICKET_TITLE"
   1. Example
      1. 20/Button_components
3. Commit changes with message in format "#TICKET_NUMBER CHANGES_TITLE"
   1. Example
      1. \#20 Core of button component added
4. Push the changes
5. Create a Pull request to master
6. Make sure that all statuses are green
7. Assign a person for the review 
8. Complete any requested changes