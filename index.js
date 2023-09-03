// Full Page Loader, Fetch Data after Loading, Change slider design if device is small
const loader = document.getElementById("loader-full-page");
const wrapper = document.getElementById("wrapper");

const loaderServices = document.getElementById("loader-services");
const services = document.getElementById("services-content");

window.addEventListener("load", function () {
  setTimeout(() => {
    loader.style.display = "none";
    wrapper.style.display = "flex";
    fetchRickMorty();

    loaderServices.style.display = "none";
    services.style.display = "flex";
    fetchServices();

    const swiperElement = document.querySelector(
      "#testimonials-content div.swiper"
    );
    const swiperSmallElement = document.querySelector(
      "#testimonials-content div.swiper.swiper-small"
    );
    if (document.documentElement.clientWidth < 800) {
      swiperElement.style.display = "none";
      swiperSmallElement.style.display = "flex";
    } else {
      swiperSmallElement.style.display = "none";
      swiperElement.style.display = "flex";
    }
  }, 1 * 1000);
});

// API fetch Rick n Morty
const loaderRicknMorty = document.getElementById("loader-rick-n-morty");
const card = document.getElementById("character-card");

function fetchRickMorty() {
  const MAX = 826;
  const MIN = 1;
  const characterID = Math.floor(Math.random() * (MAX - MIN) + MIN);
  fetch(`https://rickandmortyapi.com/api/character/${characterID}`)
    .then((respond) => respond.json())
    .then((data) => displayData(data))
    .catch(() => {});
}

function displayData(data) {
  setTimeout(() => {
    loaderRicknMorty.style.display = "none";
    card.style.display = "flex";
  }, 1000);
  const imgURL = document.querySelector("#character-card img");
  imgURL.src = data.image;
  const infoP = document.querySelectorAll("#character-card p");
  infoP[0].innerHTML += data.name;
  infoP[1].innerHTML += data.status;
  infoP[2].innerHTML += data.species;
  infoP[3].innerHTML += data.gender;
}

// JSON services fetch
function fetchServices() {
  fetch(
    `https://raw.githubusercontent.com/viktoriiakoniukhova/sigma-software-projects/main/HW4/data.json`
  )
    .then((respond) => respond.json())
    .then((data) => displayServices(data))
    .catch(() => {});
}

function displayServices(data) {
  setTimeout(() => {
    loaderServices.style.display = "none";
    services.style.display = "flex";
  }, 1000);

  data.categories.forEach(({ id, title, imgURL, imgHoverURL, items }) =>
    createCategory(id, title, imgURL, imgHoverURL, items)
  );

  btnAll.click();
  btnAll.classList.add("all-active");
}

const servicesNavPanel = document.getElementById("nav-panel");
const servicesContainer = document.getElementById("services-container");
const btnAll = document.getElementById("all");

servicesNavPanel.addEventListener("click", (e) => {
  if (e.target === e.currentTarget) return;
  btnAll.classList.remove("all-active");

  if (e.target.id === "all") {
    for (let child of servicesContainer.children) {
      child.style.display = "flex";
      child.className = "all-items";

      for (let item of child.children) {
        item.className = "all-items-flex";
        item.style.display = child.firstElementChild === item ? "flex" : "none";
        item.classList.add("fade-in-bck");
      }
    }
  } else
    for (let child of servicesContainer.children) {
      child.className = "wrapper__main_services_content_items";
      for (let item of child.children) {
        item.style.display = "flex";
        item.className = "wrapper__main_services_content_items_item";
        item.classList.add("fade-in-bck");
      }
      child.style.display = child.id === e.target.id ? "flex" : "none";
    }
});

function createCategory(id, title, imgURL, imgHoverURL, items) {
  const btn = document.createElement("button");
  btn.classList.add("btn_rounded");
  btn.id = id;
  btn.innerHTML = title;
  servicesNavPanel.append(btn);

  const categoryItems = document.createElement("div");
  categoryItems.classList.add("wrapper__main_services_content_items");
  categoryItems.id = id;
  categoryItems.style.display = "none";
  items.forEach(({ title, desc }) =>
    categoryItems.append(createItem(title, desc, imgURL, imgHoverURL))
  );

  servicesContainer.append(categoryItems);
}

function createItem(title, desc, imgURL, imgHoverURL) {
  const item = document.createElement("div");
  item.classList.add("wrapper__main_services_content_items_item");

  const img = document.createElement("img");
  img.src = imgURL;
  img.alt = title;

  const section = document.createElement("section");
  const h5 = document.createElement("h5");
  h5.innerHTML = title;
  h5.style.textTransform = "capitalize";
  const p = document.createElement("p");
  p.innerHTML = desc;
  section.append(h5, p);
  item.append(img, section);

  item.addEventListener("mouseover", () => {
    img.src = imgHoverURL;
  });
  item.addEventListener("mouseout", () => {
    img.src = imgURL;
  });

  return item;
}

// Swiper
const swiper = new Swiper(".swiper", {
  // Optional parameters
  direction: "horizontal",
  loop: true,
  slidesPerView: 2,
  spaceBetween: 60,
  slidesPerGroup: 2,

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

// Swiper (SMALL DEVICES)
const swiperSmall = new Swiper(".swiper.swiper-small", {
  // Optional parameters
  direction: "horizontal",
  loop: true,
  slidesPerView: 1,
  spaceBetween: 60,
  slidesPerGroup: 1,

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

// Swiper change based on resolution
window.addEventListener("resize", () => {
  const swiperElement = document.querySelector(
    "#testimonials-content div.swiper"
  );
  const swiperSmallElement = document.querySelector(
    "#testimonials-content div.swiper.swiper-small"
  );
  if (document.documentElement.clientWidth < 800) {
    swiperElement.style.display = "none";
    swiperSmallElement.style.display = "flex";
  } else {
    swiperSmallElement.style.display = "none";
    swiperElement.style.display = "flex";
  }
});

// Navbar scrollbar
document.addEventListener("scroll", () => {
  const winScroll =
    document.body.scrollTop || document.documentElement.scrollTop;
  const height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  const progressBar = document.getElementById("bar");
  progressBar.style.width = scrolled + "%";
});

// Function to "close" window
function relocate() {
  window.location.replace("http://google.com");
  return false;
}

// Blog reveal animation

document.addEventListener("scroll", () => {
  const reveals = document.querySelectorAll(".reveal");
  reveals.forEach((element) => {
    const windowHeight = window.innerHeight;
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;
    elementTop < windowHeight - elementVisible
      ? element.classList.add("active")
      : element.classList.remove("active");
  });
});

// Fireworks animation
const fireworks = document.getElementById("fireworks");
fireworks.style.display = "none";

// Newsletter form validation

const nameRegex = /^[A-Z][a-z]*$/;
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const myName = "Viktoria";

const form = document.querySelector("#newsletter-form");
const nameInput = document.querySelector("#input-name");
const surnameInput = document.querySelector("#input-surname");
const emailInput = document.querySelector("#input-email");
const submitBtn = document.querySelector("#submit-btn");

const nameError = document.querySelector("#input-name ~ span.error");
const surnameError = document.querySelector("#input-surname ~ span.error");
const emailError = document.querySelector("#input-email ~ span.error");

let isNameValid = false,
  isSurnameValid = false,
  isEmailValid = false;

nameInput.addEventListener("change", (e) => {
  isNameValid = validateField(nameInput, e.target.value, nameRegex, nameError);
  submitBtn.disabled = !(isNameValid && isSurnameValid && isEmailValid);
});

surnameInput.addEventListener("change", (e) => {
  isSurnameValid = validateField(
    surnameInput,
    e.target.value,
    nameRegex,
    surnameError
  );
  submitBtn.disabled = !(isNameValid && isSurnameValid && isEmailValid);
});

emailInput.addEventListener("change", (e) => {
  isEmailValid = validateField(
    emailInput,
    e.target.value,
    emailRegex,
    emailError
  );
  submitBtn.disabled = !(isNameValid && isSurnameValid && isEmailValid);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.querySelector("#input-name").value;
  const surname = document.querySelector("#input-surname").value;
  const email = document.querySelector("#input-email").value;

  localStorage.setItem("firstName", name);
  localStorage.setItem("surname", surname);
  localStorage.setItem("email", email);
  form.reset();
  alert("Ваші дані успішно збережені!");

  if (name === myName) {
    fireworks.style.display = "block";
    location.href = "#popup1";
    setTimeout(() => {
      fireworks.style.display = "none";
    }, 5 * 1000);
  }
});

function validateField(field, value, regex, errorField) {
  if (value && !regex.test(value)) {
    field.classList.add("error");
    submitBtn.disabled = true;
    showError(errorField);
  } else {
    field.classList.remove("error");
    errorField.textContent = "";
    return true;
  }
}

function showError(errorField) {
  if (errorField === nameError) {
    errorField.textContent =
      "Має містити лише латинські літери, перша літера - велика. Наявність цифр, пробілів – недопустима.";
  } else if (errorField === surnameError) {
    errorField.textContent =
      "Має містити лише латинські літери, перша літера - велика. Наявність цифр, пробілів – недопустима.";
  } else if (errorField === emailError) {
    errorField.textContent =
      "Має відповідати загальним правилам валідації пошти";
  }
}

// Set year in footer
const footerYear = document.getElementById("footer-year");
const currentDate = new Date();
const currentYear = currentDate.getFullYear();
footerYear.innerHTML = currentYear;

// Activity interval tracker

// const interval = setInterval(function () {
//   const answer = confirm("Ви ще тут?");
//   const closeTimeout = setTimeout(() => relocate(), 30 * 1000);
//   if (answer) {
//     clearTimeout(closeTimeout);
//   }
// }, 60 * 1000);

// document.addEventListener("mousemove", function () {
//   clearInterval(interval);
// });
