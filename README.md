# Chicago Entertainment & Culture Scraper
### A Heroku hosted app that generates Entertainment and Culture news from the Chicago Sun Times

Deployed Link here: https://infinite-everglades-67327.herokuapp.com/

The user has the option of several actions...
* __Find new Articles__
 * Click the link at the top of the page to generate articles _(NOTE: This feature unfortunately does require a refresh of the page)_
* __Save an Article__
 * Users can save an article to view it at a later time.
* __Delete all unsaved Articles__
  * Any articles that are not saved for later reading will be deleted. Allowing the user to find more articles
* __View saved Articles__
 * Following this link redirects users to a separate page, showing saved articles. Additional option are available on this page.
 * __Comment on an Article__
  * When viewing saved articles, users can comment on the article -> also delete those comments afterwards
 * __Delete an Article__
  * Users have the ability to remove an article from being saved, allowing it to be available to be found again on the home page.
 * __Clear all saved Articles__
  * The user can delete all of their saved articles -> if they try to find new articles on the home page, they can find these deleted items
  
## Tech Used
* __npm packages__
  * _axios_ : used to grab information from the chicago sun time 'entertainment and culture' section -> https://chicago.suntimes.com/entertainment-and-culture
  * _cheerio_ : used to scrape/read/format data from the above web page
  * _mongoose_ : used for CRUD operations involving database -> creating / reading / editing / deleting articles
  * _express-handlebars_ : front-end templating used to populate pages with data from mongoDB
