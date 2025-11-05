import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ConnectButton, useCurrentAccount } from '@mysten/dapp-kit'
import { ShoppingCart, Store, Ticket, User, Search, Menu, X, Wallet } from 'lucide-react'
import { useCartStore } from '../store/cartStore'

function Header() {
  const account = useCurrentAccount()
  const navigate = useNavigate()
  const cartItems = useCartStore((state) => state.items)
  const [searchQuery, setSearchQuery] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery)}`)
      setSearchQuery('')
    }
  }

  return (
    <header style={{
      backgroundColor: 'var(--pink)',
      borderBottom: '4px solid var(--black)',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '16px 20px'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '20px'
        }}>
          <Link to="/" style={{
            fontSize: '28px',
            fontWeight: 700,
            color: 'var(--white)',
            textTransform: 'uppercase',
            letterSpacing: '2px'
          }}>
            SUI-SHOP
          </Link>

          <form onSubmit={handleSearch} style={{
            flex: 1,
            maxWidth: '500px',
            display: window.innerWidth < 768 ? 'none' : 'block'
          }}>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="SEARCH PRODUCTS..."
                style={{
                  width: '100%',
                  padding: '12px 50px 12px 16px',
                  border: '3px solid var(--black)',
                  backgroundColor: 'var(--white)',
                  fontSize: '14px',
                  fontWeight: 600,
                  textTransform: 'uppercase'
                }}
              />
              <button
                type="submit"
                style={{
                  position: 'absolute',
                  right: '8px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  backgroundColor: 'var(--cyan)',
                  border: '2px solid var(--black)',
                  padding: '6px 10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                className="neo-shadow-sm"
              >
                <Search size={18} />
              </button>
            </div>
          </form>

          <nav style={{
            display: window.innerWidth < 768 ? 'none' : 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <NavButton icon={<Store size={20} />} label="SELL" to="/seller" />
            <NavButton icon={<Ticket size={20} />} label="VOUCHERS" to="/vouchers" />
            <NavButton icon={<User size={20} />} label="PROFILE" to="/profile" />
            <NavButton 
              icon={<ShoppingCart size={20} />} 
              label={`CART (${cartItems.length})`} 
              to="/checkout" 
            />
            <div style={{ marginLeft: '8px' }}>
              <ConnectButton />
            </div>
          </nav>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: window.innerWidth < 768 ? 'flex' : 'none',
              backgroundColor: 'var(--cyan)',
              border: '3px solid var(--black)',
              padding: '10px',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            className="neo-shadow-sm"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div style={{
            marginTop: '16px',
            padding: '16px',
            backgroundColor: 'var(--white)',
            border: '3px solid var(--black)'
          }} className="neo-shadow">
            <form onSubmit={handleSearch} style={{ marginBottom: '16px' }}>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="SEARCH..."
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '3px solid var(--black)',
                  fontSize: '14px',
                  fontWeight: 600,
                  marginBottom: '12px'
                }}
              />
            </form>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <MobileNavLink to="/seller" onClick={() => setMobileMenuOpen(false)}>
                <Store size={20} /> SELL
              </MobileNavLink>
              <MobileNavLink to="/vouchers" onClick={() => setMobileMenuOpen(false)}>
                <Ticket size={20} /> VOUCHERS
              </MobileNavLink>
              <MobileNavLink to="/profile" onClick={() => setMobileMenuOpen(false)}>
                <User size={20} /> PROFILE
              </MobileNavLink>
              <MobileNavLink to="/checkout" onClick={() => setMobileMenuOpen(false)}>
                <ShoppingCart size={20} /> CART ({cartItems.length})
              </MobileNavLink>
              <div style={{ marginTop: '8px' }}>
                <ConnectButton />
              </div>
            </div>
          </div>
        )}

        {account && (
          <div style={{
            marginTop: '12px',
            padding: '8px 12px',
            backgroundColor: 'var(--yellow)',
            border: '3px solid var(--black)',
            fontSize: '11px',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
          className="neo-shadow-sm"
          >
            <Wallet size={14} />
            CONNECTED: {account.address.slice(0, 8)}...{account.address.slice(-6)} (TESTNET)
          </div>
        )}
      </div>
    </header>
  )
}

function NavButton({ icon, label, to }: { icon: React.ReactNode; label: string; to: string }) {
  return (
    <Link
      to={to}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        padding: '10px 16px',
        backgroundColor: 'var(--cyan)',
        border: '3px solid var(--black)',
        color: 'var(--black)',
        fontWeight: 700,
        fontSize: '12px',
        textTransform: 'uppercase',
        transition: 'transform 0.1s'
      }}
      className="neo-shadow-sm"
      onMouseEnter={(e) => e.currentTarget.style.transform = 'translate(-2px, -2px)'}
      onMouseLeave={(e) => e.currentTarget.style.transform = 'translate(0, 0)'}
    >
      {icon}
      {label}
    </Link>
  )
}

function MobileNavLink({ to, onClick, children }: { to: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '12px',
        backgroundColor: 'var(--cyan)',
        border: '3px solid var(--black)',
        fontWeight: 700,
        fontSize: '14px'
      }}
      className="neo-shadow-sm"
    >
      {children}
    </Link>
  )
}

export default Header
