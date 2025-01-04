const startScreen = document.getElementById('start-screen');
const quizArea = document.getElementById('quiz-area');
const resultScreen = document.getElementById('result-screen');
const quizOptionsEl = document.getElementById('quiz-options');
const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');
const exploreMoreBtn = document.getElementById('explore-more-btn');
const scoreEl = document.getElementById('score');
const quizSummaryEl = document.getElementById('quiz-summary');

let quizzes = {}; // Object to store all quizzes
let selectedQuiz = null; // The current quiz being played
let currentQuestionIndex = 0;
let score = 0;

// Example Quizzes Data
quizzes = {
    "Mathematics": {
        questions: [
            { question: "What is 5 + 3?", options: ["8", "7", "10", "5"], correct: "8" },
            { question: "What is 7 * 6?", options: ["42", "40", "36", "48"], correct: "42" },
            { question: "What is 12 - 4?", options: ["8", "6", "7", "9"], correct: "8" },
            { question: "What is 9 / 3?", options: ["3", "2", "4", "6"], correct: "3" },
            { question: "What is 5 * 5?", options: ["25", "30", "20", "35"], correct: "25" },
            { question: "What is 15 + 6?", options: ["20", "22", "21", "18"], correct: "21" },
            { question: "What is 14 - 7?", options: ["6", "7", "8", "9"], correct: "7" },
            { question: "What is 4 * 3?", options: ["12", "10", "9", "11"], correct: "12" },
            { question: "What is 20 / 4?", options: ["6", "4", "5", "7"], correct: "5" },
            { question: "What is 18 + 2?", options: ["21", "20", "19", "18"], correct: "20" }
        ],
        summary: "This quiz helps you improve your basic math skills, including addition, multiplication, and problem-solving techniques."
    },
    "Science": {
        questions: [
            { question: "What planet is known as the Red Planet?", options: ["Mars", "Venus", "Earth", "Jupiter"], correct: "Mars" },
            { question: "What is the chemical symbol for water?", options: ["H2O", "O2", "CO2", "NaCl"], correct: "H2O" },
            { question: "What is the boiling point of water?", options: ["100°C", "50°C", "75°C", "150°C"], correct: "100°C" },
            { question: "What is the powerhouse of the cell?", options: ["Mitochondria", "Nucleus", "Ribosome", "Endoplasmic Reticulum"], correct: "Mitochondria" },
            { question: "What gas do plants absorb during photosynthesis?", options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"], correct: "Carbon Dioxide" },
            { question: "What is the largest planet in our solar system?", options: ["Jupiter", "Saturn", "Earth", "Mars"], correct: "Jupiter" },
            { question: "What element is needed for respiration?", options: ["Oxygen", "Hydrogen", "Carbon", "Nitrogen"], correct: "Oxygen" },
            { question: "What is the chemical symbol for gold?", options: ["Au", "Ag", "Pb", "Fe"], correct: "Au" },
            { question: "What force keeps planets in orbit?", options: ["Gravity", "Magnetism", "Friction", "Inertia"], correct: "Gravity" },
            { question: "What type of rock is granite?", options: ["Igneous", "Sedimentary", "Metamorphic", "Organic"], correct: "Igneous" }
        ],
        summary: "This quiz covers fundamental science topics, including space and chemistry basics."
    },
    "History": {
        questions: [
            { question: "Who was the first president of the United States?", options: ["George Washington", "Abraham Lincoln", "Thomas Jefferson", "John Adams"], correct: "George Washington" },
            { question: "In which year did World War I begin?", options: ["1914", "1918", "1939", "1941"], correct: "1914" },
            { question: "Who discovered America?", options: ["Christopher Columbus", "Marco Polo", "Ferdinand Magellan", "Vasco da Gama"], correct: "Christopher Columbus" },
            { question: "What was the name of the first manned moon landing mission?", options: ["Apollo 11", "Apollo 13", "Gemini 4", "Mercury 7"], correct: "Apollo 11" },
            { question: "What ancient civilization built the pyramids?", options: ["Egyptians", "Romans", "Greeks", "Mesopotamians"], correct: "Egyptians" },
            { question: "Who was the first emperor of China?", options: ["Qin Shi Huang", "Liu Bang", "Tang Taizong", "Zhao Kuangyin"], correct: "Qin Shi Huang" },
            { question: "What country did the Titanic sail from?", options: ["England", "France", "Germany", "USA"], correct: "England" },
            { question: "Who wrote the Declaration of Independence?", options: ["Thomas Jefferson", "George Washington", "Benjamin Franklin", "John Adams"], correct: "Thomas Jefferson" },
            { question: "What year did the Berlin Wall fall?", options: ["1989", "1991", "1975", "1969"], correct: "1989" },
            { question: "Who was the leader of Nazi Germany?", options: ["Adolf Hitler", "Joseph Stalin", "Benito Mussolini", "Winston Churchill"], correct: "Adolf Hitler" }
        ],
        summary: "This quiz covers important historical events and figures."
    },
    "Geography": {
        questions: [
            { question: "What is the capital of France?", options: ["Paris", "London", "Berlin", "Madrid"], correct: "Paris" },
            { question: "Which country has the largest population?", options: ["China", "India", "USA", "Russia"], correct: "China" },
            { question: "What is the longest river in the world?", options: ["Nile", "Amazon", "Yangtze", "Mississippi"], correct: "Nile" },
            { question: "Which is the largest ocean?", options: ["Pacific", "Atlantic", "Indian", "Arctic"], correct: "Pacific" },
            { question: "Which continent is Australia part of?", options: ["Oceania", "Asia", "Europe", "Africa"], correct: "Oceania" },
            { question: "Which country is known as the Land of the Rising Sun?", options: ["Japan", "China", "South Korea", "Thailand"], correct: "Japan" },
            { question: "Which country has the most islands?", options: ["Sweden", "Finland", "Norway", "Indonesia"], correct: "Sweden" },
            { question: "What is the tallest mountain in the world?", options: ["Mount Everest", "K2", "Kangchenjunga", "Makalu"], correct: "Mount Everest" },
            { question: "Which is the smallest country in the world?", options: ["Vatican City", "Monaco", "Nauru", "San Marino"], correct: "Vatican City" },
            { question: "Which desert is the largest in the world?", options: ["Sahara", "Gobi", "Kalahari", "Atacama"], correct: "Sahara" }
        ],
        summary: "This quiz focuses on geographical knowledge, including countries, capitals, and landmarks."
    },
    "Literature": {
        questions: [
            { question: "Who wrote 'Romeo and Juliet'?", options: ["William Shakespeare", "Jane Austen", "Charles Dickens", "Mark Twain"], correct: "William Shakespeare" },
            { question: "What is the title of the first Harry Potter book?", options: ["Harry Potter and the Philosopher's Stone", "Harry Potter and the Chamber of Secrets", "Harry Potter and the Prisoner of Azkaban", "Harry Potter and the Goblet of Fire"], correct: "Harry Potter and the Philosopher's Stone" },
            { question: "Who wrote 'Pride and Prejudice'?", options: ["Jane Austen", "Charlotte Brontë", "Emily Dickinson", "Virginia Woolf"], correct: "Jane Austen" },
            { question: "What is the name of the fictional detective created by Arthur Conan Doyle?", options: ["Sherlock Holmes", "Hercule Poirot", "Sam Spade", "Philip Marlowe"], correct: "Sherlock Holmes" },
            { question: "In which country was 'Moby-Dick' first published?", options: ["United States", "United Kingdom", "Canada", "France"], correct: "United States" },
            { question: "What is the title of George Orwell's dystopian novel?", options: ["1984", "Brave New World", "Fahrenheit 451", "The Handmaid's Tale"], correct: "1984" },
            { question: "Who wrote 'The Great Gatsby'?", options: ["F. Scott Fitzgerald", "Ernest Hemingway", "J.D. Salinger", "John Steinbeck"], correct: "F. Scott Fitzgerald" },
            { question: "Which author wrote 'The Hobbit'?", options: ["J.R.R. Tolkien", "C.S. Lewis", "J.K. Rowling", "George R.R. Martin"], correct: "J.R.R. Tolkien" },
            { question: "Who wrote 'Wuthering Heights'?", options: ["Emily Brontë", "Charlotte Brontë", "Mary Shelley", "Anne Brontë"], correct: "Emily Brontë" },
            { question: "Who wrote '1984'?", options: ["George Orwell", "Aldous Huxley", "Ray Bradbury", "Margaret Atwood"], correct: "George Orwell" }
        ],
        summary: "This quiz tests your knowledge of classic literature, authors, and famous works."
    },
    "Art": {
        questions: [
            { question: "Who painted the Mona Lisa?", options: ["Leonardo da Vinci", "Vincent van Gogh", "Pablo Picasso", "Claude Monet"], correct: "Leonardo da Vinci" },
            { question: "Who created the famous sculpture 'David'?", options: ["Michelangelo", "Donatello", "Raphael", "Leonardo da Vinci"], correct: "Michelangelo" },
            { question: "Which artist is known for his abstract works and the invention of Cubism?", options: ["Pablo Picasso", "Jackson Pollock", "Claude Monet", "Salvador Dalí"], correct: "Pablo Picasso" },
            { question: "What is the style of painting that uses bright, vivid colors, thick brush strokes, and impassioned emotional expression?", options: ["Expressionism", "Impressionism", "Surrealism", "Cubism"], correct: "Expressionism" },
            { question: "Who painted 'The Starry Night'?", options: ["Vincent van Gogh", "Claude Monet", "Edvard Munch", "Gustav Klimt"], correct: "Vincent van Gogh" },
            { question: "Which artist is known for his water lily paintings?", options: ["Claude Monet", "Henri Matisse", "Pierre-Auguste Renoir", "Edgar Degas"], correct: "Claude Monet" },
            { question: "Which artist is famous for his drip painting technique?", options: ["Jackson Pollock", "Andy Warhol", "Roy Lichtenstein", "Mark Rothko"], correct: "Jackson Pollock" },
            { question: "Who painted 'The Persistence of Memory'?", options: ["Salvador Dalí", "René Magritte", "Frida Kahlo", "Pablo Picasso"], correct: "Salvador Dalí" },
            { question: "Which artist was known for his surrealistic portraits and depictions of dreamlike scenes?", options: ["Salvador Dalí", "Pablo Picasso", "Marc Chagall", "Claude Monet"], correct: "Salvador Dalí" },
            { question: "Which artist is known for creating Campbell's Soup Can artwork?", options: ["Andy Warhol", "Jackson Pollock", "Roy Lichtenstein", "Claes Oldenburg"], correct: "Andy Warhol" }
        ],
        summary: "This quiz explores key moments and figures in the world of art history, from Renaissance masters to modern movements."
    },
    "Technology": {
        questions: [
            { question: "Who is known as the father of computers?", options: ["Charles Babbage", "Alan Turing", "Bill Gates", "Steve Jobs"], correct: "Charles Babbage" },
            { question: "What is the main function of the CPU in a computer?", options: ["Data storage", "Execution of instructions", "Display of output", "Input processing"], correct: "Execution of instructions" },
            { question: "Which programming language is known for its simplicity and readability?", options: ["Python", "C", "Java", "Assembly"], correct: "Python" },
            { question: "What does the acronym 'HTML' stand for?", options: ["HyperText Markup Language", "HighTech Machine Language", "Hyper Transfer Multi-Level", "Hypertext Modulation Language"], correct: "HyperText Markup Language" },
            { question: "What is the name of the first computer virus?", options: ["Creeper", "I Love You", "MyDoom", "Blaster"], correct: "Creeper" },
            { question: "Who founded Microsoft?", options: ["Bill Gates", "Steve Jobs", "Mark Zuckerberg", "Larry Page"], correct: "Bill Gates" },
            { question: "What is the primary function of an operating system?", options: ["Control hardware and software", "Display data on screen", "Perform calculations", "Provide networking"], correct: "Control hardware and software" },
            { question: "Which company developed the first iPhone?", options: ["Apple", "Samsung", "Nokia", "LG"], correct: "Apple" },
            { question: "What does 'Wi-Fi' stand for?", options: ["Wireless Fidelity", "Wide Frequency", "Wireless Internet", "Wide Fidelity"], correct: "Wireless Fidelity" },
            { question: "What year was the first personal computer released?", options: ["1977", "1984", "1990", "1995"], correct: "1977" }
        ],
        summary: "This quiz covers basic concepts of technology, from computer history to modern-day innovations."
    },

    "Sports": {
        questions: [
            { question: "Which country won the FIFA World Cup in 2018?", options: ["France", "Germany", "Brazil", "Argentina"], correct: "France" },
            { question: "Who holds the record for the most goals in World Cup history?", options: ["Marta", "Pele", "Cristiano Ronaldo", "Miroslav Klose"], correct: "Miroslav Klose" },
            { question: "In which year did Michael Jordan retire for the first time?", options: ["1993", "1996", "1999", "2000"], correct: "1993" },
            { question: "Which tennis player has won the most Grand Slam titles?", options: ["Roger Federer", "Rafael Nadal", "Serena Williams", "Novak Djokovic"], correct: "Serena Williams" },
            { question: "What is the maximum break in snooker?", options: ["147", "155", "156", "140"], correct: "147" },
            { question: "Which country is known for hosting the first Olympic Games?", options: ["Greece", "France", "USA", "China"], correct: "Greece" },
            { question: "What is the name of the soccer tournament held every four years in Europe?", options: ["UEFA Champions League", "Copa América", "UEFA European Championship", "FIFA World Cup"], correct: "UEFA European Championship" },
            { question: "Who holds the record for the fastest 100m sprint?", options: ["Usain Bolt", "Tyson Gay", "Carl Lewis", "Michael Johnson"], correct: "Usain Bolt" },
            { question: "Which team won the NBA championship in 2020?", options: ["Los Angeles Lakers", "Miami Heat", "Golden State Warriors", "Toronto Raptors"], correct: "Los Angeles Lakers" },
            { question: "In which year were the first modern Olympic Games held?", options: ["1896", "1900", "1924", "1936"], correct: "1896" }
        ],
        summary: "This quiz covers various sports trivia and famous athletes across different disciplines."
    },

    "Music": {
        questions: [
            { question: "Who is known as the King of Pop?", options: ["Michael Jackson", "Elvis Presley", "Prince", "Freddie Mercury"], correct: "Michael Jackson" },
            { question: "What was the name of The Beatles' first album?", options: ["Please Please Me", "Revolver", "Rubber Soul", "Sgt. Pepper's Lonely Hearts Club Band"], correct: "Please Please Me" },
            { question: "Which music genre is most closely associated with Bob Marley?", options: ["Reggae", "Rock", "Jazz", "Blues"], correct: "Reggae" },
            { question: "What year did the first Woodstock festival take place?", options: ["1969", "1970", "1968", "1972"], correct: "1969" },
            { question: "Which singer is known for the hit song 'Rolling in the Deep'?", options: ["Adele", "Beyoncé", "Taylor Swift", "Lady Gaga"], correct: "Adele" },
            { question: "Who composed the famous 'Symphony No. 5'?", options: ["Ludwig van Beethoven", "Johann Sebastian Bach", "Wolfgang Amadeus Mozart", "Frédéric Chopin"], correct: "Ludwig van Beethoven" },
            { question: "What is the stage name of Marshall Bruce Mathers?", options: ["Eminem", "Jay-Z", "Kanye West", "Drake"], correct: "Eminem" },
            { question: "Which band performed the song 'Bohemian Rhapsody'?", options: ["Queen", "The Rolling Stones", "The Beatles", "Pink Floyd"], correct: "Queen" },
            { question: "Who is the 'Material Girl' in the music world?", options: ["Madonna", "Cyndi Lauper", "Cher", "Kylie Minogue"], correct: "Madonna" },
            { question: "Which song did Whitney Houston famously cover in 1992?", options: ["I Will Always Love You", "Like a Prayer", "Endless Love", "My Heart Will Go On"], correct: "I Will Always Love You" }
        ],
        summary: "This quiz covers major artists, songs, and events in the music world."
    },

    "Movies": {
        questions: [
            { question: "Which film won the Academy Award for Best Picture in 1994?", options: ["Forrest Gump", "Titanic", "The Shawshank Redemption", "Pulp Fiction"], correct: "Forrest Gump" },
            { question: "Who played the character of Jack Dawson in 'Titanic'?", options: ["Leonardo DiCaprio", "Brad Pitt", "Johnny Depp", "Matt Damon"], correct: "Leonardo DiCaprio" },
            { question: "Which movie features the song 'My Heart Will Go On'?", options: ["Titanic", "The Bodyguard", "Dirty Dancing", "Armageddon"], correct: "Titanic" },
            { question: "Who directed the movie 'Jurassic Park'?", options: ["Steven Spielberg", "James Cameron", "George Lucas", "Ridley Scott"], correct: "Steven Spielberg" },
            { question: "What is the name of the fictional African country in 'Black Panther'?", options: ["Wakanda", "Zamunda", "Genovia", "Elbonia"], correct: "Wakanda" },
            { question: "Which movie franchise features the character 'Darth Vader'?", options: ["Star Wars", "Star Trek", "The Matrix", "Harry Potter"], correct: "Star Wars" },
            { question: "Which actor played Iron Man in the Marvel Cinematic Universe?", options: ["Robert Downey Jr.", "Chris Hemsworth", "Mark Ruffalo", "Chris Evans"], correct: "Robert Downey Jr." },
            { question: "Who starred as the lead character in 'The Matrix'?", options: ["Keanu Reeves", "Harrison Ford", "Will Smith", "Tom Cruise"], correct: "Keanu Reeves" },
            { question: "Which movie won the Academy Award for Best Picture in 2008?", options: ["Slumdog Millionaire", "The Dark Knight", "The Hurt Locker", "Avatar"], correct: "Slumdog Millionaire" },
            { question: "Which animated movie features a character named Simba?", options: ["The Lion King", "Aladdin", "Finding Nemo", "Shrek"], correct: "The Lion King" }
        ],
        summary: "This quiz tests your knowledge of movies, actors, and iconic film moments."
    },

    "Animal": {
        questions: [
            { question: "Which animal is known as the King of the Jungle?", options: ["Lion", "Elephant", "Tiger", "Giraffe"], correct: "Lion" },
            { question: "What is the fastest land animal?", options: ["Cheetah", "Lion", "Tiger", "Horse"], correct: "Cheetah" },
            { question: "Which animal is known for its ability to change color?", options: ["Chameleon", "Octopus", "Squid", "Cuttlefish"], correct: "Chameleon" },
            { question: "Which bird is known for its bright, colorful feathers?", options: ["Peacock", "Eagle", "Penguin", "Parrot"], correct: "Peacock" },
            { question: "What is the largest mammal on Earth?", options: ["Blue Whale", "Elephant", "Giraffe", "Rhino"], correct: "Blue Whale" },
            { question: "What type of animal is a Komodo Dragon?", options: ["Lizard", "Snake", "Crocodile", "Turtle"], correct: "Lizard" },
            { question: "Which animal is known for producing milk?", options: ["Cow", "Dog", "Cat", "Elephant"], correct: "Cow" },
            { question: "Which animal is famous for building dams?", options: ["Beaver", "Otter", "Rabbit", "Bat"], correct: "Beaver" },
            { question: "Which mammal can fly?", options: ["Bat", "Bird", "Flying Squirrel", "Fruit Fly"], correct: "Bat" },
            { question: "What animal is the symbol of the World Wide Fund for Nature (WWF)?", options: ["Giant Panda", "Elephant", "Lion", "Tiger"], correct: "Giant Panda" }
        ],
        summary: "This quiz covers fascinating facts about animals, their behavior, and habitats."
    },

    "Food": {
        questions: [
            { question: "Which fruit is known for having its seeds on the outside?", options: ["Strawberry", "Banana", "Apple", "Orange"], correct: "Strawberry" },
            { question: "What is the main ingredient in guacamole?", options: ["Avocado", "Tomato", "Onion", "Chili"], correct: "Avocado" },
            { question: "What type of food is sushi?", options: ["Japanese", "Chinese", "Mexican", "Italian"], correct: "Japanese" },
            { question: "Which vegetable is known to make your breath smell bad?", options: ["Garlic", "Onion", "Spinach", "Carrot"], correct: "Garlic" },
            { question: "What is the primary ingredient in hummus?", options: ["Chickpeas", "Lentils", "Olives", "Potatoes"], correct: "Chickpeas" },
            { question: "Which fruit is typically associated with keeping doctors away?", options: ["Apple", "Banana", "Orange", "Grapes"], correct: "Apple" },
            { question: "What type of meat is used in a traditional 'hamburger'?", options: ["Beef", "Chicken", "Pork", "Lamb"], correct: "Beef" },
            { question: "Which fruit is known as the 'king of fruits'?", options: ["Durian", "Mango", "Pineapple", "Banana"], correct: "Durian" },
            { question: "What is the name of the Italian dish made with thinly sliced raw beef?", options: ["Carpaccio", "Risotto", "Lasagna", "Frittata"], correct: "Carpaccio" },
            { question: "Which beverage is made from fermented grapes?", options: ["Wine", "Beer", "Whiskey", "Rum"], correct: "Wine" }
        ],
        summary: "This quiz tests your knowledge of food, cooking, and culinary traditions."
    },
    "Cooking": {
        questions: [
            { question: "What is the main ingredient in guacamole?", options: ["Avocado", "Tomato", "Onion", "Chili"], correct: "Avocado" },
            { question: "What is the term for a raw egg dish served with soldiers?", options: ["Soft boiled eggs", "Poached eggs", "Scrambled eggs", "Deviled eggs"], correct: "Soft boiled eggs" },
            { question: "Which cooking technique involves cooking food with steam?", options: ["Steaming", "Boiling", "Grilling", "Frying"], correct: "Steaming" },
            { question: "Which of the following is not a type of pasta?", options: ["Tortilla", "Spaghetti", "Fettuccine", "Penne"], correct: "Tortilla" },
            { question: "What is the term for cooking meat in its own fat?", options: ["Confiting", "Braising", "Frying", "Grilling"], correct: "Confiting" },
            { question: "Which country is famous for the dish 'sushi'?", options: ["Japan", "China", "Mexico", "Italy"], correct: "Japan" },
            { question: "What is the main ingredient in hummus?", options: ["Chickpeas", "Lentils", "Olives", "Potatoes"], correct: "Chickpeas" },
            { question: "Which of these is a type of French pastry?", options: ["Croissant", "Tiramisu", "Baklava", "Gelato"], correct: "Croissant" },
            { question: "What is the name of the Italian dish made with thinly sliced raw beef?", options: ["Carpaccio", "Risotto", "Frittata", "Bolognese"], correct: "Carpaccio" },
            { question: "Which fruit is the main ingredient in a traditional 'banoffee pie'?", options: ["Banana", "Apple", "Peach", "Strawberry"], correct: "Banana" }
        ],
        summary: "This quiz tests your knowledge of cooking techniques, ingredients, and famous dishes."
    },
    "Music": {
        questions: [
            { question: "Who is known as the King of Pop?", options: ["Michael Jackson", "Elvis Presley", "Prince", "Freddie Mercury"], correct: "Michael Jackson" },
            { question: "Which band is known for the album 'Abbey Road'?", options: ["The Beatles", "The Rolling Stones", "Pink Floyd", "Led Zeppelin"], correct: "The Beatles" },
            { question: "Who is the composer of the famous 'Symphony No. 9'?", options: ["Ludwig van Beethoven", "Johann Sebastian Bach", "Wolfgang Amadeus Mozart", "Frédéric Chopin"], correct: "Ludwig van Beethoven" },
            { question: "Which artist sang 'Shape of You'?", options: ["Ed Sheeran", "Justin Bieber", "Taylor Swift", "Ariana Grande"], correct: "Ed Sheeran" },
            { question: "What is the name of the music festival held annually in Coachella Valley?", options: ["Coachella", "Lollapalooza", "Glastonbury", "Rock in Rio"], correct: "Coachella" },
            { question: "Which musical instrument has keys, pedals, and strings?", options: ["Piano", "Violin", "Trumpet", "Flute"], correct: "Piano" },
            { question: "Which singer is known for the album 'Lemonade'?", options: ["Beyoncé", "Rihanna", "Lady Gaga", "Adele"], correct: "Beyoncé" },
            { question: "Who is the lead vocalist of Queen?", options: ["Freddie Mercury", "David Bowie", "Mick Jagger", "Elton John"], correct: "Freddie Mercury" },
            { question: "Which music genre is Taylor Swift primarily known for?", options: ["Pop", "Country", "Rock", "Hip-Hop"], correct: "Pop" },
            { question: "What is the term for a repeated section of music?", options: ["Refrain", "Bridge", "Verse", "Chorus"], correct: "Chorus" }
        ],
        summary: "This quiz tests your knowledge of music, artists, and famous songs."
    },

    "Technology": {
        questions: [
            { question: "Who is known as the father of the computer?", options: ["Charles Babbage", "Alan Turing", "Bill Gates", "Steve Jobs"], correct: "Charles Babbage" },
            { question: "What does 'HTTP' stand for?", options: ["HyperText Transfer Protocol", "HyperText Transport Protocol", "High Technology Transfer Protocol", "High Text Transfer Protocol"], correct: "HyperText Transfer Protocol" },
            { question: "What is the main function of a CPU?", options: ["Processing data", "Storing data", "Sending data", "Displaying data"], correct: "Processing data" },
            { question: "What year was the first iPhone released?", options: ["2007", "2008", "2005", "2010"], correct: "2007" },
            { question: "Which programming language is primarily used for web development?", options: ["JavaScript", "Python", "Java", "C++"], correct: "JavaScript" },
            { question: "What is the full form of 'Wi-Fi'?", options: ["Wireless Fidelity", "Wide Fidelity", "Wireless Frequency", "Wide Frequency"], correct: "Wireless Fidelity" },
            { question: "Which company developed the Android operating system?", options: ["Google", "Microsoft", "Apple", "Samsung"], correct: "Google" },
            { question: "What does the term 'cloud computing' refer to?", options: ["Storing data on remote servers", "Playing video games online", "Sending messages through the internet", "Streaming music"], correct: "Storing data on remote servers" },
            { question: "Which company owns Instagram?", options: ["Facebook", "Google", "Twitter", "Snapchat"], correct: "Facebook" },
            { question: "Which of these is a popular open-source database?", options: ["MySQL", "Oracle", "SQL Server", "PostgreSQL"], correct: "MySQL" }
        ],
        summary: "This quiz covers general technology concepts, companies, and innovations."
    },

    "Sports": {
        questions: [
            { question: "Which country won the FIFA World Cup in 2018?", options: ["France", "Brazil", "Germany", "Argentina"], correct: "France" },
            { question: "Which athlete holds the record for the most Olympic gold medals?", options: ["Michael Phelps", "Usain Bolt", "Carl Lewis", "Larisa Latynina"], correct: "Michael Phelps" },
            { question: "What sport is played at Wimbledon?", options: ["Tennis", "Cricket", "Soccer", "Golf"], correct: "Tennis" },
            { question: "Which country hosted the 2020 Summer Olympics?", options: ["Japan", "China", "USA", "Russia"], correct: "Japan" },
            { question: "What is the highest score in a game of bowling?", options: ["300", "250", "200", "350"], correct: "300" },
            { question: "Which team won the NBA Championship in 2020?", options: ["Los Angeles Lakers", "Miami Heat", "Golden State Warriors", "Toronto Raptors"], correct: "Los Angeles Lakers" },
            { question: "Who is known as 'The Greatest of All Time' in boxing?", options: ["Muhammad Ali", "Mike Tyson", "Floyd Mayweather", "George Foreman"], correct: "Muhammad Ali" },
            { question: "Which country is known for the sport of cricket?", options: ["India", "USA", "Spain", "Brazil"], correct: "India" },
            { question: "Which team won the Super Bowl in 2021?", options: ["Tampa Bay Buccaneers", "Kansas City Chiefs", "San Francisco 49ers", "New England Patriots"], correct: "Tampa Bay Buccaneers" },
            { question: "Who holds the record for the most goals in a single World Cup tournament?", options: ["Marta", "Ronaldo", "Miroslav Klose", "Just Fontaine"], correct: "Just Fontaine" }
        ],
        summary: "This quiz tests your knowledge of sports, athletes, and major sporting events."
    },

    "Animal": {
        questions: [
            { question: "What is the largest mammal in the world?", options: ["Blue whale", "Elephant", "Giraffe", "Shark"], correct: "Blue whale" },
            { question: "What type of animal is a Komodo dragon?", options: ["Lizard", "Snake", "Bird", "Mammal"], correct: "Lizard" },
            { question: "Which bird is known for its bright red chest?", options: ["Robin", "Eagle", "Sparrow", "Pigeon"], correct: "Robin" },
            { question: "Which of these animals is a marsupial?", options: ["Kangaroo", "Lion", "Elephant", "Wolf"], correct: "Kangaroo" },
            { question: "What is the fastest land animal?", options: ["Cheetah", "Lion", "Horse", "Elephant"], correct: "Cheetah" },
            { question: "What is the primary diet of a panda?", options: ["Bamboo", "Meat", "Fish", "Insects"], correct: "Bamboo" },
            { question: "Which animal is known for having a long neck?", options: ["Giraffe", "Elephant", "Kangaroo", "Lion"], correct: "Giraffe" },
            { question: "Which animal is the largest land predator?", options: ["Polar bear", "Grizzly bear", "Lion", "Tiger"], correct: "Polar bear" },
            { question: "What is a group of lions called?", options: ["Pride", "Herd", "Pack", "Swarm"], correct: "Pride" },
            { question: "Which sea creature is known for its ability to change colors?", options: ["Octopus", "Shark", "Whale", "Dolphin"], correct: "Octopus" }
        ],
        summary: "This quiz tests your knowledge of the animal kingdom, including different species and their characteristics."
    },

    "Economics": {
        questions: [
            { question: "What is the term for the total value of goods and services produced in a country?", options: ["Gross Domestic Product (GDP)", "Inflation", "Unemployment rate", "Interest rate"], correct: "Gross Domestic Product (GDP)" },
            { question: "What does 'inflation' refer to?", options: ["Increase in prices", "Increase in wages", "Decrease in unemployment", "Decrease in stock market"], correct: "Increase in prices" },
            { question: "Which organization sets interest rates for the U.S. economy?", options: ["Federal Reserve", "World Bank", "European Union", "United Nations"], correct: "Federal Reserve" },
            { question: "What is the basic economic problem?", options: ["Scarcity", "Equality", "Affluence", "Unemployment"], correct: "Scarcity" },
            { question: "What is the term for a market structure with a single seller?", options: ["Monopoly", "Oligopoly", "Perfect competition", "Monopolistic competition"], correct: "Monopoly" },
            { question: "What does GDP stand for?", options: ["Gross Domestic Product", "General Domestic Profit", "Gross Demand Price", "General Distribution Payment"], correct: "Gross Domestic Product" },
            { question: "Which of these is an example of a capital resource?", options: ["Machinery", "Labor", "Land", "Natural resources"], correct: "Machinery" },
            { question: "Which country has the largest economy in the world?", options: ["USA", "China", "India", "Germany"], correct: "USA" },
            { question: "What is a common measure of unemployment?", options: ["Unemployment rate", "GDP", "Inflation rate", "Interest rate"], correct: "Unemployment rate" },
            { question: "What is a stock market index?", options: ["S&P 500", "Interest rate", "Inflation rate", "GDP"], correct: "S&P 500" }
        ],
        summary: "This quiz tests your understanding of economics, economic systems, and key concepts."
    },

    "Philosophy": {
        questions: [
            { question: "Who wrote 'The Republic'?", options: ["Plato", "Aristotle", "Socrates", "Confucius"], correct: "Plato" },
            { question: "What does 'Existentialism' focus on?", options: ["Human freedom and choice", "Logic and reasoning", "Natural laws", "Moral absolutes"], correct: "Human freedom and choice" },
            { question: "Which philosopher is known for the quote 'I think, therefore I am'?", options: ["René Descartes", "John Locke", "Immanuel Kant", "Friedrich Nietzsche"], correct: "René Descartes" },
            { question: "What is the name of Aristotle's philosophy school?", options: ["Lyceum", "Academy", "Stoa", "Garden"], correct: "Lyceum" },
            { question: "Who is known for the concept of 'The Social Contract'?", options: ["Jean-Jacques Rousseau", "Karl Marx", "Thomas Hobbes", "John Locke"], correct: "Jean-Jacques Rousseau" },
            { question: "What is 'Nihilism'?", options: ["Belief in no inherent meaning in life", "Belief in moral absolute truths", "Belief in the importance of reason", "Belief in the equality of all people"], correct: "Belief in no inherent meaning in life" },
            { question: "What is the primary focus of 'Ethics'?", options: ["Moral principles", "Political systems", "Scientific methods", "Artistic expression"], correct: "Moral principles" },
            { question: "Who is known for developing the theory of utilitarianism?", options: ["John Stuart Mill", "Aristotle", "Immanuel Kant", "Socrates"], correct: "John Stuart Mill" },
            { question: "Which philosopher is associated with the idea of the 'Will to Power'?", options: ["Friedrich Nietzsche", "Søren Kierkegaard", "Jean-Paul Sartre", "Immanuel Kant"], correct: "Friedrich Nietzsche" },
            { question: "What is the 'Allegory of the Cave' meant to illustrate?", options: ["The nature of human perception", "The power of government", "The search for happiness", "The importance of reason"], correct: "The nature of human perception" }
        ],
        summary: "This quiz tests your knowledge of philosophical concepts, philosophers, and important works in the field."
    },
    "General": {
        questions: [
            { question: "Who became the new president of the United States in 2024?", options: ["Joe Biden", "Kamala Harris", "Donald Trump", "Ron DeSantis"], correct: "Joe Biden" },
            { question: "Which country hosted the 2022 FIFA World Cup?", options: ["Qatar", "Russia", "Brazil", "Germany"], correct: "Qatar" },
            { question: "Which company became the first to reach a $3 trillion market capitalization in 2022?", options: ["Apple", "Microsoft", "Amazon", "Tesla"], correct: "Apple" },
            { question: "In 2023, which country became the first to legalize the use of cannabis for recreational use nationwide?", options: ["Mexico", "Canada", "Netherlands", "Thailand"], correct: "Mexico" },
            { question: "Who won the Nobel Peace Prize in 2023?", options: ["Volodymyr Zelensky", "Abiy Ahmed Ali", "Maria Ressa", "Ales Bialiatski"], correct: "Volodymyr Zelensky" },
            { question: "In which year did the European Union announce its Green Deal aiming for carbon neutrality by 2050?", options: ["2021", "2020", "2019", "2022"], correct: "2020" },
            { question: "Which country hosted the 2023 G20 Summit?", options: ["India", "United States", "Japan", "Italy"], correct: "India" },
            { question: "Which tech giant announced plans to build a quantum computer by 2025?", options: ["Google", "IBM", "Microsoft", "Apple"], correct: "IBM" },
            { question: "What major health crisis did the World Health Organization declare as a global emergency in 2023?", options: ["Monkeypox", "COVID-19", "Ebola", "HIV/AIDS"], correct: "Monkeypox" },
            { question: "In 2024, which country officially joined the European Union?", options: ["Albania", "North Macedonia", "Serbia", "Turkey"], correct: "Albania" }
        ],
        summary: "This quiz focuses on recent global events, political developments, and significant advancements in technology, health, and business."
    }
};

// Dynamically Add Quiz Options
Object.keys(quizzes).forEach(topic => {
    const li = document.createElement('li');
    const button = document.createElement('button');
    button.textContent = topic;
    button.addEventListener('click', () => selectQuiz(topic));
    li.appendChild(button);
    quizOptionsEl.appendChild(li);
});

function selectQuiz(topic) {
    selectedQuiz = quizzes[topic];
    startScreen.classList.add('hidden');
    quizArea.classList.remove('hidden');
    startQuiz();
}

function startQuiz() {
    score = 0;
    currentQuestionIndex = 0;
    loadQuestion();
}

function loadQuestion() {
    const currentQuestion = selectedQuiz.questions[currentQuestionIndex];
    questionEl.textContent = currentQuestion.question;
    optionsEl.innerHTML = '';

    currentQuestion.options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('option-btn');
        button.addEventListener('click', selectAnswer);
        optionsEl.appendChild(button);
    });

    nextBtn.classList.add('hidden');
}

function selectAnswer(e) {
    const selectedOption = e.target.textContent;
    const correctAnswer = selectedQuiz.questions[currentQuestionIndex].correct;

    if (selectedOption === correctAnswer) {
        score++;
        e.target.style.backgroundColor = "#98FB98"; // Green
    } else {
        e.target.style.backgroundColor = "#FF7F7F"; // Red
    }

    Array.from(optionsEl.children).forEach(btn => {
        btn.disabled = true;
        if (btn.textContent === correctAnswer) {
            btn.style.backgroundColor = "#98FB98"; // Highlight correct
        }
    });

    nextBtn.classList.remove('hidden');
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < selectedQuiz.questions.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    quizArea.classList.add('hidden');
    resultScreen.classList.remove('hidden');
    scoreEl.textContent = `${score} / ${selectedQuiz.questions.length}`;
    quizSummaryEl.textContent = selectedQuiz.summary;
}

function restartQuiz() {
    resultScreen.classList.add('hidden');
    quizArea.classList.remove('hidden');
    startQuiz();
}

function exploreMoreQuizzes() {
    resultScreen.classList.add('hidden');
    startScreen.classList.remove('hidden');
}

// Event Listeners
nextBtn.addEventListener('click', nextQuestion);
restartBtn.addEventListener('click', restartQuiz);
exploreMoreBtn.addEventListener('click', exploreMoreQuizzes);
