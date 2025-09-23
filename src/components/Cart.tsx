import React from 'react';
import { useCart } from './CartProvider';
import { Plus, Minus, Trash2, ShoppingBag, ArrowRight, Tag, Clock } from 'lucide-react';
import Header from './Header';

const Cart: React.FC = () => {
  const { cartItems, updateQuantity, removeFromCart, getTotalItems, getTotalPrice, clearCart } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="mb-8">
              <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
              <p className="text-gray-600 text-lg">Looks like you haven't added anything to your cart yet.</p>
            </div>
            
            <div className="space-y-4">
              <a
                href="/"
                className="inline-flex items-center justify-center bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105"
              >
                <span>Continue Shopping</span>
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
              
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="bg-green-50 p-6 rounded-xl">
                  <h3 className="font-semibold text-green-800 mb-2">Fresh & Quality</h3>
                  <p className="text-green-700 text-sm">All our products are sourced fresh daily</p>
                </div>
                <div className="bg-yellow-50 p-6 rounded-xl">
                  <h3 className="font-semibold text-yellow-800 mb-2">Fast Delivery</h3>
                  <p className="text-yellow-700 text-sm">Get your order delivered in 30-45 minutes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const subtotal = getTotalPrice();
  const deliveryFee = subtotal >= 500 ? 0 : 49;
  const tax = Math.round(subtotal * 0.05); // 5% tax
  const total = subtotal + deliveryFee + tax;
  const savings = subtotal >= 500 ? 49 : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-green-600 to-green-700 p-6">
                <h1 className="text-2xl font-bold text-white flex items-center">
                  <ShoppingBag className="mr-3 h-6 w-6" />
                  Your Cart ({getTotalItems()} items)
                </h1>
              </div>

              <div className="p-6 space-y-4">
                {cartItems.map((item) => {
                  const itemPrice = parseInt(item.price.replace('₹', ''));
                  const itemTotal = itemPrice * item.quantity;

                  return (
                    <div key={item.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                      {/* Product Image */}
                      <div className="flex-shrink-0">
                        <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-yellow-100 rounded-xl flex items-center justify-center">
                          <span className="text-3xl">{item.image}</span>
                        </div>
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 text-lg">{item.name}</h3>
                        <p className="text-gray-600 text-sm line-clamp-2">{item.description}</p>
                        <div className="flex items-center mt-2">
                          <span className="text-green-600 font-bold text-lg">₹{itemPrice}</span>
                          <span className="text-gray-500 text-sm ml-2">per item</span>
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center bg-white rounded-lg border border-gray-200">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-2 hover:bg-gray-100 rounded-l-lg transition-colors"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="px-4 py-2 font-medium min-w-[3rem] text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-2 hover:bg-gray-100 rounded-r-lg transition-colors"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      {/* Item Total & Remove */}
                      <div className="text-right">
                        <div className="font-bold text-xl text-gray-900">₹{itemTotal}</div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700 mt-2 p-1 hover:bg-red-50 rounded transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}

                {/* Clear Cart Button */}
                <div className="pt-4 border-t border-gray-200">
                  <button
                    onClick={clearCart}
                    className="text-red-600 hover:text-red-800 text-sm font-medium flex items-center"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Clear all items
                  </button>
                </div>
              </div>
            </div>

            {/* Delivery Information */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <Clock className="h-5 w-5 mr-2 text-green-600" />
                Delivery Information
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-green-50 p-4 rounded-xl">
                  <div className="font-medium text-green-800">Estimated Delivery</div>
                  <div className="text-green-700">30-45 minutes</div>
                </div>
                <div className="bg-blue-50 p-4 rounded-xl">
                  <div className="font-medium text-blue-800">Delivery Address</div>
                  <div className="text-blue-700 text-sm">123 Main Street, City</div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden sticky top-24">
              <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-6">
                <h2 className="text-xl font-bold text-white">Order Summary</h2>
              </div>

              <div className="p-6 space-y-4">
                {/* Promo Code */}
                <div className="border border-dashed border-gray-300 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Tag className="h-4 w-4 text-green-600" />
                    <span className="font-medium text-gray-700">Have a promo code?</span>
                  </div>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Enter code"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500"
                    />
                    <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                      Apply
                    </button>
                  </div>
                </div>

                {/* Savings Banner */}
                {savings > 0 && (
                  <div className="bg-green-100 border border-green-300 rounded-lg p-3">
                    <div className="text-green-800 font-medium text-sm">
                      🎉 You saved ₹{savings} on delivery!
                    </div>
                  </div>
                )}

                {/* Order Breakdown */}
                <div className="space-y-3">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal ({getTotalItems()} items)</span>
                    <span>₹{subtotal}</span>
                  </div>
                  
                  <div className="flex justify-between text-gray-700">
                    <span className="flex items-center">
                      Delivery Fee
                      {subtotal >= 500 && (
                        <span className="ml-1 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">FREE</span>
                      )}
                    </span>
                    <span className={subtotal >= 500 ? 'line-through text-gray-400' : ''}>
                      ₹{deliveryFee}
                    </span>
                  </div>
                  
                  <div className="flex justify-between text-gray-700">
                    <span>Taxes & Fees</span>
                    <span>₹{tax}</span>
                  </div>
                  
                  {subtotal < 500 && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                      <div className="text-yellow-800 text-sm">
                        Add ₹{500 - subtotal} more for free delivery!
                      </div>
                    </div>
                  )}
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center text-xl font-bold">
                    <span>Total</span>
                    <span className="text-green-600">₹{total}</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                  Proceed to Checkout
                </button>

                {/* Payment Methods */}
                <div className="text-center space-y-2">
                  <div className="text-sm text-gray-600">We accept</div>
                  <div className="flex justify-center space-x-4">
                    <div className="bg-gray-100 p-2 rounded-lg">
                      <span className="text-xs font-medium">💳 Cards</span>
                    </div>
                    <div className="bg-gray-100 p-2 rounded-lg">
                      <span className="text-xs font-medium">📱 UPI</span>
                    </div>
                    <div className="bg-gray-100 p-2 rounded-lg">
                      <span className="text-xs font-medium">💰 Wallets</span>
                    </div>
                  </div>
                </div>

                {/* Guarantees */}
                <div className="grid grid-cols-2 gap-3 pt-4 border-t">
                  <div className="text-center">
                    <div className="text-green-600 font-medium text-sm">🔒 Secure</div>
                    <div className="text-gray-600 text-xs">Payment</div>
                  </div>
                  <div className="text-center">
                    <div className="text-green-600 font-medium text-sm">🚚 Fresh</div>
                    <div className="text-gray-600 text-xs">Delivery</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Continue Shopping */}
            <div className="mt-6">
              <a
                href="/"
                className="w-full bg-white border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white font-semibold py-3 rounded-xl transition-all duration-300 flex items-center justify-center"
              >
                <ArrowRight className="mr-2 h-5 w-5 rotate-180" />
                Continue Shopping
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;