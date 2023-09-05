export const products = [
  {
    id: "1",
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
    id: "2",
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
    id: " 3",
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
        id: "1",
        productName: "Produkt 3",
        date: "23.09.2023",
        quantity: 3,
        adress: "putlse.ejafe,938 ",
      },
    ],
    favorites: ["1", "2"],
    shoppingCart: [
      {
        productName: "Produkt 1",
        quantity: 1,
      },
      {
        productName: "Produkt 2",
        quantity: 1,
      },
    ],
  },
  {
    name: "Jane",
    password: "1",
    orders: [
      {
        id: "1",
        productName: "Produkt 1",
        date: "08.09.2023",
        quantity: 1,
        adress: "putlse.ejafe,938 ",
      },
      {
        id: "2",
        productName: "Produkt 2",
        date: "08.07.2023",
        quantity: 2,
        adress: "putlse.ejafe,938 ",
      },
    ],
    favorites: ["1", "2"],
    shoppingCart: [
      {
        productName: "Produkt 2",
        quantity: 1,
      },
    ],
  },
];
