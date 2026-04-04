export type Lang = "pt" | "en" | "es";

export const translations: Record<Lang, Record<string, string>> = {
  pt: {
    // Navbar
    "nav.concept": "Conceito",
    "nav.location": "Localização",
    "nav.apartments": "Apartamentos",
    "nav.amenities": "Amenidades",
    "nav.contact": "Contacto",

    // Hero
    "hero.welcome": "Bem-vindo",
    "hero.scroll": "Scroll Down",

    // About
    "about.label": "O Conceito",
    "about.title1": "A Arte de Viver",
    "about.title2": "o Seu Melhor",
    "about.p1": "O Elocuente é um novo empreendimento residencial distribuído por dois edifícios, localizado na Rua do Fagundo, em Albergaria entre Leiria e Marinha Grande. O projecto de arquitectura é assinado pelo atelier Tiago Frazão Arquitetos.",
    "about.p2": "Linhas contemporâneas, varandas generosas e integração paisagística definem este projecto singular. Cada apartamento foi pensado para maximizar a luz natural e o conforto.",
    "about.cta1": "Pedir Informações",
    "about.cta2": "Ver Apartamentos",
    "about.locationLabel": "Localização Privilegiada",
    "about.locationText": "Estar ligado ao mundo nunca foi tão simples. Com acessos imediatos à A8 e A17, o Elocuente oferece a mobilidade ideal para profissionais modernos e cidadãos globais. A apenas 10 minutos de Leiria e a uma curta viagem de Lisboa, vive-se aqui a tranquilidade de uma vila com a rapidez de uma metrópole.",
    "about.locationLink": "Ver Localização",

    // Gallery
    "gallery.label": "Galeria",
    "gallery.title": "Imagens do projecto",
    "gallery.count": "imagens",

    // Apartments
    "apartments.label": "Apartamentos",
    "apartments.title": "Uma Escolha Natural",
    "apartments.desc": "O Elocuente oferece tipologias T2 e T3, cada uma um testemunho de conforto e estética natural.",
    "apartments.cta": "Pedir Plantas",
    "apartments.t2.price": "Desde 290.000€",
    "apartments.t2.desc": "Apartamentos com sala e cozinha open-space, dois quartos, casa de banho completa e varandas generosas com excelente exposição solar.",
    "apartments.t3.price": "Sob consulta",
    "apartments.t3.desc": "Três quartos, amplos espaços de convívio familiar, duas casas de banho e varanda privativa com vista desafogada.",

    // Availability
    "availability.label": "Disponibilidades",
    "availability.title": "Fracções Disponíveis",
    "availability.desc": "Consulte as fracções disponíveis nos dois edifícios do Elocuente. Filtre por edifício, tipologia ou estado.",
    "availability.allBuildings": "Todos os edifícios",
    "availability.allTypes": "Todas as tipologias",
    "availability.allStatus": "Todos os estados",
    "availability.building": "Edifício",
    "availability.groundFloor": "R/C",
    "availability.status.available": "Disponível",
    "availability.status.reserved": "Reservado",
    "availability.status.sold": "Vendido",
    "availability.col.id": "Fracção",
    "availability.col.building": "Edifício",
    "availability.col.floor": "Piso",
    "availability.col.type": "Tipologia",
    "availability.col.area": "Área",
    "availability.col.balcony": "Varanda",
    "availability.col.parking": "Estac.",
    "availability.col.orientation": "Orientação",
    "availability.col.status": "Estado",
    "availability.inquire": "Informações",
    "availability.noResults": "Nenhuma fracção encontrada com os filtros seleccionados.",

    // Amenities
    "amenities.label": "Amenidades",
    "amenities.title": "Conforto & Privacidade",
    "amenities.desc": "Cada detalhe foi pensado para oferecer qualidade de vida excepcional, com espaços comuns que complementam a experiência residencial.",
    "amenities.gardens": "Jardins",
    "amenities.gardens.desc": "Áreas verdes paisagísticas comuns, desenhadas para promover momentos de convívio e relaxamento ao ar livre.",
    "amenities.parking": "Estacionamento",
    "amenities.parking.desc": "24 lugares de estacionamento privativos em cave, garantindo comodidade e segurança para todos os residentes.",
    "amenities.balconies": "Varandas",
    "amenities.balconies.desc": "Varandas generosas com vegetação integrada, prolongando o espaço interior e criando áreas de estar ao ar livre.",
    "amenities.security": "Segurança",
    "amenities.security.desc": "Sistema de controlo de acessos e vigilância, para a tranquilidade de todos os moradores.",

    // Location
    "location.label": "Localização",
    "location.desc": "Localização estratégica em Albergaria, entre Leiria e Marinha Grande, com acessos privilegiados a praias, cidade e autoestradas.",
    "location.leiria": "Centro de Leiria",
    "location.beach": "Praia de São Pedro de Moel",
    "location.nazare": "Nazaré (Canyon & Surf)",
    "location.airport": "Aeroporto de Lisboa",
    "location.highways": "Acessos A8 / A17",
    "location.cta": "Ver no Google Maps",

    // Contact
    "contact.label": "Contacto",
    "contact.title1": "Manifeste o",
    "contact.title2": "seu Interesse",
    "contact.desc": "Preencha o formulário e a nossa equipa comercial entrará em contacto consigo para mais informações sobre o Elocuente.",
    "contact.name": "Nome completo",
    "contact.email": "Email",
    "contact.phone": "Telefone",
    "contact.typology": "Tipologia de interesse",
    "contact.message": "Mensagem (opcional)",
    "contact.submit": "Enviar Pedido",
    "contact.success": "Obrigado pelo seu interesse! Entraremos em contacto brevemente.",

    // Footer
    "footer.rights": "© 2026 Elocuente. Todos os direitos reservados.",
    "footer.architect": "Arquitectura: Tiago Frazão Arquitetos",
  },
  en: {
    // Navbar
    "nav.concept": "Concept",
    "nav.location": "Location",
    "nav.apartments": "Apartments",
    "nav.amenities": "Amenities",
    "nav.contact": "Contact",

    // Hero
    "hero.welcome": "Welcome",
    "hero.scroll": "Scroll Down",

    // About
    "about.label": "The Concept",
    "about.title1": "The Art of Living",
    "about.title2": "at Your Best",
    "about.p1": "Elocuente is a new residential development spread across two buildings, located on Rua do Fagundo, in Albergaria between Leiria and Marinha Grande. The architectural project is signed by Tiago Frazão Arquitetos.",
    "about.p2": "Contemporary lines, generous balconies and landscape integration define this unique project. Each apartment was designed to maximize natural light and comfort.",
    "about.cta1": "Request Information",
    "about.cta2": "View Apartments",
    "about.locationLabel": "Privileged Location",
    "about.locationText": "In a residential area in Albergaria, close to Marinha Grande, with excellent road access and proximity to services and commerce. The perfect balance between tranquility and urban convenience.",
    "about.locationLink": "View Location",

    // Gallery
    "gallery.label": "Gallery",
    "gallery.title": "Project Images",
    "gallery.count": "images",

    // Apartments
    "apartments.label": "Apartments",
    "apartments.title": "A Natural Choice",
    "apartments.desc": "Elocuente offers T2 and T3 typologies, each a testament to comfort and natural aesthetics.",
    "apartments.cta": "Request Floor Plans",
    "apartments.t2.price": "From €290,000",
    "apartments.t2.desc": "Apartments with open-space living room and kitchen, two bedrooms, full bathroom and generous balconies with excellent sun exposure.",
    "apartments.t3.price": "On request",
    "apartments.t3.desc": "Three bedrooms, spacious family living areas, two bathrooms and a private balcony with open views.",

    // Availability
    "availability.label": "Availabilities",
    "availability.title": "Available Units",
    "availability.desc": "Browse the available units across both Elocuente buildings. Filter by building, typology or status.",
    "availability.allBuildings": "All buildings",
    "availability.allTypes": "All typologies",
    "availability.allStatus": "All statuses",
    "availability.building": "Building",
    "availability.groundFloor": "Ground",
    "availability.status.available": "Available",
    "availability.status.reserved": "Reserved",
    "availability.status.sold": "Sold",
    "availability.col.id": "Unit",
    "availability.col.building": "Building",
    "availability.col.floor": "Floor",
    "availability.col.type": "Typology",
    "availability.col.area": "Area",
    "availability.col.balcony": "Balcony",
    "availability.col.parking": "Parking",
    "availability.col.orientation": "Orientation",
    "availability.col.status": "Status",
    "availability.inquire": "Inquire",
    "availability.noResults": "No units found with the selected filters.",

    // Amenities
    "amenities.label": "Amenities",
    "amenities.title": "Comfort & Privacy",
    "amenities.desc": "Every detail was designed to offer exceptional quality of life, with common spaces that complement the residential experience.",
    "amenities.gardens": "Gardens",
    "amenities.gardens.desc": "Landscaped common green areas, designed to promote moments of socializing and outdoor relaxation.",
    "amenities.parking": "Parking",
    "amenities.parking.desc": "24 private parking spaces in the basement, ensuring convenience and security for all residents.",
    "amenities.balconies": "Balconies",
    "amenities.balconies.desc": "Generous balconies with integrated vegetation, extending the interior space and creating outdoor living areas.",
    "amenities.security": "Security",
    "amenities.security.desc": "Access control and surveillance system, for the peace of mind of all residents.",

    // Location
    "location.label": "Location",
    "location.desc": "Strategic location in Albergaria, between Leiria and Marinha Grande, with privileged access to beaches, city and highways.",
    "location.leiria": "Leiria City Center",
    "location.beach": "São Pedro de Moel Beach",
    "location.nazare": "Nazaré (Canyon & Surf)",
    "location.airport": "Lisbon Airport",
    "location.highways": "A8 / A17 Highways",
    "location.cta": "View on Google Maps",

    // Contact
    "contact.label": "Contact",
    "contact.title1": "Express your",
    "contact.title2": "Interest",
    "contact.desc": "Fill in the form and our sales team will contact you with more information about Elocuente.",
    "contact.name": "Full name",
    "contact.email": "Email",
    "contact.phone": "Phone",
    "contact.typology": "Typology of interest",
    "contact.message": "Message (optional)",
    "contact.submit": "Submit Request",
    "contact.success": "Thank you for your interest! We will contact you shortly.",

    // Footer
    "footer.rights": "© 2026 Elocuente. All rights reserved.",
    "footer.architect": "Architecture: Tiago Frazão Arquitetos",
  },
  es: {
    // Navbar
    "nav.concept": "Concepto",
    "nav.location": "Ubicación",
    "nav.apartments": "Apartamentos",
    "nav.amenities": "Amenidades",
    "nav.contact": "Contacto",

    // Hero
    "hero.welcome": "Bienvenido",
    "hero.scroll": "Scroll Down",

    // About
    "about.label": "El Concepto",
    "about.title1": "El Arte de Vivir",
    "about.title2": "lo Mejor",
    "about.p1": "Elocuente es un nuevo desarrollo residencial distribuido en dos edificios, ubicado en Rua do Fagundo, en Albergaria entre Leiria y Marinha Grande. El proyecto arquitectónico está firmado por Tiago Frazão Arquitetos.",
    "about.p2": "Líneas contemporáneas, balcones generosos e integración paisajística definen este proyecto singular. Cada apartamento fue diseñado para maximizar la luz natural y el confort.",
    "about.cta1": "Solicitar Información",
    "about.cta2": "Ver Apartamentos",
    "about.locationLabel": "Ubicación Privilegiada",
    "about.locationText": "En una zona residencial en Albergaria, cerca de Marinha Grande, con buenos accesos por carretera y proximidad a servicios y comercio. El equilibrio perfecto entre tranquilidad y conveniencia urbana.",
    "about.locationLink": "Ver Ubicación",

    // Gallery
    "gallery.label": "Galería",
    "gallery.title": "Imágenes del proyecto",
    "gallery.count": "imágenes",

    // Apartments
    "apartments.label": "Apartamentos",
    "apartments.title": "Una Elección Natural",
    "apartments.desc": "Elocuente ofrece tipologías T2 y T3, cada una un testimonio de confort y estética natural.",
    "apartments.cta": "Solicitar Planos",
    "apartments.t2.price": "Desde 290.000€",
    "apartments.t2.desc": "Apartamentos con salón y cocina open-space, dos dormitorios, baño completo y balcones generosos con excelente exposición solar.",
    "apartments.t3.price": "Bajo consulta",
    "apartments.t3.desc": "Tres dormitorios, amplios espacios familiares, dos baños y balcón privado con vistas despejadas.",

    // Amenities
    "amenities.label": "Amenidades",
    "amenities.title": "Confort y Privacidad",
    "amenities.desc": "Cada detalle fue pensado para ofrecer una calidad de vida excepcional, con espacios comunes que complementan la experiencia residencial.",
    "amenities.gardens": "Jardines",
    "amenities.gardens.desc": "Áreas verdes paisajísticas comunes, diseñadas para promover momentos de convivencia y relajación al aire libre.",
    "amenities.parking": "Estacionamiento",
    "amenities.parking.desc": "24 plazas de estacionamiento privadas en sótano, garantizando comodidad y seguridad para todos los residentes.",
    "amenities.balconies": "Balcones",
    "amenities.balconies.desc": "Balcones generosos con vegetación integrada, ampliando el espacio interior y creando áreas de estar al aire libre.",
    "amenities.security": "Seguridad",
    "amenities.security.desc": "Sistema de control de accesos y vigilancia, para la tranquilidad de todos los residentes.",

    // Location
    "location.label": "Ubicación",
    "location.desc": "Ubicación estratégica en Albergaria, entre Leiria y Marinha Grande, con accesos privilegiados a playas, ciudad y autopistas.",
    "location.leiria": "Centro de Leiria",
    "location.beach": "Playa de São Pedro de Moel",
    "location.nazare": "Nazaré (Canyon & Surf)",
    "location.airport": "Aeropuerto de Lisboa",
    "location.highways": "Accesos A8 / A17",
    "location.cta": "Ver en Google Maps",

    // Contact
    "contact.label": "Contacto",
    "contact.title1": "Manifieste su",
    "contact.title2": "Interés",
    "contact.desc": "Rellene el formulario y nuestro equipo comercial se pondrá en contacto con usted para más información sobre Elocuente.",
    "contact.name": "Nombre completo",
    "contact.email": "Email",
    "contact.phone": "Teléfono",
    "contact.typology": "Tipología de interés",
    "contact.message": "Mensaje (opcional)",
    "contact.submit": "Enviar Solicitud",
    "contact.success": "¡Gracias por su interés! Nos pondremos en contacto pronto.",

    // Footer
    "footer.rights": "© 2026 Elocuente. Todos los derechos reservados.",
    "footer.architect": "Arquitectura: Tiago Frazão Arquitetos",
  },
};
