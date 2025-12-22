/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

/**
 * Recipe Database
 * Author: Ashraf Morningstar
 * GitHub: https://github.com/AshrafMorningstar
 */

const recipesDatabase = [
  {
    id: 1,
    title: 'Classic Pasta Carbonara',
    emoji: '🍝',
    ingredients: ['pasta', 'eggs', 'bacon', 'cheese', 'pepper'],
    steps: [
      'Boil pasta in salted water until al dente',
      'Cook bacon until crispy, then chop into small pieces',
      'Beat eggs and mix with grated cheese',
      'Drain pasta and immediately mix with egg mixture',
      'Add bacon and black pepper, toss well',
      'Serve hot with extra cheese on top'
    ],
    cookTime: '20 minutes'
  },
  {
    id: 2,
    title: 'Chicken Stir Fry',
    emoji: '🍗',
    ingredients: ['chicken', 'vegetables', 'soy sauce', 'garlic', 'ginger', 'oil'],
    steps: [
      'Cut chicken into bite-sized pieces',
      'Chop vegetables (bell peppers, broccoli, carrots)',
      'Heat oil in a wok or large pan',
      'Cook chicken until golden brown',
      'Add garlic and ginger, stir for 30 seconds',
      'Add vegetables and stir fry for 5 minutes',
      'Add soy sauce and toss everything together',
      'Serve over rice'
    ],
    cookTime: '25 minutes'
  },
  {
    id: 3,
    title: 'Margherita Pizza',
    emoji: '🍕',
    ingredients: ['pizza dough', 'tomato sauce', 'mozzarella', 'basil', 'olive oil'],
    steps: [
      'Preheat oven to 475°F (245°C)',
      'Roll out pizza dough on a floured surface',
      'Spread tomato sauce evenly',
      'Add torn mozzarella cheese',
      'Drizzle with olive oil',
      'Bake for 12-15 minutes until crust is golden',
      'Top with fresh basil leaves',
      'Slice and serve hot'
    ],
    cookTime: '30 minutes'
  },
  {
    id: 4,
    title: 'Vegetable Curry',
    emoji: '🍛',
    ingredients: ['vegetables', 'curry powder', 'coconut milk', 'onion', 'garlic', 'ginger'],
    steps: [
      'Chop all vegetables into bite-sized pieces',
      'Sauté onion, garlic, and ginger until fragrant',
      'Add curry powder and cook for 1 minute',
      'Add vegetables and stir to coat with spices',
      'Pour in coconut milk and bring to simmer',
      'Cook until vegetables are tender (15-20 minutes)',
      'Season with salt and serve with rice or naan'
    ],
    cookTime: '35 minutes'
  },
  {
    id: 5,
    title: 'Caesar Salad',
    emoji: '🥗',
    ingredients: ['lettuce', 'cheese', 'croutons', 'lemon', 'garlic', 'olive oil'],
    steps: [
      'Wash and chop romaine lettuce',
      'Make dressing: blend garlic, lemon juice, and olive oil',
      'Toss lettuce with dressing',
      'Add grated parmesan cheese',
      'Top with croutons',
      'Serve immediately'
    ],
    cookTime: '10 minutes'
  },
  {
    id: 6,
    title: 'Beef Tacos',
    emoji: '🌮',
    ingredients: ['beef', 'tortillas', 'cheese', 'lettuce', 'tomato', 'onion'],
    steps: [
      'Cook ground beef in a pan until browned',
      'Season with taco spices',
      'Warm tortillas in a dry pan',
      'Chop lettuce, tomatoes, and onions',
      'Assemble tacos with beef and toppings',
      'Add cheese and your favorite salsa',
      'Serve with lime wedges'
    ],
    cookTime: '20 minutes'
  },
  {
    id: 7,
    title: 'Tomato Soup',
    emoji: '🍅',
    ingredients: ['tomato', 'onion', 'garlic', 'cream', 'basil', 'oil'],
    steps: [
      'Sauté chopped onion and garlic in oil',
      'Add chopped tomatoes and cook until soft',
      'Add vegetable stock and simmer for 15 minutes',
      'Blend until smooth',
      'Stir in cream',
      'Garnish with fresh basil',
      'Serve hot with crusty bread'
    ],
    cookTime: '30 minutes'
  },
  {
    id: 8,
    title: 'Scrambled Eggs',
    emoji: '🍳',
    ingredients: ['eggs', 'butter', 'milk', 'cheese', 'pepper'],
    steps: [
      'Beat eggs with a splash of milk',
      'Melt butter in a non-stick pan',
      'Pour in eggs and let sit for 20 seconds',
      'Gently stir with a spatula',
      'When almost set, add cheese',
      'Season with salt and pepper',
      'Serve immediately'
    ],
    cookTime: '5 minutes'
  }
];
