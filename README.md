# CapstoneProject

Specifications

User Stories

1. As a traveler, I want to create a profile and set my travel preferences so I can be paired with travelers of similar interests
2. As a traveler, I want to be able to access the other travelers/locals I’ve been matched with
3. As a traveler, I want to be able to contact the travelers/locals I’ve been matched with
4. As a traveler, I want to be able to choose the travelers/locals I might match with (like or dislike)
5. As a traveler, I want to be able to be able to share my location with other travelers nearby
6. As a traveler, I want to be able to see the locations of travelers/locals nearby
7. As a local, I want to create a profile so I can be paired with travelers of similar interests
8. As a local, I want to be able to access the travelers I’ve been matched with
9. As a local, I want to be able to choose the travelers/locals I might match with (like or dislike)
10. As a local I want to be able to see a map of travelers in my area so I can request to message them

User Personas

1. Shanique: A 23 year old who recently graduated from college and is planning on taking a gap year to travel Europe before starting graduate school.

Problem: All of Shanique’s friend’s have gone straight into working in their respective industries so she has no one to travel with and is considering pushing off her travel plans and instead getting a part-time job

Solution: She can set up a profile with her travel preferences and plans and find potential travel buddies she can then chat with and make travel plans.

2. Tonya: A 45 year old librarian visiting Nicaragua for the summer. Tonya has been traveling with her husband through south america, however a work emergency required him to leave their trip earlier than expected. Tonya decided to stay and would like to find people to explore the country with during the rest of her time there.

Problem: Tonya is in a foreign country and doesn’t really have any connections.

Solution: She can share her location on the app and meet other travelers near her who are open to meeting people.

3. Ricardo: A 28 year old PhD student who loves learning about different cultures as well as sharing his own. Ricardo currently cannot afford to travel but would still like the opportunity to meet people from around the world, however most of his friends and those around him are locals of their town.

Problem: Ricardo’s knowledge of the world and everyone in it is limited to those around him who have those same experiences. He feels limited in his exposure to the world.

Solution: He can join the app as a local and volunteer to meet up with tourists and show them around his town while learning about them and their cultures

<b>Project Breakdown </b>

<b>Pages </b>
Sign Up Page:

- Core Features:

1. Store user inputs as username and password in a database

- Stretch:

3. Allow users to sign up for FIDO authentication

Login Page:

- Core Features:

1. Check to see if username is in the database
2. If so compare inputted password with the password in the database
3. Otherwise, return an error message

Set-up Profile Page:

- Core features

1. Display header, navbar, content, and footer
2. User profile picture
3. Allow users to retrieve profile photos from their desktop
4. Allow users to take live profile photos
5. Once user has selected a photo, store it in the database and retrieve it to use for their profile

Travel logistics:

- Core features

1. Display a drop down menu of all the countries (likely store all the countries in an array?) and store that info in the users profile
2. Display a drop down menu of days, months and years and store user input in the user profile
3. Display accommodation options buttons (hotel, motel, hostels etc.)

Social media:

- Core features

1. Allow users to input links to their social media (store this in their user profiles) and create an icon for each corresponding link to be displayed on their profile

- Stretch features

3. Allow the user to make travel profiles for more than one country with varying travel preferences and dates
4. Allow user to input their budgets and more specific information
5. Allow users to opt into seeing all travelers on the site regardless of their destination

Getting to know you page:

- Core Features

1. Display main components (header, nav bar, footer, etc)
2. Drop down menu of employment fields- store information
3. Grid layout of interest options in the form of buttons (keep track of states for each button and pass an array of the positive states as a prop to be used when generating the matches)
4. Grid layout of activities (image, title, description, cost and link to book tickets) to do for the user's specified country from the Trip locator API.

- Stretch features

View Matches Page:

- Core features

1. List matches with the user based off other users countries, travel months and accommodation preferences.

- Stretch Features

1. Rank matches based off overlapping interests and activities
2. Allow users to like and dislike matches
3. Implement a chat feature for matches to communicate with

View neighboring travelers/locals page:

- Core Features

1. Display a map with pins of the location of travelers in the users country using the google maps API

- Stretch features

1. When user hovers on a pin, a bio and picture of that traveler pops up
2. Users can elect whether or not to share their location
3. Location is only shared with the matches that the user has liked.

Daily CheckList

<b> Tuesday Week 1:</b>
<i> Core Features:</i>
[X] Set up bare-bones React skeleton of the app

- [x] Homepage
- [x] login/signup page
- [x] profile set-up page
- [x] view matches page
- [x] google maps pin page

[X] Create user data model

<i> Stretch Features:</i>
[] try setting up database to store user information
