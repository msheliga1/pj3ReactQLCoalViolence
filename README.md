# Book Search Engine with MERN and GraphQl
uri bootcamp HW 21 - Book Search REST => GraphQL with React, web token security - MJS 4.15.24    
Michael Sheliga - This repo is for the University of Richmond (URI) coding bootcamp.  
Starter Code: From coding-boot-camp/solid-brocolli. Also used Act 28 MP (beware very poor   
code) and Act 24.  

## Link to Repo, Deployment(s) Screenshot(s) and/or Video(s)    
Link to GitHub Repo: https://github.com/msheliga1/hw21uriGraphQLBooks  
Link to Netlify Deployment: https://xxxxxxxxxxxxxx.netlify.app   
(Hey, it works and even allows a decent name!) 
<!-- Link to Video on Google Drive: https://drive.google.com/file/d/1jcrSLjZJ3evW8Ss2wuIrIy4JPc4SDk_M/view --> 
<!---  Link to deployed github.io site. https://msheliga1.github.io/uriHW9NodeReadmeGen --->  
<!-- Link to Heroku: https://uri-hw-19-jate-idb-pwa-9db53dc82bbb.herokuapp.com/   --> 


[Link to Acceptance Criteria ](#acceptance-criteria)   

## Project Goals     
Modify a book search app from REST to GraphQL using MERN-react and web token security.     

========================================================   
## Technical Project Details    
========================================================    
## Github:     
    Create Repo (github, repositories => New)   
        - Dont Make this a shared repo.  
    Clone the entire starter gitHub repo  
        -- Create a new, TOTALLY blank repo in GitHub  (no readme. It will screw things very badly!)
        -- Clone the starter repo (under the hwXX directory) to your local machine
        -- Rename the starter repo if you wish.
            -- Change root branch to main.  git branch -m master main.  
        -- Set the remote path: git remote add <ori> <HTTPS path to remove>   
            -- Be 100% sure NOT to use the SSH link. Use the HTTPS lank!  
        -- Push the local repo to gitHub: git push <ori> main   
    OR ... Copy directories and sample files from prior project (or create from scratch).  
        -- No starter code. No need for copying one file at a time via command line.  
        -- Alternate: Go to Demo (root) folder, download zip, moving to local repo, unzip - likely fastest method.     
        -- Took a long time to figure out how to clone an entire repo!
    OR ... create HTML, Node, Develop, CSS and javascript, etc. from scratch, and copy sample files ... worked well.
        Branches (Optional for single programmer projects)  
        - Could do work in branches. (new branch inside gitHub)    
        - All branch names will begin with the initials of the main person working on the branch.  
        - Must update local repo after adding a branch  
        - Switch to branch: From cmd line git switch <branchname>   
        - Once changes committed, git push origin <branchname>  
            - for pushing to remote test branch: git push origin local_branch:remote_branch  
        - Issue a pull request in gitHub.  
        - Click "Pull Requests" in top menu bar (3rd from left).  
        - Click "review Required" in small font below pull request name.  
        - You may approve your own request.  
    OR .... create blank repos, copy files using Windows Drag and Drop
        - mkdir hwNN/hwNNDetailedName 
        - cd into it
        - git init  
        - Use windows 10 to copy entire contents of uri repo subdirectory. ie. 18-28 mini=project (14-28 mp). 
            - Note that this is NOT a full repo, so we don't clone it.
        - In GitHub: create a TOTALLY empty new github repo
        - Copy its HTTP name
        - In git, add the remote repo using: git remote add ori CopiedGitHubHttpName (else refspec error). 
        - Had to change its name from master to main in the 'git init' directory.  
            - git branch -m <oldname> <newname> (git branch -m master main)
        - Do git add --a (should add all files), git commit -m "msg", git push ori main
            - If refspec error, be sure you changed master to main.

    .gitIgnore: create file if not created. Be sure node_modules is in it. Be sure 
        multiple node_modules for each package.json file (root, client, server, Main/client, etc.)  
    Determine working folder:  
        For Mimi-Project look in  readme. New code usually in Main. (easy now, but pain first time!)
        For starter-repo, code normally in Develop folder. 
    -- Move files out of working folder (Main or Develop) or copy to root. 
        -- Preferred structure, also allows Heroku to find package.json for auto-build.

    Create a nice long READ.md file!!  (Modify prior projects.)   

    Package.json: Check-Add start, build, etc. to main/package-json. Enables commands to run. 
        "comment" property added at top of file. (Don't think there is another way to comment.)
        Found dev, start, build, lint, preview script commands in package.json. 
        Only react, vite and es-lint packages. No back-end. No express, web-pack, mongoose, etc. 

    Attempt to get code running (index.html page display in this case.)
    --------------------------------------------------------------------
    File Structure: 
        Has client and Server folders. Root, client and server have pjs. 
        Root does NOT have index.html.
        Client has index.html.  
            vite.config.js seems to connect to port 3001 (and 3000). 
            public only has vite.svg (likely an image)
        src folder has most stuff
            main.jsx (main entry pt) and App.jsx
            assets - just react.svg
            components 
                Login.jsx, NavBar.jsx and SignupForm.jsx.
            pages folder
                SavedBooks.jsx, SearchBooks.jsx  
            utils folder 
                API.js, auth.js, localStorage.js 
        Server 
            config - just DB config
            controllers - user-controller.js
            models - index.js, Book.js, User.js 
            routes - index.js /api has index.js and user-routes.js 
    NPM: "npm init --y" BEFORE "npm install" to avoide ENOENT err.
        "npm install" (or "nmp i")
        Root "npm run build" builds client. - seemed to work. Created a dist folder with index.htmls
        Root "mpm run develop" starts 2 servers, including nodemon server. 

    

    Commit and push files back to gitHub/branch. (For multi-programming: Issue pull request, approve, merge).  
    Deploy code (Settings...CodeAndAnimation->Pages on left, GitHub Pages->Branch->main, save)  
        - Deployed code name always msheliga1/github.io/RepoName !! 
        = Used Netlify.  Direction in act 20-27 somewhat shakey, but got it to run. Yipeeee!  
    Make Sure it Works    
    Insert Screencastify (Chrome) Video, Heroku, Netify and/or Screenshot X2 of deployment into readme file.  
  
## Tools and Technologies Used   
    Github - Branches not needed, but could use.    
        - GitIgnore to keep NPM node_modules and password info out of gitHub repo.    
    Mongo - No SQL database.
    Mongoose - ORM for Mongo.  
    Express - DB Connections.
    React - Components and Single Page App used extensively
    NPM - Node package manager  
    GraphQL - simplier way to implement REST routes. 
    Web Tokens - simple security. 
    Netlify - Another new way to deploy. Does hot changes (unlike Heroku which requires a push). 
        Also allows deployment name change. 

## Acceptance Criteria   
-----------------------       
Load the search engine => home page - menu options: Search for Books, Login/Signup, 
    input search field and submit button
Click Search for Books menu opt -> input field to search for books and a submit button
NOT LOGGED IN: Enter a search term in the input field and click submit => 
     search results: book’s title, author, descrip, image, and Google Books link
Click: Login/Signup menu option => 
    Modal with a toggle between the option to log in or sign up
    Toggle is Signup => three inputs: username, email address, password, and a signup button
        Signup button click with valid email and password and  => 
            user account created and logged in to site
    Toggle is Login  => two inputs: email address, password and login button
        Login button clicked with account’s email and password => 
        Modal closes and logged in to site
LOGGED IN:  
    Menu options change: Search for Books, See Saved books, and Logout
    Enter search term in input field and click submit button => 
        shown several search results, each featuring book’s title, author, descrip, image, and a link to book on the Google Books site and button to save the book
        Click Save button for a book => Books info saved to my account
    Click saved books => Shown my saved books, 
        With books title, author, description, image, and Google Books link. and remove book button. 
        Click Remove book button => Book is deleted from my saved books list
    Click Logout Button => logged out and taken to home page. 

## Technical Criteria  
------------------------   

# Back-End Specifications  
--------------------------  
Complete the following in these back-end files:

    auth.js: Update the auth middleware function to work with the GraphQL API.
    server.js: Implement the Apollo Server and apply it to the Express server as middleware.
    Schemas directory:
        index.js: Export your typeDefs and resolvers.
        resolvers.js: Define the query and mutation functionality to work with the Mongoose models.
            Hint: Use the functionality in the user-controller.js as a guide.
        typeDefs.js: Define the necessary Query and Mutation types:  
            Query type:  
                me: Which returns a User type.
            Mutation type:
                login: Accepts an email and password as parameters; returns an Auth type.  
                addUser: Accepts username, email, and pw as params; returns an Auth type.  
                saveBook: Accepts book authors array.
                    descript, title, bookId, image, and link as params; returns a User type. (Look into creating an input type to handle all of these params!)
                removeBook: Accepts a book's bookId as a parameter; returns a User type.
            User type:
                _id
                username
                email
                bookCount
                savedBooks (This will be an array of the Book type.)
            Book type:
                bookId (Not the _id, but the book's id value returned from Google's Book API.)
                authors (An array of strings, as there may be more than one author.)
                description
                title
                image
                link
            Auth type:
                token
                user (References the User type.)

# Front-End Specifications  
------------------------------   
Create front-end files:

    queries.js: Will hold the query GET_ME, which will exec the me query setup using Apollo Server.
    mutations.js:
        LOGIN_USER will execute the loginUser mutation set up using Apollo Server.
        ADD_USER will execute the addUser mutation.
        SAVE_BOOK will execute the saveBook mutation.
        REMOVE_BOOK will execute the removeBook mutation.

Additionally, you’ll need to complete the following tasks in each of these front-end files:
    App.jsx: Create an Apollo Provider to make every request work with the Apollo server.
    SearchBooks.jsx:
        Use the Apollo useMutation() Hook to execute the SAVE_BOOK mutation in the handleSaveBook() function instead of the saveBook() function imported from the API file.
        Make sure you keep the logic for saving the book's ID to state in the try...catch block!
    SavedBooks.jsx:
        Remove the useEffect() Hook that sets the state for UserData.
        Instead, use the useQuery() Hook to execute the GET_ME query on load and save it to a variable named userData.
        Use the useMutation() Hook to execute the REMOVE_BOOK mutation in the handleDeleteBook() function instead of the deleteBook() function that's imported from API file. (Make sure you keep the removeBookId() function in place!)
    SignupForm.jsx: Replace addUser() functionality imported from the API file with the ADD_USER mutation functionality.
    LoginForm.jsx: Replace the loginUser() functionality imported from the API file with the LOGIN_USER mutation functionality.
