// Function to render a single ramen item
function renderOneramen(ramen) {
  const ramenMenu = document.getElementById('ramen-menu');

  const ramenItem = document.createElement('div');
  ramenItem.classList.add('ramen-item');

  const ramenImage = document.createElement('img');
  ramenImage.src = ramen.image;
  ramenImage.alt = ramen.name;
  ramenItem.appendChild(ramenImage);

  const ramenName = document.createElement('h4');
  ramenName.textContent = ramen.name;
  ramenItem.appendChild(ramenName);

  // Attach click event to each ramen item
  ramenItem.addEventListener('click', () => handleClick(ramen));

  // Create delete button
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', (event) => {
      event.stopPropagation();
      ramenMenu.removeChild(ramenItem);
  });

  ramenItem.appendChild(deleteButton);
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

  // Pre-fill the edit form
  document.getElementById('edit-rating').value = ramen.rating;
  document.getElementById('edit-comment').value = ramen.comment;
};

// Function to add submit listener to the new ramen form
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

      renderOneramen(newRamen);
      form.reset();
  });
};

// Function to add submit listener to the edit form
const addEditListener = () => {
  const editForm = document.getElementById('edit-ramen');

  editForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const updatedRating = event.target.rating.value;
      const updatedComment = event.target['new-comment'].value;

      const currentRamen = getCurrentRamen();
      if (currentRamen) {
          currentRamen.rating = updatedRating;
          currentRamen.comment = updatedComment;

          const ratingDisplay = document.getElementById('rating-display');
          const commentDisplay = document.getElementById('comment-display');
          ratingDisplay.textContent = updatedRating;
          commentDisplay.textContent = updatedComment;
      }
  });
};

// Function to fetch and display all ramen
const displayRamens = () => {
  fetch("http://localhost:3000/ramens")
      .then(res => res.json())
      .then(ramens => {
          ramens.forEach(ramen => renderOneramen(ramen));
          if (ramens.length > 0) {
              handleClick(ramens[0]); // Show details for the first ramen
          }
      });
};

// Main function to start the program
const main = () => {
  displayRamens();
  addSubmitListener();
  addEditListener();
};

// Ensure the DOM is fully loaded before running the main function
document.addEventListener('DOMContentLoaded', main);

// Helper function to get the current displayed ramen (for updating)
const getCurrentRamen = () => {
  const nameDisplay = document.querySelector('.name').textContent;
  const restaurantDisplay = document.querySelector('.restaurant').textContent;
  
  // Ideally, you'd have a better way to track the current ramen object
  const ramenItems = Array.from(document.querySelectorAll('.ramen-item'));
  return ramenItems.find(ramenItem => ramenItem.querySelector('h4').textContent === nameDisplay);
};





// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};
