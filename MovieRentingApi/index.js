const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

class Movie {
  constructor(title, genre, availableCopies) {
    this.title = title;
    this.genre = genre;
    this.availableCopies = availableCopies;
    this.rentedCopies = 0;
  }

  rent() {
    if (this.availableCopies > 0) {
      this.availableCopies--;
      this.rentedCopies++;
      console.log(`You have rented "${this.title}". Enjoy your movie!`);
    } else {
      console.log(`Sorry, "${this.title}" is currently not available for rent.`);
    }
  }

  returnMovie() {
    if (this.rentedCopies > 0) {
      this.availableCopies++;
      this.rentedCopies--;
      console.log(`Thanks for returning "${this.title}". We hope you enjoyed it!`);
    } else {
      console.log(`You haven't rented "${this.title}" yet.`);
    }
  }

  displayInfo() {
    console.log(`Title: ${this.title}`);
    console.log(`Genre: ${this.genre}`);
    console.log(`Available Copies: ${this.availableCopies}`);
    console.log(`Rented Copies: ${this.rentedCopies}`);
  }
}

class MovieStore {
  constructor() {
    this.movies = [];
  }

  addMovie(movie) {
    this.movies.push(movie);
    console.log(`"${movie.title}" has been added to the store.`);
  }

  listMovies() {
    console.log("Available Movies:");
    this.movies.forEach((movie) => {
      console.log(`- ${movie.title}`);
    });
  }

  findMovie(title) {
    // Convert both the input title and movie titles to lowercase for case-insensitive comparison
    const lowerCaseTitle = title.toLowerCase();
    return this.movies.find((movie) => movie.title.toLowerCase() === lowerCaseTitle);
  }
}

// Example usage:

const movieStore = new MovieStore();

const movie1 = new Movie("Inception", "Sci-Fi", 5);
const movie2 = new Movie("The Shawshank Redemption", "Drama", 3);
const movie3 = new Movie("The Dark Knight", "Action", 8);

movieStore.addMovie(movie1);
movieStore.addMovie(movie2);
movieStore.addMovie(movie3);

movieStore.listMovies();

// User interaction

console.log("\nWelcome to the Movie Rental App!");

rl.question("Enter the title of the movie you want to rent: ", (userInput) => {
  const selectedMovie = movieStore.findMovie(userInput.trim());

  if (selectedMovie) {
    selectedMovie.rent();
    selectedMovie.displayInfo();
  } else {
    console.log(`"${userInput}" not found in the movie store.`);
  }

  rl.close();
});

// Properly handle the close event
rl.on('close', () => {
  console.log('Thank you for using the Movie Rental App.');
  process.exit(0);
});
