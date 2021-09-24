// File contains:

Screen : 
    AddEvent :
        Screen for user to use for importing the event into the database
    Calendar :
        screen to display the calendar, as well as requesting all of the event.
        Main import is the agenda(calendar), all the component is import into it
    DailyReview
        Screen display today task, also has the button to the home screen as well
        as the button to display the weather
    DetailsScreen
        Consist of the three previous screen
    HomeScreen
        SignupScreen consist of the form for the user to login. It also call validuser()
        from the API
     SignUpScreen:
        Contains the form for the user to signup.It also call pushUser to create this UserInto theAPi
    Weather :
        Display today weather
DBInteract :
    DBFunction: all th function related to the db such as push, create, remove, pull,....
    WeatherAPIInteract : fetching the data from weather api
API :
    DatabaseInteractApi: contains all the logic such as checking valid user, hashing password, find event from the data,find user from the data ,....
    WeatherApi: Processing and finding a specific data