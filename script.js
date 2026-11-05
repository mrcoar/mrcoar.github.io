// Menú adaptable, selector de idioma y año automático.
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const languageToggle = document.getElementById("languageToggle");

const translations = {
  es: {
    pageTitle: "Mi portafolio | Desarrollador de software",
    metaDescription: "Portafolio de proyectos y desarrollo de software.",
    brand: "Mi portafolio",
    brandAria: "Ir al inicio",
    menuOpen: "Abrir menú",
    menuClose: "Cerrar menú",
    switchLanguage: "Switch to English",
    navAbout: "Sobre mí",
    navTech: "Tecnologías",
    navProjects: "Proyectos",
    navContact: "Contacto",
    heroEyebrow: "PORTAFOLIO DE DESARROLLO",
    heroGreeting: "Hola, soy",
    heroRole: "Desarrollador de software.",
    heroDescription: "Diseño y desarrollo soluciones de software, desde servicios backend hasta aplicaciones web. Aquí puedes conocer algunos de mis proyectos.",
    viewProjects: "Ver proyectos",
    myGithub: "Mi GitHub",
    aboutEyebrow: "01 / PERFIL",
    aboutTitle: "Sobre mí",
    aboutLead: "Me interesa construir software útil, mantenible y bien estructurado.",
    aboutDescription: "En este espacio presento proyectos personales, ejercicios técnicos y desarrollos que muestran mi experiencia. Puedes revisar el código fuente de cada proyecto directamente en GitHub.",
    techEyebrow: "02 / HERRAMIENTAS",
    techTitle: "Tecnologías con Mayor Experiencia",
    projectsEyebrow: "03 / TRABAJO SELECCIONADO",
    projectsTitle: "Proyectos",
    allRepositories: "Ver todos los repositorios",
    project1Title: "ComplexMath",
    project1Description: "Aplicación Spring Boot (con Maven) que permite realizar cálculos matemáticos con números complejos, funciones cuadráticas y sistemas de ecuaciones (Trabajo en progreso).",
    project2Title: "spring-kafka-producer-example",
    project2Description: "Ejemplo de productor con Maven, Apache Kafka, Spring Boot y Spring Kafka. Incluye un API REST para producir mensajes.",
    project3Title: "spring-kafka-consumer-example",
    project3Description: "Ejemplo de consumidor con Maven, Apache Kafka, Spring Boot y Spring Kafka.",
    viewRepository: "Ver repositorio",
    contactEyebrow: "04 / CONTACTO",
    contactTitle: "¿Conversamos?",
    contactDescription: "Estoy disponible para conversar sobre proyectos y oportunidades profesionales.",
    footerBuilt: "Desarrollado con HTML, CSS y JavaScript.",
    backToTop: "Volver arriba ↑"
  },
  en: {
    pageTitle: "My Portfolio | Software Developer",
    metaDescription: "Software development portfolio and selected projects.",
    brand: "My portfolio",
    brandAria: "Go to home",
    menuOpen: "Open menu",
    menuClose: "Close menu",
    switchLanguage: "Cambiar a español",
    navAbout: "About me",
    navTech: "Technologies",
    navProjects: "Projects",
    navContact: "Contact",
    heroEyebrow: "DEVELOPMENT PORTFOLIO",
    heroGreeting: "Hello, I'm",
    heroRole: "Software Developer.",
    heroDescription: "I design and develop software solutions, from backend services to web applications. Here you can explore some of my projects.",
    viewProjects: "View projects",
    myGithub: "My GitHub",
    aboutEyebrow: "01 / PROFILE",
    aboutTitle: "About me",
    aboutLead: "I enjoy building useful, maintainable, and well-structured software.",
    aboutDescription: "This space showcases personal projects, technical exercises, and software developments that demonstrate my experience. You can explore each project's source code directly on GitHub.",
    techEyebrow: "02 / TOOLKIT",
    techTitle: "Technologies with Great Experience or Hands On",
    projectsEyebrow: "03 / SELECTED WORK",
    projectsTitle: "Projects",
    allRepositories: "View all repositories",
    project1Title: "CompleMath",
    project1Description: "Spring Boot application (with Maven) that allows math calculations with complex numbers, quadratic functions and equation systems (Work in Progress).",
    project2Title: "spring-kafka-producer-example",
    project2Description: "Producer example with Maven, Apache Kafka, Spring Boot and Spring Kafka. Includes an API REST that allows to produce messages.",
    project3Title: "spring-kafka-consumer-example",
    project3Description: "Consumer example with Maven, Apache Kafka, Spring Boot and Spring Kafka.",
    viewRepository: "View repository",
    contactEyebrow: "04 / CONTACT",
    contactTitle: "Let's talk",
    contactDescription: "I'm available to discuss projects and professional opportunities.",
    footerBuilt: "Built with HTML, CSS, and JavaScript.",
    backToTop: "Back to top ↑"
  }
};

function setLanguage(language) {
  const dictionary = translations[language];
  if (!dictionary) return;

  document.documentElement.lang = language;
  document.title = dictionary.pageTitle;
  document.getElementById("metaDescription").content = dictionary.metaDescription;

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    if (dictionary[key]) element.textContent = dictionary[key];
  });

  document.querySelectorAll("[data-i18n-aria]").forEach((element) => {
    const key = element.dataset.i18nAria;
    if (dictionary[key]) element.setAttribute("aria-label", dictionary[key]);
  });

  const nextLanguage = language === "es" ? "en" : "es";
  languageToggle.textContent = nextLanguage.toUpperCase();
  languageToggle.setAttribute("aria-label", dictionary.switchLanguage);
  languageToggle.title = dictionary.switchLanguage;

  // Actualiza el texto accesible del menú sin depender del idioma visible.
  const isMenuOpen = navLinks.classList.contains("open");
  menuToggle.setAttribute("aria-label", isMenuOpen ? dictionary.menuClose : dictionary.menuOpen);

  localStorage.setItem("portfolio-language", language);
}

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  const language = document.documentElement.lang || "es";
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? translations[language].menuClose : translations[language].menuOpen);
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    const language = document.documentElement.lang || "es";
    menuToggle.setAttribute("aria-label", translations[language].menuOpen);
  });
});

languageToggle.addEventListener("click", () => {
  const currentLanguage = document.documentElement.lang || "es";
  setLanguage(currentLanguage === "es" ? "en" : "es");
});

document.getElementById("year").textContent = new Date().getFullYear();

// Recupera el idioma elegido anteriormente; español es el idioma inicial.
const savedLanguage = localStorage.getItem("portfolio-language");
setLanguage(savedLanguage === "en" ? "en" : "es");

const startDate = new Date(2011, 0, 1);
const today = new Date();

let years = today.getFullYear() - startDate.getFullYear();

if (
    today.getMonth() < startDate.getMonth() ||
    (
        today.getMonth() === startDate.getMonth() &&
        today.getDate() < startDate.getDate()
    )
) {
    years--;
}

document.getElementById("years").textContent =
    years + (years === 1 ? " año" : " años");


