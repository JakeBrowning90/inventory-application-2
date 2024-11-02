# Inventory Application 2

## Overview
This is an app for organizing a music collection. It is my first app to use SQL, and uses tables for Artists, Albums, Album Credits, and Users. At the moment, it does not allow actual music playback, but rather is a demonstration of using SQL queries and joins. 

## Technologies
Express, Node.js, PostgreSQL, EJS, Passport.js, Multer, Cloudinary

## Challenges/To-dos
While the basic CRUD operations were fairly straightforward, the greatest challenges were related to design. My initial prototype used more views, and friends with an eye for UX and UI advised flattening the design, with elements inspired by Spotify. To this end, I removed list views and search result view, and tried to keep as much information as possible contained on the index view.

I also ran into issues with implementing image upload. I ultimately used a combination of Multer and Cloudinary so users could attach an image to the new Artist/Album form, have the image upload to the cloud, and save the returned URL to the SQL DB. 

Further down the line, I'd like to incorporate social media elements into the app by letting users save individual collections, and share those with friends.

Additional challenges/to-dos:
- Ordering middleware: at the moment, the image upload occurs ahead of form validation. I need to correct this so that the upload occurs only after validation, and still get the URL to be inserted the DB.
- Deleting expired images: I have not yet implemented a way to remove an image for an entry when it is updated to be replaced by another. I'm sure this isn't too challenging, but I'll circle back to this.
- Linking artists to one another: Late in development I realized it would be nice to give each artist a field for "associated acts" such as for collaborations, bands whose members have solo careers, etc.
- Finer image management: I've chosen to leave it for now since it's outside the scope of the project, but I'd like to make better use of Cloudinary's tools to crop photos to keep the artist's face in the frame.
- Sorting an artist's discography alphabetically, chronologically, or both?
- Text-rich editing. 

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

