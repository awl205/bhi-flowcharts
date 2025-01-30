# File Structure 
```
src/ 
├─ components/ 
│  ├─ NavBar.css -- navigation bar styling 
│  ├─ NavBar.js -- navigation bar main code
│  ├─ Footer.js -- footer main code
│  ├─ Footer.css -- footer styling
├─ pages/ 
│  ├─ assets/ -- uploaded PDFs/images (this is a folder)
│  ├─ equip.css -- styling for all 4 equipment pages 
│  ├─ index.js -- home page 
│  ├─ index.css -- home page styling 
App.js -- main control page 
App.css -- main control page styling 
```
# Getting Started
## Setup
1. Open VSCode to a directory you want to set up the repository in (generally somewhere in Documents)
2. Open the terminal and type: git clone https://github.com/awl205/bhi-flowcharts.git
3. Make sure you have the latest version of the repository before making any changes -- in the terminal, type: git pull
4. Install necessary dependencies using pip install 
5. To run the website locally, type: npm start
6. To quit, ctrl+c on Mac

# Making Edits
## Interactive Flowcharts
1. Navigate to corresponding equipment page in src/pages (oxygen-generator.js, booster-compressor.js, etc.)
2. Find flowchart number
3. Modify steps 

## Uploaded PDFs / Images
1. Delete old version from src/pages/assets
2. Upload new version into src/pages/assets
3. If new version has a different name, navigate to corresponding equipment page and change import statement at the top
4. If the new LucidCharts full flowchart has changed, search for "positions" in the corresponding equipment page and modify percentages accordingly (may take some trial and error) - this is used for the automatic scrolling based on the first button selected 

## Getting the most updated version from GitHub
1. git pull
   
## Pushing changes to GitHub
1. git add .
2. git commit -m "description of changes"
3. git push
   
Note: Vercel should automatically update after pushing changes 
