// GymAccess Villalba · interacciones básicas de la landing
(function () {
  "use strict";

  var header = document.querySelector(".site-header");
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".main-nav");

  // Menú móvil: abre y cierra la navegación
  if (header && toggle && nav) {
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-controls", "main-nav");
    nav.id = nav.id || "main-nav";

    var closeMenu = function () {
      header.classList.remove("nav-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Abrir menú");
    };

    toggle.addEventListener("click", function () {
      var open = header.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMenu();
    });
  }

  // Formularios de demo: no envían datos, muestran un aviso
  document.querySelectorAll("form").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var msg = form.querySelector(".form-success");
      if (!msg) {
        msg = document.createElement("p");
        msg.className = "form-success";
        msg.setAttribute("role", "status");
        form.appendChild(msg);
      }
      msg.textContent = "¡Gracias! Esto es una demo: no se ha enviado ningún dato.";
      form.reset();
    });
  });

  // Marca en el menú la sección visible
  var links = nav ? nav.querySelectorAll('a[href^="#"]') : [];
  if (links.length && "IntersectionObserver" in window) {
    var byId = {};
    links.forEach(function (a) {
      byId[a.getAttribute("href").slice(1)] = a;
    });
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var current = byId[entry.target.id];
          if (!current) return;
          links.forEach(function (a) {
            a.classList.remove("active");
          });
          current.classList.add("active");
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    Object.keys(byId).forEach(function (id) {
      var section = document.getElementById(id);
      if (section) observer.observe(section);
    });
  }
})();
