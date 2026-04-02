import React, { useState } from 'react';
import { ChevronLeft, ShoppingBag, Star, ImagePlus, Trash2, Edit, MapPin } from 'lucide-react';
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

// --- FAKE DATA ---
const pieData = [
  { name: 'Active Users', value: 45000 },
  { name: 'New Users', value: 12000 },
  { name: 'Returning', value: 28000 },
];
const COLORS = ['#8b5cf6', '#3b82f6', '#ec4899'];

const barData = [
  { name: 'Price', score: 98 },
  { name: 'Quality', score: 85 },
  { name: 'Speed', score: 92 },
];

const reviews = [
  { id: 1, user: "Sarah M.", text: "Unbeatable prices. The $0.99 start is real!", rating: 5 },
  { id: 2, user: "James K.", text: "Best hoodies in Miami. Fast fashion done right.", rating: 5 },
  { id: 3, user: "Elena R.", text: "Love the tote bags, the aesthetic is amazing.", rating: 4 },
];

const initialProducts = [
  { id: 1, name: "Minimalist Hoodie", price: "$12.99", img: "https://picsum.photos/seed/hoodie1/400/500" },
  { id: 2, name: "Classic Denim", price: "$18.99", img: "https://picsum.photos/seed/jeans1/400/500" },
  { id: 3, name: "Canvas Tote", price: "$4.99", img: "https://picsum.photos/seed/tote1/400/500" },
  { id: 4, name: "Bucket Hat", price: "$0.99", img: "https://picsum.photos/seed/hat1/400/500" },
];

export default function App() {
  const [view, setView] = useState('funnel'); // 'funnel' or 'crm'
  const [isAdmin, setIsAdmin] = useState(false);
  const [products, setProducts] = useState(initialProducts);
  const [isLoading, setIsLoading] = useState(false);

  // Hidden Login Logic
  const handleSecretTap = () => {
    const password = prompt("Admin Login: Enter TreyTek Password");
    if (password === "admin123") {
      setIsAdmin(true);
      setView('crm');
    } else {
      alert("Unauthorized");
    }
  };

  // CRM Functions
  const deleteProduct = (id) => setProducts(products.filter(p => p.id !== id));
  const addProduct = () => {
    const newId = products.length + 1;
    setProducts([...products, { id: newId, name: "New Item", price: "$0.99", img: `https://picsum.photos/seed/new${newId}/400/500` }]);
  };

  if (view === 'crm' && isAdmin) {
    return (
      <div className="app-container glass-bg">
        <header className="header">
          <button onClick={() => setView('funnel')} className="icon-btn"><ChevronLeft /></button>
          <h2>TreyTek CRM</h2>
          <div />
        </header>
        <div className="crm-content">
          <h3>Manage Inventory</h3>
          <button className="btn-primary" onClick={addProduct}><ImagePlus /> Post New Image</button>
          <div className="crm-grid">
            {products.map(p => (
              <div key={p.id} className="crm-card glass-panel">
                <img src={p.img} alt={p.name} />
                <div className="crm-actions">
                  <button className="icon-btn"><Edit size={18}/></button>
                  <button className="icon-btn danger" onClick={() => deleteProduct(p.id)}><Trash2 size={18}/></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container dark-light-vibe">
      {/* HEADER */}
      <header className="header glass-panel">
        <button className="icon-btn"><ChevronLeft /></button>
        <div className="logo-container">
          <h1>Next Store<span onClick={handleSecretTap} className="secret-tap">,</span></h1>
          <p className="location"><MapPin size={12}/> Miami, FL</p>
        </div>
        <button className="icon-btn"><ShoppingBag /></button>
      </header>

      {/* HERO / GREETING */}
      <section className="hero">
        <div className="hero-blur-bg" style={{backgroundImage: 'url(https://picsum.photos/seed/fashionmodel/800/1200)'}}></div>
        <div className="hero-content glass-panel">
          <h2>Welcome to the Fast Fashion start $0.99</h2>
          <p>Curated by TreyTek Industry</p>
        </div>
      </section>

      {/* PRODUCTS FUNNEL */}
      <section className="products-grid">
        {products.map(p => (
          <div key={p.id} className="product-card glass-panel">
            <img src={p.img} alt={p.name} loading="lazy" className="liquid-img" />
            <div className="product-info">
              <h4>{p.name}</h4>
              <p>{p.price}</p>
            </div>
          </div>
        ))}
      </section>

      {/* DATA VISUALIZATION */}
      <section className="data-section glass-panel">
        <h3>Community & Growth</h3>
        
        <div className="chart-container">
          <h4>Users (in thousands)</h4>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={pieData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container">
          <h4>Affordability Satisfaction</h4>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={barData}>
              <XAxis dataKey="name" stroke="#a1a1aa" />
              <Tooltip cursor={{fill: 'transparent'}}/>
              <Bar dataKey="score" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* FAKE REVIEWS */}
      <section className="reviews-section">
        <h3>Real Customer Reviews</h3>
        {reviews.map(r => (
          <div key={r.id} className="review-card glass-panel">
            <div className="stars">
              {[...Array(r.rating)].map((_, i) => <Star key={i} size={14} fill="#fbbf24" stroke="#fbbf24"/>)}
            </div>
            <p>"{r.text}"</p>
            <small>- {r.user}</small>
          </div>
        ))}
      </section>

      {/* FOOTER */}
      <footer className="footer glass-panel">
        <p>Next Store copyrighted merchandise</p>
        <p className="builder">Built by TreyTek Industry</p>
        <p>Next Store copyrighted merchandise</p>
      </footer>
    </div>
  );
}
