// Equipment Images
import powerDrill from './power-drill.jpg';
import electricSaw from './electric-saw.jpg';
import lawnMower from './lawn-mower.jpg';
import pressureWasher from './pressure-washer.jpg';
import ladder from './ladder.jpg';
import angleGrinder from './angle-grinder.jpg';

// Export all assets
export const equipmentImages = {
  powerDrill,
  electricSaw,
  lawnMower,
  pressureWasher,
  ladder,
  angleGrinder
};

// Mock data for equipment
export const mockEquipment = [
  {
    id: 1,
    name: "Professional Power Drill",
    image: powerDrill,
    pricePerDay: 150,
    description: "High-quality cordless power drill perfect for construction and DIY projects",
    category: "Power Tools",
    rating: 4.5,
    availability: true,
    owner: "John's Tools",
    location: "Mumbai, Maharashtra"
  },
  {
    id: 2,
    name: "Electric Circular Saw",
    image: electricSaw,
    pricePerDay: 200,
    description: "Professional grade circular saw for precise cutting of wood and metal",
    category: "Cutting Tools",
    rating: 4.8,
    availability: true,
    owner: "Pro Equipment Rental",
    location: "Delhi, Delhi"
  },
  {
    id: 3,
    name: "Lawn Mower",
    image: lawnMower,
    pricePerDay: 300,
    description: "Self-propelled lawn mower ideal for maintaining large gardens and lawns",
    category: "Garden Tools",
    rating: 4.3,
    availability: false,
    owner: "Garden Master",
    location: "Bangalore, Karnataka"
  },
  {
    id: 4,
    name: "Pressure Washer",
    image: pressureWasher,
    pricePerDay: 250,
    description: "High-pressure washer for cleaning vehicles, driveways, and outdoor surfaces",
    category: "Cleaning Tools",
    rating: 4.6,
    availability: true,
    owner: "Clean Pro",
    location: "Chennai, Tamil Nadu"
  },
  {
    id: 5,
    name: "Extension Ladder",
    image: ladder,
    pricePerDay: 100,
    description: "Sturdy extension ladder suitable for construction and maintenance work",
    category: "Access Tools",
    rating: 4.2,
    availability: true,
    owner: "Safety First",
    location: "Pune, Maharashtra"
  },
  {
    id: 6,
    name: "Angle Grinder",
    image: angleGrinder,
    pricePerDay: 120,
    description: "Powerful angle grinder for cutting and grinding metal surfaces",
    category: "Power Tools",
    rating: 4.7,
    availability: true,
    owner: "Metal Works",
    location: "Hyderabad, Telangana"
  }
];

export const categories = [
  "All Categories",
  "Power Tools",
  "Cutting Tools", 
  "Garden Tools",
  "Cleaning Tools",
  "Access Tools"
];

export default { equipmentImages, mockEquipment, categories };