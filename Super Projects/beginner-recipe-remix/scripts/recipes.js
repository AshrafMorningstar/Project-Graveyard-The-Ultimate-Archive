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
        title: "Classic Spaghetti Carbonara",
        ingredients: ["spaghetti", "eggs", "bacon", "parmesan", "black pepper", "salt"],
        diet: "all",
        difficulty: "medium",
        time: 25,
        servings: 4,
        steps: [
            "Cook spaghetti in salted boiling water until al dente",
            "Fry bacon until crispy, then set aside",
            "Beat eggs with grated parmesan and black pepper",
            "Drain pasta, reserving 1 cup of pasta water",
            "Mix hot pasta with egg mixture, adding pasta water to create creamy sauce",
            "Top with crispy bacon and extra parmesan"
        ],
        emoji: "🍝"
    },
    {
        id: 2,
        title: "Chicken Stir-Fry",
        ingredients: ["chicken", "soy sauce", "garlic", "ginger", "vegetables", "rice", "sesame oil"],
        diet: "all",
        difficulty: "easy",
        time: 20,
        servings: 4,
        steps: [
            "Cut chicken into bite-sized pieces",
            "Heat sesame oil in wok over high heat",
            "Stir-fry chicken until golden, about 5 minutes",
            "Add minced garlic and ginger, cook for 1 minute",
            "Add vegetables and stir-fry for 3-4 minutes",
            "Add soy sauce and toss to combine",
            "Serve over steamed rice"
        ],
        emoji: "🍗"
    },
    {
        id: 3,
        title: "Vegetarian Buddha Bowl",
        ingredients: ["quinoa", "chickpeas", "avocado", "spinach", "tomatoes", "tahini", "lemon"],
        diet: "vegetarian",
        difficulty: "easy",
        time: 30,
        servings: 2,
        steps: [
            "Cook quinoa according to package instructions",
            "Roast chickpeas with olive oil and spices at 400°F for 20 minutes",
            "Prepare tahini dressing with lemon juice",
            "Arrange quinoa, chickpeas, sliced avocado, spinach, and tomatoes in bowl",
            "Drizzle with tahini dressing",
            "Garnish with seeds and herbs"
        ],
        emoji: "🥗"
    },
    {
        id: 4,
        title: "Beef Tacos",
        ingredients: ["ground beef", "taco seasoning", "tortillas", "lettuce", "tomatoes", "cheese", "sour cream"],
        diet: "all",
        difficulty: "easy",
        time: 20,
        servings: 4,
        steps: [
            "Brown ground beef in skillet over medium-high heat",
            "Add taco seasoning and water, simmer for 5 minutes",
            "Warm tortillas in dry pan or microwave",
            "Chop lettuce and tomatoes",
            "Assemble tacos with beef, lettuce, tomatoes, cheese",
            "Top with sour cream and serve"
        ],
        emoji: "🌮"
    },
    {
        id: 5,
        title: "Vegan Curry",
        ingredients: ["coconut milk", "curry paste", "tofu", "vegetables", "rice", "lime", "cilantro"],
        diet: "vegan",
        difficulty: "medium",
        time: 35,
        servings: 4,
        steps: [
            "Press and cube tofu, then pan-fry until golden",
            "Sauté curry paste in coconut oil for 1 minute",
            "Add coconut milk and bring to simmer",
            "Add vegetables and cook until tender",
            "Add tofu and simmer for 5 minutes",
            "Serve over rice with lime and cilantro"
        ],
        emoji: "🍛"
    },
    {
        id: 6,
        title: "Margherita Pizza",
        ingredients: ["pizza dough", "tomato sauce", "mozzarella", "basil", "olive oil", "garlic"],
        diet: "vegetarian",
        difficulty: "medium",
        time: 45,
        servings: 2,
        steps: [
            "Preheat oven to 475°F with pizza stone inside",
            "Roll out pizza dough to desired thickness",
            "Spread tomato sauce evenly, leaving border for crust",
            "Add sliced mozzarella and minced garlic",
            "Bake for 12-15 minutes until crust is golden",
            "Top with fresh basil and drizzle with olive oil"
        ],
        emoji: "🍕"
    },
    {
        id: 7,
        title: "Salmon with Asparagus",
        ingredients: ["salmon", "asparagus", "lemon", "garlic", "olive oil", "dill"],
        diet: "all",
        difficulty: "easy",
        time: 25,
        servings: 2,
        steps: [
            "Preheat oven to 400°F",
            "Place salmon and asparagus on baking sheet",
            "Drizzle with olive oil, minced garlic, and lemon juice",
            "Season with salt, pepper, and dill",
            "Bake for 15-18 minutes until salmon flakes easily",
            "Serve with lemon wedges"
        ],
        emoji: "🐟"
    },
    {
        id: 8,
        title: "Greek Salad",
        ingredients: ["cucumber", "tomatoes", "red onion", "feta", "olives", "olive oil", "oregano"],
        diet: "vegetarian",
        difficulty: "easy",
        time: 10,
        servings: 4,
        steps: [
            "Chop cucumber, tomatoes, and red onion into chunks",
            "Combine vegetables in large bowl",
            "Add olives and crumbled feta cheese",
            "Drizzle with olive oil and sprinkle with oregano",
            "Toss gently to combine",
            "Serve immediately or chill"
        ],
        emoji: "🥙"
    },
    {
        id: 9,
        title: "Mushroom Risotto",
        ingredients: ["arborio rice", "mushrooms", "vegetable broth", "white wine", "parmesan", "butter", "onion"],
        diet: "vegetarian",
        difficulty: "hard",
        time: 45,
        servings: 4,
        steps: [
            "Sauté sliced mushrooms in butter until golden, set aside",
            "Sauté diced onion until translucent",
            "Add arborio rice and toast for 2 minutes",
            "Add white wine and stir until absorbed",
            "Add warm broth one ladle at a time, stirring constantly",
            "When rice is creamy and al dente, stir in mushrooms, butter, and parmesan"
        ],
        emoji: "🍄"
    },
    {
        id: 10,
        title: "Breakfast Burrito",
        ingredients: ["eggs", "tortillas", "cheese", "beans", "salsa", "avocado", "bell peppers"],
        diet: "vegetarian",
        difficulty: "easy",
        time: 15,
        servings: 2,
        steps: [
            "Scramble eggs in pan with diced bell peppers",
            "Warm tortillas and beans",
            "Layer eggs, beans, cheese, and salsa on tortilla",
            "Add sliced avocado",
            "Roll burrito tightly, tucking in sides",
            "Optional: toast burrito in pan for crispy exterior"
        ],
        emoji: "🌯"
    }
];
