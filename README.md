# Book Search Engine with MERN and GraphQl
uri bootcamp Project 3 - Coal Violence MERN, React and GraphQL, web token security - MJS 4.27.24    
Michael Sheliga - This repo is for the University of Richmond (URI) coding bootcamp.  
Starter Code: From hw21 GBook Search using MERN, GraphQL and web tokens security. 
Also used Act 28 MP (beware very poor code) and Act 24.  

## Link to Repo, Deployment(s) Screenshot(s) and/or Video(s)    
Link to GitHub Repo: https://github.com/msheliga1/pj3ReactQLCoalViolence 
Link to Render-Atlas Deployment: https://pj3reactqlcoalviolence.onrender.com
XX//hw21urigraphqlbooks-1.onrender.com/  
(Need MongoDB Atlas site which is also some type of hosting site.)  
Link to Render-Atlas Deployment Help: https://coding-boot-camp.github.io/full-stack/mongodb/deploy-with-render-and-mongodb-atlas   
<!-- Link to Heroku Deployment:  https://git.heroku.com/arcane-garden-86951.git   -->  
<!-- Link to Video on Google Drive: https://drive.google.com/file/d/1jcrSLjZJ3evW8Ss2wuIrIy4JPc4SDk_M/view -->  
<!---  Link to deployed github.io site. https://msheliga1.github.io/uriHW9NodeReadmeGen --->   

[Link to Acceptance Criteria ](#acceptance-criteria)   

## Project Goals      
Create a historical coal camp violence app using MERN-react, GraphQL and web token security.  
STATUS:   

## Repos Used
Cloned hw21. GraphQL, Mern. User->
HW  21.    User - Books 
Act 21-04. (Unsolved) School[Classes]-Class-Professor (Resolvers.js get .populate x2)
Act 21-06. School-Class<->Professor
Act 21-08. School-Class<->Professor (GetClass by ID)
Act 21-10. School-Class<->Professor (plus addClass, updateClass)
Act 21-12. Thought [Comment] -> Comment (Thoughts, ThoughtById, Add-Remove Thoughts/Comments)
Act 21-14. Same as 21-12. 
Act 21-16. Same as 21-12.  (Click->Page Redirect)
Act 21-18. Same  "      .  (client->Thought Form)
Act 21-20. Same  "      .  (Client->ThoughtList, Thought, Add Thought-Comment)
Act 21-22. User->Thought->Comment (thoughtAuthor).  JWT (resolvers .populate x1)
Act 21-24. User->Thought->Comment (thoughtAuthor).  JWT-Auth-Login (resolvers .populate x1)
Act 21-26  Same "                                .  Plus me method (context)
Act 21-28. Tech-Matchup. 

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
        -- Alternate: Go to Demo (root) folder, download zip, moving to local repo, unzip - likely fastest   method.     
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

# Workflow and Problems  
  
Attempt to get code running (index.html page display in this case.)   
    File Structure:  
        Has client and Server folders. Root, client and server have pjs.  
        Root does NOT have index.html.  
        Client has index.html.  
            vite.config.js seems to connect to port 3001 (and 3000).  
            public only has vite.svg (likely an image)  
        src folder has most stuff  
            main.jsx (main entry pt) and App.jsx  
            assets - just react.svg  
            components - Login.jsx, NavBar.jsx and SignupForm.jsx.  
            pages folder - SavedBooks.jsx, SearchBooks.jsx   
            utils folder - API.js, auth.js, localStorage.js  
        Server  
            config - just DB config  
            controllers - user-controller.js  
            models - index.js, Book.js, User.js  
            routes - index.js /api has index.js and user-routes.js   
    NPM: "npm init --y" BEFORE "npm install" to avoide ENOENT err.  
        "npm install" (or "nmp i")  
        Root "npm run build" builds client. - seemed to work. Created a dist folder with index.htmls  
        Root "mpm run develop" starts 2 servers (app on 3000, GQL on 3001), including nodemon server.  
    Testing: Was able to get app working at 3000. Login, Searched, Saved and Deleted.  
        Change "npm run develop" to "npm run dev" 
    SERVER - GraphQL  
        Got GraphQL users working.  Great 1st step.  
        Got addUser working.  Great next step.  
        Added saveBook  
        Figured out that books array seems to be "embedded" in Users.  
            - Similar to how Comments were embedded in Thoughts (Act 24?)  
            - Changed this in models and typeDefs. 
            - Created comments (embedded) in Books. 
            - Deleted ALL old users that had embedded Books.  
            - Noted that savedBooks [] must be [Books] and NOT [ID]
            - Got .populate to work.     
            - Working methods include add user, getAllUsers, getUser and add Book. 
    CLIENT Goal: Add new page for my books and create book. 
            - Works
        Goal: Add New Book to both favorites and myFights. 
            - Works
        Goal: Remove book from favorite array. 
        Goal: Search shows favorited and myFights 

CLIENT    
    Runs at same time as graphQL if "mpm run develop". (Big shout out to Chris for help!).  
        App at port 3000. GraphQL at 3001.  
    Found queries and mutations under client/src/utils  
        Added graphQL style routes, by copying and pasting from graphQL. Made sure got all non password data.  

ly used Act 26, but with NavBar instead of Header and Footer.  
            Got build error. Missing dependency "@apollo/client": "^3.7.14", (also missing graphql).  
            - Accidentally added to SERVER package.json.  Gave dreaded rollup issue. Mike the TA said to  
                put in the client package.json.  Got rid of build error.  
        Tweakd vite.config.js (per Andrew-Mike. Would never have thought of on my own.).  


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
    Goal: RemoveBook (SavedBooks.jsx)  
        Got this to work fairly easily, since very similar to save book.  
    Goal: Correct Bug that Save Books screen wont load immediately after logging in.  
        Also happens with Sign-up.  
        Does work after login followed by search.  
        Does work after login, search and saveBook.   
        Does work after back button and re-selecting Saved Books.  
        Tried console.logs in LoginForm.jsx  
            Since LoginForm.jsx calls client AuthService.login routine which calls  
            window.location.assign('/'); you cant see console.logs. Must use return or comment out  
            above line.  
        Saved user to userData hook.  This did not help.  
            CANT see hookData in DevTools->Application. Can see localStorage, but this is a hook not localStorage.  
            Need extension to use React DevTools   
            Hard time find Apollo DeeTools once extension downloaded. 
        Also saved bookData to localStorage and/or hook.  Did not help.  
        Talked with Andrew. He indicated that this "bug" is almost for sure a cache issue, that it is not part  
            of the project and to ignore it.  I was using Chrome precisely because it has an "Empty Cache  
            and Hard Reload" option.  I had tried this *before* logging in. It did not seem to work.  I   
            tried in *after* logging in and it did not work.  
        Nonetheless, per the resident expernt Andrew I should not worry about this.  
    Goal: Understand why books sometimes display as "already added to list" for new users.  
        Instructor Andrew indicated that this is a bug in the original code.  The database does NOT match the   
        local storage.  The DB has records for each user. Local storage just has one list of books  
        that have been saved for *any* user.  
        Andrew once again indicated that this is not the heart of the project.  
    All issues closed.  On to deployment with Render.  
        Confirmed server.js has process.env.PORT || 3001; line.  
        Directions are fairly complete, but out of order. It would be really great if the link to  
        the fullStackBlog and/or the specific directions were in the assignment.  
         
    Commit and push files back to gitHub/branch. (For multi-programming: Issue pull request, approve, merge).  
    Deploy code (Settings...CodeAndAnimation->Pages on left, GitHub Pages->Branch->main, save)  
        - Deployed code name always msheliga1/github.io/RepoName !! 
        = First tried deploying with Heroku. There MongoDB is behind a paywall. 
        = Used Render - VERY long process. 
        = Render Name: hw21uriGraphQLBooks-1 (hw21uriGraphQLBooks already taken)
        - Site https://hw21urigraphqlbooks-1.onrender.com/  
        - 2 Hours just to go through the directions.  
        - Wouldn't work. 
        - Only issue TA Mike indicated: Use npm run render-build, instead of npm install.   
            - This installs and builds, but having latest app version is not the issue.  
        - Somehow password was messed up. Changed it then changed it back. Then started working.  
    Make Sure it Works    
        - Verifified it works at Render URL.  Same behavior as locally, including first time error 
            when acccessing saveBooks for a new user or a new login.   
    Insert Screencastify (Chrome) Video, Heroku, Render, Netify and/or Screenshot X2 of deployment into readme file.  
  
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
    Deployemnt: Render - wasnt' working for most poeple. Need detailed help to deploy. 

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

