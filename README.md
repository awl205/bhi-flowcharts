# File Structure 
```
src/ 
├─ components/ 
│  ├─ NavBar.css -- navigation bar styling 
│  ├─ index.js -- navigation bar main code 
├─ pages/ 
│  ├─ assets/ -- uploaded PDFs/images (this is a folder)
│  ├─ equip.css -- styling for all 4 equipment pages 
│  ├─ index.js -- home page 
│  ├─ index.css -- home page styling 
App.js -- main control page 
App.css -- main control page styling 
```
# Making Edits
## Interactive Flowcharts
1. Navigate to corresponding equipment page in src/pages (oxygen-generator.js, booster-compressor.js, etc.)
2. Find flowchart number
3. Modify steps

## Uploaded PDFs / Images
1. Delete old version from src/pages/assets
2. Upload new version
3. If new version has a different name, navigate to corresponding equipment page and change import statement at the top
