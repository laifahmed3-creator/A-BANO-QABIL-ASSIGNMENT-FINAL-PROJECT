document.addEventListener("DOMContentLoaded", function () {
  initMobileNav();
  initHomeProjects();
  initContactForm();
});

function initMobileNav() {
  var menuBtn = document.getElementById("menuBtn");
  var nav = document.getElementById("mainNavigation");
  if (!menuBtn || !nav) return;

  menuBtn.addEventListener("click", function () {
    var isOpen = nav.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  nav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      nav.classList.remove("open");
      menuBtn.setAttribute("aria-expanded", "false");
    });
  });
}

function initHomeProjects() {
  var container = document.getElementById("projectsContainer");
  if (!container) return;

  var projects = [
    {
      image: "/IMAGE 1.png",
      tag: "CONSTRUCTION MACHINERY",
      title: "Concrete Form Mixture Machine",
      text: "A mixture machine that mixes concrete with chemical and water and turns it into a liquid form used in placing tiles and making floors straight."
    },
    {
      image: "/IMAGE 2.png",
      tag: "CONSTRUCTION BLOCK MAKING MACHINE",
      title: "Concrete Block Making Machine",
      text: "A mixture machine that mixes water, cement and sand — the mixture is then used to make construction blocks for building sites."
    },
    {
      image: "/IMAGE 3.jpg",
      tag: "HYDRAULIC BLOCK MACHINE",
      title: "Hydraulic Block Machine",
      text: "Used to make construction blocks by pressing a mixture of water, sand and cement."
    },
    {
      image: "/IMAGE 4 .jpeg",
      tag: "HAND PRESS BLOCK MACHINE",
      title: "Hand Press Block Machine",
      text: "Used to make blocks by manually pressing a mixture of water, sand and cement by hand."
    },
    {
      image: "/5_batching_mixer.jpg",
      tag: "HEAVY METAL WORK",
      title: "Heavy Metal Gates",
      text: "Used to clean and finish metal castings after they come out of the mould."
    },
    {
      image: "/metal havy stairs.jpg",
      tag: "HEAVY METAL STAIRS",
      title: "Custom Metal Stairs",
      text: "Custom metal stairs fabricated for residential, commercial and industrial spaces using heavy-duty metal materials."
    }
  ];

  var html = projects.map(function (p) {
    return (
      '<div class="project-card">' +
        '<div class="project-image"><img src="' + p.image + '" alt="' + p.title + '"></div>' +
        '<div class="project-content">' +
          '<p>' + p.tag + '</p>' +
          '<h3>' + p.title + '</h3>' +
          '<p>' + p.text + '</p>' +
          '<a href="projects.html">View Project</a>' +
        '</div>' +
      '</div>'
    );
  }).join("");

  container.innerHTML = html;
}

function initContactForm() {
  var form = document.getElementById("contactFormElement");
  if (!form) return;

  var status = document.getElementById("formStatus");

  var fields = {
    clientName: { required: true, error: "clientNameError", message: "Please enter your full name." },
    clientPhone: { required: true, error: "clientPhoneError", message: "Please enter a valid phone number.", pattern: /^[0-9+\-\s()]{7,}$/ },
    clientEmail: { required: false, error: "clientEmailError", message: "Please enter a valid email address.", pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
    serviceRequired: { required: true, error: "serviceError", message: "Please select a service." },
    clientMessage: { required: true, error: "clientMessageError", message: "Please describe your project or requirement." }
  };

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var isValid = true;

    Object.keys(fields).forEach(function (id) {
      var field = document.getElementById(id);
      var rule = fields[id];
      var errorEl = document.getElementById(rule.error);
      var value = field.value.trim();

      var fieldValid = true;
      if (rule.required && value === "") {
        fieldValid = false;
      } else if (rule.pattern && value !== "" && !rule.pattern.test(value)) {
        fieldValid = false;
      }

      if (!fieldValid) {
        isValid = false;
        if (errorEl) errorEl.textContent = rule.message;
        field.setAttribute("aria-invalid", "true");
      } else {
        if (errorEl) errorEl.textContent = "";
        field.removeAttribute("aria-invalid");
      }
    });

    if (!status) return;

    if (!isValid) {
      status.textContent = "Please fix the highlighted fields and try again.";
      status.className = "form-status error";
      return;
    }

    status.textContent = "Thank you. Your inquiry has been noted — this form is not yet connected to a backend, so please also reach out by phone or email until it is.";
    status.className = "form-status success";
    form.reset();
  });
}