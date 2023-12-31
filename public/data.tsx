export const products = [
  {
    id: "1",
    name: "Produkt 1 ",
    sort: "wallet",
    description:
      "Eine detaillierte Beschreibung dieses tollen Produkts. Dieses Produkt hat viele großartige Funktionen und Vorteile. Es ist in verschiedenen Farben und Größen erhältlich.",
    stock: 10,
    comments: ["Gutes Produkt", "Sehr zufrieden"],
    photos: ["/images/product1-1.jpg", "/images/product1-2.jpg"],
    price: 19.99,
  },
  {
    id: "2",
    name: "Produkt 2",
    sort: "wallet",
    description:
      "Eine ausführliche Beschreibung dieses großartigen Produkts. Dieses Produkt ist in Schwarz und Weiß erhältlich und hat eine bequeme Passform.",
    stock: 5,
    comments: ["Sehr empfehlenswert"],
    photos: [
      "/images/product2-1.jpg",
      "/images/product2-2.jpg",
      "/images/product2-3.jpg",
      "/images/product2-4.jpg",
    ],
    price: 24.99,
  },
  {
    id: " 3",
    name: "Produkt 3",
    sort: "pendant",
    description:
      "Eine umfassende Beschreibung dieses fantastischen Produkts. Es ist in verschiedenen lebendigen Farben und Größen erhältlich, um Ihren Bedürfnissen gerecht zu werden.",
    stock: 20,
    comments: ["Sehr empfehlenswert"],
    photos: ["/images/product3-1.jpg", "/images/product3-2.jpg"],
    price: 29.99,
  },
  {
    id: "4",
    name: "Produkt 4",
    sort: "cardholder",
    description:
      "Eine detaillierte Beschreibung dieses tollen Produkts. Dieses Produkt hat viele großartige Funktionen und Vorteile. Es ist in verschiedenen Farben und Größen erhältlich.",
    stock: 10,
    comments: ["Gutes Produkt", "Sehr zufrieden"],
    photos: ["/images/product4-1.jpg", "/images/product4-2.jpg"],
    price: 39.99,
  },
  {
    id: "5",
    name: "Produkt 5",
    sort: "pendant",
    description:
      "Eine ausführliche Beschreibung dieses großartigen Produkts. Dieses Produkt ist in Schwarz und Weiß erhältlich und hat eine bequeme Passform.",
    stock: 5,
    comments: ["Sehr empfehlenswert"],
    photos: ["/images/product5-1.jpg", "/images/product5-2.jpg"],
    price: 19.89,
  },
  {
    id: "6",
    name: "Produkt 6",
    sort: "cardholder",
    description:
      "Eine umfassende Beschreibung dieses fantastischen Produkts. Es ist in verschiedenen lebendigen Farben und Größen erhältlich, um Ihren Bedürfnissen gerecht zu werden.",
    stock: 20,
    comments: ["Sehr empfehlenswert"],
    photos: ["/images/product6-1.jpg", "/images/product6-2.jpg"],
    price: 29.89,
  },
  {
    id: " 7",
    name: "Produkt 7",
    sort: "bag",
    description:
      "Eine umfassende Beschreibung dieses fantastischen Produkts. Es ist in verschiedenen lebendigen Farben und Größen erhältlich, um Ihren Bedürfnissen gerecht zu werden.",
    stock: 20,
    comments: ["Sehr empfehlenswert"],
    photos: ["/images/product7-1.jpg", "/images/product7-2.jpg"],
    price: 2.99,
  },
  {
    id: "8",
    name: "Produkt 8",
    sort: "cardholder",
    description:
      "Eine detaillierte Beschreibung dieses tollen Produkts. Dieses Produkt hat viele großartige Funktionen und Vorteile. Es ist in verschiedenen Farben und Größen erhältlich.",
    stock: 10,
    comments: ["Gutes Produkt", "Sehr zufrieden"],
    photos: ["/images/product8-1.jpg", "/images/product8-2.jpg"],
    price: 39.89,
  },
  {
    id: "9",
    name: "Produkt 9",
    sort: "pendant",
    description:
      "Eine ausführliche Beschreibung dieses großartigen Produkts. Dieses Produkt ist in Schwarz und Weiß erhältlich und hat eine bequeme Passform.",
    stock: 5,
    comments: ["Sehr empfehlenswert"],
    photos: ["/images/product9-1.jpg"],
    price: 19.79,
  },
  {
    id: "10",
    name: "Produkt 10",
    sort: "wallet",
    description:
      "Eine umfassende Beschreibung dieses fantastischen Produkts. Es ist in verschiedenen lebendigen Farben und Größen erhältlich, um Ihren Bedürfnissen gerecht zu werden.",
    stock: 20,
    comments: [],
    photos: [
      "/images/product10-1.jpg",
      "/images/product10-2.jpg",
      "/images/product10-3.jpg",
      "/images/product10-4.jpg",
    ],
    price: 29.79,
  },
];

export const users = [
  {
    name: "Jin",
    password: "123456",
    orders: [],
    favorites: ["1", "2"],
    shoppingCartItems: [
      {
        productId: "1",
        productName: "Produkt 1",
        photo: "/images/product1-1.jpg",
        quantity: 1,
      },
      {
        productId: "2",
        productName: "Produkt 2",
        photo: "/images/product2-1.jpg",
        quantity: 1,
      },
    ],
  },
  {
    name: "Jane",
    password: "1",
    orders: [
      {
        orderNumber: "1",
        orderedProducts: [
          {
            productId: "1",
            productName: "Produkt 1",
            photo: "/images/product1-1.jpg",
            quantity: 1,
          },
          {
            productId: "2",
            productName: "Produkt 2",
            photo: "/images/product2-1.jpg",
            quantity: 2,
          },
        ],
        date: "08.09.2023",
        adress: "putlse.ejafe,938 ",
      },
    ],
    favorites: ["1", "2"],
    shoppingCartItems: [
      {
        productId: "10",
        productName: "Produkt 10",
        photo: "/images/product10-1.jpg",
        quantity: 1,
      },
    ],
  },
];
