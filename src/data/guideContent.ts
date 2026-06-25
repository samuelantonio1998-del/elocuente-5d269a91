// Content for the long-form SEO guide "Living between Leiria and the Atlantic",
// available in PT / EN / ES. Facts are sourced; uncertain numbers are omitted.
// See `sources` at the bottom of each locale.

export type GuideLocale = "pt" | "en" | "es";

export interface GuideSection {
  id: string;
  title: string;
  paragraphs: string[];
}

export interface GuideContent {
  locale: GuideLocale;
  htmlLang: string;
  path: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  heroEyebrow: string;
  heroTitle: string;
  heroLead: string;
  publishedAt: string;
  updatedAt: string;
  sections: GuideSection[];
  ctaTitle: string;
  ctaDesc: string;
  ctaPrimary: string;
  ctaPrimaryHref: string;
  ctaSecondary: string;
  ctaSecondaryHref: string;
  sourcesLabel: string;
  sources: { label: string; href: string }[];
  backLabel: string;
}

const SOURCES = [
  { label: "Autoestrada A8 (Wikipédia / Brisa)", href: "https://en.wikipedia.org/wiki/A8_motorway_(Portugal)" },
  { label: "Autoestrada A17 — Litoral Centro", href: "https://pt.wikipedia.org/wiki/A17_(autoestrada)" },
  { label: "Hospital de Santo André — ULS da Região de Leiria", href: "https://www.ulsrl.min-saude.pt/hospital-de-santo-andre/" },
  { label: "Praias do concelho — CM Marinha Grande", href: "https://www.cm-mgrande.pt/pages/857" },
  { label: "São Pedro de Moel", href: "https://pt.wikipedia.org/wiki/S%C3%A3o_Pedro_de_Moel" },
  { label: "IRS Jovem 2025 — Portal das Finanças", href: "https://info.portaldasfinancas.gov.pt/pt/apoio_contribuinte/Folhetos_informativos/Documents/Folheto_IRS_jovem_2025.pdf" },
  { label: "New IRS Jovem model 2025 — gov.pt", href: "https://www2.gov.pt/en/noticias/novo-modelo-de-irs-jovem-em-2025" },
  { label: "Portugal individual tax — significant developments (PwC)", href: "https://taxsummaries.pwc.com/portugal/individual/significant-developments" },
];

export const GUIDE_PT: GuideContent = {
  locale: "pt",
  htmlLang: "pt-PT",
  path: "/guia/viver-marinha-grande-leiria",
  title: "Viver à porta do pinhal e do Atlântico",
  metaTitle: "Viver na Marinha Grande e em Leiria — guia 2026 | Elocuente 261",
  metaDescription:
    "Guia para viver à porta do pinhal de Leiria e do Atlântico: Marinha Grande, Pinhal de Leiria, praias, saúde, educação, IRS Jovem, NIF e processo de compra para compradores estrangeiros.",
  heroEyebrow: "Guia · Centro de Portugal",
  heroTitle: "Viver à porta do pinhal e do Atlântico",
  heroLead:
    "Marinha Grande fica entre a cidade de Leiria e a Costa de Prata, num planalto coberto pelo Pinhal de Leiria. É um sítio raro: à distância de minutos do trabalho, da praia e da floresta, com a calma de viver fora da cidade.",
  publishedAt: "2026-06-08",
  updatedAt: "2026-06-08",
  sections: [
    {
      id: "regiao",
      title: "A região: Marinha Grande, Pinhal de Leiria e Costa de Prata",
      paragraphs: [
        "Marinha Grande é uma cidade do distrito de Leiria, no Centro de Portugal, conhecida pela tradição vidreira e pela proximidade ao mar. O concelho estende-se desde a malha urbana, a poucos quilómetros de Leiria, até à orla costeira de São Pedro de Moel e Praia da Vieira, integralmente dentro do Pinhal de Leiria.",
        "O Pinhal de Leiria é uma das maiores manchas florestais contínuas do país, com origem medieval e reflorestação cuidada após o incêndio de 2017. Atravessa todo o concelho e marca o clima e a paisagem — fresco no verão, abrigado no inverno.",
        "Esta faixa do litoral é parte da chamada Costa de Prata: praias de areia clara, falésias baixas, mar atlântico aberto e vilas piscatórias. O ritmo de vida é mais tranquilo do que em Lisboa ou Porto, mas o acesso a serviços urbanos é imediato graças à cidade de Leiria.",
      ],
    },
    {
      id: "praias",
      title: "Praias e natureza: São Pedro de Moel, Vieira e Nazaré",
      paragraphs: [
        "São Pedro de Moel é a praia mais conhecida do concelho — uma vila inserida no Pinhal de Leiria, com ruas empedradas, restaurantes e farol. A praia da Vieira fica a norte, ligada por uma ciclovia atlântica que percorre o pinhal.",
        "Mais a sul, a Nazaré tornou-se referência mundial pelas ondas gigantes do Canhão da Nazaré, vistas do Forte de São Miguel Arcanjo. A norte, a Figueira da Foz oferece uma praia urbana muito ampla.",
        "Para quem prefere natureza, o Pinhal de Leiria está atravessado por trilhos pedestres e ciclovias. A combinação floresta-mar é o argumento principal desta zona: poucas regiões do país permitem ir do escritório à praia em poucos minutos.",
      ],
    },
    {
      id: "cidades",
      title: "Cidades próximas: Leiria, Lisboa e Porto",
      paragraphs: [
        "Leiria, sede de distrito, fica a poucos minutos de carro de Marinha Grande. É uma cidade média com castelo histórico, universidade (Politécnico de Leiria), centro hospitalar, comércio e vida cultural própria, sem o congestionamento das grandes áreas metropolitanas.",
        "Lisboa está acessível pela A8 — a Autoestrada do Oeste, que liga Lisboa a Leiria. O percurso de Marinha Grande para Lisboa por estrada ronda os 140 km. Para norte, a A1 e a A17 dão acesso ao Porto e ao litoral centro.",
        "Esta posição central faz de Marinha Grande uma base prática para quem quer viver na costa mas trabalhar ou viajar com frequência para Lisboa, Coimbra ou Porto.",
      ],
    },
    {
      id: "saude-educacao",
      title: "Saúde e educação",
      paragraphs: [
        "A unidade hospitalar pública de referência é o Hospital de Santo André, em Leiria, integrado na Unidade Local de Saúde da Região de Leiria (ULS RL) do Serviço Nacional de Saúde. Marinha Grande tem ainda centros de saúde e clínicas privadas no concelho.",
        "Na educação pública há escolas básicas e secundárias em Marinha Grande e em Leiria. Para ensino superior, o Politécnico de Leiria oferece cursos em várias áreas, com forte ligação à indústria local. Famílias estrangeiras com necessidade de currículo internacional encontram opções na região centro — recomenda-se confirmar diretamente com cada escola a disponibilidade de programas em inglês.",
      ],
    },
    {
      id: "gastronomia",
      title: "Gastronomia e cultura",
      paragraphs: [
        "A cozinha local combina peixe fresco da costa — sardinha, robalo, polvo, caldeirada — com pratos do interior, doçaria conventual e vinhos do Centro. A tradição vidreira de Marinha Grande é visível no Museu do Vidro e em fábricas históricas que ainda operam.",
        "Em Leiria, o castelo medieval domina a cidade e é palco regular de eventos culturais. A zona oferece ainda festivais de música no verão, mercados, e proximidade a património classificado como Alcobaça, Batalha e Tomar — três conjuntos monásticos a menos de uma hora de distância.",
      ],
    },
    {
      id: "compradores-estrangeiros",
      title: "Para compradores estrangeiros: NHR, IRS Jovem, IFICI, NIF",
      paragraphs: [
        "O regime de Residente Não Habitual (NHR) clássico foi descontinuado para novos inscritos. Em seu lugar foi criado o Incentivo Fiscal à Investigação Científica e Inovação (IFICI), destinado a profissionais qualificados em áreas específicas. As condições mudaram — qualquer planeamento fiscal deve ser feito com um contabilista ou advogado em Portugal.",
        "O IRS Jovem foi reformulado em 2025: a partir desse ano, o regime aplica-se a residentes fiscais até aos 35 anos, com isenção parcial sobre rendimentos do trabalho, durante um período limitado. As regras estão publicadas no Portal das Finanças.",
        "Para qualquer compra de imóvel em Portugal — independentemente da nacionalidade — é necessário obter um Número de Identificação Fiscal (NIF). Cidadãos fora da União Europeia precisam habitualmente de nomear um representante fiscal. A seguir abre-se conta bancária em Portugal e procede-se à escritura, normalmente com intervenção de advogado e notário, e pagamento do IMT e Imposto de Selo.",
      ],
    },
    {
      id: "acessos",
      title: "Acessos e transportes: A8, A17, aeroportos",
      paragraphs: [
        "A A8 (Autoestrada do Oeste) liga Lisboa a Leiria pelo litoral, com cerca de 132 km de extensão. A A17 (Autoestrada do Litoral Centro) começa na Marinha Grande e segue para norte até Aveiro, com cerca de 117 km, ligando a Figueira da Foz e a Coimbra através de nós com a A14 e a A1.",
        "Os aeroportos internacionais mais próximos são Lisboa (Humberto Delgado) a sul e Porto (Sá Carneiro) a norte, ambos ligados por autoestrada. A estação ferroviária mais próxima da linha do Norte fica em Leiria.",
        "Internamente, o concelho da Marinha Grande tem transporte urbano próprio e ciclovias que ligam o centro à costa, com destaque para a ligação São Pedro de Moel – Praia da Vieira ao longo do pinhal.",
      ],
    },
  ],
  ctaTitle: "Elocuente — a poucos minutos de tudo isto",
  ctaDesc:
    "Apartamentos contemporâneos T2 e T3 em Albergaria, Marinha Grande. Entre o Pinhal de Leiria e o Atlântico.",
  ctaPrimary: "Ver frações",
  ctaPrimaryHref: "/#apartamentos",
  ctaSecondary: "Pedir informação",
  ctaSecondaryHref: "/#contacto",
  sourcesLabel: "Fontes",
  sources: SOURCES,
  backLabel: "Voltar a Elocuente",
};

export const GUIDE_EN: GuideContent = {
  locale: "en",
  htmlLang: "en",
  path: "/guides/living-in-marinha-grande-leiria",
  title: "Living at the doorstep of the pine forest and the Atlantic",
  metaTitle: "Living in Marinha Grande and Leiria — 2026 guide | Elocuente",
  metaDescription:
    "A practical guide to living at the doorstep of the Leiria pine forest and the Atlantic: Marinha Grande, the Leiria Pine Forest, beaches, healthcare, schools, IRS Jovem, IFICI, NIF and buying property as a foreigner.",
  heroEyebrow: "Guide · Central Portugal",
  heroTitle: "Living at the doorstep of the pine forest and the Atlantic",
  heroLead:
    "Marinha Grande sits between the city of Leiria and the Silver Coast, on a plateau covered by the Leiria Pine Forest. It is a rare place: minutes from work, beach and forest, with the calm of living outside the city.",
  publishedAt: "2026-06-08",
  updatedAt: "2026-06-08",
  sections: [
    {
      id: "region",
      title: "The region: Marinha Grande, the Pine Forest and the Silver Coast",
      paragraphs: [
        "Marinha Grande is a town in the Leiria district of central Portugal, historically known for glassmaking and for its proximity to the Atlantic. The municipality stretches from the urban core, a short drive from Leiria city, down to the coastal villages of São Pedro de Moel and Praia da Vieira, entirely inside the Leiria Pine Forest.",
        "The Pinhal de Leiria is one of the largest continuous forests in Portugal, originally planted in the Middle Ages and carefully replanted after the 2017 fire. It runs through the whole municipality and shapes the climate and landscape — cool in summer, sheltered in winter.",
        "This stretch of coast belongs to the Costa de Prata, the Silver Coast: pale sand, low cliffs, open Atlantic, and small fishing villages. Life is calmer than in Lisbon or Porto, while urban services remain immediate through the city of Leiria.",
      ],
    },
    {
      id: "beaches",
      title: "Beaches and nature: São Pedro de Moel, Vieira, Nazaré",
      paragraphs: [
        "São Pedro de Moel is the best-known beach in the municipality — a small village set inside the Pine Forest, with cobbled streets, restaurants and a lighthouse. Praia da Vieira lies to the north, linked by an Atlantic bike path that crosses the pinewoods.",
        "Further south, Nazaré has become a global reference thanks to the giant waves of the Nazaré Canyon, viewed from the São Miguel Arcanjo Fort. To the north, Figueira da Foz offers a wide urban beach.",
        "For nature, the Pine Forest is crossed by walking trails and cycle paths. The combination of forest and ocean is the main argument for this area: few regions in Portugal let you go from desk to beach in a handful of minutes.",
      ],
    },
    {
      id: "cities",
      title: "Nearby cities: Leiria, Lisbon and Porto",
      paragraphs: [
        "Leiria, the district capital, is only a short drive from Marinha Grande. It is a mid-sized city with a historic castle, a polytechnic university, a regional hospital, shopping and its own cultural life, without the congestion of a major metropolitan area.",
        "Lisbon is reached via the A8 — the Autoestrada do Oeste, which connects Lisbon to Leiria along the west. The drive from Marinha Grande to Lisbon is around 140 km. To the north, the A1 and A17 motorways open the way to Porto and the central coast.",
        "This central position makes Marinha Grande a practical base for buyers who want to live on the coast but travel often to Lisbon, Coimbra or Porto.",
      ],
    },
    {
      id: "health-education",
      title: "Healthcare and education",
      paragraphs: [
        "The reference public hospital is Hospital de Santo André, in Leiria, part of the Local Health Unit of the Leiria Region (ULS RL) of the National Health Service. Marinha Grande also has primary health centres and private clinics.",
        "On the public side there are basic and secondary schools in both Marinha Grande and Leiria. For higher education, the Polytechnic of Leiria runs programmes across several fields with strong ties to local industry. Foreign families looking for an international curriculum can find options in the central region — it is best to confirm directly with each school the availability of English-language programmes.",
      ],
    },
    {
      id: "food-culture",
      title: "Food and culture",
      paragraphs: [
        "Local cooking combines fresh fish from the coast — sardines, sea bass, octopus, fish stews — with inland dishes, convent pastry and wines from the central region. Marinha Grande's glassmaking tradition is visible in the Glass Museum and in historic factories that still operate.",
        "In Leiria, the medieval castle dominates the city and hosts cultural events. The area also offers summer music festivals, markets, and easy access to UNESCO heritage — the monasteries of Alcobaça, Batalha and Tomar are all less than an hour away.",
      ],
    },
    {
      id: "foreign-buyers",
      title: "For foreign buyers: NHR, IRS Jovem, IFICI, NIF",
      paragraphs: [
        "The classic Non-Habitual Resident (NHR) regime has been discontinued for new applicants. It has been replaced by the Tax Incentive for Scientific Research and Innovation (IFICI), targeted at qualified professionals in specific fields. Conditions have changed — any tax planning should be done with a Portuguese accountant or lawyer.",
        "The IRS Jovem (Youth PIT) was reshaped in 2025: from that year on, tax residents up to 35 years old can benefit from a partial exemption on employment income, for a limited number of years. The rules are published by the Portuguese Tax Authority.",
        "To buy property in Portugal — regardless of nationality — you need a Portuguese tax number (NIF). Non-EU buyers usually need to appoint a tax representative. After that you open a Portuguese bank account and proceed to the public deed, normally with a lawyer and a notary, paying property transfer tax (IMT) and stamp duty.",
      ],
    },
    {
      id: "transport",
      title: "Access and transport: A8, A17, airports",
      paragraphs: [
        "The A8 (Autoestrada do Oeste) connects Lisbon to Leiria along the coast over roughly 132 km. The A17 (Autoestrada do Litoral Centro) starts in Marinha Grande and runs north to Aveiro for about 117 km, with junctions to Figueira da Foz, the A14 and the A1 toward Coimbra.",
        "The closest international airports are Lisbon (Humberto Delgado) to the south and Porto (Sá Carneiro) to the north, both reachable by motorway. The closest mainline train station is in Leiria, on the Linha do Norte.",
        "Locally, the municipality has its own urban transport and a network of cycle paths linking the town to the coast, notably the São Pedro de Moel — Praia da Vieira route through the pine forest.",
      ],
    },
  ],
  ctaTitle: "Elocuente — minutes from all of this",
  ctaDesc:
    "Contemporary T2 and T3 apartments in Albergaria, Marinha Grande. Between the Pine Forest of Leiria and the Atlantic.",
  ctaPrimary: "View units",
  ctaPrimaryHref: "/#apartamentos",
  ctaSecondary: "Request information",
  ctaSecondaryHref: "/#contacto",
  sourcesLabel: "Sources",
  sources: SOURCES,
  backLabel: "Back to Elocuente",
};

export const GUIDE_ES: GuideContent = {
  locale: "es",
  htmlLang: "es",
  path: "/guia/vivir-en-marinha-grande-leiria",
  title: "Vivir a las puertas del pinar y del Atlántico",
  metaTitle: "Vivir en Marinha Grande y Leiria — guía 2026 | Elocuente",
  metaDescription:
    "Guía práctica para vivir a las puertas del pinar de Leiria y del Atlántico: Marinha Grande, Pinar de Leiria, playas, sanidad, educación, IRS Jovem, IFICI, NIF y compra de inmuebles para extranjeros.",
  heroEyebrow: "Guía · Centro de Portugal",
  heroTitle: "Vivir a las puertas del pinar y del Atlántico",
  heroLead:
    "Marinha Grande se encuentra entre la ciudad de Leiria y la Costa de Plata, sobre una meseta cubierta por el Pinar de Leiria. Es un lugar raro: a minutos del trabajo, la playa y el bosque, con la calma de vivir fuera de la ciudad.",
  publishedAt: "2026-06-08",
  updatedAt: "2026-06-08",
  sections: [
    {
      id: "region",
      title: "La región: Marinha Grande, Pinar de Leiria y Costa de Plata",
      paragraphs: [
        "Marinha Grande es una ciudad del distrito de Leiria, en el Centro de Portugal, históricamente conocida por la tradición del vidrio y por la proximidad al Atlántico. El municipio se extiende desde el núcleo urbano, a pocos kilómetros de Leiria, hasta los pueblos costeros de São Pedro de Moel y Praia da Vieira, completamente dentro del Pinar de Leiria.",
        "El Pinhal de Leiria es uno de los mayores bosques continuos de Portugal, plantado en la Edad Media y replantado con cuidado tras el incendio de 2017. Atraviesa todo el municipio y modela el clima y el paisaje — fresco en verano, protegido en invierno.",
        "Este tramo de costa forma parte de la Costa de Plata: arena clara, acantilados bajos, Atlántico abierto y pequeñas villas marineras. El ritmo de vida es más tranquilo que en Lisboa o Oporto, pero los servicios urbanos son inmediatos gracias a la ciudad de Leiria.",
      ],
    },
    {
      id: "playas",
      title: "Playas y naturaleza: São Pedro de Moel, Vieira, Nazaré",
      paragraphs: [
        "São Pedro de Moel es la playa más conocida del municipio — un pueblo dentro del Pinar de Leiria, con calles empedradas, restaurantes y faro. Praia da Vieira está al norte, conectada por una vía ciclista atlántica que cruza el pinar.",
        "Más al sur, Nazaré es referencia mundial por las olas gigantes del Cañón de Nazaré, vistas desde el Fuerte de São Miguel Arcanjo. Al norte, Figueira da Foz ofrece una amplia playa urbana.",
        "Para la naturaleza, el Pinar de Leiria está atravesado por senderos peatonales y rutas ciclistas. La combinación bosque-mar es el principal argumento de la zona: pocas regiones de Portugal permiten ir del escritorio a la playa en pocos minutos.",
      ],
    },
    {
      id: "ciudades",
      title: "Ciudades cercanas: Leiria, Lisboa y Oporto",
      paragraphs: [
        "Leiria, capital de distrito, está a pocos minutos en coche de Marinha Grande. Es una ciudad de tamaño medio con castillo histórico, politécnico, hospital regional, comercio y vida cultural propia, sin la congestión de las grandes áreas metropolitanas.",
        "Lisboa es accesible por la A8 — la Autoestrada do Oeste, que conecta Lisboa con Leiria. El trayecto desde Marinha Grande hasta Lisboa por carretera ronda los 140 km. Al norte, la A1 y la A17 abren camino a Oporto y al litoral centro.",
        "Esta posición central convierte a Marinha Grande en una base práctica para quien quiera vivir en la costa pero viajar con frecuencia a Lisboa, Coimbra u Oporto.",
      ],
    },
    {
      id: "salud-educacion",
      title: "Sanidad y educación",
      paragraphs: [
        "El hospital público de referencia es el Hospital de Santo André, en Leiria, integrado en la Unidad Local de Salud de la Región de Leiria (ULS RL) del Servicio Nacional de Salud. Marinha Grande dispone además de centros de salud y clínicas privadas.",
        "En enseñanza pública hay escuelas básicas y secundarias tanto en Marinha Grande como en Leiria. Para enseñanza superior, el Politécnico de Leiria ofrece programas en varias áreas con fuerte conexión a la industria local. Las familias extranjeras que buscan currículo internacional encuentran opciones en la región centro — conviene confirmar directamente con cada centro la disponibilidad de programas en inglés.",
      ],
    },
    {
      id: "gastronomia",
      title: "Gastronomía y cultura",
      paragraphs: [
        "La cocina local combina pescado fresco de la costa — sardinas, lubina, pulpo, calderetas — con platos del interior, repostería conventual y vinos del centro. La tradición vidriera de Marinha Grande puede verse en el Museo del Vidrio y en fábricas históricas aún en funcionamiento.",
        "En Leiria, el castillo medieval domina la ciudad y acoge eventos culturales. La zona ofrece además festivales de música en verano, mercados, y proximidad al patrimonio UNESCO de Alcobaça, Batalha y Tomar — tres conjuntos monásticos a menos de una hora.",
      ],
    },
    {
      id: "compradores-extranjeros",
      title: "Para compradores extranjeros: NHR, IRS Jovem, IFICI, NIF",
      paragraphs: [
        "El régimen clásico de Residente No Habitual (NHR) ya no está disponible para nuevos solicitantes. Ha sido sustituido por el Incentivo Fiscal a la Investigación Científica e Innovación (IFICI), dirigido a profesionales cualificados de áreas específicas. Las condiciones han cambiado — cualquier planificación fiscal debe hacerse con un contable o abogado en Portugal.",
        "El IRS Jovem se reformó en 2025: a partir de ese año, los residentes fiscales de hasta 35 años pueden beneficiarse de una exención parcial sobre rendimientos del trabajo, durante un número limitado de años. Las reglas están publicadas por la Autoridad Tributaria portuguesa.",
        "Para comprar un inmueble en Portugal — sea cual sea la nacionalidad — se necesita un Número de Identificación Fiscal (NIF). Los compradores fuera de la UE suelen necesitar nombrar un representante fiscal. Después se abre cuenta bancaria portuguesa y se procede a la escritura, normalmente con abogado y notario, pagando el IMT y el Impuesto del Sello.",
      ],
    },
    {
      id: "accesos",
      title: "Accesos y transporte: A8, A17, aeropuertos",
      paragraphs: [
        "La A8 (Autoestrada do Oeste) conecta Lisboa con Leiria por el litoral en unos 132 km. La A17 (Autoestrada do Litoral Centro) comienza en Marinha Grande y se dirige al norte hasta Aveiro, con unos 117 km, conectando con Figueira da Foz, la A14 y la A1 hacia Coimbra.",
        "Los aeropuertos internacionales más cercanos son Lisboa (Humberto Delgado) al sur y Oporto (Sá Carneiro) al norte, ambos conectados por autopista. La estación de tren más cercana de la Línea del Norte está en Leiria.",
        "A nivel local, el municipio dispone de transporte urbano propio y de una red de carriles bici que conectan el casco urbano con la costa, especialmente la ruta São Pedro de Moel — Praia da Vieira a través del pinar.",
      ],
    },
  ],
  ctaTitle: "Elocuente — a minutos de todo esto",
  ctaDesc:
    "Apartamentos contemporáneos T2 y T3 en Albergaria, Marinha Grande. Entre el Pinar de Leiria y el Atlántico.",
  ctaPrimary: "Ver unidades",
  ctaPrimaryHref: "/#apartamentos",
  ctaSecondary: "Pedir información",
  ctaSecondaryHref: "/#contacto",
  sourcesLabel: "Fuentes",
  sources: SOURCES,
  backLabel: "Volver a Elocuente",
};

export const GUIDES: Record<GuideLocale, GuideContent> = {
  pt: GUIDE_PT,
  en: GUIDE_EN,
  es: GUIDE_ES,
};
