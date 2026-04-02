// ── In-memory data store — replaces MongoDB ──
const bcrypt = require('bcryptjs')

// helper to make a simple id
let counter = 1000
function makeId() { return String(++counter) }

// ── seed data ──
const HASHED_PASS = bcrypt.hashSync('password123', 10)

const store = {

  users: [
    {
      _id: '1',
      name: 'Leyla Huseynova',
      email: 'leyla@email.com',
      password: HASHED_PASS,
      phone: '+994 50 111 22 33',
      role: 'user',
      avatar: '',
      isActive: true,
      wishlist: [],
      pets: [
        { _id: 'p1', name: 'Max',  type: 'Dog', breed: 'Golden Retriever', age: '3 years' },
        { _id: 'p2', name: 'Luna', type: 'Cat', breed: 'Siamese',          age: '2 years' },
      ],
      createdAt: new Date('2024-01-15'),
    },
    {
      _id: '2',
      name: 'Nigar Aliyeva',
      email: 'nigar@pawsclinic.az',
      password: HASHED_PASS,
      phone: '+994 50 999 88 77',
      role: 'provider',
      avatar: '',
      isActive: true,
      wishlist: [],
      pets: [],
      createdAt: new Date('2024-01-10'),
    },
    {
      _id: '3',
      name: 'Admin User',
      email: 'admin@paws.az',
      password: HASHED_PASS,
      phone: '+994 50 000 00 00',
      role: 'admin',
      avatar: '',
      isActive: true,
      wishlist: [],
      pets: [],
      createdAt: new Date('2024-01-01'),
    },
  ],

  providers: [
    {
      _id: 'prov1',
      user: '2',
      businessName: 'Paws Veterinary Clinic',
      category: 'Veterinary',
      description: 'Experienced veterinary clinic providing comprehensive care for all pets.',
      phone: '+994 12 555 01 23',
      email: 'nigar@pawsclinic.az',
      address: 'Nizami Street 45, Baku',
      city: 'Baku',
      logo: '',
      gallery: [],
      rating: 4.9,
      totalReviews: 213,
      isVerified: true,
      isActive: true,
      status: 'approved',
      socialLinks: { instagram: '', facebook: '', whatsapp: '', website: '' },
      workingHours: {
        monday:    { open: true,  from: '09:00', to: '18:00' },
        tuesday:   { open: true,  from: '09:00', to: '18:00' },
        wednesday: { open: true,  from: '09:00', to: '18:00' },
        thursday:  { open: true,  from: '09:00', to: '18:00' },
        friday:    { open: true,  from: '09:00', to: '17:00' },
        saturday:  { open: true,  from: '10:00', to: '15:00' },
        sunday:    { open: false, from: '10:00', to: '14:00' },
      },
      breaks: [{ id: 'b1', label: 'Lunch Break', from: '13:00', to: '14:00' }],
      unavailableDates: [],
      createdAt: new Date('2024-01-10'),
    },
  ],

  services: [
    { _id: 'sv1', provider: 'prov1', name: 'General Check-up',     category: 'Veterinary', description: 'Full physical examination for all pets.', price: 35, duration: '30 min', isActive: true, totalBookings: 48, rating: 5.0, totalReviews: 48 },
    { _id: 'sv2', provider: 'prov1', name: 'Vaccination Package',  category: 'Veterinary', description: 'Core and non-core vaccines.', price: 55, duration: '20 min', isActive: true, totalBookings: 36, rating: 4.9, totalReviews: 36 },
    { _id: 'sv3', provider: 'prov1', name: 'Dental Cleaning',      category: 'Veterinary', description: 'Professional dental scaling.', price: 65, duration: '45 min', isActive: true, totalBookings: 22, rating: 4.8, totalReviews: 22 },
    { _id: 'sv4', provider: 'prov1', name: 'Specialised Treatment',category: 'Veterinary', description: 'Diagnosis and treatment for chronic conditions.', price: 80, duration: '60 min', isActive: true, totalBookings: 15, rating: 5.0, totalReviews: 15 },
  ],

  bookings: [
    { _id: 'bk1', user: '1', provider: 'prov1', service: 'sv1', status: 'Pending',   date: '2026-04-10', time: '10:00', duration: '30 min', price: 35, notes: 'Max has been scratching his ear.', pet: { name: 'Max', type: 'Dog', breed: 'Golden Retriever', age: '3 years' }, createdAt: new Date('2026-04-01') },
    { _id: 'bk2', user: '1', provider: 'prov1', service: 'sv2', status: 'Confirmed', date: '2026-04-12', time: '11:30', duration: '20 min', price: 55, notes: 'Annual vaccination.', pet: { name: 'Luna', type: 'Cat', breed: 'Siamese', age: '2 years' }, createdAt: new Date('2026-04-01') },
    { _id: 'bk3', user: '1', provider: 'prov1', service: 'sv3', status: 'Completed', date: '2026-03-20', time: '14:00', duration: '45 min', price: 65, notes: '', pet: { name: 'Max', type: 'Dog', breed: 'Golden Retriever', age: '3 years' }, createdAt: new Date('2026-03-15') },
  ],

  notifications: [
    { _id: 'n1', recipient: '2', type: 'booking', title: 'New Booking Request', message: 'New booking from Leyla Huseynova for General Check-up', isRead: false, createdAt: new Date('2026-04-01T10:00:00') },
    { _id: 'n2', recipient: '2', type: 'booking', title: 'New Booking Request', message: 'New booking from Leyla Huseynova for Vaccination Package', isRead: false, createdAt: new Date('2026-04-01T09:00:00') },
    { _id: 'n3', recipient: '1', type: 'booking', title: 'Booking Confirmed!', message: 'Your vaccination booking has been confirmed.', isRead: false, createdAt: new Date('2026-04-01T11:00:00') },
    { _id: 'n4', recipient: '1', type: 'system',  title: 'Welcome to Paws.az!', message: 'Welcome! Start booking services for your pets.', isRead: true,  createdAt: new Date('2024-01-15') },
  ],

  reviews: [],

  products: [
    { _id: 'pr1',  name: 'Royal Canin Kitten Food',      brand: 'Royal Canin', category: 'Food',        species: 'Cats',    price: 12, oldPrice: null, unit: '2 kg',     weight: '2 kg',   age: '2-12 months', stock: 50, images: [], badge: 'Best seller', badgeColor: '#f5c842', rating: 5.0, totalReviews: 267, isActive: true },
    { _id: 'pr2',  name: 'Brit Care Dog Food',           brand: 'Brit Care',   category: 'Food',        species: 'Dogs',    price: 21, oldPrice: null, unit: '3 kg',     weight: '3 kg',   age: '7+ months',   stock: 40, images: [], badge: 'Top rated',  badgeColor: '#5db87a', rating: 4.9, totalReviews: 189, isActive: true },
    { _id: 'pr3',  name: 'Kong Interactive Puzzle Toy',  brand: 'Kong',        category: 'Toys',        species: 'Dogs',    price: 18, oldPrice: 24,   unit: '1 pc',     weight: '0.3 kg', age: 'All ages',    stock: 30, images: [], badge: 'Sale',       badgeColor: '#f0826a', rating: 4.8, totalReviews: 88,  isActive: true },
    { _id: 'pr4',  name: 'Hertzko Slicker Brush',        brand: 'Hertzko',     category: 'Grooming',    species: 'All',     price: 20, oldPrice: 26,   unit: '1 pc',     weight: '0.2 kg', age: 'All ages',    stock: 35, images: [], badge: 'Best seller', badgeColor: '#f5c842', rating: 4.9, totalReviews: 334, isActive: true },
    { _id: 'pr5',  name: 'Zesty Paws Omega-3',           brand: 'Zesty Paws',  category: 'Health',      species: 'Dogs',    price: 28, oldPrice: 35,   unit: '90 chews', weight: '0.3 kg', age: 'All ages',    stock: 25, images: [], badge: 'Sale',       badgeColor: '#f0826a', rating: 4.9, totalReviews: 177, isActive: true },
    { _id: 'pr6',  name: 'Adjustable Dog Harness',       brand: 'Ruffwear',    category: 'Accessories', species: 'Dogs',    price: 55, oldPrice: 70,   unit: '1 pc',     weight: '0.4 kg', age: 'Adult',       stock: 20, images: [], badge: 'Top rated',  badgeColor: '#5db87a', rating: 5.0, totalReviews: 91,  isActive: true },
    { _id: 'pr7',  name: 'Padovan Grandmix Rabbit',      brand: 'Padovan',     category: 'Food',        species: 'Rabbit',  price: 9,  oldPrice: null, unit: '1 kg',     weight: '1 kg',   age: '3+ months',   stock: 30, images: [], badge: null,         badgeColor: null,      rating: 4.7, totalReviews: 98,  isActive: true },
    { _id: 'pr8',  name: 'Tetra Goldfish Granules',      brand: 'Tetra',       category: 'Food',        species: 'Fish',    price: 8,  oldPrice: null, unit: '100 g',    weight: '100 g',  age: 'All ages',    stock: 45, images: [], badge: null,         badgeColor: null,      rating: 4.7, totalReviews: 156, isActive: true },
    { _id: 'pr9',  name: 'Vitakraft Hamster Mix',        brand: 'Vitakraft',   category: 'Food',        species: 'Hamster', price: 7,  oldPrice: null, unit: '1 kg',     weight: '1 kg',   age: 'All ages',    stock: 30, images: [], badge: null,         badgeColor: null,      rating: 4.6, totalReviews: 143, isActive: true },
    { _id: 'pr10', name: 'Premium Parrot Mix',           brand: 'Versele-Laga',category: 'Food',        species: 'Birds',   price: 14, oldPrice: null, unit: '1 kg',     weight: '1 kg',   age: 'All ages',    stock: 20, images: [], badge: null,         badgeColor: null,      rating: 4.8, totalReviews: 88,  isActive: true },
    { _id: 'pr11', name: 'Orthopedic Memory Foam Bed',   brand: 'BarkBox',     category: 'Beds',        species: 'Dogs',    price: 65, oldPrice: 85,   unit: '1 pc',     weight: '2 kg',   age: 'All ages',    stock: 15, images: [], badge: 'Best seller', badgeColor: '#f5c842', rating: 4.9, totalReviews: 156, isActive: true },
    { _id: 'pr12', name: 'Bird Swing and Mirror Set',    brand: 'JW Pet',      category: 'Toys',        species: 'Birds',   price: 11, oldPrice: null, unit: '1 pc',     weight: '0.15 kg',age: 'All ages',    stock: 25, images: [], badge: null,         badgeColor: null,      rating: 4.8, totalReviews: 73,  isActive: true },
  ],

  orders: [],
}

// ── CRUD helpers ──

store.findById = (collection, id) => store[collection].find((item) => item._id === id)

store.findOne = (collection, predicate) => store[collection].find(predicate)

store.find = (collection, predicate) => {
  if (!predicate) return [...store[collection]]
  return store[collection].filter(predicate)
}

store.create = (collection, data) => {
  const item = { _id: makeId(), createdAt: new Date(), updatedAt: new Date(), ...data }
  store[collection].push(item)
  return item
}

store.update = (collection, id, data) => {
  const index = store[collection].findIndex((item) => item._id === id)
  if (index === -1) return null
  store[collection][index] = { ...store[collection][index], ...data, updatedAt: new Date() }
  return store[collection][index]
}

store.delete = (collection, id) => {
  const index = store[collection].findIndex((item) => item._id === id)
  if (index === -1) return false
  store[collection].splice(index, 1)
  return true
}

module.exports = { store, makeId }