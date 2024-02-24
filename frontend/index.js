//const { default: axios } = require("axios");

async function sprintChallenge5() { // Note the async keyword, in case you wish to use `await` inside sprintChallenge5
  // 👇 WORK WORK BELOW THIS LINE 👇
  

  const footer = document.querySelector('footer')
  const currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`

/*
    ❗ Read the README.md first! Below is a strategy you can follow to tackle the challenge

    ❗ If you don't like spoilers, feel free to ignore the strategy and come up with your own

    * Fetch learners using Axios or fetch
        * Fetch mentors using Axios or fetch
            * Create a variable to hold the combined data
            * Combine the learners and the mentors to form an array like so:
                [etc
                  {
                    id: 22,
                    email:"mickey.mouse@example.com",
                    fullName: "Mickey Mouse",
                    mentors: ['James Gosling', 'Mary Shaw'] // ❗ actual names instead of IDs!
                  },
                etc]
* Loop over the array holding the formatted data
                * For each object, make a `div.card` with all its children elements, put it in the DOM
                * Add a click handler to each `div.card`:
                    * If the clicked card does not have a class of 'selected':
                        * Remove that class from any card that has it and add it to the clicked one
                        * Set the correct text in the `div.info`
                    * If the clicked card has a class of 'selected':
                        * Remove the class of 'selected'
                        * Reset the message of the `div.info`

    ❗ Stretch goals (NOT REQUIRED)
        * Make the mentors list expand and collapse like in the mock
        * Make the selected card show the learner ID next to their name
  */

    // Fetch learners using Axios
    const learnersResponse = await axios.get('http://localhost:3003/api/learners');
    const learners = learnersResponse.data;

    // Fetch mentors using Axios
    const mentorsResponse = await axios.get('http://localhost:3003/api/mentors');
    const mentors = mentorsResponse.data;

    // Combined the learners and the mentors to foem an array
    const combinedData = combinedDataFunction(learners, mentors);

    // Loop over the combined data and create div element
    combinedData.forEach(learner => {
      const card = createCardElement(learner);
      document.querySelector('.cards').appendChild(card);
    });
    
    // Fuction to combine learners and mentors data
    function combinedDataFunction(learners, mentors) {
      
      return learners.map(learner => {
        const mentorArray = [];
        learner.mentors.forEach(mentor => {
          mentors.forEach(mnt => {
            if (mentor === mnt.id ) {
              mentorArray.push(mnt.firstName + ' ' + mnt.lastName)
            }
          })
        })
        return {
          id: learner.id,
        email: learner.email,
        fullName: learner.fullName,
        mentors: mentorArray };
      });
    }
    console.log(combinedData)

    // Function to create a div.card element for a learner
    function createCardElement(learner) {
      const card = document.createElement('div');
      card.classList.add('card');

      const mentorsList = learner.mentors.map(mentor => `<li>${mentor}</li>`).join('');
      const mentorsHTML = `<ul>${mentorsList}</ul>`;

      card.innerHTML = `
      <h3>${learner.fullName} (ID: ${learner.id})</h3>
      <p>Email: ${learner.email}</p>
      <h4 class="closed">Mentors</h4>
      ${mentorsHTML}
    `;

      card.addEventListener('click', () => {
        const info = document.querySelector('.info');
        const selectedCards = document.querySelectorAll('.card.selected');

        if (!card.classList.contains('selected')) {
          selectedCards.forEach(selectedCard => selectedCard.classList.remove('selected'));
          card.classList.add('selected');
          info.textContent = `Selected learner: ${learner.fullName} (ID: ${learner.id})`;
        } else {
          card.classList.remove('selected');
          info.textContent = '';
        }

        const mentorsList = card.querySelector('ul');
        const mentorsHeader = card.querySelector('h4');

        if (mentorsList.classList.contains('collapsed')) {
          mentorsList.classList.remove('collapsed');
          mentorsHeader.classList.remove('closed');
          mentorsHeader.classList.add('open');
        } else {
          mentorsList.classList.add('collapsed');
          mentorsHeader.classList.add('closed');
          mentorsHeader.classList.remove('open');
        }
      })

      return card;
    }
  // 👆 WORK WORK ABOVE THIS LINE 👆
}

// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { sprintChallenge5 }
else sprintChallenge5();
