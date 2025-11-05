import React from 'react'
import { Ticket, TrendingUp, Lock } from 'lucide-react'

function MyVouchers() {
  const vouchers = [
    {
      id: '1',
      name: 'SUMMER SALE 50%',
      discount: '50%',
      maxDiscount: '100 USDC',
      validUntil: '31 DEC 2024',
      tradable: true,
      image: 'https://images.pexels.com/photos/3943716/pexels-photo-3943716.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      id: '2',
      name: 'LOYAL CUSTOMER 30%',
      discount: '30%',
      maxDiscount: '50 USDC',
      validUntil: '31 MAR 2025',
      tradable: false,
      image: 'https://images.pexels.com/photos/6214476/pexels-photo-6214476.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      id: '3',
      name: 'TECH DEALS 40%',
      discount: '40%',
      maxDiscount: '75 USDC',
      validUntil: '15 FEB 2025',
      tradable: true,
      image: 'https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      id: '4',
      name: 'FASHION WEEK 25%',
      discount: '25%',
      maxDiscount: '60 USDC',
      validUntil: '28 FEB 2025',
      tradable: true,
      image: 'https://images.pexels.com/photos/5868272/pexels-photo-5868272.jpeg?auto=compress&cs=tinysrgb&w=600'
    }
  ]

  return (
    <div style={{
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '40px 20px'
    }}>
      <div style={{
        backgroundColor: 'var(--yellow)',
        border: '4px solid var(--black)',
        padding: '40px',
        marginBottom: '40px',
        textAlign: 'center'
      }}
      className="neo-shadow-lg"
      >
        <Ticket size={64} style={{ margin: '0 auto 16px' }} />
        <h1 style={{
          fontSize: '42px',
          fontWeight: 700,
          marginBottom: '16px',
          textTransform: 'uppercase'
        }}>
          MY NFT VOUCHERS
        </h1>
        <p style={{
          fontSize: '16px',
          fontWeight: 600,
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          COLLECT, TRADE, AND USE YOUR DISCOUNT VOUCHERS AS NFTS. TRADABLE VOUCHERS CAN BE SOLD ON NFT MARKETPLACES.
        </p>
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '32px',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <h2 style={{
          fontSize: '24px',
          fontWeight: 700,
          textTransform: 'uppercase'
        }}>
          YOUR COLLECTION ({vouchers.length})
        </h2>
        <button style={{
          padding: '12px 24px',
          backgroundColor: 'var(--pink)',
          border: '3px solid var(--black)',
          color: 'var(--white)',
          fontSize: '14px',
          fontWeight: 700,
          textTransform: 'uppercase'
        }}
        className="neo-shadow"
        >
          BROWSE MARKETPLACE
        </button>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: window.innerWidth < 768 ? '1fr' : window.innerWidth < 1024 ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
        gap: '24px'
      }}>
        {vouchers.map((voucher) => (
          <VoucherCard key={voucher.id} voucher={voucher} />
        ))}
      </div>
    </div>
  )
}

function VoucherCard({ voucher }: { voucher: any }) {
  return (
    <div style={{
      backgroundColor: 'var(--white)',
      border: '4px solid var(--black)',
      overflow: 'hidden'
    }}
    className="neo-shadow"
    >
      <div style={{
        width: '100%',
        height: '250px',
        overflow: 'hidden',
        borderBottom: '4px solid var(--black)',
        position: 'relative'
      }}>
        <img
          src={voucher.image}
          alt={voucher.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
        <div style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          padding: '8px 12px',
          backgroundColor: voucher.tradable ? 'var(--green)' : 'var(--pink)',
          border: '3px solid var(--black)',
          fontSize: '10px',
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
          gap: '4px'
        }}
        className="neo-shadow-sm"
        >
          {voucher.tradable ? <TrendingUp size={12} /> : <Lock size={12} />}
          {voucher.tradable ? 'TRADABLE' : 'SOULBOUND'}
        </div>
      </div>

      <div style={{ padding: '20px' }}>
        <h3 style={{
          fontSize: '18px',
          fontWeight: 700,
          marginBottom: '12px',
          textTransform: 'uppercase'
        }}>
          {voucher.name}
        </h3>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '12px',
          marginBottom: '16px'
        }}>
          <VoucherStat label="DISCOUNT" value={voucher.discount} />
          <VoucherStat label="MAX VALUE" value={voucher.maxDiscount} />
        </div>

        <div style={{
          padding: '12px',
          backgroundColor: 'var(--cyan)',
          border: '3px solid var(--black)',
          fontSize: '12px',
          fontWeight: 700,
          textAlign: 'center',
          marginBottom: '16px'
        }}>
          VALID UNTIL: {voucher.validUntil}
        </div>

        <div style={{
          display: 'flex',
          gap: '8px'
        }}>
          <button style={{
            flex: 1,
            padding: '12px',
            backgroundColor: 'var(--yellow)',
            border: '3px solid var(--black)',
            fontSize: '14px',
            fontWeight: 700,
            textTransform: 'uppercase'
          }}
          className="neo-shadow-sm"
          >
            USE NOW
          </button>
          {voucher.tradable && (
            <button style={{
              flex: 1,
              padding: '12px',
              backgroundColor: 'var(--pink)',
              border: '3px solid var(--black)',
              color: 'var(--white)',
              fontSize: '14px',
              fontWeight: 700,
              textTransform: 'uppercase'
            }}
            className="neo-shadow-sm"
            >
              SELL
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

function VoucherStat({ label, value }: { label: string; value: string }) {
  return (
    <div style={{
      padding: '8px',
      backgroundColor: 'var(--yellow)',
      border: '2px solid var(--black)',
      textAlign: 'center'
    }}>
      <div style={{
        fontSize: '10px',
        fontWeight: 700,
        marginBottom: '4px'
      }}>
        {label}
      </div>
      <div style={{
        fontSize: '16px',
        fontWeight: 700
      }}>
        {value}
      </div>
    </div>
  )
}

export default MyVouchers
