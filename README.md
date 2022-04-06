# Spriter

Spriter is a MERN stack application that aims to let its users look for and download various sizes of images.
The front end of the application is built in react and connects to a back end build with node JS that connects
to a MONGODB database and pulls data from the unsplash api.

##  Usage
- Call npm install on both the frontend and backend folders
- Set required environment variables for both frontend and backend projects
- Start a local mongodb instance
- Call npm start on frontend and nodemon on backend

##  Required environment variables
# Frontend
- port(should not be the same as for backend)  
  The variables below are used for ease of use when connecting  
  the frontend to the back, connect these to urls that your backend is hosted on.
- REACT_APP_APIURL
- REACT_APP_API_LOGIN
- REACT_APP_API_REGISTER  
# BackEnd
- APIKEY the key to your unsplash app
- PAGECOUNT the count of images you want to pull from unsplash each time (default:20)
- JWT_EXPIRE default expiration for Auth tokens
- JWT_SECRET string used to sign Auth tokens 

