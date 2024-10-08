const toggleButton = document.querySelector('.toggle-button');
const navbarLinks = document.querySelector('.nav-menu');
const title = document.querySelector('.nav_title');
const closeButton = document.querySelector('.close-button');

toggleButton.addEventListener('click', () => {
  navbarLinks.classList.toggle('active');
  title.classList.toggle('active');
  toggleButton.classList.add('hide');
  closeButton.classList.add('show');
});

closeButton.addEventListener('click', () => {
  navbarLinks.classList.remove('active');
  title.classList.remove('active');
  toggleButton.classList.remove('hide');
  closeButton.classList.remove('show');
});

document.querySelectorAll('.nav-item').forEach((n) => n.addEventListener('click', () => {
  toggleButton.classList.remove('hide');
  closeButton.classList.remove('show');
  navbarLinks.classList.remove('active');
  title.classList.remove('active');
}));

// Dynamic projects section

const projects = [
  {
    title: 'Tic Tac Toe Game',
    image: 'images/tic_tac_toe.png',
    description: 'A classic game of Tic Tac Toe, with a simple design and easy to play. Built with React.',
    liveLink: 'https://frolicking-tapioca-dc0394.netlify.app/',
    sourceLink: 'https://github.com/EddxSotz/tic-tac-toe-game',
  },
  {
    title: 'Awesome Books',
    image: 'images/Project_1.png',
    description: 'A site mainly focussed on funcionality that stores data on local storage, fully functional.',
    liveLink: 'https://gilded-stroopwafel-3e21e8.netlify.app/',
    sourceLink: 'https://github.com/EddxSotz/Awesome_Books',
  },
  {
    title: 'To-do list',
    image: 'images/Project_2.png',
    description: 'To-do list" is a tool that helps to organize your day. It simply lists the things that you need to do and allows you to mark them as complete.',
    liveLink: 'https://main--roaring-trifle-02bd57.netlify.app/',
    sourceLink: 'https://github.com/EddxSotz/To-Do-list',
  },
  {
    title: 'Music Festival',
    image: 'images/Project_3.png',
    description: 'A simple, responsive, solid and fast website for a Music Festival event, part of the Microverse Curriculum. Built with no Linter errors, correct GitHub Flow and properly documented.',
    liveLink: 'https://relaxed-gecko-38d404.netlify.app/',
    sourceLink: 'https://github.com/EddxSotz/Capstone-Project-1',
  },
];

const projectsContainer = document.getElementById('projects-container');
const modal = document.getElementById('projectModal');
const closeModalBtn = document.getElementById('closeModal');
const modalTitle = document.getElementById('modalTitle');
const modalImage = document.getElementById('modalImage');
const modalDescription = document.getElementById('modalDescription');
const seeLiveBtn = document.getElementById('seeLiveBtn');
const seeSourceBtn = document.getElementById('seeSourceBtn');

// Function to show modal with project details
function modalEvent(project) {
  modalTitle.textContent = project.title;
  modalImage.src = project.image;
  modalDescription.textContent = project.description;
  seeLiveBtn.href = project.liveLink;
  seeLiveBtn.target = '_blank';
  seeSourceBtn.href = project.sourceLink;
  seeSourceBtn.target = '_blank';
  modal.showModal();
}

// Function to create project cards dynamically
function createProjectCard(project) {
  const card = document.createElement('div');
  card.classList.add('project-card');

  const image = document.createElement('img');
  image.classList.add('project_img');
  image.src = project.image;
  image.alt = project.title;

  const title = document.createElement('h4');
  title.textContent = project.title;

  const seeDetailsBtn = document.createElement('button');
  seeDetailsBtn.textContent = 'See Details';
  seeDetailsBtn.classList.add('project-button');
  seeDetailsBtn.addEventListener('click', () => {
    modalEvent(project);
  });

  card.appendChild(title);
  card.appendChild(image);
  card.appendChild(seeDetailsBtn);

  projectsContainer.appendChild(card);
}

// Event listener to close the modal
closeModalBtn.addEventListener('click', () => {
  modal.close();
});

// Create project cards for each project in the array
projects.forEach(createProjectCard);

// form validations
const user = document.getElementById('name');
const email = document.getElementById('email');
const textarea = document.getElementById('text_box');
const form = document.getElementById('contact_form');
const reset = document.getElementById('reset');

const containsUpper = /[A-Z]/g;
let emailValue = '';

email.addEventListener('input', () => {
  emailValue = email.value;
  if (email.validity.typeMismatch) {
    email.setCustomValidity('Invalid email address');
  } else {
    email.setCustomValidity('');
  }
});

function emailUpperChecker() {
  const foundUpper = emailValue.match(containsUpper);
  if (!foundUpper) {
    return false;
  }
  return true;
}

form.addEventListener('input', () => {
  const formData = {
    name: user.value,
    email: email.value,
    message: textarea.value,
  };
  if (formData) {
    localStorage.setItem('contactForm', JSON.stringify(formData));
  }
});

const storedData = localStorage.getItem('contactForm');

if (storedData) {
  const tempData = JSON.parse(storedData);
  user.value = tempData.name;
  email.value = tempData.email;
  textarea.value = tempData.message;
}
reset.addEventListener('click', () => {
  localStorage.removeItem('contactForm');
});

form.addEventListener('submit', (event) => {
  if (emailUpperChecker() === true) {
    event.preventDefault();
    email.setCustomValidity('Needs to be lowercase');
  }
  if (!email.validity.valid) {
    event.preventDefault();
  }
});
