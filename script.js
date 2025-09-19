// DOM Elements
const header = document.getElementById("header");
const navToggle = document.getElementById("nav-toggle");
const navMenu = document.getElementById("nav-menu");
const navLinks = document.querySelectorAll(".nav-link");
const contactForm = document.getElementById("contact-form");
const chatbotToggle = document.getElementById("chatbot-toggle");
const chatbotContainer = document.getElementById("chatbot-container");
const chatbotClose = document.getElementById("chatbot-close");
const chatbotInput = document.getElementById("chatbot-input");
const chatbotSend = document.getElementById("chatbot-send");
const chatbotMessages = document.getElementById("chatbot-messages");
const quickOptions = document.querySelectorAll(".quick-option");
const statNumbers = document.querySelectorAll(".stat-number");

// Header Scroll Effect
window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// Mobile Navigation Toggle
navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  navToggle.classList.toggle("active");
});

// Close mobile menu when clicking on links
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
    navToggle.classList.remove("active");
  });
});

// Smooth Scrolling for Navigation Links
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      const headerHeight = header.offsetHeight;
      const targetPosition = targetSection.offsetTop - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  });
});

// Active Navigation Link Highlighting
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section");
  const scrollPosition = window.scrollY + header.offsetHeight + 100;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");

    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active");
        }
      });
    }
  });
});

// Animated Counter for Statistics - Vers�o Suave
const animateCounter = (element, target) => {
  // Verificar se o elemento j� foi animado
  if (element.classList.contains("animated")) {
    return;
  }

  const startTime = performance.now();
  const duration = 3500; // 3.5 segundos para anima��o mais suave

  // Fun��o de easing suave (ease-out-cubic)
  const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

  const updateCounter = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Aplicar easing para suavidade
    const easedProgress = easeOutCubic(progress);
    const current = Math.floor(target * easedProgress);

    element.textContent = current;

    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target;
      element.classList.add("animated"); // Marcar como animado
    }
  };

  requestAnimationFrame(updateCounter);
};

// Intersection Observer for Statistics Animation
const observerOptions = {
  threshold: 0.3,
  rootMargin: "0px 0px -100px 0px",
};

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const statsInView = entry.target.querySelectorAll(".stat-number");
      const statItems = entry.target.querySelectorAll(".stat-item");

      // Animar os containers primeiro
      statItems.forEach((item, index) => {
        setTimeout(() => {
          item.classList.add("animated");
        }, index * 150); // Delay escalonado para efeito suave
      });

      // Depois animar os n�meros
      setTimeout(() => {
        statsInView.forEach((stat) => {
          const target = parseInt(stat.getAttribute("data-target"));
          animateCounter(stat, target);
        });
      }, 300); // Pequeno delay ap�s os containers

      statsObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe statistics section directly
const aboutStatsSection = document.querySelector(".about-stats");
if (aboutStatsSection) {
  statsObserver.observe(aboutStatsSection);
}

// Fallback para anima��o dos n�meros via scroll
const checkStatsVisibility = () => {
  const statsSection = document.querySelector(".about-stats");
  if (statsSection && !statsSection.classList.contains("stats-animated")) {
    const rect = statsSection.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight * 0.8;

    if (isVisible) {
      const stats = statsSection.querySelectorAll(".stat-number");
      const statItems = statsSection.querySelectorAll(".stat-item");

      // Animar os containers primeiro
      statItems.forEach((item, index) => {
        setTimeout(() => {
          item.classList.add("animated");
        }, index * 150);
      });

      // Depois animar os n�meros
      setTimeout(() => {
        stats.forEach((stat) => {
          const target = parseInt(stat.getAttribute("data-target"));
          animateCounter(stat, target);
        });
      }, 300);

      statsSection.classList.add("stats-animated");
    }
  }
};

// Scroll Animations for Cards
const animateOnScroll = () => {
  const elements = document.querySelectorAll(
    ".service-card, .about-item, .info-card, .testimonial-card, .contact-info-card"
  );

  elements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;

    if (elementTop < window.innerHeight - elementVisible) {
      element.style.animation = "fadeInUp 0.6s ease-out forwards";
    }
  });

  // Verificar visibilidade das estat�sticas
  checkStatsVisibility();
};

// Testimonials Animation
const animateTestimonials = () => {
  const testimonials = document.querySelectorAll(".testimonial-card");

  testimonials.forEach((testimonial, index) => {
    const elementTop = testimonial.getBoundingClientRect().top;
    const elementVisible = 150;

    if (elementTop < window.innerHeight - elementVisible) {
      setTimeout(() => {
        testimonial.style.animation = "slideInUp 0.8s ease-out forwards";
        testimonial.style.opacity = "1";
        testimonial.style.transform = "translateY(0)";
      }, index * 200);
    }
  });
};

window.addEventListener("scroll", animateOnScroll);
window.addEventListener("scroll", animateTestimonials);

// Verificar visibilidade inicial das estat�sticas
window.addEventListener("load", () => {
  checkStatsVisibility();
  animateOnScroll();
});

// Handle select labels
const selectElements = document.querySelectorAll(".modern-form-group select");
selectElements.forEach((select) => {
  select.addEventListener("change", function () {
    const label = this.nextElementSibling;
    if (this.value !== "") {
      label.style.top = "-0.4rem";
      label.style.fontSize = "0.75rem";
      label.style.color = "var(--primary-color)";
    }
  });
});

// Contact Form Handling
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(contactForm);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      service: formData.get("service"),
      message: formData.get("message"),
    };

    // Validate form
    if (validateForm()) {
      // Show loading state
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML =
        '<span>Enviando...</span><i class="fas fa-spinner fa-spin"></i>';
      submitBtn.disabled = true;

      // Send via EmailJS
      sendEmailNotification(data)
        .then(() => {
          // Success - show notification and redirect to WhatsApp
          showNotification(
            "Mensagem enviada com sucesso! Redirecionando para WhatsApp...",
            "success"
          );

          // Send to WhatsApp after 2 seconds
          setTimeout(() => {
            sendToWhatsApp(data);
          }, 2000);

          contactForm.reset();
          clearFormErrors();
        })
        .catch((error) => {
          console.error("Erro ao enviar email:", error);
          // Even if email fails, still send to WhatsApp
          showNotification(
            "Redirecionando para WhatsApp para garantir o contato...",
            "warning"
          );

          setTimeout(() => {
            sendToWhatsApp(data);
          }, 1500);

          contactForm.reset();
          clearFormErrors();
        })
        .finally(() => {
          // Reset button state
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
        });
    } else {
      showNotification("Por favor, corrija os erros no formulário.", "error");
    }
  });
}

// Form Validation
const validateForm = () => {
  const form = document.querySelector("#contact-form");
  const inputs = form.querySelectorAll(
    "input[required], select[required], textarea[required]"
  );
  let isValid = true;

  // Limpar erros anteriores
  inputs.forEach((input) => {
    const group = input.closest(".modern-form-group");
    group.classList.remove("error");
    const errorMessage = group.querySelector(".error-message");
    if (errorMessage) {
      errorMessage.style.display = "none";
    }
  });

  // Validar cada campo
  inputs.forEach((input) => {
    const group = input.closest(".modern-form-group");
    let errorMessage = group.querySelector(".error-message");

    // Criar mensagem de erro se n�o existir
    if (!errorMessage) {
      errorMessage = document.createElement("div");
      errorMessage.className = "error-message";
      group.appendChild(errorMessage);
    }

    // Verificar se o campo est� vazio ou n�o selecionado
    if (!input.value || input.value.trim() === "") {
      group.classList.add("error");
      const label = group.querySelector("label");
      const fieldName = label ? label.textContent : input.name;
      errorMessage.textContent = `${fieldName} � obrigat�rio`;
      errorMessage.style.display = "block";
      isValid = false;
    }
    // Validar email espec�fico
    else if (input.type === "email" && !isValidEmail(input.value)) {
      group.classList.add("error");
      errorMessage.textContent = "Email inv�lido";
      errorMessage.style.display = "block";
      isValid = false;
    }
    // Validar telefone espec�fico
    else if (input.name === "phone" && !isValidPhone(input.value)) {
      group.classList.add("error");
      errorMessage.textContent = "Telefone inv�lido";
      errorMessage.style.display = "block";
      isValid = false;
    }
  });

  return isValid;
};

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidPhone = (phone) => {
  const phoneRegex = /^[\d\s\-\(\)]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, "").length >= 10;
};

// Notification System
const showNotification = (message, type) => {
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.innerHTML = `
        <i class="fas fa-${
          type === "success" ? "check-circle" : "exclamation-circle"
        }"></i>
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;

  // Add notification styles if not already added
  if (!document.getElementById("notification-styles")) {
    const styles = document.createElement("style");
    styles.id = "notification-styles";
    styles.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 1rem 1.5rem;
                border-radius: 8px;
                color: white;
                display: flex;
                align-items: center;
                gap: 0.5rem;
                z-index: 10000;
                animation: slideInRight 0.3s ease-out;
                max-width: 400px;
                box-shadow: 0 10px 25px rgba(0,0,0,0.2);
            }
            .notification.success { background: #10b981; }
            .notification.error { background: #ef4444; }
            .notification-close {
                background: none;
                border: none;
                color: white;
                font-size: 1.2rem;
                cursor: pointer;
                margin-left: auto;
                padding: 0 0.5rem;
            }
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
    document.head.appendChild(styles);
  }

  document.body.appendChild(notification);

  // Close notification
  const closeBtn = notification.querySelector(".notification-close");
  closeBtn.addEventListener("click", () => {
    notification.style.animation = "slideInRight 0.3s ease-out reverse";
    setTimeout(() => notification.remove(), 300);
  });

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.style.animation = "slideInRight 0.3s ease-out reverse";
      setTimeout(() => notification.remove(), 300);
    }
  }, 5000);
};

// Chatbot Functionality - Sistema Inteligente Avan�ado
const chatbotData = {
  responses: {
    saudacao: [
      "Ol�! Sou o assistente jur�dico da Belo&Ol?mpio. Como posso ajud�-lo hoje?",
      "Bem-vindo � Belo&Ol?mpio Advocacia. Estou aqui para esclarecer suas d�vidas.",
      "Ol�! Sou especialista em informa��es sobre nosso escrit�rio. Como posso te ajudar?",
    ],

    // INFORMA��ES SOBRE OS ADVOGADOS
    advogados: [
      "Nossos s�cios fundadores s�o:\n\nDra. Bianca Belo - S�cia Fundadora\n� Especialista em Direito de Fam�lia e Civil\n� Graduada pela USP\n� P�s-gradua��o em Direito de Fam�lia e Sucess�es\n� Mais de 10 anos de experi�ncia\n\nDr. Matheus Ol?mpio - S�cio Fundador\n� Especialista em Direito Empresarial e Criminal\n� Formado pela PUC-SP\n� MBA em Direito Empresarial\n� Experi�ncia em grandes corpora��es",
      "Nossa equipe � composta pelos advogados Dra. Bianca Belo (Direito Civil/Fam�lia) e Dr. Matheus Ol?mpio (Direito Empresarial/Criminal). Ambos s�o s�cios fundadores com vasta experi�ncia.",
    ],

    bianca: [
      "Dra. Bianca Belo - S�cia Fundadora\n\nForma��o:\n� Graduada pela Universidade de S�o Paulo (USP)\n� P�s-gradua��o em Direito de Fam�lia e Sucess�es\n\nEspecialidades:\n� Direito de Fam�lia\n� Direito Civil\n� Sucess�es\n\nExperi�ncia: Mais de 10 anos\nDiferencial: Abordagem humanizada em casos complexos",
      "A Dra. Bianca � nossa especialista em Direito de Fam�lia e Civil, formada pela USP com mais de 10 anos de experi�ncia.",
    ],

    matheus: [
      "Dr. Matheus Ol?mpio - S�cio Fundador\n\nForma��o:\n� Graduado pela PUC-SP\n� MBA em Direito Empresarial\n\nEspecialidades:\n� Direito Empresarial\n� Direito Criminal\n� Compliance\n\nExperi�ncia: Atua��o em grandes corpora��es\nDiferencial: Vis�o estrat�gica e t�cnica apurada",
      "O Dr. Matheus � nosso especialista em Direito Empresarial e Criminal, formado pela PUC-SP com MBA e experi�ncia corporativa.",
    ],

    // WHATSAPP E CONTATOS
    whatsapp: [
      "WhatsApp da Belo&Ol?mpio: (11) 96464-2712\n\nDispon�vel para:\n� Agendamento de consultas\n� D�vidas iniciais\n� Informa��es sobre casos\n� Atendimento r�pido\n\nHor�rio de funcionamento:\nSegunda a Sexta: 09h �s 18h",
      "Nosso WhatsApp � (11) 96464-2712. Atendemos de segunda a sexta das 9h �s 18h. � o canal mais r�pido para contato.",
    ],

    telefone: [
      "Telefone Fixo: (11) 2229-1142\nWhatsApp: (11) 96464-2712\n\nHor�rios:\nSegunda a Sexta: 09:00 - 18:00\nS�bado e Domingo: Fechado\n\nPara atendimento mais r�pido, prefira o WhatsApp.",
    ],

    servicos: [
      "Nossos Servi�os Jur�dicos:\n\nDireito Empresarial\n� Contratos comerciais\n� Compliance\n� Recupera��o judicial\n\nDireito de Fam�lia\n� Div�rcio e separa��o\n� Guarda de filhos\n� Pens�o aliment�cia\n\nDireito Civil\n� Contratos\n� Indeniza��es\n� Responsabilidade civil\n\nDireito Criminal\n� Defesa criminal\n� Habeas corpus\n� Recursos\n\nDireito Trabalhista\n� Rescis�es\n� Horas extras\n� Ass�dio moral\n\nDireito Previdenci�rio\n� Aposentadorias\n� Aux�lio-doen�a\n� Revis�es INSS",
      "Atuamos em 6 grandes �reas: Empresarial, Fam�lia, Civil, Criminal, Trabalhista e Previdenci�rio. Qual �rea te interessa?",
    ],

    consulta: [
      "Como Agendar sua Consulta:\n\n1. WhatsApp (Mais R�pido)\n   (11) 96464-2712\n\n2. Telefone\n   (11) 2229-1142\n\n3. Formul�rio Online\n   Preencha em nosso site\n\n4. Presencialmente\n   R. Dom Pedro II, 157 - Centro, Guarulhos\n\nHor�rios dispon�veis:\nSegunda a Sexta: 09h �s 18h\n\nPrimeira consulta: Orienta��o sobre seu caso",
    ],

    horario: [
      "Hor�rio de Funcionamento:\n\nSegunda a Sexta: 09:00 - 18:00\nS�bado e Domingo: Fechado\n\nWhatsApp:\nAtendimento no mesmo hor�rio\n\nAtendimento Presencial:\nDe segunda a sexta\nPrefer�vel com agendamento\n\nEmerg�ncias:\nEntre em contato pelo WhatsApp",
    ],

    contato: [
      "?? **Todos os nossos Contatos:**\n\n? **WhatsApp:** (11) 96464-2712\n?? **Fixo:** (11) 2229-1142\n?? **E-mail:** advocaciabeloeolimpo@gmail.com\n\n?? **Endere�o:**\nR. Dom Pedro II, n� 157\n2� andar - Sala 5\nCentro - Guarulhos/SP\nCEP: 07011-003\n\n?? **Acesso:**\nF�cil acesso por transporte p�blico\nPr�ximo ao centro de Guarulhos",
    ],

    valores: [
      "Formas de Pagamento:\n\nParcelamento:\n� At� 12x no cart�o\n� D�bito autom�tico\n� Boleto banc�rio\n\nHonor�rios de �xito:\n� Voc� s� paga se ganhar\n� Dispon�vel em casos espec�ficos\n� Sem riscos para voc�\n\nConsulta Inicial:\n� Or�amento personalizado\n� An�lise gratuita do caso\n� Estrat�gia jur�dica\n\nOr�amento: Ligue (11) 96464-2712",
    ],

    localizacao: [
      "?? **Nossa Localiza��o:**\n\n?? **Endere�o Completo:**\nRua Dom Pedro II, n� 157\n2� andar - Sala 5\nCentro - Guarulhos/SP\nCEP: 07011-003\n\n?? **Como Chegar:**\n� Centro de Guarulhos\n� F�cil acesso por �nibus\n� Pr�ximo a bancos e com�rcio\n� Estacionamento na regi�o\n\n??? **Refer�ncias:**\n� Pr�ximo � Prefeitura\n� Centro hist�rico de Guarulhos\n� Regi�o comercial movimentada",
    ],

    previdenciario: [
      "??? **Direito Previdenci�rio - Especialistas em INSS:**\n\n? **Aposentadorias:**\n� Por idade\n� Por tempo de contribui��o\n� Por invalidez\n� Especial (insalubridade)\n\n?? **Benef�cios por Incapacidade:**\n� Aux�lio-doen�a\n� Aux�lio-acidente\n� Aposentadoria por invalidez\n\n??????????? **Benef�cios Familiares:**\n� Pens�o por morte\n� Aux�lio-reclus�o\n� Sal�rio-maternidade\n\n?? **Revis�es e Recursos:**\n� Revis�o de benef�cios\n� Recursos administrativos\n� A��es judiciais\n\n?? **Nossa Taxa de Sucesso:** 95% nos casos previdenci�rios!",
    ],

    // �REAS ESPEC�FICAS
    familia: [
      "??????????? **Direito de Fam�lia - Dra. Bianca Belo:**\n\n?? **Div�rcio e Separa��o:**\n� Consensual ou litigioso\n� Partilha de bens\n� Guarda de filhos\n\n?? **Pens�o Aliment�cia:**\n� Fixa��o de valores\n� Revis�o de pens�o\n� Execu��o de alimentos\n\n?? **Guarda de Filhos:**\n� Guarda unilateral\n� Guarda compartilhada\n� Regulamenta��o de visitas\n\n?? **Outros Servi�os:**\n� Reconhecimento de paternidade\n� Ado��o\n� Uni�o est�vel\n\n????? **Atendimento humanizado pela Dra. Bianca!**",
    ],

    empresarial: [
      "?? **Direito Empresarial - Dr. Matheus Ol?mpio:**\n\n?? **Contratos:**\n� Elabora��o e revis�o\n� Contratos comerciais\n� Parcerias empresariais\n\n??? **Compliance:**\n� Adequa��o legal\n� Pol�ticas internas\n� Preven��o de riscos\n\n?? **Recupera��o Judicial:**\n� An�lise de viabilidade\n� Plano de recupera��o\n� Negocia��o com credores\n\n?? **Lit�gios Empresariais:**\n� Disputas contratuais\n� Cobran�as\n� A��es indenizat�rias\n\n????? **Experi�ncia corporativa do Dr. Matheus!**",
    ],

    criminal: [
      "?? **Direito Criminal - Dr. Matheus Ol?mpio:**\n\n??? **Defesa Criminal:**\n� Crimes contra pessoa\n� Crimes patrimoniais\n� Crimes empresariais\n\n?? **Procedimentos:**\n� Habeas corpus\n� Recursos criminais\n� Liberdade provis�ria\n\n?? **Crimes Empresariais:**\n� Sonega��o fiscal\n� Lavagem de dinheiro\n� Crimes contra economia\n\n????? **Investiga��es:**\n� Acompanhamento policial\n� Inqu�ritos\n� Audi�ncias\n\n?? **Estrat�gia t�cnica do Dr. Matheus!**",
    ],

    default: [
      "N�o entendi sua pergunta. Posso ajudar com:\n\n� Informa��es sobre nossos advogados\n� WhatsApp e contatos\n� Nossos servi�os jur�dicos\n� Agendamento de consultas\n� Formas de pagamento\n� Localiza��o do escrit�rio\n\nOu entre em contato: (11) 96464-2712",
      "Para d�vidas espec�ficas, fale diretamente com nossa equipe:\n� WhatsApp: (11) 96464-2712\n� Telefone: (11) 2229-1142\n\nEstamos prontos para ajudar.",
    ],
  },

  keywords: {
    saudacao: [
      "oi",
      "ol�",
      "hello",
      "hi",
      "bom dia",
      "boa tarde",
      "boa noite",
      "ola",
    ],
    advogados: [
      "advogados",
      "advogado",
      "s�cios",
      "s�cio",
      "equipe",
      "profissionais",
      "quem s�o",
      "nomes",
      "especialistas",
    ],
    bianca: ["bianca", "belo", "dra bianca", "dr� bianca", "doutora bianca"],
    matheus: ["matheus", "Ol?mpio", "dr matheus", "doutor matheus"],
    whatsapp: ["whatsapp", "whats", "zap", "wpp", "n�mero", "celular", "96464"],
    telefone: ["telefone", "fone", "ligar", "n�mero", "contato", "2229"],
    servicos: [
      "servi�os",
      "servi�o",
      "oferece",
      "atua",
      "�rea",
      "especialidade",
      "direito",
      "advocacia",
    ],
    familia: [
      "fam�lia",
      "div�rcio",
      "separa��o",
      "guarda",
      "pens�o",
      "alimentos",
      "casamento",
    ],
    empresarial: [
      "empresarial",
      "empresa",
      "comercial",
      "contrato",
      "sociedade",
      "compliance",
    ],
    criminal: [
      "criminal",
      "crime",
      "penal",
      "delegacia",
      "pris�o",
      "habeas",
      "defesa",
    ],
    consulta: [
      "consulta",
      "agendar",
      "marcar",
      "atendimento",
      "reuni�o",
      "encontro",
    ],
    horario: [
      "hor�rio",
      "funcionamento",
      "aberto",
      "atende",
      "horarios",
      "funciona",
    ],
    contato: [
      "contato",
      "telefone",
      "endere�o",
      "localiza��o",
      "onde",
      "como falar",
    ],
    valores: [
      "valor",
      "pre�o",
      "custo",
      "honor�rio",
      "pagamento",
      "quanto",
      "custa",
    ],
    localizacao: [
      "onde",
      "localiza��o",
      "endere�o",
      "fica",
      "local",
      "como chegar",
      "guarulhos",
    ],
    previdenciario: [
      "aposentadoria",
      "inss",
      "benef�cio",
      "previd�ncia",
      "aux�lio",
      "pens�o",
      "previdenci�rio",
    ],
  },
};

// Chatbot Toggle
chatbotToggle.addEventListener("click", () => {
  chatbotContainer.classList.add("active");
  const badge = chatbotToggle.querySelector(".notification-badge");
  if (badge) badge.style.display = "none";
});

chatbotClose.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();
  chatbotContainer.classList.remove("active");
  console.log("Chatbot fechado"); // Para debug
});

// Chatbot Message Sending
const sendMessage = () => {
  const message = chatbotInput.value.trim();
  if (message) {
    addMessage(message, "user");
    chatbotInput.value = "";

    // Simulate typing delay
    setTimeout(() => {
      const response = getBotResponse(message);
      addMessage(response, "bot");
    }, 1000);
  }
};

chatbotSend.addEventListener("click", sendMessage);

chatbotInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    sendMessage();
  }
});

// Quick Options
quickOptions.forEach((option) => {
  option.addEventListener("click", () => {
    const message = option.getAttribute("data-message");
    addMessage(message, "user");

    setTimeout(() => {
      const response = getBotResponse(message);
      addMessage(response, "bot");
    }, 1000);
  });
});

// Add Message to Chat
const addMessage = (message, sender) => {
  const messageDiv = document.createElement("div");
  messageDiv.className = `chatbot-message ${sender}-message`;

  const avatar = document.createElement("div");
  avatar.className = "message-avatar";
  avatar.innerHTML =
    sender === "bot"
      ? '<i class="fas fa-robot"></i>'
      : '<i class="fas fa-user"></i>';

  const content = document.createElement("div");
  content.className = "message-content";
  content.innerHTML = `<p>${message.replace(/\n/g, "<br>")}</p>`;

  messageDiv.appendChild(avatar);
  messageDiv.appendChild(content);

  chatbotMessages.appendChild(messageDiv);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
};

// Get Bot Response
const getBotResponse = (userMessage) => {
  const message = userMessage.toLowerCase();

  // Check for keywords
  for (const [category, keywords] of Object.entries(chatbotData.keywords)) {
    if (keywords.some((keyword) => message.includes(keyword))) {
      const responses = chatbotData.responses[category];
      return responses[Math.floor(Math.random() * responses.length)];
    }
  }

  // Default response
  const defaultResponses = chatbotData.responses.default;
  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
};

// Form Input Animations
const formInputs = document.querySelectorAll(
  ".form-group input, .form-group select, .form-group textarea"
);

formInputs.forEach((input) => {
  // Check if input has value on page load
  if (input.value) {
    input.classList.add("has-value");
  }

  input.addEventListener("focus", () => {
    input.parentElement.classList.add("focused");
  });

  input.addEventListener("blur", () => {
    input.parentElement.classList.remove("focused");
    if (input.value) {
      input.classList.add("has-value");
    } else {
      input.classList.remove("has-value");
    }
  });

  input.addEventListener("input", () => {
    if (input.value) {
      input.classList.add("has-value");
    } else {
      input.classList.remove("has-value");
    }
  });
});

// Phone Number Formatting
const phoneInput = document.getElementById("phone");
if (phoneInput) {
  phoneInput.addEventListener("input", (e) => {
    let value = e.target.value.replace(/\D/g, "");

    if (value.length >= 11) {
      value = value.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    } else if (value.length >= 10) {
      value = value.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
    } else if (value.length >= 6) {
      value = value.replace(/(\d{2})(\d{4})(\d+)/, "($1) $2-$3");
    } else if (value.length >= 2) {
      value = value.replace(/(\d{2})(\d+)/, "($1) $2");
    }

    e.target.value = value;
  });
}

// Enhanced Lazy Loading for Images
const lazyImages = document.querySelectorAll("img[data-src]");

const imageObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;

        // Create a new image to preload
        const newImg = new Image();
        newImg.onload = () => {
          img.src = img.dataset.src;
          img.classList.add("loaded");
          img.classList.remove("lazy");

          // Track lazy load event
          if (typeof gtag !== "undefined") {
            gtag("event", "image_load", {
              event_category: "performance",
              event_label: "lazy_loaded",
              custom_parameter_1: img.alt || "unknown",
            });
          }
        };

        newImg.onerror = () => {
          console.warn("Failed to load image:", img.dataset.src);
          img.classList.add("loaded"); // Remove loading state even on error
        };

        newImg.src = img.dataset.src;
        observer.unobserve(img);
      }
    });
  },
  {
    rootMargin: "50px 0px", // Start loading 50px before the image enters the viewport
    threshold: 0.01,
  }
);

// Observe all lazy images
lazyImages.forEach((img) => {
  imageObserver.observe(img);
});

// Enhanced Image Optimization
const optimizeImages = () => {
  // Preload critical images (above the fold)
  const criticalImages = document.querySelectorAll("img:not(.lazy)");
  criticalImages.forEach((img) => {
    if (img.src && !img.complete) {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = img.src;
      document.head.appendChild(link);
    }
  });

  // Add progressive loading for large images
  const largeImages = document.querySelectorAll(".service-bg, .partner-photo");
  largeImages.forEach((img) => {
    img.addEventListener("load", function () {
      this.style.filter = "blur(0px)";
      this.classList.add("loaded");
    });

    img.addEventListener("error", function () {
      // Fallback to a smaller version or placeholder
      this.src =
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23999'%3EImagem indisponível%3C/text%3E%3C/svg%3E";
    });
  });

  // Defer loading of non-critical images
  setTimeout(() => {
    const deferredImages = document.querySelectorAll("img[loading='lazy']");
    deferredImages.forEach((img) => {
      if (img.dataset.src && !img.src.includes(img.dataset.src)) {
        img.src = img.dataset.src;
      }
    });
  }, 1000);

  // Optimize for slow connections
  if ("connection" in navigator) {
    const connection = navigator.connection;
    if (
      connection.effectiveType === "slow-2g" ||
      connection.effectiveType === "2g"
    ) {
      // Reduce image quality for slow connections
      const images = document.querySelectorAll("img");
      images.forEach((img) => {
        img.style.filter = "contrast(0.9) brightness(0.9)";
        img.loading = "lazy";
      });

      // Disable video autoplay on slow connections
      const video = document.querySelector(".hero-video");
      if (video) {
        video.autoplay = false;
        video.preload = "none";
      }
    }
  }
};

// Run optimizations on page load
window.addEventListener("load", optimizeImages);

// Smooth Scrolling to Top
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

// Add scroll to top button (optional)
const createScrollToTopButton = () => {
  const button = document.createElement("button");
  button.innerHTML = '<i class="fas fa-arrow-up"></i>';
  button.className = "scroll-to-top";
  button.style.cssText = `
        position: fixed;
        bottom: 2rem;
        left: 2rem;
        width: 50px;
        height: 50px;
        background: var(--gradient-primary);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: var(--transition);
        z-index: 999;
    `;

  button.addEventListener("click", scrollToTop);
  document.body.appendChild(button);

  window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
      button.style.opacity = "1";
      button.style.visibility = "visible";
    } else {
      button.style.opacity = "0";
      button.style.visibility = "hidden";
    }
  });
};

// Initialize scroll to top button
createScrollToTopButton();

// Performance Optimization
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Debounced scroll handlers
const debouncedScrollHandler = debounce(() => {
  animateOnScroll();
}, 10);

window.removeEventListener("scroll", animateOnScroll);
window.addEventListener("scroll", debouncedScrollHandler);

// Loading Animation (if needed)
const showLoading = (element) => {
  element.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Carregando...';
};

const hideLoading = (element, originalContent) => {
  element.innerHTML = originalContent;
};

// Tecnological Particles Effect - Disabled to prevent empty circles
const createTechParticles = () => {
  // Temporarily disabled to fix empty circle issue
  return;

  const heroSection = document.querySelector(".hero");
  if (!heroSection) return;

  const particlesContainer = document.createElement("div");
  particlesContainer.className = "tech-particles";
  particlesContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
    `;

  // Create floating particles
  for (let i = 0; i < 15; i++) {
    const particle = document.createElement("div");
    particle.className = "tech-particle";

    const size = Math.random() * 4 + 2;
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const duration = Math.random() * 10 + 8;
    const delay = Math.random() * 5;

    particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(255, 255, 255, 0.6);
            border-radius: 50%;
            left: ${x}%;
            top: ${y}%;
            animation: techParticleFloat ${duration}s ease-in-out infinite ${delay}s;
            box-shadow: 0 0 ${size * 2}px rgba(255, 255, 255, 0.3);
        `;

    particlesContainer.appendChild(particle);
  }

  heroSection.appendChild(particlesContainer);

  // Add CSS animation for particles
  if (!document.getElementById("tech-particles-styles")) {
    const style = document.createElement("style");
    style.id = "tech-particles-styles";
    style.textContent = `
            @keyframes techParticleFloat {
                0%, 100% {
                    transform: translateY(0px) translateX(0px) scale(1);
                    opacity: 0.6;
                }
                25% {
                    transform: translateY(-20px) translateX(10px) scale(1.2);
                    opacity: 1;
                }
                50% {
                    transform: translateY(-40px) translateX(-5px) scale(0.8);
                    opacity: 0.8;
                }
                75% {
                    transform: translateY(-20px) translateX(-10px) scale(1.1);
                    opacity: 1;
                }
            }
        `;
    document.head.appendChild(style);
  }
};

// Header Tech Lines Animation
const createHeaderTechLines = () => {
  const header = document.querySelector(".header");
  if (!header) return;

  const linesContainer = document.createElement("div");
  linesContainer.className = "tech-lines-container";
  linesContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        overflow: hidden;
    `;

  // Create animated tech lines
  for (let i = 0; i < 3; i++) {
    const line = document.createElement("div");
    line.className = "tech-line";

    const width = Math.random() * 100 + 50;
    const duration = Math.random() * 8 + 6;
    const delay = Math.random() * 3;

    line.style.cssText = `
            position: absolute;
            height: 1px;
            width: ${width}%;
            background: linear-gradient(90deg, 
                transparent 0%, 
                rgba(30, 58, 138, 0.3) 50%, 
                transparent 100%);
            top: ${20 + i * 30}%;
            left: -100%;
            animation: techLineMove ${duration}s ease-in-out infinite ${delay}s;
        `;

    linesContainer.appendChild(line);
  }

  header.appendChild(linesContainer);

  // Add CSS animation for tech lines
  if (!document.getElementById("tech-lines-styles")) {
    const style = document.createElement("style");
    style.id = "tech-lines-styles";
    style.textContent = `
            @keyframes techLineMove {
                0% {
                    transform: translateX(-100%);
                    opacity: 0;
                }
                10% {
                    opacity: 1;
                }
                90% {
                    opacity: 1;
                }
                100% {
                    transform: translateX(200%);
                    opacity: 0;
                }
            }
        `;
    document.head.appendChild(style);
  }
};

// Initialize page
document.addEventListener("DOMContentLoaded", () => {
  // Add any initialization code here
  console.log("Belo&Olimpo Advocacia - Site carregado com sucesso!");

  // Initialize tech effects
  // createTechParticles(); // Disabled to prevent empty circles
  createHeaderTechLines();

  // Preload critical images
  const criticalImages = [
    // Add any critical image paths here
  ];

  criticalImages.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
});

// Service Worker Registration (for PWA features if needed)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    // Uncomment if you want to add PWA functionality
    // navigator.serviceWorker.register('/sw.js')
    //     .then(registration => console.log('SW registered'))
    //     .catch(error => console.log('SW registration failed'));
  });
}

// Error Handling
window.addEventListener("error", (e) => {
  console.error("Erro capturado:", e.error);
  // You could send error reports to a service here
});

// Unhandled Promise Rejections
window.addEventListener("unhandledrejection", (e) => {
  console.error("Promise rejeitada:", e.reason);
  e.preventDefault();
});

// FAQ Accordion Functionality
const faqQuestions = document.querySelectorAll(".faq-question");

faqQuestions.forEach((question) => {
  question.addEventListener("click", () => {
    const faqItem = question.parentElement;
    const answerId = question.dataset.toggle;
    const answer = document.getElementById(answerId);

    // Close all other FAQ items
    document.querySelectorAll(".faq-item").forEach((item) => {
      if (item !== faqItem) {
        item.classList.remove("active");
      }
    });

    // Toggle current FAQ item
    faqItem.classList.toggle("active");

    // Track FAQ interaction
    if (typeof gtag !== "undefined") {
      gtag("event", "faq_interaction", {
        event_category: "engagement",
        event_label: answerId,
        custom_parameters: {
          action: faqItem.classList.contains("active") ? "open" : "close",
        },
      });
    }
  });
});

// Google Analytics 4 Event Tracking
const trackEvent = (eventName, parameters = {}) => {
  if (typeof gtag !== "undefined") {
    gtag("event", eventName, {
      ...parameters,
      custom_parameter_1: parameters.service_type || "general",
    });
  }
};

// Track page scroll depth
let maxScrollDepth = 0;
window.addEventListener("scroll", () => {
  const scrollTop = window.pageYOffset;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = Math.round((scrollTop / docHeight) * 100);

  if (scrollPercent > maxScrollDepth && scrollPercent % 25 === 0) {
    maxScrollDepth = scrollPercent;
    trackEvent("scroll_depth", {
      event_category: "engagement",
      event_label: `${scrollPercent}%`,
      value: scrollPercent,
    });
  }
});

// Track contact form submissions
contactForm.addEventListener("submit", (e) => {
  trackEvent("contact_form_submit", {
    event_category: "conversion",
    event_label: "main_contact_form",
  });
});

// Track WhatsApp button clicks
document.querySelector(".whatsapp-button").addEventListener("click", () => {
  trackEvent("whatsapp_click", {
    event_category: "conversion",
    event_label: "floating_whatsapp",
  });
});

// Track service card clicks
document.querySelectorAll(".service-card").forEach((card, index) => {
  card.addEventListener("click", () => {
    const serviceType = card.querySelector("h3").textContent;
    trackEvent("service_card_click", {
      event_category: "engagement",
      event_label: serviceType,
      service_type: serviceType.toLowerCase().replace(/\s+/g, "_"),
    });
  });
});

// Track chatbot interactions
chatbotToggle.addEventListener("click", () => {
  trackEvent("chatbot_open", {
    event_category: "engagement",
    event_label: "chatbot_toggle",
  });
});

// Track time spent on page
let startTime = Date.now();
window.addEventListener("beforeunload", () => {
  const timeSpent = Math.round((Date.now() - startTime) / 1000);
  trackEvent("time_on_page", {
    event_category: "engagement",
    event_label: "page_unload",
    value: timeSpent,
  });
});

// Track outbound link clicks
document.querySelectorAll('a[href^="http"]').forEach((link) => {
  link.addEventListener("click", () => {
    trackEvent("outbound_link_click", {
      event_category: "engagement",
      event_label: link.href,
    });
  });
});

// Service Worker Registration
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log(
          "[Service Worker] Registered successfully:",
          registration.scope
        );

        // Check for updates
        registration.addEventListener("updatefound", () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener("statechange", () => {
              if (
                newWorker.state === "installed" &&
                navigator.serviceWorker.controller
              ) {
                // New version available
                if (confirm("Nova vers�o dispon�vel! Deseja atualizar?")) {
                  window.location.reload();
                }
              }
            });
          }
        });

        // Handle offline/online status
        window.addEventListener("online", () => {
          console.log("[Service Worker] Back online");
          trackEvent("network_status", {
            event_category: "technical",
            event_label: "online",
          });
        });

        window.addEventListener("offline", () => {
          console.log("[Service Worker] Gone offline");
          trackEvent("network_status", {
            event_category: "technical",
            event_label: "offline",
          });
        });
      })
      .catch((error) => {
        console.error("[Service Worker] Registration failed:", error);
      });
  });
}

// Performance Monitoring
if ("PerformanceObserver" in window) {
  // Monitor Largest Contentful Paint (LCP)
  const lcpObserver = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    const lastEntry = entries[entries.length - 1];
    console.log("[Performance] LCP:", lastEntry.startTime);
    trackEvent("web_vitals", {
      event_category: "performance",
      event_label: "lcp",
      value: Math.round(lastEntry.startTime),
    });
  });
  lcpObserver.observe({ entryTypes: ["largest-contentful-paint"] });

  // Monitor First Input Delay (FID)
  const fidObserver = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    entries.forEach((entry) => {
      console.log(
        "[Performance] FID:",
        entry.processingStart - entry.startTime
      );
      trackEvent("web_vitals", {
        event_category: "performance",
        event_label: "fid",
        value: Math.round(entry.processingStart - entry.startTime),
      });
    });
  });
  fidObserver.observe({ entryTypes: ["first-input"] });

  // Monitor Cumulative Layout Shift (CLS)
  let clsValue = 0;
  const clsObserver = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    entries.forEach((entry) => {
      if (!entry.hadRecentInput) {
        clsValue += entry.value;
      }
    });
    console.log("[Performance] CLS:", clsValue);
  });
  clsObserver.observe({ entryTypes: ["layout-shift"] });

  // Report CLS on page unload
  window.addEventListener("beforeunload", () => {
    trackEvent("web_vitals", {
      event_category: "performance",
      event_label: "cls",
      value: Math.round(clsValue * 1000),
    });
  });
}

// V�deo de Fundo - Funcionalidades
document.addEventListener("DOMContentLoaded", function () {
  const heroVideo = document.querySelector(".hero-video");

  if (heroVideo) {
    // Detectar quando o v�deo est� carregado
    heroVideo.addEventListener("loadeddata", function () {
      console.log("V�deo de fundo carregado com sucesso");
      heroVideo.classList.add("loaded");
      const loadingIndicator = document.querySelector(".video-loading");
      if (loadingIndicator) {
        loadingIndicator.classList.add("hidden");
      }
    });

    // Fallback caso o v�deo n�o carregue
    heroVideo.addEventListener("error", function () {
      console.log("Erro ao carregar v�deo, usando fallback");
      heroVideo.style.display = "none";
      document.querySelector(".hero").style.backgroundImage =
        "url('imagens/fundo.jpg')";
    });

    // Pausar v�deo quando a p�gina n�o est� vis�vel (economiza bateria)
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) {
        heroVideo.pause();
      } else {
        heroVideo.play();
      }
    });

    // Detectar conex�o lenta e desabilitar v�deo
    if ("connection" in navigator) {
      const connection = navigator.connection;
      if (
        connection.effectiveType === "slow-2g" ||
        connection.effectiveType === "2g"
      ) {
        heroVideo.style.display = "none";
        document.querySelector(".hero").style.backgroundImage =
          "url('imagens/fundo.jpg')";
      }
    }
  }
});

// Initialize EmailJS
(function () {
  // Inicializar EmailJS quando disponível
  if (typeof emailjs !== "undefined") {
    emailjs.init("YOUR_PUBLIC_KEY_HERE"); // Substituir pela chave pública do EmailJS
  }
})();

// Send email notification using EmailJS
function sendEmailNotification(data) {
  if (typeof emailjs === "undefined") {
    // Se EmailJS não estiver carregado, rejeitar promise
    return Promise.reject("EmailJS não carregado");
  }

  return emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
    from_name: data.name,
    from_email: data.email,
    phone: data.phone,
    service: data.service,
    message: data.message,
    to_email: "advocaciabeloeolimpio@gmail.com", // Email do escritório
    reply_to: data.email,
    subject: `Novo contato do site - ${data.service}`,
  });
}

// Send to WhatsApp with formatted message
function sendToWhatsApp(data) {
  const phoneNumber = "5511964642712"; // WhatsApp do escritório

  const serviceNames = {
    empresarial: "Direito Empresarial",
    civil: "Direito Civil",
    criminal: "Direito Criminal",
    trabalhista: "Direito Trabalhista",
    previdenciario: "Direito Previdenciário",
    imobiliario: "Direito Imobiliário",
    outro: "Outra área",
  };

  const serviceName = serviceNames[data.service] || data.service;

  const message = `🏛️ *NOVO CONTATO - BELO&OLÍMPIO ADVOCACIA*

👤 *Nome:* ${data.name}
📧 *Email:* ${data.email}
📞 *Telefone:* ${data.phone}
⚖️ *Área de Interesse:* ${serviceName}

💬 *Mensagem:*
${data.message}

---
_Enviado através do site oficial_`;

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  // Open WhatsApp in new tab
  window.open(whatsappUrl, "_blank");
}

// Clear form validation errors
function clearFormErrors() {
  if (contactForm) {
    setTimeout(() => {
      const errorGroups = contactForm.querySelectorAll(
        ".modern-form-group.error"
      );
      errorGroups.forEach((group) => group.classList.remove("error"));
    }, 100);
  }
}
