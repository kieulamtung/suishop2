import React from 'react'
import { Link } from 'react-router-dom'
import { Store, Zap, Shield, Ticket } from 'lucide-react'

function HomePage() {
  const featuredProducts = [
    {
      id: '1',
      name: 'WIRELESS HEADPHONES',
      price: '45 USDC',
      image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=600',
      store: 'TECH STORE'
    },
    {
      id: '2',
      name: 'SMART WATCH PRO',
      price: '120 USDC',
      image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=600',
      store: 'GADGET HUB'
    },
    {
      id: '3',
      name: 'LEATHER BACKPACK',
      price: '85 USDC',
      image: 'https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=600',
      store: 'FASHION ZONE'
    },
    {
      id: '4',
      name: 'COFFEE MAKER DELUXE',
      price: '65 USDC',
      image: 'https://images.pexels.com/photos/6347888/pexels-photo-6347888.jpeg?auto=compress&cs=tinysrgb&w=600',
      store: 'HOME ESSENTIALS'
    },
    {
      id: '5',
      name: 'RUNNING SHOES',
      price: '95 USDC',
      image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=600',
      store: 'SPORTS GEAR'
    },
    {
      id: '6',
      name: 'DESK LAMP LED',
      price: '35 USDC',
      image: 'https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=600',
      store: 'OFFICE SUPPLIES'
    }
  ]

  return (
    <div>
      <section style={{
        backgroundColor: 'var(--cyan)',
        borderBottom: '4px solid var(--black)',
        padding: '80px 20px'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <h1 style={{
            fontSize: window.innerWidth < 768 ? '48px' : '72px',
            fontWeight: 700,
            marginBottom: '24px',
            textTransform: 'uppercase',
            letterSpacing: '4px',
            lineHeight: 1.2
          }}>
            SHOP WITH<br />CRYPTO
          </h1>
          <p style={{
            fontSize: '18px',
            fontWeight: 600,
            marginBottom: '40px',
            maxWidth: '600px',
            margin: '0 auto 40px'
          }}>
            DECENTRALIZED E-COMMERCE ON SUI BLOCKCHAIN. BUY REAL PRODUCTS WITH SUI & STABLECOINS. TRADE NFT VOUCHERS.
          </p>
          <div style={{
            display: 'flex',
            gap: '16px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <Link
              to="/seller"
              style={{
                padding: '16px 32px',
                backgroundColor: 'var(--pink)',
                border: '4px solid var(--black)',
                color: 'var(--white)',
                fontSize: '16px',
                fontWeight: 700,
                textTransform: 'uppercase',
                display: 'inline-block'
              }}
              className="neo-shadow-lg"
            >
              START SELLING
            </Link>
            <Link
              to="/vouchers"
              style={{
                padding: '16px 32px',
                backgroundColor: 'var(--yellow)',
                border: '4px solid var(--black)',
                color: 'var(--black)',
                fontSize: '16px',
                fontWeight: 700,
                textTransform: 'uppercase',
                display: 'inline-block'
              }}
              className="neo-shadow-lg"
            >
              EXPLORE VOUCHERS
            </Link>
          </div>
        </div>
      </section>

      <section style={{
        maxWidth: '1400px',
        margin: '60px auto',
        padding: '0 20px'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: window.innerWidth < 768 ? '1fr' : 'repeat(4, 1fr)',
          gap: '24px'
        }}>
          <FeatureCard
            icon={<Shield size={32} />}
            title="SECURE ESCROW"
            description="SMART CONTRACT PROTECTION FOR BUYERS & SELLERS"
            color="var(--pink)"
          />
          <FeatureCard
            icon={<Zap size={32} />}
            title="INSTANT PAYMENT"
            description="PAY WITH SUI OR STABLECOINS IN SECONDS"
            color="var(--cyan)"
          />
          <FeatureCard
            icon={<Ticket size={32} />}
            title="NFT VOUCHERS"
            description="TRADE & USE DISCOUNT VOUCHERS AS NFTS"
            color="var(--yellow)"
          />
          <FeatureCard
            icon={<Store size={32} />}
            title="GLOBAL MARKET"
            description="BUY & SELL WORLDWIDE WITH NO BORDERS"
            color="var(--green)"
          />
        </div>
      </section>

      <section style={{
        maxWidth: '1400px',
        margin: '80px auto',
        padding: '0 20px'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '32px'
        }}>
          <h2 style={{
            fontSize: '32px',
            fontWeight: 700,
            textTransform: 'uppercase'
          }}>
            FEATURED PRODUCTS
          </h2>
          <Link
            to="/"
            style={{
              padding: '12px 24px',
              backgroundColor: 'var(--black)',
              border: '3px solid var(--black)',
              color: 'var(--white)',
              fontSize: '14px',
              fontWeight: 700,
              textTransform: 'uppercase'
            }}
            className="neo-shadow"
          >
            VIEW ALL
          </Link>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: window.innerWidth < 768 ? '1fr' : window.innerWidth < 1024 ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
          gap: '24px'
        }}>
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  )
}

function FeatureCard({ icon, title, description, color }: { icon: React.ReactNode; title: string; description: string; color: string }) {
  return (
    <div style={{
      padding: '24px',
      backgroundColor: color,
      border: '4px solid var(--black)',
      textAlign: 'center'
    }}
    className="neo-shadow"
    >
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '16px'
      }}>
        {icon}
      </div>
      <h3 style={{
        fontSize: '16px',
        fontWeight: 700,
        marginBottom: '8px',
        textTransform: 'uppercase'
      }}>
        {title}
      </h3>
      <p style={{
        fontSize: '12px',
        fontWeight: 600
      }}>
        {description}
      </p>
    </div>
  )
}

function ProductCard({ product }: { product: any }) {
  return (
    <Link
      to={`/product/${product.id}`}
      style={{
        backgroundColor: 'var(--white)',
        border: '4px solid var(--black)',
        overflow: 'hidden',
        display: 'block',
        transition: 'transform 0.2s'
      }}
      className="neo-shadow"
      onMouseEnter={(e) => e.currentTarget.style.transform = 'translate(-4px, -4px)'}
      onMouseLeave={(e) => e.currentTarget.style.transform = 'translate(0, 0)'}
    >
      <div style={{
        width: '100%',
        height: '250px',
        overflow: 'hidden',
        borderBottom: '4px solid var(--black)'
      }}>
        <img
          src={product.image}
          alt={product.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
      </div>
      <div style={{ padding: '20px' }}>
        <div style={{
          fontSize: '10px',
          fontWeight: 700,
          color: 'var(--pink)',
          marginBottom: '8px',
          textTransform: 'uppercase'
        }}>
          {product.store}
        </div>
        <h3 style={{
          fontSize: '18px',
          fontWeight: 700,
          marginBottom: '12px',
          textTransform: 'uppercase'
        }}>
          {product.name}
        </h3>
        <div style={{
          fontSize: '20px',
          fontWeight: 700,
          color: 'var(--black)'
        }}>
          {product.price}
        </div>
      </div>
    </Link>
  )
}

export default HomePage
