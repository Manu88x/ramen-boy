// Function to render a single ramen item
function renderOneramen(ramen) {
  const ramenMenu = document.getElementById('ramen-menu'); // i got the id in the index.html doc

  const ramenItem = document.createElement('div');// i created the div element within ramen menu
  ramenItem.classList.add('ramen-item'); // i added a class list for this div

  const ramenImage = document.createElement('img');
  ramenImage.src = ramen.image; // this  sets the url for the image
  ramenImage.alt = ramen.name; // this one kinda sets the name
  ramenItem.appendChild(ramenImage);// this one adds the info onto ramen item.....yeah


  const ramenName = document.createElement('h4'); //hii ina create h4 element
  ramenName.textContent = ramen.name; //this one kinda says that RamenName is equal to the ramenname i wrote while setting the image
  ramenItem.appendChild(ramenName); //just pushes the info into ramen item

  // Attach click event to each ramen item
  ramenItem.addEventListener('click', () => handleClick(ramen)); //adds the click event

  ramenMenu.appendChild(ramenItem); 
}

// Function to handle click on ramen item
const handleClick = (ramen) => {
  const detailImage = document.querySelector('.detail-image');
  const nameDisplay = document.querySelector('.name');
  const restaurantDisplay = document.querySelector('.restaurant');
  const ratingDisplay = document.getElementById('rating-display');
  const commentDisplay = document.getElementById('comment-display');


  detailImage.src = ramen.image;
  nameDisplay.textContent = ramen.name;
  restaurantDisplay.textContent = ramen.restaurant;
  ratingDisplay.textContent = ramen.rating;
  commentDisplay.textContent = ramen.comment;

  

};

// Function to add submit listener to the form
const addSubmitListener = () => {
  const form = document.getElementById('new-ramen');

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const newRamen = {
      name: event.target.name.value,
      restaurant: event.target.restaurant.value,
      image: event.target.image.value,
      rating: parseInt(event.target.rating.value),
      comment: event.target['new-comment'].value,
    };

    // Render the new ramen item without persisting it
    renderOneramen(newRamen);

    // Reset the form
    form.reset();
  });
};

// so like info is submitted then transfered to ramen-menu then when the image is clicked the handclick kinda gets the submitted info and replaces the original ones in ramen-details

// Function to fetch and display all ramen
const displayRamens = () => {
  fetch("http://localhost:3000/ramens")
    .then(res => res.json())
    .then(ramens => ramens.forEach(ramen => renderOneramen(ramen)));
};

// Main function to start the program
const main = () => {
  displayRamens();
  addSubmitListener();
};

// Ensure the DOM is fully loaded before running the main function
document.addEventListener('DOMContentLoaded', main);




// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};
