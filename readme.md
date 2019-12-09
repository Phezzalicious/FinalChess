Chess Final 
This project successfully accomplishes these tasks: 
1. Get data in an interval from an external api (chess.com API)
2. this data is current and updating overtime, albeit slowly
3. Shape data to how i want it and put it in my mongoDB atlas cluster
4. Perform api calls to my own api where I return  a query  result from my mongodb to the controller
5. Express this data through pug templates
6. allow users to choose what data to see from a dropdown menu 
7. perform both post and get request to my API 

While designing this project, I attempted to code it in such a way that would allow it to be developed further in the future. alot that I wrote was later split into methods for easier reading and alot of effort was put into its design and cleanliness

This project was unable to accomplish these tasks:
1. Angular was originally a huge part of the project but as the clock ran down and thanksgiving took priority, I decided to drop all Angular aspects. They are not owrth including
2. i do not have error handling for when my external api returns null, if the player idd not play any games that month my code breaks 
3. i did not put any effort into status codes being sent or anything like that, i prioritized my other goals 
4. front-end is very lacking, its a good thing this is a back-end class


To accomplish this project i used : 
1. VATSIMHARVESTER was gutted and followed very closely, a deep understanding of vatsimharvester was first acquired before any real progress was made on chess. no method is really the same but every concept was followed in the development of chess 
2. clive and simon were used but mostly for their chapter 4 branch , past that i found vatsimharvester more relevant and uncomplex, although after doing the final project clives code seems pretty understandable.
