// MOBILE NAVIGATION MENU

const navbar = document.querySelector(".navbar");
const navLinks = document.querySelector(".nav-links");
let fullnameEl = document.querySelector(".fullname input");
let emailEl = document.querySelector(".email input");
let phoneEl = document.querySelector(".phone input");
let messageEl = document.querySelector(".message input");
let base_url = "https://iyanu-backend-portfolio.onrender.com";

// Create menu button
const menuBtn = document.createElement("button");

menuBtn.className = "menu-btn";

menuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
menuBtn.style.color = "white";

menuBtn.setAttribute("aria-label", "Toggle navigation");

navbar.insertBefore(menuBtn, navLinks);

// Toggle menu
menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active");

  menuBtn.innerHTML = navLinks.classList.contains("active")
    ? '<i class="fa-solid fa-xmark"></i>'
    : '<i class="fa-solid fa-bars"></i>';
});

// Close menu after clicking a link

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");

    menuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
  });
});

// SCROLL ANIMATIONS

const animatedElements = document.querySelectorAll(
  ".home-content, .home-image, .about-content, .skill-card, .service-card, .section-title",
);

animatedElements.forEach((element) => {
  element.style.opacity = "0";
  element.style.transform = "translateY(30px)";
  element.style.transition = "all 0.8s ease";
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";

        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15,
  },
);

animatedElements.forEach((element) => {
  observer.observe(element);
});

// 3. ACTIVE NAVIGATION LINKS

const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 150;

    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.classList.remove("active-link");

    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active-link");
    }
  });
});

// 4. BACK TO TOP BUTTON

const topButton = document.createElement("button");

topButton.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';

topButton.className = "back-to-top";

document.body.appendChild(topButton);

window.addEventListener("scroll", () => {
  if (window.scrollY > 400) {
    topButton.classList.add("show");
  } else {
    topButton.classList.remove("show");
  }
});

topButton.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// 5. DYNAMIC FOOTER YEAR

const footer = document.querySelector("footer");

footer.innerHTML = `
    <p>
        &copy; ${new Date().getFullYear()}
        Iyanuoluwa Atanda. All Rights Reserved.
    </p>
`;

let submitFormBtn = document.querySelector(".form-links button");

submitFormBtn.addEventListener("click", async () => {
  try {
    const res = await fetch(`${base_url}/api/v1/form`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullname: fullnameEl.value,
        email: emailEl.value,
        phone: phoneEl.value,
        message: messageEl.value,
      }),
    });

    const data = await res.json();
    if (data.success === true) {
      alert(`${data?.data?.fullname || "hhfhhffh"} your form is successfully submitted`)
    }

  } catch (error) {
    alert(error.message);
  }
});
