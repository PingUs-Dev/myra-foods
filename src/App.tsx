import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductSection from './components/ProductSection';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';

function App() {
  const snackBoxes = [
    {
      id: 1,
      name: 'Classic Mix Box',
      price: '₹399',
      image: '🥨',
      description: 'A delightful mix of traditional snacks including pretzels, crackers, and nuts.'
    },
    {
      id: 2,
      name: 'Healthy Crunch',
      price: '₹499',
      image: '🥗',
      description: 'Nutritious and delicious mix of dried fruits, seeds, and organic snacks.'
    },
    {
      id: 3,
      name: 'Sweet Treats Box',
      price: '₹449',
      image: '🍪',
      description: 'Indulgent selection of cookies, chocolates, and sweet delicacies.'
    }
  ];

  const eventBoxes = [
    {
      id: 4,
      name: 'Deepavali',
      price: '₹699',
      image: '🎇',
      description: 'Special birthday themed snacks and treats perfect for celebrations.'
    },
    {
      id: 5,
      name: 'Onam',
      price: '₹899',
      image: '🌸',
      description: 'Professional assortment ideal for business meetings and conferences.'
    },
    {
      id: 6,
      name: 'Iftar box  ',
      price: '₹799',
      image: '🕌',
      description: 'Festive selection of seasonal treats and holiday-themed snacks.'
    }
  ];

  const catering = [
    {
      id: 7,
      name: 'Small Event Catering',
      price: '₹1799',
      image: '🍽️',
      description: 'Complete catering solution for events up to 20 people.'
    },
    {
      id: 8,
      name: 'Large Event Catering',
      price: '₹3999',
      image: '🏢',
      description: 'Full-service catering for corporate events and large gatherings.'
    },
    {
      id: 9,
      name: 'Custom Menu Planning',
      price: '₹2999',
      image: '📋',
      description: 'Personalized catering with custom menu design and planning.'
    }
  ];

  const otherProducts = [
    {
      id: 10,
      name: 'Birthday cakes',
      price: '₹319',
      image: '🎂',
      description: 'Premium collection of exotic spices and seasonings.'
    },
    {
      id: 11,
      name: 'Artisan Beverages',
      price: '₹579',
      image: '🥤',
      description: 'Handcrafted drinks and specialty beverages from local artisans.'
    },
    {
      id: 12,
      name: 'Gift Hampers',
      price: '₹999',
      image: '🎁',
      description: 'Beautifully packaged gift collections for special occasions.'
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <ProductSection
        id="snack-boxes"
        title="Corporate"
        subtitle="Curated snack collections specially designed for businesses, meetings, and corporate events."
        products={snackBoxes}
      />
      <ProductSection
        id="event-boxes"
        title="Festive & other events"
        subtitle="Thoughtfully crafted snack boxes perfect for celebrations, festivals, corporate meetings, and special occasions."
        products={eventBoxes}
      />
      <ProductSection
        id="catering"
        title="Birthday"
        subtitle="Professional catering for birthdays of all sizes, offering curated snack boxes and exceptional service."
        products={otherProducts}
      />
      <ProductSection
        id="other-products"
        title="Catering"
        subtitle="Delicious dishes and special foods for every occasion, from small gatherings to big celebrations."
        products= {catering}
      />
      <Testimonials />
      <Footer />
    </div>
  );
}

export default App;