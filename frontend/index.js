//const axios = require("axios");
//import axios from "axios";
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

    const formattedData = []
    const info = document.querySelector('.info');
    info.textContent = 'No learner is selected';

    learners.forEach(learner => {
      const result = {
        ...learner,
        mentors: learners.mentors.map(mID => {
          const mentor = mentors.find (mentorObj => mentorObj.id == mID)
          return mentor.firstName + " " + mentor.lastName
        })
      }
      formattedData.push(result)
    })

    formattedData.forEach(learner => {
      const card = document.createElement('div');
      card.classList.add('card');
      const name = document.createElement('h3')
      const email = document.createElement('div')
      const mentors = document.createElement('h4')
      const mentorsHTML = document.createElement('ul')


      card.appendChild(name);
      card.appendChild(email)
      card.appendChild(mentors);
      card.appendChild(mentorsHTML);

      learner.mentors.forEach(mentorsName => {
        const li = document.createElement('li');
        li.textContent = mentorsName;
        mentorsHTML.appendChild(li);
      })
      
      card.classList.add('card');
      mentors.classList.add('closed');
      name.textContent = learner.fullName;
      email.textContent = learner.email;
      mentors.textContent = 'Mentors';

      document.querySelector('.card').appendChild(card)
      card.addEventListener('click', () => {
        
        //const selectedCards = document.querySelectorAll('.card.selected');

        if (!card.classList.contains('selected')) {
          //selectedCards.forEach(selectedCard => selectedCard.classList.remove('selected'));
          document.querySelectorAll('.card').forEach(c => c.classList.remove('selected'))
          card.classList.add('selected');
          info.textContent = `The selected learner is ${learner.fullName} `;
        } else {
          
          info.textContent = 'No learner is selected';
          card.classList.remove('selected');
        }

        
      })

    } 
  )}
  // 👆 WORK WORK ABOVE THIS LINE 👆
    

// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { sprintChallenge5 }
else sprintChallenge5();
