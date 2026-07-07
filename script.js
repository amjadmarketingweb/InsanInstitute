(function () {
  const header = document.querySelector("[data-header]");
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#site-nav");
  const navLinks = Array.from(document.querySelectorAll(".site-nav a"));
  const contactForm = document.querySelector("[data-contact-form]");
  const formNote = document.querySelector("[data-form-note]");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  if (header) {
    const setShadow = () => {
      header.classList.toggle("scrolled", window.scrollY > 12);
    };
    setShadow();
    window.addEventListener("scroll", setShadow, { passive: true });
  }

  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          navLinks.forEach((link) => {
            link.classList.toggle("active", link.getAttribute("href") === "#" + entry.target.id);
          });
        });
      },
      { rootMargin: "-35% 0px -58% 0px", threshold: 0.01 }
    );

    sections.forEach((section) => observer.observe(section));
  }

  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const formData = new FormData(contactForm);
      const name = String(formData.get("name") || "").trim();
      const organisation = String(formData.get("organisation") || "").trim();
      const email = String(formData.get("email") || "").trim();
      const topic = String(formData.get("topic") || "Pertanyaan Insan Institute").trim();
      const message = String(formData.get("message") || "").trim();

      const body = [
        "Assalamualaikum Insan Institute,",
        "",
        "Saya ingin bertanya tentang: " + topic,
        "",
        "Nama: " + (name || "-"),
        "Organisasi: " + (organisation || "-"),
        "Emel: " + (email || "-"),
        "",
        "Ringkasan keperluan:",
        message || "-",
        "",
        "Terima kasih."
      ].join("\n");

      const subject = "Pertanyaan: " + topic;
      const mailto =
        "mailto:hello@insan.institute?subject=" +
        encodeURIComponent(subject) +
        "&body=" +
        encodeURIComponent(body);

      window.location.href = mailto;

      if (formNote) {
        formNote.textContent = "Aplikasi emel anda sedang dibuka. Jika tidak terbuka, emel terus ke hello@insan.institute.";
      }
    });
  }
})();
