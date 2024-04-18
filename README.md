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
Modify a book search app from REST to GraphQL using MERN-reach and web token security.     

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
        -- Preferred structure, allows Heroku to find package.json for auto-build.

    Create a nice long READ.md file!!  (Modify prior projects.)   

    Package.json: Check-Add start, build, etc. to main/package-json. Enables commands to run. 
        "comment" property added at top of file. (Don't think there is another way to comment.)
        Found dev, start, build, lint, preview script commands in package.json. 
        Only react, vite and es-lint packages. No back-end. No express, web-pack, mongoose, etc. 

    Attempt to get code running (index.html page display in this case.)
    --------------------------------------------------------------------
    File Structure: 
        No client or Server
        root has index.html.  Also vite.config.js seems to connect to port 3000!
            public only has vite.svg (likely an image)
        src has App.css, App.jsx, index.css and main.jsx
            src/assets only has react.svg - likely an svg image. Lots and lots of numbers in this file.
        src/components has Bucket.jsx, BucketForm.jsx and BucketList.jsx.
    NPM: "npm init --y" BEFORE "npm install" to avoide ENOENT err.
        "npm install" (or "nmp i")
        "npm run build" - seemed to work. Created a dist folder including index.html 
    - Tried opening dist/index.html ... got a blank page
    - Tried npm run start => this runs vite, which brings up a server on port 3000! Great. 
        - Firefox - same caching issue as always.
        - Chrome - Inspect - hard reload. Bucket List comes up. Awesome progress. 
 
    Create NavBar - main uses App. App uses BucketList.  BucketList uses both BucketForm(props) and Bucket(props). 
        - Noted that act 28 mini-project is more about forms, lists and saving data.  Not really a large amount of components. 
        - Noted that act 26 is about testing. 
        - Noted that 24 is more about components, SPA routes and has a navbar. 
        - Noted App.jsx has Outlet followed by Nav. 
        - Nav Bar would NOT display in 24. Bottom line problem is that page is unresponsive, and must be 2/3rds of display 
            to see Nav-Bar text. Arghhhh.. 
        - Current Code: main: ReactDOM.createRoot(...render(<App />) 
                        App.jsx: function App() {<div className="bucket-app" <BucketList /> </div>
                        No NavBar at all. Not designed for one!
        - Actitivey 24: main: ReactDOM.createRoot(....render(<RouterProvider router={router} />
                        App.jsx: function App() function App() {<> <Nav /> <Outlet /> </>
        - Tried creating routes by hand typing main.jsx ... an hour plus spent on commas and a missing : after children. 

    Get Main Page to Display - hold off on navBar for time being. 
        - Created pages subdir. 
        - First created ErrorPage.  Then HomePage and AboutPage.jsx. 
        - Problem getting data from        "react-router-dom": "^6.10.0".  
        - Copied this singe dep to package.json.  => roll-up error during build: in ErrorPage, not in index
            "useRouterError" is not exported by "node_modules/react-router-dom/dist/index.js"
        - Copied entire package.json from act24. Still get roll-up error.
            - Copied the file from act24 to hw. Stlll get roll-up-error. 
            - Copied vite.config.ts from act24 to hw ... files seemed identical. Still get error. 0
        - Deleted entire dist folder. NPM i, npm run build, still gives same error. 
        - Deleted entire node_modules directory (PITA with permissions.) Also package-json.lock. 
            NPM install, npm run build ... same error. 
        
    ===>  TIME TO GIVE UP AND START WITH ACT 24  <==================
        - Dont want to delete gitHub repo with commit history. 
        - Deleted all local files, download Act24 files.  
        - Tried pushing ... repeatedly caused push conflict issues. 
            - Error msg doesnt say which files. ARGHHHHHHHHHHHHHHH. 
        - Copied README to a non-git directory.
        - Repeated problems.  Finally deleted *everything* locally. 
        - Redid "git init". 
        - Setup remote connection to gitHub. 
        - Did git pull ori main. 
        - Kept adding, commit, and pushing in the following order ....
        - Moved MOST files to subdir.  Excluded pjs, .gitignore and README.md. 
            - Also moved pjs without trouble.
        - Used Windows10 to create Act24 Solved folder. 
            - Deleted dist and node_modules folders. Renamed .gitignore to .gitignore24
            - Moved all remaining files form Solved to root. 
            - Copied previously saved README.md
        - Verified that this now works. NPM intall, npm run build. npm start. 
        - What an incredible PITA!!  But still have commit history (I think) in gitHub. ARGHHHH!

        - Once I found the routes (which I'd been working on before - duuuuuuh), I was 
        able to modify them and create dummy pages. Yipeeeeeeeeeeeeeee! 

    Commit and push files back to gitHub/branch. (For multi-programming: Issue pull request, approve, merge).  
    Deploy code (Settings...CodeAndAnimation->Pages on left, GitHub Pages->Branch->main, save)  
        - Deployed code name always msheliga1/github.io/RepoName !! 
        = Used Netlify.  Direction in act 20-27 somewhat shakey, but got it to run. Yipeeee!  
    Make Sure it Works    
    Insert Screencastify (Chrome) Video, Heroku, Netify and/or Screenshot X2 of deployment into readme file.  
  
## Tools and Technologies Used   
    Github - Branches not needed, but could use.    
        - GitIgnore to keep NPM libraries out of gitHub repo.    
    NPM - Node package manager  
    React - Components and Single Page App used extensively
    Netlify - Another new way to deploy. Does hot changes (unlike Heroku which requires a push). 
        Also allows deployment name change. 

## Acceptance Criteria   
-----------------------       
DESIRE: single-page application portfolio for a web developer.
        About Me, Portfolio, Contact, and Resume. 
Load portfolio => presented with a page containing a header, a section for content, and a footer
View the header => shown developer's name and titles About Me, Portfolio, Contact, and Resume. 
    Title of current section is highlighted
Click on nav title => corresponding section below the navigation without the page reloading and that title is highlighted
Load the portfolio the first time => About Me title and section are selected by default
About Me section => see a recent photo or avatar of the developer and a short bio about them
Portfolio section => titled images of six applications with links to both the deployed apps and the corresponding GitHub repo
Contact section => contact form with fields for a name, an email address, and a message
    cursor moved out of one of the form fields without entering text
    receive a notification that this field is required
WHEN I enter text into the email address field
    get notification if I have entered an invalid email address
Resume section - link to a downloadable resume and a list of the developer’s proficiencies
Footer: has text or icon links to the developer’s GitHub and LinkedIn profiles, and their profile on a third platform (Stack Overflow, Twitter) 
