import { Product } from './types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    title: 'Sony WH-1000XM5 Wireless Noise Canceling Headphones',
    description: 'The Sony WH-1000XM5 headphones deliver industry-leading noise cancellation, exceptional sound quality, and crystal-clear hands-free calling. With up to 30 hours of battery life and a comfortable, lightweight design, they are perfect for long listening sessions.',
    category: 'Electronics',
    brand: 'Sony',
    imageUrl: 'https://picsum.photos/400/400?random=1',
    rating: 4.8,
    reviewCount: 12450,
    offers: [
      { storeName: 'Amazon', storeLogo: 'A', price: 348.00, currency: 'USD', buyUrl: '#', condition: 'New', shipping: 'Free Prime' },
      { storeName: 'Best Buy', storeLogo: 'B', price: 349.99, currency: 'USD', buyUrl: '#', condition: 'New', shipping: 'Free' },
      { storeName: 'Walmart', storeLogo: 'W', price: 329.00, currency: 'USD', buyUrl: '#', condition: 'New', shipping: '$5.99' },
      { storeName: 'eBay', storeLogo: 'E', price: 299.00, currency: 'USD', buyUrl: '#', condition: 'Refurbished', shipping: 'Free' },
    ],
    priceHistory: [
      { date: '2023-08', price: 399 },
      { date: '2023-09', price: 399 },
      { date: '2023-10', price: 348 },
      { date: '2023-11', price: 329 },
      { date: '2023-12', price: 348 },
      { date: '2024-01', price: 348 },
    ],
    specs: {
      'Battery Life': '30 Hours',
      'Weight': '250g',
      'Connectivity': 'Bluetooth 5.2',
      'Color': 'Black/Silver'
    }
  },
  {
    id: '2',
    title: 'Apple MacBook Air 15" (M2 Chip)',
    description: 'Impossibly thin and incredibly fast. The 15-inch MacBook Air features the powerful M2 chip, a stunning Liquid Retina display, and up to 18 hours of battery life.',
    category: 'Laptops',
    brand: 'Apple',
    imageUrl: 'https://picsum.photos/400/400?random=2',
    rating: 4.9,
    reviewCount: 5320,
    offers: [
      { storeName: 'Apple', storeLogo: 'Ap', price: 1299.00, currency: 'USD', buyUrl: '#', condition: 'New', shipping: 'Free' },
      { storeName: 'Amazon', storeLogo: 'A', price: 1199.00, currency: 'USD', buyUrl: '#', condition: 'New', shipping: 'Free' },
      { storeName: 'B&H', storeLogo: 'BH', price: 1199.00, currency: 'USD', buyUrl: '#', condition: 'New', shipping: 'Free' },
    ],
    priceHistory: [
      { date: '2023-06', price: 1299 },
      { date: '2023-09', price: 1249 },
      { date: '2023-11', price: 1049 },
      { date: '2024-01', price: 1199 },
    ],
    specs: {
      'Processor': 'Apple M2',
      'Screen Size': '15.3 inches',
      'Memory': '8GB Unified',
      'Storage': '256GB SSD'
    }
  },
  {
    id: '3',
    title: 'Dyson V15 Detect Cordless Vacuum',
    description: 'Dyson V15 Detect is the most powerful, intelligent cordless vacuum. It reveals microscopic dust with a laser and adapts suction based on floor type.',
    category: 'Home',
    brand: 'Dyson',
    imageUrl: 'https://picsum.photos/400/400?random=3',
    rating: 4.7,
    reviewCount: 3100,
    offers: [
      { storeName: 'Dyson', storeLogo: 'D', price: 749.99, currency: 'USD', buyUrl: '#', condition: 'New', shipping: 'Free' },
      { storeName: 'Target', storeLogo: 'T', price: 699.99, currency: 'USD', buyUrl: '#', condition: 'New', shipping: 'Free' },
      { storeName: 'Amazon', storeLogo: 'A', price: 680.00, currency: 'USD', buyUrl: '#', condition: 'New', shipping: 'Free' },
    ],
    priceHistory: [
      { date: '2023-05', price: 749 },
      { date: '2023-08', price: 749 },
      { date: '2023-11', price: 599 },
      { date: '2024-01', price: 699 },
    ],
    specs: {
      'Run Time': '60 Minutes',
      'Bin Volume': '0.77 Liters',
      'Weight': '6.8 lbs',
      'Filter': 'Whole-machine HEPA'
    }
  },
  {
    id: '4',
    title: 'Samsung 65" Class S90C OLED 4K Smart TV',
    description: 'Experience pure blacks and vibrant colors with Samsung OLED technology. LaserSlim design and Neural Quantum Processor 4K upscale content to 4K resolution.',
    category: 'Electronics',
    brand: 'Samsung',
    imageUrl: 'https://picsum.photos/400/400?random=4',
    rating: 4.6,
    reviewCount: 890,
    offers: [
      { storeName: 'Best Buy', storeLogo: 'B', price: 1599.99, currency: 'USD', buyUrl: '#', condition: 'New', shipping: 'Free' },
      { storeName: 'Samsung', storeLogo: 'S', price: 1599.99, currency: 'USD', buyUrl: '#', condition: 'New', shipping: 'Free' },
      { storeName: 'Amazon', storeLogo: 'A', price: 1597.99, currency: 'USD', buyUrl: '#', condition: 'New', shipping: 'Free' },
    ],
    priceHistory: [
      { date: '2023-04', price: 2599 },
      { date: '2023-07', price: 2199 },
      { date: '2023-11', price: 1499 },
      { date: '2024-01', price: 1599 },
    ],
    specs: {
      'Resolution': '4K (2160p)',
      'Panel Type': 'OLED',
      'Refresh Rate': '144Hz',
      'HDR': 'HDR10+'
    }
  },
];

export const CATEGORIES = ['Electronics', 'Laptops', 'Home', 'Fashion', 'Sports', 'Beauty'];
export const POPULAR_SEARCHES = ['iPhone 15', 'PlayStation 5', 'Air Fryer', 'Running Shoes', 'OLED TV'];