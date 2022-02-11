# Add Netlify hosting
We can deploy to Netlify but run into complications down the line when doing so. Specifically, the aws-exports file needs to be generated at build-time which involves some additional set up. Using Amplify hosting is much easier at that point,.

### 1. Deploy to Netlify
Create a free Netlify account and follow the instructions to set up a project from Github. Its super easy.

There are a couple changes we will have to make once deployed.

### 2. Add the Netlify to the CORS section of the back-end
```
amplify update function
```
Select the function you want to edit, and the select that you want to add an evironment variable. We will call it `client` and the value will be the Netlify app url.

Deploy and visit your Netlify site. API requests should work

### 3. Redirects
Right now visiting a sub-route such as `/create-post` will show a 404 page. This is because our application is a "single page web application" and Netlify is looking for an actual html file at that route. We need to tell Netlify that all routes should be routed to `index.html`

Create a file in the `/public` directory called `_redirects` and populate it with the following.
```
/* /index.html 200
```
This tells Netlify to take all traffic (`/*`) and route it to `index.html` with a status code of 200.

Push the changes, let Netlify deploy, and test. It should work!

