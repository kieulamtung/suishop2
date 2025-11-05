import React from 'react'
import { Github, Twitter, MessageCircle } from 'lucide-react'

function Footer() {
  return (
    <footer style={{
      backgroundColor: 'var(--black)',
      color: 'var(--white)',
      borderTop: '4px solid var(--pink)',
      marginTop: '80px'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '40px 20px'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: window.innerWidth < 768 ? '1fr' : 'repeat(3, 1fr)',
          gap: '40px'
        }}>
          <div>
            <h3 style={{
              fontSize: '24px',
              fontWeight: 700,
              marginBottom: '16px',
              color: 'var(--pink)'
            }}>
              SUI-SHOP
            </h3>
            <p style={{ fontSize: '14px', lineHeight: '1.8' }}>
              DECENTRALIZED E-COMMERCE ON SUI BLOCKCHAIN. BUY & SELL WITH CRYPTO. TRADE NFT VOUCHERS.
            </p>
          </div>

          <div>
            <h4 style={{
              fontSize: '16px',
              fontWeight: 700,
              marginBottom: '16px',
              color: 'var(--cyan)'
            }}>
              QUICK LINKS
            </h4>
            <ul style={{ listStyle: 'none', fontSize: '14px' }}>
              <li style={{ marginBottom: '8px' }}>
                <a href="/" style={{ color: 'var(--white)' }}>HOME</a>
              </li>
              <li style={{ marginBottom: '8px' }}>
                <a href="/seller" style={{ color: 'var(--white)' }}>BECOME A SELLER</a>
              </li>
              <li style={{ marginBottom: '8px' }}>
                <a href="/vouchers" style={{ color: 'var(--white)' }}>NFT VOUCHERS</a>
              </li>
              <li style={{ marginBottom: '8px' }}>
                <a href="/profile" style={{ color: 'var(--white)' }}>MY PROFILE</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 style={{
              fontSize: '16px',
              fontWeight: 700,
              marginBottom: '16px',
              color: 'var(--yellow)'
            }}>
              CONNECT
            </h4>
            <div style={{ display: 'flex', gap: '12px' }}>
              <SocialButton icon={<Twitter size={20} />} />
              <SocialButton icon={<Github size={20} />} />
              <SocialButton icon={<MessageCircle size={20} />} />
            </div>
          </div>
        </div>

        <div style={{
          marginTop: '40px',
          paddingTop: '20px',
          borderTop: '2px solid var(--pink)',
          textAlign: 'center',
          fontSize: '12px'
        }}>
          <p>© 2024 SUI-SHOP. BUILT ON SUI BLOCKCHAIN. ALL RIGHTS RESERVED.</p>
        </div>
      </div>
    </footer>
  )
}

function SocialButton({ icon }: { icon: React.ReactNode }) {
  return (
    <button style={{
      width: '44px',
      height: '44px',
      backgroundColor: 'var(--pink)',
      border: '3px solid var(--white)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--white)',
      transition: 'all 0.2s'
    }}
    className="neo-shadow-sm"
    onMouseEnter={(e) => {
      e.currentTarget.style.backgroundColor = 'var(--cyan)'
      e.currentTarget.style.transform = 'translate(-2px, -2px)'
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.backgroundColor = 'var(--pink)'
      e.currentTarget.style.transform = 'translate(0, 0)'
    }}
    >
      {icon}
    </button>
  )
}

export default Footer
