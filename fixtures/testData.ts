export const testData = {
  users: {
    standard: {
      username: process.env.STANDARD_USER || 'standard_user',
      password: process.env.PASSWORD || 'secret_sauce',
    },
    locked: {
      username: process.env.LOCKED_USER || 'locked_out_user',
      password: process.env.PASSWORD || 'secret_sauce',
    },
    problem: {
      username: process.env.PROBLEM_USER || 'problem_user',
      password: process.env.PASSWORD || 'secret_sauce',
    },
    performance: {
      username: process.env.PERFORMANCE_USER || 'performance_glitch_user',
      password: process.env.PASSWORD || 'secret_sauce',
    },
  },
  checkoutInfo: {
    firstName: 'Juan',
    lastName: 'Perez',
    postalCode: '12345',
  },
  products: {
    backpack: 'Sauce Labs Backpack',
    bikeLight: 'Sauce Labs Bike Light',
    boltTShirt: 'Sauce Labs Bolt T-Shirt',
    fleeceJacket: 'Sauce Labs Fleece Jacket',
    onesie: 'Sauce Labs Onesie',
    redTShirt: 'Test.allTheThings() T-Shirt (Red)',
  },
};
