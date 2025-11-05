import React, { useState } from 'react'
import { Plus, Package, DollarSign, TrendingUp } from 'lucide-react'

function SellerDashboard() {
  const [showAddProduct, setShowAddProduct] = useState(false)

  return (
    <div style={{
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '40px 20px'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '40px',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <h1 style={{
          fontSize: '36px',
          fontWeight: 700,
          textTransform: 'uppercase'
        }}>
          SELLER DASHBOARD
        </h1>
        <button
          onClick={() => setShowAddProduct(!showAddProduct)}
          style={{
            padding: '16px 32px',
            backgroundColor: 'var(--pink)',
            border: '4px solid var(--black)',
            color: 'var(--white)',
            fontSize: '16px',
            fontWeight: 700,
            textTransform: 'uppercase',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
          className="neo-shadow"
        >
          <Plus size={20} />
          ADD PRODUCT
        </button>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: window.innerWidth < 768 ? '1fr' : 'repeat(3, 1fr)',
        gap: '24px',
        marginBottom: '40px'
      }}>
        <StatCard
          icon={<Package size={32} />}
          label="TOTAL PRODUCTS"
          value="12"
          color="var(--cyan)"
        />
        <StatCard
          icon={<DollarSign size={32} />}
          label="TOTAL SALES"
          value="2,450 USDC"
          color="var(--yellow)"
        />
        <StatCard
          icon={<TrendingUp size={32} />}
          label="PENDING ORDERS"
          value="5"
          color="var(--green)"
        />
      </div>

      {showAddProduct && (
        <div style={{
          backgroundColor: 'var(--white)',
          border: '4px solid var(--black)',
          padding: '32px',
          marginBottom: '40px'
        }}
        className="neo-shadow-lg"
        >
          <h2 style={{
            fontSize: '24px',
            fontWeight: 700,
            marginBottom: '24px',
            textTransform: 'uppercase'
          }}>
            ADD NEW PRODUCT
          </h2>
          <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <FormField label="PRODUCT NAME" type="text" placeholder="ENTER PRODUCT NAME..." />
            <FormField label="PRICE (USDC)" type="number" placeholder="0.00" />
            <FormField label="STOCK QUANTITY" type="number" placeholder="0" />
            <FormField label="SHIPPING FEE (USDC)" type="number" placeholder="0.00" />
            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: 700,
                marginBottom: '8px',
                textTransform: 'uppercase'
              }}>
                DESCRIPTION
              </label>
              <textarea
                placeholder="ENTER PRODUCT DESCRIPTION..."
                rows={4}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '3px solid var(--black)',
                  fontSize: '14px',
                  fontWeight: 600,
                  resize: 'vertical'
                }}
              />
            </div>
            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: 700,
                marginBottom: '8px',
                textTransform: 'uppercase'
              }}>
                PRODUCT IMAGE
              </label>
              <input
                type="file"
                accept="image/*"
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '3px solid var(--black)',
                  fontSize: '14px',
                  fontWeight: 600,
                  backgroundColor: 'var(--white)'
                }}
              />
            </div>
            <button
              type="submit"
              style={{
                padding: '16px',
                backgroundColor: 'var(--pink)',
                border: '4px solid var(--black)',
                color: 'var(--white)',
                fontSize: '16px',
                fontWeight: 700,
                textTransform: 'uppercase'
              }}
              className="neo-shadow"
            >
              CREATE PRODUCT
            </button>
          </form>
        </div>
      )}

      <h2 style={{
        fontSize: '24px',
        fontWeight: 700,
        marginBottom: '24px',
        textTransform: 'uppercase'
      }}>
        YOUR PRODUCTS
      </h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: window.innerWidth < 768 ? '1fr' : 'repeat(2, 1fr)',
        gap: '24px'
      }}>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} style={{
            backgroundColor: 'var(--white)',
            border: '4px solid var(--black)',
            padding: '20px',
            display: 'flex',
            gap: '20px'
          }}
          className="neo-shadow"
          >
            <div style={{
              width: '120px',
              height: '120px',
              backgroundColor: 'var(--cyan)',
              border: '3px solid var(--black)',
              flexShrink: 0
            }} />
            <div style={{ flex: 1 }}>
              <h3 style={{
                fontSize: '18px',
                fontWeight: 700,
                marginBottom: '8px',
                textTransform: 'uppercase'
              }}>
                PRODUCT {i}
              </h3>
              <p style={{
                fontSize: '16px',
                fontWeight: 700,
                color: 'var(--pink)',
                marginBottom: '8px'
              }}>
                {30 + i * 10} USDC
              </p>
              <p style={{
                fontSize: '12px',
                fontWeight: 600,
                marginBottom: '12px'
              }}>
                STOCK: {20 - i * 2} UNITS
              </p>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button style={{
                  padding: '8px 16px',
                  backgroundColor: 'var(--yellow)',
                  border: '3px solid var(--black)',
                  fontSize: '12px',
                  fontWeight: 700
                }}
                className="neo-shadow-sm"
                >
                  EDIT
                </button>
                <button style={{
                  padding: '8px 16px',
                  backgroundColor: 'var(--pink)',
                  border: '3px solid var(--black)',
                  color: 'var(--white)',
                  fontSize: '12px',
                  fontWeight: 700
                }}
                className="neo-shadow-sm"
                >
                  DELETE
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function StatCard({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string; color: string }) {
  return (
    <div style={{
      backgroundColor: color,
      border: '4px solid var(--black)',
      padding: '24px',
      textAlign: 'center'
    }}
    className="neo-shadow"
    >
      <div style={{ marginBottom: '12px' }}>{icon}</div>
      <div style={{
        fontSize: '12px',
        fontWeight: 700,
        marginBottom: '8px',
        textTransform: 'uppercase'
      }}>
        {label}
      </div>
      <div style={{
        fontSize: '32px',
        fontWeight: 700
      }}>
        {value}
      </div>
    </div>
  )
}

function FormField({ label, type, placeholder }: { label: string; type: string; placeholder: string }) {
  return (
    <div>
      <label style={{
        display: 'block',
        fontSize: '14px',
        fontWeight: 700,
        marginBottom: '8px',
        textTransform: 'uppercase'
      }}>
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        style={{
          width: '100%',
          padding: '12px',
          border: '3px solid var(--black)',
          fontSize: '14px',
          fontWeight: 600
        }}
      />
    </div>
  )
}

export default SellerDashboard
