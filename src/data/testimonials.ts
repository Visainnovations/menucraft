export interface Testimonial {
  id: string;
  name: string;
  restaurant: string;
  location: string;
  rating: number;
  text: string;
  avatar: string;
}

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    restaurant: 'Saravana Bhavan',
    location: 'T-Nagar, Chennai',
    rating: 5,
    text: 'MenuCraft transformed how we serve our customers. Digital menus are so much easier to update, and our customers love the convenience! We saved ₹15,000 in printing costs this year alone.',
    avatar: 'R'
  },
  {
    id: '2',
    name: 'Priya Sharma',
    restaurant: 'Spice Garden',
    location: 'Velachery, Chennai',
    rating: 5,
    text: 'The multi-language feature is a game-changer! Our foreign tourists can now easily read the menu in English. Plus, the analytics help us understand which dishes to promote.',
    avatar: 'P'
  },
  {
    id: '3',
    name: 'Arjun Reddy',
    restaurant: 'Coastal Curry House',
    location: 'Besant Nagar, Chennai',
    rating: 5,
    text: 'Best decision we made this year. The setup was quick, support is excellent, and our Google reviews improved because customers appreciate the modern touch. Highly recommended!',
    avatar: 'A'
  },
];