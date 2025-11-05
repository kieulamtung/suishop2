import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShoppingCart, Store, Shield, Truck } from 'lucide-react'
import { useCartStore } from '../store/cartStore'

function ProductPage() {
  const { productId } = useParams()
  const [quantity, setQuantity] = useState(1)
  const addToCart = useCartStore((state) => state.addItem)

  const product = {
    id: productId || '1',
    name: 'WIRELESS HEADPHONES PRO',
    price: 45,
    description: 'HIGH-QUALITY WIRELESS HEADPHONES WITH ACTIVE NOISE CANCELLATION. 30-HOUR BATTERY LIFE. PREMIUM SOUND QUALITY.',
    image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=800',
    store: 'TECH STORE',
    stock: 25,
    shipping: 5
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      image: product.image,
      store: product.store
    })
    alert('ADDED TO CART!')
  }

  return (
    <div style={{
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '40px 20px'
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: window.innerWidth < 1024 ? '1fr' : '1fr 1fr',
        gap: '40px'
      }}>
        <div>
          <div style={{
            width: '100%',
            height: '500px',
            backgroundColor: 'var(--cyan)',
            border: '4px solid var(--black)',
            overflow: 'hidden'
          }}
          className="neo-shadow-lg"
          >
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
        </div>

        <div>
          <div style={{
            display: 'inline-block',
            padding: '8px 16px',
            backgroundColor: 'var(--pink)',
            border: '3px solid var(--black)',
            fontSize: '12px',
            fontWeight: 700,
            marginBottom: '16px'
          }}
          className="neo-shadow-sm"
          >
            <Store size={14} style={{ display: 'inline', marginRight: '6px' }} />
            {product.store}
          </div>

          <h1 style={{
            fontSize: '42px',
            fontWeight: 700,
            marginBottom: '24px',
            textTransform: 'uppercase',
            lineHeight: 1.2
          }}>
            {product.name}
          </h1>

          <div style={{
            fontSize: '48px',
            fontWeight: 700,
            color: 'var(--pink)',
            marginBottom: '24px'
          }}>
            {product.price} USDC
          </div>

          <p style={{
            fontSize: '16px',
            lineHeight: 1.8,
            marginBottom: '32px',
            fontWeight: 600
          }}>
            {product.description}
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '12px',
            marginBottom: '32px'
          }}>
            <InfoBox icon={<Shield size={20} />} label="ESCROW" value="PROTECTED" />
            <InfoBox icon={<Truck size={20} />} label="SHIPPING" value={`${product.shipping} USDC`} />
            <InfoBox icon={<Store size={20} />} label="STOCK" value={`${product.stock} LEFT`} />
          </div>

          <div style={{
            backgroundColor: 'var(--yellow)',
            border: '4px solid var(--black)',
            padding: '24px',
            marginBottom: '24px'
          }}
          className="neo-shadow"
          >
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: 700,
              marginBottom: '12px',
              textTransform: 'uppercase'
            }}>
              QUANTITY
            </label>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                style={{
                  width: '48px',
                  height: '48px',
                  backgroundColor: 'var(--white)',
                  border: '3px solid var(--black)',
                  fontSize: '24px',
                  fontWeight: 700
                }}
                className="neo-shadow-sm"
              >
                -
              </button>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                style={{
                  flex: 1,
                  height: '48px',
                  textAlign: 'center',
                  border: '3px solid var(--black)',
                  fontSize: '20px',
                  fontWeight: 700
                }}
              />
              <button
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                style={{
                  width: '48px',
                  height: '48px',
                  backgroundColor: 'var(--white)',
                  border: '3px solid var(--black)',
                  fontSize: '24px',
                  fontWeight: 700
                }}
                className="neo-shadow-sm"
              >
                +
              </button>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            style={{
              width: '100%',
              padding: '20px',
              backgroundColor: 'var(--pink)',
              border: '4px solid var(--black)',
              color: 'var(--white)',
              fontSize: '18px',
              fontWeight: 700,
              textTransform: 'uppercase',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px'
            }}
            className="neo-shadow-lg"
          >
            <ShoppingCart size={24} />
            ADD TO CART
          </button>
        </div>
      </div>
    </div>
  )
}

function InfoBox({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div style={{
      backgroundColor: 'var(--cyan)',
      border: '3px solid var(--black)',
      padding: '16px',
      textAlign: 'center'
    }}
    className="neo-shadow-sm"
    >
      <div style={{ marginBottom: '8px' }}>{icon}</div>
      <div style={{
        fontSize: '10px',
        fontWeight: 700,
        marginBottom: '4px'
      }}>
        {label}
      </div>
      <div style={{
        fontSize: '14px',
        fontWeight: 700
      }}>
        {value}
      </div>
    </div>
  )
}

export default ProductPage
