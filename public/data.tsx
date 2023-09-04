export const products = [
  {
    id: 1,
    name: "Produkt 1",
    description:
      "Eine detaillierte Beschreibung dieses tollen Produkts. Dieses Produkt hat viele großartige Funktionen und Vorteile. Es ist in verschiedenen Farben und Größen erhältlich.",
    stock: 10,
    comments: ["Gutes Produkt", "Sehr zufrieden"],
    isFavorite: true,
    isInShoppingCart: false,
    photos: ["/images/product1-1.jpg", "/images/product1-2.jpg"],
    price: 19.99,
  },
  {
    id: 2,
    name: "Produkt 2",
    description:
      "Eine ausführliche Beschreibung dieses großartigen Produkts. Dieses Produkt ist in Schwarz und Weiß erhältlich und hat eine bequeme Passform.",
    stock: 5,
    comments: ["Sehr empfehlenswert"],
    isFavorite: false,
    isInShoppingCart: true,
    photos: ["/images/product2-1.jpg"],
    price: 24.99,
  },
  {
    id: 3,
    name: "Produkt 3",
    description:
      "Eine umfassende Beschreibung dieses fantastischen Produkts. Es ist in verschiedenen lebendigen Farben und Größen erhältlich, um Ihren Bedürfnissen gerecht zu werden.",
    stock: 20,
    comments: [],
    isFavorite: true,
    isInShoppingCart: false,
    photos: ["/images/product3-1.jpg", "/images/product3-2.jpg"],
    price: 29.99,
  },
];

export const users = [
  {
    name: "Jin",
    password: "123456",
    orders: [
      {
        id: 2,
        quantity: 1,
        adress: "putlse.ejfiaefanafe,19938 ",
      },
    ],
    favorites: [1, 2],
    shoppingCart: [
      {
        id: 2,
        quantity: 1,
      },
      {
        id: 1,
        quantity: 1,
      },
    ],
  },
  {
    name: "Jin",
    orders: [
      {
        id: 1,
        quantity: 1,
        adress: "putlse.ejafe,938 ",
      },
      {
        id: 1,
        quantity: 1,
      },
    ],
    favorites: [1, 2],
    shoppingCart: [
      {
        id: 2,
        quantity: 1,
      },
    ],
  },
];
