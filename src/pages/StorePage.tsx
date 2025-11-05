import React from 'react'
import { useParams } from 'react-router-dom'
import { Store, MapPin } from 'lucide-react'

function StorePage() {
  const { storeId } = useParams()

  return (
    <div style={{
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '40px 20px'
    }}>
      <div style={{
        backgroundColor: 'var(--pink)',
        border: '4px solid var(--black)',
        padding: '40px',
        marginBottom: '40px'
      }}
      className="neo-shadow-lg"
      >
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '24px',
          flexWrap: 'wrap'
        }}>
          <div style={{
            width: '120px',
            height: '120px',
            backgroundColor: 'var(--cyan)',
            border: '4px solid var(--black)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          className="neo-shadow"
          >
            <Store size={48} />
          </div>
          <div style={{ flex: 1 }}>
            <h1 style={{
              fontSize: '36px',
              fontWeight: 700,
              marginBottom: '12px',
              textTransform: 'uppercase',
              color: 'var(--white)'
            }}>
              TECH STORE
            </h1>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: 'var(--white)',
              fontSize: '14px',
              fontWeight: 600
            }}>
              <MapPin size={16} />
              GLOBAL SHIPPING AVAILABLE
            </div>
          </div>
        </div>
      </div>

      <h2 style={{
        fontSize: '24px',
        fontWeight: 700,
        marginBottom: '24px',
        textTransform: 'uppercase'
      }}>
        PRODUCTS FROM THIS STORE
      </h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: window.innerWidth < 768 ? '1fr' : window.innerWidth < 1024 ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
        gap: '24px'
      }}>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} style={{
            backgroundColor: 'var(--white)',
            border: '4px solid var(--black)',
            padding: '20px',
            textAlign: 'center'
          }}
          className="neo-shadow"
          >
            <div style={{
              width: '100%',
              height: '200px',
              backgroundColor: 'var(--cyan)',
              border: '3px solid var(--black)',
              marginBottom: '16px'
            }} />
            <h3 style={{
              fontSize: '16px',
              fontWeight: 700,
              marginBottom: '8px',
              textTransform: 'uppercase'
            }}>
              PRODUCT {i}
            </h3>
            <p style={{
              fontSize: '18px',
              fontWeight: 700,
              color: 'var(--pink)'
            }}>
              {30 + i * 10} USDC
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default StorePage
