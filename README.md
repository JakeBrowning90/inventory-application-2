# Inventory Application 2

## Overview
This is an app for organizing a music collection. It is my first app to use SQL, and uses tables for Artists, Albums, Album Credits, and Users. At the moment, it does not allow actual music playback, but rather is a demonstration of using SQL queries and joins. 

## Technologies
Express, Node.js, PostgreSQL, EJS, Passport.js

## Challenges/To-dos
While the basic CRUD operations were fairly straightforward, the greatest challenges were related to design. My initial prototype used more views, and friends with an eye for UX and UI advised flattening the design. To this end, I removed list views and search result view, and tried to keep as much information as possible contained on the index view.

At the moment, the app does not include image upload support. This is my next goal toward completing the UI.

Further down the line, I'd like to incorporate social media elements into the app by letting users save individual collections, and share those with friends.

## How to use
 
### Searching the collection:
- Scroll through the columns to view and select an artist or album.
- You can use the search bar to filter the displayed results. Perform an empty search to view all entries.
- Select an entry to view its detail page, including associated artists and albums, and editing functions.

### Adding new entries:
- To add a new entry, click the "+" icon next the Search field. Next, select whether you wish to add an Artist or an Album.
- Fill in all form fields and click "Submit" to add a new entry.
- Albums must be credited to an Artist, so make sure they are already in the collection, or add them first!
- You can make multiple artist selections by holding the "CTRL" key while clicking their names.

### Updating or deleting entries:
- To edit an entry, click the pencil icon on its detail page. Make your desired changes in the form, and click Submit.
- To delete an entry, click the wastebin icon on its detail page. You will see a warning screen before completing the deletion.
- Artists can only be deleted if they have no credited Albums in the collection. Delete these albums or edit them to remove the artist planned for deletion.

## Credits
Icons sourced from Google Fonts.
Example Artist and Album information from Wikipedia.
UI assistance from https://goodwinart.myportfolio.com/ and https://github.com/jlduchaney

