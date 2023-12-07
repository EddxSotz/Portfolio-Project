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

let  projects = [
  {
    title: 'Awesome Books',
    image: 'images/Img_Placeholder-2.png',
    description: 'A site mainly focussed on funcionality that stores data on local storage, fully functional.',
    liveLink: 'https://gilded-stroopwafel-3e21e8.netlify.app/',
    sourceLink: 'https://github.com/EddxSotz/Awesome_Books',
  },
  {
    title: 'To-do list',
    image: 'images/Img_Placeholder-3.png',
    description: 'To-do list" is a tool that helps to organize your day. It simply lists the things that you need to do and allows you to mark them as complete.',
    liveLink: 'https://main--roaring-trifle-02bd57.netlify.app/',
    sourceLink: 'https://github.com/EddxSotz/To-Do-list',
  },
  {
    title: 'Music Festival',
    image: 'images/Img_Placeholder-4.png',
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


// Function to create project cards dynamically
function createProjectCard(project) {
  const card = document.createElement('div');
  card.classList.add('project-card');
  const image = project.image;
  card.style.backgroundImage = `url(${image})`;
  card.style.backgroundRepeat = 'no-repeat';
  card.style.backgroundPosition = 'center';
  card.style.backgroundSize = 'Cover';

  const title = document.createElement('h4');
  title.textContent = project.title;
  
  const seeDetailsBtn = document.createElement('button');
  seeDetailsBtn.textContent = 'See Details';
  seeDetailsBtn.classList.add('project-button')
  seeDetailsBtn.addEventListener('click', function () {
    modalEvent(project);
  });

  card.appendChild(title);
  card.appendChild(seeDetailsBtn);

  projectsContainer.appendChild(card);
}

// Function to show modal with project details
function modalEvent(project) {
  modalTitle.textContent = project.title;
  modalImage.src = project.image;
  modalDescription.textContent = project.description;

  seeLiveBtn.addEventListener('click', function () {
    window.open(project.liveLink, '_blank');
  });

  seeSourceBtn.addEventListener('click', function () {
    window.open(project.sourceLink, '_blank');
  });

  modal.showModal();
}

// Event listener to close the modal
closeModalBtn.addEventListener('click', function () {
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
