import React, { useState } from 'react';
import { X, Plus, Minus, Star, Clock, Truck, Shield } from 'lucide-react';
import { useCart } from './CartProvider';

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  description: string;
  rating?: number;
  ingredients?: string[];
  nutritionalInfo?: {
    calories: number;
    protein: string;
    carbs: string;
    fat: string;
  };
  deliveryTime?: string;
}

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart?: (product: Product, quantity: number) => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, isOpen, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState('Regular');
  const { addToCart } = useCart();

  if (!isOpen || !product) return null;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    onClose();
    setQuantity(1);
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

  const variants = ['Regular', 'Large', 'Family Pack'];
  const features = [
    { icon: Clock, text: 'Fresh & Hot', color: 'text-green-600' },
    { icon: Truck, text: 'Fast Delivery', color: 'text-blue-600' },
    { icon: Shield, text: 'Quality Assured', color: 'text-purple-600' }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Product Image Section */}
          <div className="bg-gradient-to-br from-green-100 to-yellow-100 h-64 flex items-center justify-center relative overflow-hidden">
            <div className="text-8xl transform hover:scale-110 transition-transform duration-300">
              {product.image}
            </div>
            <div className="absolute top-4 left-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              Popular Choice
            </div>
          </div>

          {/* Content */}
          <div className="p-8 space-y-6">
            {/* Header */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold text-gray-900">{product.name}</h2>
                <div className="flex items-center space-x-1">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium text-gray-700">{product.rating || 4.5}</span>
                  <span className="text-gray-500">(124 reviews)</span>
                </div>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed">{product.description}</p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2 bg-gray-50 rounded-lg p-3">
                  <feature.icon className={`h-5 w-5 ${feature.color}`} />
                  <span className="text-sm font-medium text-gray-700">{feature.text}</span>
                </div>
              ))}
            </div>

            {/* Variants */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">Choose Size</h3>
              <div className="flex space-x-3">
                {variants.map((variant) => (
                  <button
                    key={variant}
                    onClick={() => setSelectedVariant(variant)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedVariant === variant
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {variant}
                  </button>
                ))}
              </div>
            </div>

            {/* Ingredients */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">Ingredients</h3>
              <div className="flex flex-wrap gap-2">
                {(product.ingredients || ['Fresh vegetables', 'Premium spices', 'Organic herbs', 'Natural flavors']).map((ingredient, index) => (
                  <span
                    key={index}
                    className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                  >
                    {ingredient}
                  </span>
                ))}
              </div>
            </div>

            {/* Nutritional Info */}
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">Nutritional Information</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="text-center">
                  <div className="font-bold text-green-600">{product.nutritionalInfo?.calories || 250}</div>
                  <div className="text-gray-600">Calories</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-blue-600">{product.nutritionalInfo?.protein || '12g'}</div>
                  <div className="text-gray-600">Protein</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-purple-600">{product.nutritionalInfo?.carbs || '18g'}</div>
                  <div className="text-gray-600">Carbs</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-orange-600">{product.nutritionalInfo?.fat || '8g'}</div>
                  <div className="text-gray-600">Fat</div>
                </div>
              </div>
            </div>

            {/* Add to Cart Section */}
            <div className="border-t pt-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold text-green-600">{product.price}</div>
                  <div className="text-sm text-gray-500">Inclusive of all taxes</div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center bg-gray-100 rounded-lg">
                    <button
                      onClick={decrementQuantity}
                      className="p-2 hover:bg-gray-200 rounded-l-lg transition-colors"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="px-4 py-2 font-medium">{quantity}</span>
                    <button
                      onClick={incrementQuantity}
                      className="p-2 hover:bg-gray-200 rounded-r-lg transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105"
                >
                  Add to Cart • ₹{parseInt(product.price.replace('₹', '')) * quantity}
                </button>
                <button className="px-6 py-4 border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white rounded-lg font-semibold transition-colors">
                  ♥ Save
                </button>
              </div>

              <div className="text-center text-sm text-gray-500">
                🚚 Free delivery on orders above ₹500 • ⏱️ Delivery in {product.deliveryTime || '30-45 mins'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;