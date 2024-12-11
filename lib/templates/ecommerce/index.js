import { getFileExtension } from '../../utils/fileHelpers.js';
import { generateIndexHtml } from '../../generators/htmlGenerator.js';

export function getEcommerceTemplate(projectName, language) {
  const ext = getFileExtension(language);
  
  return {
    'public/index.html': generateIndexHtml(projectName),
    'public/manifest.json': JSON.stringify({
      "short_name": projectName,
      "name": projectName,
      "icons": [
        {
          "src": "favicon.ico",
          "sizes": "64x64 32x32 24x24 16x16",
          "type": "image/x-icon"
        }
      ],
      "start_url": ".",
      "display": "standalone",
      "theme_color": "#000000",
      "background_color": "#ffffff"
    }, null, 2),
    'public/robots.txt': 'User-agent: *\nAllow: /',
    [`src/index.${ext}`]: getIndexFile(),
    [`src/App.${ext}`]: getAppFile(language),
    [`src/components/products/ProductCard.${ext}`]: getProductCardComponent(language),
    [`src/components/products/ProductGrid.${ext}`]: getProductGridComponent(language),
    [`src/components/products/ProductDetail.${ext}`]: getProductDetailComponent(language),
    [`src/components/cart/CartItem.${ext}`]: getCartItemComponent(language),
    [`src/components/cart/CartSummary.${ext}`]: getCartSummaryComponent(language),
    [`src/components/checkout/CheckoutForm.${ext}`]: getCheckoutFormComponent(language),
    [`src/components/checkout/PaymentForm.${ext}`]: getPaymentFormComponent(language),
    [`src/hooks/useCart.${ext}`]: getUseCartHook(language),
    [`src/hooks/useProducts.${ext}`]: getUseProductsHook(language),
    [`src/pages/Products.${ext}`]: getProductsPage(language),
    [`src/pages/ProductDetail.${ext}`]: getProductDetailPage(language),
    [`src/pages/Cart.${ext}`]: getCartPage(language),
    [`src/pages/Checkout.${ext}`]: getCheckoutPage(language),
    [`src/context/CartContext.${ext}`]: getCartContext(language),
    [`src/data/products.${ext}`]: getProductsData(),
  };
}

function getIndexFile() {
  return `import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './styles/globals.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);`;
}

function getAppFile(language) {
  const ext = language === 'TypeScript' ? ': React.FC' : '';
  return `import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import { CartProvider } from './context/CartContext';

const App${ext} = () => {
  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow">
          <div className="container mx-auto px-4 py-6">
            <nav className="flex justify-between items-center">
              <h1 className="text-xl font-bold">E-Commerce Store</h1>
              <div className="space-x-4">
                <a href="/" className="hover:text-gray-600">Products</a>
                <a href="/cart" className="hover:text-gray-600">Cart</a>
              </div>
            </nav>
          </div>
        </header>
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </main>
      </div>
    </CartProvider>
  );
};

export default App;`;
}

function getProductCardComponent(language) {
  const ext = language === 'TypeScript' ? ': React.FC<{ product: Product }>' : '';
  const types = language === 'TypeScript' ? `
interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
}` : '';

  return `import React from 'react';
import { Link } from 'react-router-dom';
${types}

const ProductCard${ext} = ({ product }) => {
  return (
    <Link to={\`/products/\${product.id}\`} className="group">
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:opacity-75"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <p className="text-gray-600">${product.price.toFixed(2)}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;`;
}

function getProductGridComponent(language) {
  const ext = language === 'TypeScript' ? ': React.FC' : '';
  return `import React from 'react';
import ProductCard from './ProductCard';
import { useProducts } from '../../hooks/useProducts';

const ProductGrid${ext} = () => {
  const { products, loading, error } = useProducts();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading products</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;`;
}

function getCartItemComponent(language) {
  const ext = language === 'TypeScript' ? ': React.FC<{ item: CartItem }>' : '';
  const types = language === 'TypeScript' ? `
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}` : '';

  return `import React from 'react';
import { useCart } from '../../hooks/useCart';
${types}

const CartItem${ext} = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="flex items-center py-4 border-b">
      <img
        src={item.image}
        alt={item.name}
        className="w-20 h-20 object-cover rounded"
      />
      <div className="flex-grow ml-4">
        <h3 className="font-semibold">{item.name}</h3>
        <p className="text-gray-600">${item.price.toFixed(2)}</p>
      </div>
      <div className="flex items-center">
        <button
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
          className="px-2 py-1 border rounded"
        >
          -
        </button>
        <span className="mx-2">{item.quantity}</span>
        <button
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
          className="px-2 py-1 border rounded"
        >
          +
        </button>
        <button
          onClick={() => removeFromCart(item.id)}
          className="ml-4 text-red-500"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;`;
}

function getCartSummaryComponent(language) {
  const ext = language === 'TypeScript' ? ': React.FC' : '';
  return `import React from 'react';
import { useCart } from '../../hooks/useCart';
import { Link } from 'react-router-dom';

const CartSummary${ext} = () => {
  const { cartItems, total } = useCart();

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
      <div className="space-y-2 mb-4">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span>Free</span>
        </div>
        <div className="flex justify-between font-semibold text-lg border-t pt-2">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
      <Link
        to="/checkout"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 text-center block"
      >
        Proceed to Checkout
      </Link>
    </div>
  );
};

export default CartSummary;`;
}

function getCheckoutFormComponent(language) {
  const ext = language === 'TypeScript' ? ': React.FC<{ onSubmit: (data: any) => void }>' : '';
  return `import React from 'react';
import { useForm } from 'react-hook-form';

const CheckoutForm${ext} = ({ onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block mb-1">Full Name</label>
        <input
          {...register('fullName', { required: true })}
          className="w-full p-2 border rounded"
        />
        {errors.fullName && <span className="text-red-500">Required</span>}
      </div>
      <div>
        <label className="block mb-1">Email</label>
        <input
          type="email"
          {...register('email', { required: true })}
          className="w-full p-2 border rounded"
        />
        {errors.email && <span className="text-red-500">Required</span>}
      </div>
      <div>
        <label className="block mb-1">Address</label>
        <textarea
          {...register('address', { required: true })}
          className="w-full p-2 border rounded"
        />
        {errors.address && <span className="text-red-500">Required</span>}
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        Continue to Payment
      </button>
    </form>
  );
};

export default CheckoutForm;`;
}

function getPaymentFormComponent(language) {
  const ext = language === 'TypeScript' ? ': React.FC<{ onSubmit: (data: any) => void }>' : '';
  return `import React from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('your-publishable-key');

const PaymentForm${ext} = ({ onSubmit }) => {
  const handlePayment = async () => {
    const stripe = await stripePromise;
    // Add your payment logic here
  };

  return (
    <div className="space-y-4">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Payment Details</h2>
        {/* Add Stripe Elements here */}
        <button
          onClick={handlePayment}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default PaymentForm;`;
}

function getUseCartHook(language) {
  const types = language === 'TypeScript' ? `
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}` : '';

  return `import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
${types}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}`;
}

function getCartContext(language) {
  const types = language === 'TypeScript' ? `
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  total: number;
}` : '';

  return `import React, { createContext, useState, useEffect } from 'react';
${types}

export const CartContext = createContext${language === 'TypeScript' ? '<CartContextType | null>' : ''}(null);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const newTotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotal(newTotal);
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) {
      removeFromCart(id);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};`;
}

function getProductsData() {
  return `export const products = [
  {
    id: '1',
    name: 'Classic T-Shirt',
    price: 29.99,
    image: 'https://example.com/t-shirt.jpg',
    description: 'A comfortable and stylish classic t-shirt.',
    category: 'Clothing'
  },
  {
    id: '2',
    name: 'Wireless Headphones',
    price: 199.99,
    image: 'https://example.com/headphones.jpg',
    description: 'High-quality wireless headphones with noise cancellation.',
    category: 'Electronics'
  },
  {
    id: '3',
    name: 'Leather Wallet',
    price: 49.99,
    image: 'https://example.com/wallet.jpg',
    description: 'Genuine leather wallet with multiple card slots.',
    category: 'Accessories'
  },
  // Add more products as needed
];`;
}

function getProductDetailComponent(language) {
  const ext = language === 'TypeScript' ? ': React.FC' : '';
  return `import React from 'react';
import { useParams } from 'react-router-dom';
import { useProducts } from '../../hooks/useProducts';
import { useCart } from '../../hooks/useCart';

const ProductDetail${ext} = () => {
  const { id } = useParams();
  const { products } = useProducts();
  const { addToCart } = useCart();

  const product = products.find(p => p.id === id);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img
            src={product.image}
            alt={product.name}
            className="w-full rounded-lg shadow-lg"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-2xl text-blue-600 mb-4">
            ${product.price.toFixed(2)}
          </p>
          <p className="text-gray-600 mb-6">
            {product.description}
          </p>
          <button
            onClick={() => addToCart(product)}
            className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;`;
}

function getUseProductsHook(language) {
  const types = language === 'TypeScript' ? `
interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
}` : '';

  return `import { useState, useEffect } from 'react';
import { products as mockProducts } from '../data/products';
${types}

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate API call
    const fetchProducts = async () => {
      try {
        // In a real app, this would be an API call
        setProducts(mockProducts);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading, error };
}`;
}

function getProductsPage(language) {
  const ext = language === 'TypeScript' ? ': React.FC' : '';
  return `import React from 'react';
import ProductGrid from '../components/products/ProductGrid';

const Products${ext} = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Our Products</h1>
      <ProductGrid />
    </div>
  );
};

export default Products;`;
}

function getCartPage(language) {
  const ext = language === 'TypeScript' ? ': React.FC' : '';
  return `import React from 'react';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import { useCart } from '../hooks/useCart';

const Cart${ext} = () => {
  const { cartItems } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
        <p>Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {cartItems.map(item => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>
        <div>
          <CartSummary />
        </div>
      </div>
    </div>
  );
};

export default Cart;`;
}

function getCheckoutPage(language) {
  const ext = language === 'TypeScript' ? ': React.FC' : '';
  return `import React, { useState } from 'react';
import CheckoutForm from '../components/checkout/CheckoutForm';
import PaymentForm from '../components/checkout/PaymentForm';

const Checkout${ext} = () => {
  const [step, setStep] = useState(1);
  const [shippingDetails, setShippingDetails] = useState(null);

  const handleShippingSubmit = (data) => {
    setShippingDetails(data);
    setStep(2);
  };

  const handlePaymentSubmit = async (data) => {
    // Handle payment submission
    console.log('Payment submitted:', data);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      <div className="flex mb-8">
        <div className={\`flex-1 text-center \${step === 1 ? 'text-blue-600' : ''}\`}>
          Shipping
        </div>
        <div className={\`flex-1 text-center \${step === 2 ? 'text-blue-600' : ''}\`}>
          Payment
        </div>
      </div>

      {step === 1 ? (
        <CheckoutForm onSubmit={handleShippingSubmit} />
      ) : (
        <PaymentForm onSubmit={handlePaymentSubmit} />
      )}
    </div>
  );
};

export default Checkout;`;
} 