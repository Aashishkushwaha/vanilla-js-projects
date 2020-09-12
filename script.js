const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");
let ticketPrice = +movieSelect.value;

populateUI();

container.addEventListener("click", clickHandler);
movieSelect.addEventListener("change", movieChangeHandler);

// get data from localStorage & populate UI
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("selected-seats"));
  const selecteMovie = localStorage.getItem("selected-movie");
  let selectedMoviePrice = localStorage.getItem("selected-movie-price");

  if (selectedSeats !== null && selectedSeats?.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }
  ticketPrice = selectedMoviePrice || movieSelect.value;
  movieSelect.selectedIndex = selecteMovie;
  count.innerText = selectedSeats?.length || 0;
  total.innerText =
    ticketPrice * selectedSeats?.length ||
    selectedSeats?.length ||
    0 * movieSelect.value;
}

function clickHandler(event) {
  if (
    event.target.classList.contains("seat") &&
    !event.target.classList.contains("occupied")
  ) {
    event.target.classList.toggle("selected");
    updateSelecteCount();
  }
}

// update total price & totalseats count
function updateSelecteCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");

  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

  localStorage.setItem("selected-seats", JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

function movieChangeHandler(event) {
  ticketPrice = +event.target.value;
  setMovieData(event.target.selectedIndex, +event.target.value);
  updateSelecteCount();
}

// save selected movie index & price
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selected-movie", movieIndex);
  localStorage.setItem("selected-movie-price", moviePrice);
}
