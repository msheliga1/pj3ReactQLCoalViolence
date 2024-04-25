# Book Search Engine with MERN and GraphQl
uri bootcamp HW 21 - Book Search REST => GraphQL with React, web token security - MJS 4.15.24    
Michael Sheliga - This repo is for the University of Richmond (URI) coding bootcamp.  
Starter Code: From coding-boot-camp/solid-brocolli. Also used Act 28 MP (beware very poor   
code) and Act 24.  

## Link to Repo, Deployment(s) Screenshot(s) and/or Video(s)    
Link to GitHub Repo: https://github.com/msheliga1/hw21uriGraphQLBooks  
Link to Heroku Deployment:  https://git.heroku.com/arcane-garden-86951.git  
(Heroku deployment requires paid mongo host. Render wasnt working for many folks.) 
(Andrew indicated alse NEED MongoDB Atlas which is also some type of hosting site.)
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
    Testing: Was able to get app working at 3000. Searched and Saved. 
        From server, seems like port 3001.  Has /api in routes/index.js. 
            Has /users in routes/api/index.js. 
            router.route('/').post(createUser).put(authMiddleware, saveBook);
            ... route('/login').post(login);  
            ... route('/me').get(authMiddleware, getSingleUser);
            ... route('/books/:bookId').delete(authMiddleware, deleteBook);
            3001/api/users/me give a "You have no token msg." 
                -> Was able to change this in server/utils/auth.js authMiddleware method.  Great!! 
            3001/ anything else claims no file client\build\index.html. 
                -> The build also complains about this. 
    SERVER - GraphQL 
        Got GraphQL users working.  Great 1st step. 
        Got addUser working.  Great next step.
        Figured out that books array seems to be "embedded" in Users. 
            - Similar to how Comments were embedded in Thoughts (Act 24?) 
        Added saveBook
        Added removeBook 
            - HORRIBLE error. Clear I was missing a : before STring, but didnt' even tell me what file!
                Not sure if file typeDefs or resolvers. But type defs has 99% of the String values. 
                Eventually able to change line numbers in error msg (at bottom) by adding blank line.s
                Blanks must be added inside back-ticks. Finally found the missing :. 
                Incredible how hard this is to find even when you know it must be before String.   
        Tried getUserById 
            - All 3 of these need to use getById, instead of getOnexxx.  I couldn't get this working. I'm 
                almost sure I tried this on a "new" user whose "_ID" is an ID, not a string. Waht a mess.
                Noted that this code seesm to work in Act21-24. What a PITA> 
        Tried saveBook (by username). 
            - Could not get to update books arrays.  Arghhh. 
            - Fixed: "books" to "savedBooks".  Now works.
            - Duplicates allowed issue: 
        Tried removeBook (by username): Works 
        Tried getById - importing ObjectId and new ObjectId(stringValue). Complained cant cast. 
CLIENT  
    Should run at same time as graphQL if "mpm run develop". (Big shout out to Chris for help!). 
        App at port 3000. GraphQL at 3001. 
    Found queries and mutations under client/src/utils 
        Added graphQL style routes, by copying and pasting from graphQL. Made sure got all non password data. 
    Verified: main page still displays. 
    Verified: main page still searches correctly. 
    Goal: Sign Up. 
        Moded App.jsx. Largely used Act 26, but with NavBar instead of Header and Footer. 
            Got build error. Missing dependency "@apollo/client": "^3.7.14", (also missing graphql). 
            - Accidentally added to SERVER package.json.  Gave dreaded rollup issue. Mike the TA said to 
                put in the client package.json.  Got rid of build error. 
        Tweakd vite.config.js (per Andrew-Mike. Would never have thought of on my own.).
        Moded SignUpForm.jsx.  Only 1 or 2 lines using ADD_USER needed changed. 
        Error: ADD_USER not a function.  ADD_USER imported from mutations. Code same as 26. Mutation same as 26. 
            Changed ADD_USER to ADD_USER2 in mutation and in import and call. Same not a function error. 
            NPM i in client. Rebuilt. Not helpful. 
            NPM i r/c/s. Rebuilt. Restarted server. Not helpful.
        Gave up on Sign Up for now and went to Login. See if same error occurs. 
        4.23 Class. Andrew said I should make this look like Login and AddBook. 
        Basic Problem: Somehow miscopied incomplete file from ??? to Signup26.jsx.  File NOT from Act 26. 
        Added code analgous to correct signup26 and login. Eliminated any code with res or result.
        (Commented out getMe useQuery in SearchBooks.jsx)
        Finally got to work. Verified new sign-up is in list of all GQL users. 
    Goal: Log In
        Copied parts of userFormSubmit from Act 26 Login.jsx to LoginForm.jsx 
        Had to keep useState for validator and showAlert.  
        Note name change of other useState from userFormData to formState (and setFormState).
            Should have changed the useState line, instead changed all others. 
        Able to get rid of all "render" errors. 
        Able to login. Super duper awesome great. 
    Goal: Add Book. 
        Once Logged in can search for books. Get addBook button with each book found. 
    Goal: Save Boook (SearchBooks.jsx handler)
        Code from addComment Act 26 varies more than other code.  
        Able to gather together expected username and book values. 
        Get a 400 error.  Might be because hardwired username to MJS. 
        Noted that not all books have descriptions. 
            Changed SAVE_BOOK schema, GQL and mutation so that descption is NOT required. 
            Freaking graphQL still wont add without a desciption. "null" does not work either. But 
                okay without an image or link value. Arghhh. 
        Per Andrew, can try GET_ME query to return username. 
        Got GET_ME query to work.  Must be outside of handler to avoid hook error. 
        This fails because context is empty for me/GET_ME query. 
        Context also empty for saveBook mutation. Arghhh. 
        Noted authMiddleware msgs not displaying.
        Eventually listened to MERN Day 3 - Act 26. Must add middleware to server. 
        Even though added to "req" (ie req.user = stuff), it shows up as resolver's context arg. 
        Fooled around with GET_ME. Was able to get it to work, and get username from it. 
        Then passed username to SAVE_BOOK.  Finally works. 
    Goal: Show SavedBooks (SavedBooks.jsx)      
        Directions confusing, but basically do saem thing as other tasks. 
        In SavedBooks.jsx, get rid of old REST call, and associated req-response code. 
        Added GET_ME query. Worked but no savedBooks array as part of data. 
        Hated to change GET_ME query (prints limited data well.)
        Tried feeding username to GET_USER query. 
            Problem with const {loading, data} syntax in multiple calls. 
            Eventually discovered if you "destructor" using above syntax variables names must 
                be same as field names. Hence 2 calls (GET_ME, GET_USER) using same syntax will fail.
                Tried using let (loading, data). Did not seem to help. 
            Work aroound (unused). const newName = query(GET_USER ...). Then 
                data2 = newName.data, loading2 = newName.loading.  This works. 
        WorkAround: Created a GET_ME_ALL graphQL query that returns all data including savedBooks array. 
        Works. Great.
    Goal: Correct Bug that Save Books screen wont load immediately after logging in. 
        Does work after login followed by search. 
        Does work after back and selecting Saved Books.
    Goal: RemoveBook (SavedBooks.jsx)
            

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
    Deployemnt: Reflex - wasnt' working for most poeple. Need detailed help to deploy. 
          - Heroku. See https://coding-boot-camp.github.io/full-stack/heroku/deploy-with-heroku-and-mysql

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

    server/utils/auth.js: Update the authMiddleware function to work with the GraphQL API.
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
                saveBook: Accepts book bookId, title, descript, authors array, image, and link params
                returns a User type. (Look into creating an input type to handle all of these params!)
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
            Auth type: // Authorization not Author
                token
                user (References the User type.)

# Front-End Specifications  
------------------------------   
Create front-end files:

    client/src/utils folder: 
    queries.js: GET_ME will exec the me query setup using Apollo Server.
    mutations.js:
        LOGIN_USER will execute the loginUser mutation set up using Apollo Server.
        ADD_USER will execute the addUser mutation.
        SAVE_BOOK will execute the saveBook mutation.
        REMOVE_BOOK will execute the removeBook mutation.

Additionally, you’ll need to complete the following tasks in each of these front-end files:
    App.jsx: Create an Apollo Provider to make every request work with the Apollo server. 

    SignupForm.jsx: Replace addUser() functionality from the API file with ADD_USER mutation functionality.  
    LoginForm.jsx: Replace the loginUser() functionality from the API file with LOGIN_USER mutation functionality.  

    SearchBooks.jsx:  
        Use the Apollo useMutation() Hook to execute the SAVE_BOOK mutation in the handleSaveBook() function instead of the saveBook() function imported from the API file.
        Make sure you keep the logic for saving the book's ID to state in the try...catch block!
    SavedBooks.jsx:
        - Remove the useEffect() Hook that sets the state for UserData.
        Instead, use the useQuery() Hook to execute the GET_ME query on load and save it to a variable named userData.
        - Use the useMutation() Hook to execute the REMOVE_BOOK mutation in the handleDeleteBook() function instead of the deleteBook() function that's imported from API file. (Make sure you keep the removeBookId() function in place!)

