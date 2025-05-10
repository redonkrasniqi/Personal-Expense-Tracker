// scripts/seedTransactions.ts

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

// ← CHANGE THESE:
const user = 'REPLACE_WITH_USER_ID' // Replace with the actual user ID
const numberOfTransactions = 50
const daysSpanDays = 365

const categoryIds = [
  'cmq8wyyze4npkygqhmza1gs4f', // Groceries
  'c2c0s0y2mr12odeqcnqpta2h5', // Dining Out
  'csnsh4xg4audxvu7xpm1mmmde', // Housing
  'cidw4eq7rqkph5dyyhcturxt9', // Utilities
  'c98c56jkp4o6k6qx94zuznm9s', // Transportation
  'cynj55indms4xfi0vg3e7a0dq', // Health & Fitness
  'c6qfz8vkjyqo8j5zn4w5yvx60', // Entertainment
  'c08ltzft77p71wv5n7revsyzr'  // Shopping
]

const descriptionsMap: Record<string, string[]> = {
  cmq8wyyze4npkygqhmza1gs4f: [
    'Weekly supermarket run',
    'Bought fresh produce',
    'Grocery haul',
    'Stocked up pantry staples',
    'Organic fruits & veggies',
    'Bulk grain purchase',
    'Dairy & eggs restock',
    'Household essentials',
    'Bakery and deli items',
    'Snack treats'
  ],
  c2c0s0y2mr12odeqcnqpta2h5: [
    'Dinner at Italian bistro',
    'Coffee and croissant',
    'Takeaway sushi',
    'Brunch with friends',
    'Pizza delivery',
    'Café latte and muffin',
    'Lunch special',
    'Dessert at patisserie',
    'Tapas and wine',
    'Fast food run'
  ],
  csnsh4xg4audxvu7xpm1mmmde: [
    'Monthly rent payment',
    'Mortgage installment',
    'Apartment association fees',
    'Home loan interest',
    'Lease renewal fee',
    'Property tax',
    'Security deposit top-up',
    'Insurance premium',
    'Maintenance charge',
    'HOA dues'
  ],
  cidw4eq7rqkph5dyyhcturxt9: [
    'Electricity bill',
    'Water utility payment',
    'Gas service charge',
    'Internet subscription',
    'Mobile phone bill',
    'Trash collection fee',
    'Heating oil refill',
    'Cable TV package',
    'Home security service',
    'Renewed Wi-Fi router'
  ],
  c98c56jkp4o6k6qx94zuznm9s: [
    'Gas station fill-up',
    'Monthly transit pass',
    'Taxi ride',
    'Train ticket',
    'Parking garage fee',
    'Rideshare to work',
    'Fuel for generator',
    'Bike share rental',
    'Car wash service',
    'Vehicle toll charge'
  ],
  cynj55indms4xfi0vg3e7a0dq: [
    'Gym membership fee',
    'Pharmacy purchase',
    'Doctor co-pay',
    'Yoga class',
    'Vitamins & supplements',
    'Sports equipment',
    'Dental cleaning',
    'Health screening',
    'Fitness tracker',
    'Therapy session'
  ],
  c6qfz8vkjyqo8j5zn4w5yvx60: [
    'Movie streaming subscription',
    'Concert ticket',
    'Video game purchase',
    'Museum entry fee',
    'Board game',
    'Amusement park',
    'Theater show',
    'Online course',
    'Book purchase',
    'Music album download'
  ],
  c08ltzft77p71wv5n7revsyzr: [
    'New headphones',
    'Shoes shopping',
    'Home décor items',
    'Electronics gadget',
    'Clothing haul',
    'Gift for friend',
    'Kitchen appliance',
    'Garden supplies',
    'Office stationery',
    'Beauty products'
  ]
}

const randomElement = <T>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)]
const weightedPaymentMethod = (): string => {
  const r = Math.random()
  if (r < 0.7) return 'cash'
  if (r < 0.85) return 'creditCard'
  return 'debitCard'
}

async function main() {
  const transactions = Array.from({ length: numberOfTransactions }).map(() => {
    const categoryId = randomElement(categoryIds)
    return {
      amount: parseFloat((Math.random() * 400).toFixed(2)),
      date: new Date(
        Date.now() - Math.random() * daysSpanDays * 24 * 60 * 60 * 1000
      ),
      paymentMethod: weightedPaymentMethod(),
      categoryId,
      userId: user,
      description: randomElement(descriptionsMap[categoryId]!)
    }
  })

  await prisma.transaction.createMany({ data: transactions })
  console.log(
    `✅ Inserted ${transactions.length} transactions for user ${user}`
  )
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
