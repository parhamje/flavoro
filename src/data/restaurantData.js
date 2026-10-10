export const INITIAL_MENU_ITEMS = [
  // Starters
  {
    id: 'starter-1',
    name: 'Truffle Burrata',
    category: 'starters',
    price: 22.00,
    rating: 4.9,
    reviewsCount: 142,
    description: 'Creamy organic burrata, shaved black truffle, aged balsamic reduction, wild baby arugula, and toasted sourdough.',
    tags: ['Vegetarian', 'Gluten-Free Option'],
    isSpecial: false,
    inStock: true,
    image: './assets/burrata.jpg'
  },
  {
    id: 'starter-2',
    name: 'Crispy Calamari',
    category: 'starters',
    price: 18.00,
    rating: 4.8,
    reviewsCount: 98,
    description: 'Lightly dusted Point Judith calamari, preserved lemon aioli, fried capers, and sweet chili glaze.',
    tags: ['Seafood'],
    isSpecial: false,
    inStock: true,
    image: './assets/burrata.jpg'
  },
  {
    id: 'starter-3',
    name: 'Heirloom Tomato Bruschetta',
    category: 'starters',
    price: 16.00,
    rating: 4.7,
    reviewsCount: 115,
    description: 'Charred artisanal sourdough, marinated heritage tomatoes, fresh sweet basil, garlic confit, and olive oil drizzle.',
    tags: ['Vegetarian', 'Vegan'],
    isSpecial: false,
    inStock: true,
    image: './assets/burrata.jpg'
  },

  // Mains
  {
    id: 'main-1',
    name: 'Pan-Seared Scallops',
    category: 'mains',
    price: 38.00,
    rating: 5.0,
    reviewsCount: 164,
    description: 'Dayboat sea scallops, sweet corn purée, crispy pancetta lardons, micro cilantro oil, and charred lime.',
    tags: ['Gluten-Free', 'Chef Pick'],
    isSpecial: false,
    inStock: true,
    image: './assets/salmon.jpg'
  },
  {
    id: 'main-2',
    name: 'Braised Short Rib',
    category: 'mains',
    price: 42.00,
    rating: 4.9,
    reviewsCount: 210,
    description: '12-hour slow-braised beef short rib, creamy mascarpone polenta, roasted heirloom root vegetables, rich red wine jus.',
    tags: ['Gluten-Free', 'Signature'],
    isSpecial: false,
    inStock: true,
    image: './assets/burger.jpg'
  },
  {
    id: 'main-3',
    name: 'Creamy Mushroom Pasta',
    category: 'mains',
    price: 12.99,
    rating: 4.9,
    reviewsCount: 128,
    description: 'Handmade tagliatelle, wild chanterelle and cremini mushrooms, truffle cream sauce, freshly grated Parmigiano Reggiano.',
    tags: ['Vegetarian', 'Chef Special'],
    isSpecial: true,
    inStock: true,
    image: './assets/pasta.jpg'
  },
  {
    id: 'main-4',
    name: 'Grilled Salmon',
    category: 'mains',
    price: 18.99,
    rating: 5.0,
    reviewsCount: 96,
    description: 'Faroe Island wild salmon fillet, roasted garlic herb butter, quinoa tabbouleh, charred asparagus, lemon dill reduction.',
    tags: ['Gluten-Free', 'Chef Special'],
    isSpecial: true,
    inStock: true,
    image: './assets/salmon.jpg'
  },
  {
    id: 'main-5',
    name: 'Classic Beef Burger',
    category: 'mains',
    price: 11.99,
    rating: 4.8,
    reviewsCount: 110,
    description: 'Prime dry-aged Angus beef patty, melted aged cheddar, butter lettuce, heirloom tomato, house-made secret brioche relish.',
    tags: ['Signature', 'Chef Special'],
    isSpecial: true,
    inStock: true,
    image: './assets/burger.jpg'
  },

  // Pizzas
  {
    id: 'pizza-1',
    name: 'Margherita Classica',
    category: 'pizzas',
    price: 20.00,
    rating: 4.9,
    reviewsCount: 180,
    description: 'San Marzano DOP tomatoes, fresh mozzarella di bufala, organic sweet basil, extra virgin olive oil on 48-hr fermented dough.',
    tags: ['Vegetarian', 'Wood-Fired'],
    isSpecial: false,
    inStock: true,
    image: './assets/pizza.jpg'
  },
  {
    id: 'pizza-2',
    name: 'Prosciutto e Rucola',
    category: 'pizzas',
    price: 24.00,
    rating: 4.9,
    reviewsCount: 135,
    description: 'Fior di latte cheese, 24-month aged Prosciutto di Parma, peppery wild arugula, shaved parmesan, fig balsamic drizzle.',
    tags: ['Wood-Fired', 'Chef Pick'],
    isSpecial: false,
    inStock: true,
    image: './assets/pizza.jpg'
  },

  // Desserts
  {
    id: 'dessert-1',
    name: 'Chocolate Lava Cake',
    category: 'desserts',
    price: 7.99,
    rating: 5.0,
    reviewsCount: 85,
    description: 'Molten Valrhona 70% dark chocolate core, artisanal Madagascar vanilla bean gelato, vibrant raspberry coulis.',
    tags: ['Vegetarian', 'Chef Special'],
    isSpecial: true,
    inStock: true,
    image: './assets/lava_cake.jpg'
  },
  {
    id: 'dessert-2',
    name: 'Classic Tiramisu',
    category: 'desserts',
    price: 12.00,
    rating: 4.8,
    reviewsCount: 92,
    description: 'House-pulled espresso ladyfingers, velvety mascarpone cream, dark cocoa dusting, and amaretto whisper.',
    tags: ['Vegetarian'],
    isSpecial: false,
    inStock: true,
    image: './assets/lava_cake.jpg'
  },
  {
    id: 'dessert-3',
    name: 'Amalfi Lemon Panna Cotta',
    category: 'desserts',
    price: 11.00,
    rating: 4.7,
    reviewsCount: 64,
    description: 'Silky Tahitian vanilla bean panna cotta, fresh Amalfi lemon curd, roasted pistachio crumble.',
    tags: ['Gluten-Free'],
    isSpecial: false,
    inStock: true,
    image: './assets/lava_cake.jpg'
  },

  // Drinks
  {
    id: 'drink-1',
    name: 'Smoked Rosemary Old Fashioned',
    category: 'drinks',
    price: 16.00,
    rating: 4.9,
    reviewsCount: 78,
    description: 'Small-batch Kentucky bourbon, charred rosemary syrup, angostura bitters, expressed orange peel, cedar smoke.',
    tags: ['Signature Cocktail'],
    isSpecial: false,
    inStock: true,
    image: './assets/cocktail.jpg'
  },
  {
    id: 'drink-2',
    name: 'Botanical Herb Spritz',
    category: 'drinks',
    price: 14.00,
    rating: 4.8,
    reviewsCount: 52,
    description: 'Elderflower liqueur, wild mint, cucumber ribbons, sparkling prosecco, lemon zest.',
    tags: ['Craft Cocktail'],
    isSpecial: false,
    inStock: true,
    image: './assets/cocktail.jpg'
  }
];

export const INITIAL_TESTIMONIALS = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Food Critic, Epicure Guide',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    text: 'The best dining experience in the city! The atmosphere is cozy and the food is absolutely divine. The Truffle Burrata and Short Rib are masterclasses in flavor balancing.'
  },
  {
    id: 2,
    name: 'Michael Ross',
    role: 'Local Resident & Food Enthusiast',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    text: 'Incredible service and the Grilled Salmon was cooked to perfection. Flavoro has become our family’s go-to destination for anniversaries and special celebrations.'
  },
  {
    id: 3,
    name: 'Emily Lawson',
    role: 'Luxury Travel Blogger',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    text: 'A true hidden gem with unrivaled hospitality. The attention to detail in every single dish is remarkable. Highly recommend the Chocolate Lava Cake and wine pairings!'
  }
];

export const INITIAL_GALLERY = [
  {
    id: 'g-1',
    category: 'drinks',
    title: 'Artisanal Smoked Old Fashioned Cocktail',
    image: './assets/cocktail.jpg'
  },
  {
    id: 'g-2',
    category: 'ambiance',
    title: 'Emerald Dining Hall Evening Atmosphere',
    image: './assets/restaurant_hall.jpg'
  },
  {
    id: 'g-3',
    category: 'dishes',
    title: 'Crispy Skin Faroe Salmon & Asparagus',
    image: './assets/salmon.jpg'
  },
  {
    id: 'g-4',
    category: 'ambiance',
    title: 'Intimate Candlelit Dining Experience',
    image: './assets/restaurant_hall.jpg'
  },
  {
    id: 'g-5',
    category: 'dishes',
    title: 'Wild Mushroom Tagliatelle with Shaved Truffles',
    image: './assets/pasta.jpg'
  },
  {
    id: 'g-6',
    category: 'dishes',
    title: 'Authentic Wood-Fired Margherita Pizza',
    image: './assets/pizza.jpg'
  },
  {
    id: 'g-7',
    category: 'dishes',
    title: 'Gourmet Angus Brioche Cheeseburger',
    image: './assets/burger.jpg'
  },
  {
    id: 'g-8',
    category: 'dishes',
    title: 'Molten Valrhona Chocolate Lava Cake',
    image: './assets/lava_cake.jpg'
  },
  {
    id: 'g-9',
    category: 'dishes',
    title: 'Creamy Organic Burrata with Heirloom Tomatoes',
    image: './assets/burrata.jpg'
  }
];

export const INITIAL_RESERVATIONS = [
  {
    id: 'RES-9481',
    customerName: 'Alexander Wright',
    customerEmail: 'alexander@example.com',
    customerPhone: '+1 (555) 234-5678',
    date: '2026-08-20',
    time: '19:30',
    guests: 2,
    area: "Chef's Table",
    occasion: 'Anniversary Dinner',
    notes: 'Window view preferred, celebrating 5th anniversary.',
    status: 'Confirmed',
    tableNumber: 'T-04',
    createdAt: '2026-08-16T14:20:00Z'
  },
  {
    id: 'RES-9482',
    customerName: 'Claire Dupont',
    customerEmail: 'claire.d@luxemail.com',
    customerPhone: '+1 (555) 876-5432',
    date: '2026-08-20',
    time: '20:00',
    guests: 4,
    area: 'Main Dining Room',
    occasion: 'Business Dinner',
    notes: 'Gluten-free menu for two guests.',
    status: 'Seated',
    tableNumber: 'T-12',
    createdAt: '2026-08-17T09:15:00Z'
  },
  {
    id: 'RES-9483',
    customerName: 'Marcus Bennett',
    customerEmail: 'marcus.b@globalnet.org',
    customerPhone: '+1 (555) 432-1098',
    date: '2026-08-20',
    time: '18:15',
    guests: 6,
    area: 'Garden Terrace',
    occasion: 'Birthday Celebration',
    notes: 'Bringing a bottle of rare vintage (corkage requested).',
    status: 'Confirmed',
    tableNumber: 'T-20',
    createdAt: '2026-08-16T18:40:00Z'
  },
  {
    id: 'RES-9484',
    customerName: 'Sophia Lorenzen',
    customerEmail: 'sophia.l@artstudio.com',
    customerPhone: '+1 (555) 654-3210',
    date: '2026-08-19',
    time: '20:30',
    guests: 2,
    area: 'Wine Cellar Room',
    occasion: 'Date Night',
    notes: 'Sommelier wine pairing recommendation please.',
    status: 'Completed',
    tableNumber: 'T-08',
    createdAt: '2026-08-15T11:00:00Z'
  }
];

export const INITIAL_STAFF = [
  {
    id: 'staff-1',
    name: 'Elena Rossi',
    role: 'EXECUTIVE CHEF',
    avatar: './assets/chef1.svg',
    shift: '08:00 - 16:00',
    status: 'On Shift',
    station: 'Main Kitchen & R&D'
  },
  {
    id: 'staff-2',
    name: 'Julian Vance',
    role: 'HEAD SOMMELIER',
    avatar: './assets/chef2.svg',
    shift: '16:00 - 00:00',
    status: 'On Shift',
    station: 'Wine Cellar & Lounge'
  },
  {
    id: 'staff-3',
    name: 'Clara Moreau',
    role: 'HEAD PASTRY CHEF',
    avatar: './assets/chef3.svg',
    shift: '06:00 - 14:00',
    status: 'Off Shift',
    station: 'Pastry & Dessert Lab'
  },
  {
    id: 'staff-4',
    name: 'Marcus Aurel',
    role: 'SOUS CHEF',
    avatar: './assets/chef4.svg',
    shift: '14:00 - 22:30',
    status: 'On Shift',
    station: 'Grill & Expedite'
  }
];

export const INITIAL_ORDERS = [
  {
    id: 'ORD-7291',
    date: 'Aug 12, 2026',
    type: 'Pickup',
    status: 'Completed',
    total: 82.50,
    items: [
      { name: 'Creamy Mushroom Pasta', qty: 2, price: 12.99 },
      { name: 'Grilled Salmon', qty: 2, price: 18.99 },
      { name: 'Chocolate Lava Cake', qty: 2, price: 7.99 }
    ]
  },
  {
    id: 'ORD-6842',
    date: 'Jul 28, 2026',
    type: 'Delivery',
    status: 'Completed',
    total: 145.00,
    items: [
      { name: 'Artisanal Tasting Menu for 2', qty: 1, price: 145.00 }
    ]
  }
];
