import React, { useState, useEffect } from 'react'
import { User, MapPin, Package, Truck, CheckCircle, Clock, XCircle } from 'lucide-react'

interface Order {
  id: string
  items: any[]
  total: number
  shippingAddress: string
  txHash: string
  status: 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED'
  createdAt: string
  trackingNumber?: string
}

function ProfilePage() {
  const [activeTab, setActiveTab] = useState<'profile' | 'addresses' | 'orders'>('profile')
  const [orders, setOrders] = useState<Order[]>([])
  const [savedAddresses, setSavedAddresses] = useState<string[]>([])

  useEffect(() => {
    // Load orders from localStorage
    const storedOrders = JSON.parse(localStorage.getItem('orders') || '[]')
    setOrders(storedOrders)

    // Load saved addresses
    const storedAddresses = JSON.parse(localStorage.getItem('savedAddresses') || '[]')
    setSavedAddresses(storedAddresses)
  }, [])

  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '40px 20px'
    }}>
      <h1 style={{
        fontSize: '36px',
        fontWeight: 700,
        marginBottom: '32px',
        textTransform: 'uppercase'
      }}>
        MY PROFILE
      </h1>

      <div style={{
        display: 'flex',
        gap: '12px',
        marginBottom: '32px',
        flexWrap: 'wrap'
      }}>
        <TabButton
          icon={<User size={18} />}
          label="PROFILE"
          active={activeTab === 'profile'}
          onClick={() => setActiveTab('profile')}
        />
        <TabButton
          icon={<MapPin size={18} />}
          label="ADDRESSES"
          active={activeTab === 'addresses'}
          onClick={() => setActiveTab('addresses')}
        />
        <TabButton
          icon={<Package size={18} />}
          label="ORDERS"
          active={activeTab === 'orders'}
          onClick={() => setActiveTab('orders')}
        />
      </div>

      {activeTab === 'profile' && <ProfileTab orders={orders} />}
      {activeTab === 'addresses' && <AddressesTab addresses={savedAddresses} setAddresses={setSavedAddresses} />}
      {activeTab === 'orders' && <OrdersTab orders={orders} />}
    </div>
  )
}

function TabButton({ icon, label, active, onClick }: { icon: React.ReactNode; label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '12px 24px',
        backgroundColor: active ? 'var(--pink)' : 'var(--white)',
        border: '3px solid var(--black)',
        color: active ? 'var(--white)' : 'var(--black)',
        fontSize: '14px',
        fontWeight: 700,
        textTransform: 'uppercase',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}
      className="neo-shadow-sm"
    >
      {icon}
      {label}
    </button>
  )
}

function ProfileTab({ orders }: { orders: Order[] }) {
  const totalSpent = orders.reduce((sum, order) => sum + order.total, 0)
  const deliveredOrders = orders.filter(o => o.status === 'DELIVERED').length

  return (
    <div style={{
      backgroundColor: 'var(--white)',
      border: '4px solid var(--black)',
      padding: '32px'
    }}
    className="neo-shadow-lg"
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '24px',
        marginBottom: '32px',
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
          <User size={48} />
        </div>
        <div>
          <h2 style={{
            fontSize: '28px',
            fontWeight: 700,
            marginBottom: '8px',
            textTransform: 'uppercase'
          }}>
            WALLET USER
          </h2>
          <p style={{
            fontSize: '14px',
            fontWeight: 600,
            fontFamily: 'monospace'
          }}>
            0x1234...5678
          </p>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: window.innerWidth < 768 ? '1fr' : 'repeat(3, 1fr)',
        gap: '16px'
      }}>
        <StatBox label="TOTAL ORDERS" value={orders.length.toString()} color="var(--cyan)" />
        <StatBox label="TOTAL SPENT" value={`${totalSpent.toFixed(2)} USDC`} color="var(--yellow)" />
        <StatBox label="DELIVERED" value={deliveredOrders.toString()} color="var(--green)" />
      </div>
    </div>
  )
}

function AddressesTab({ addresses, setAddresses }: { addresses: string[]; setAddresses: (addresses: string[]) => void }) {
  const [newAddress, setNewAddress] = useState('')
  const [isAdding, setIsAdding] = useState(false)

  const handleAddAddress = () => {
    if (newAddress.trim()) {
      const updated = [...addresses, newAddress.trim()]
      setAddresses(updated)
      localStorage.setItem('savedAddresses', JSON.stringify(updated))
      setNewAddress('')
      setIsAdding(false)
    }
  }

  const handleDeleteAddress = (index: number) => {
    const updated = addresses.filter((_, i) => i !== index)
    setAddresses(updated)
    localStorage.setItem('savedAddresses', JSON.stringify(updated))
  }

  return (
    <div>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px'
      }}>
        <h2 style={{
          fontSize: '24px',
          fontWeight: 700,
          textTransform: 'uppercase'
        }}>
          SAVED ADDRESSES
        </h2>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          style={{
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
          {isAdding ? 'CANCEL' : 'ADD NEW'}
        </button>
      </div>

      {isAdding && (
        <div style={{
          backgroundColor: 'var(--yellow)',
          border: '4px solid var(--black)',
          padding: '24px',
          marginBottom: '24px'
        }}
        className="neo-shadow"
        >
          <h3 style={{
            fontSize: '16px',
            fontWeight: 700,
            marginBottom: '12px',
            textTransform: 'uppercase'
          }}>
            NEW ADDRESS
          </h3>
          <textarea
            value={newAddress}
            onChange={(e) => setNewAddress(e.target.value)}
            placeholder="ENTER FULL ADDRESS..."
            style={{
              width: '100%',
              minHeight: '100px',
              padding: '12px',
              border: '3px solid var(--black)',
              fontSize: '14px',
              fontWeight: 600,
              fontFamily: 'inherit',
              marginBottom: '12px'
            }}
          />
          <button
            onClick={handleAddAddress}
            style={{
              padding: '12px 24px',
              backgroundColor: 'var(--green)',
              border: '3px solid var(--black)',
              color: 'var(--white)',
              fontSize: '14px',
              fontWeight: 700,
              textTransform: 'uppercase'
            }}
            className="neo-shadow-sm"
          >
            SAVE ADDRESS
          </button>
        </div>
      )}

      <div style={{
        display: 'grid',
        gap: '16px'
      }}>
        {addresses.length === 0 ? (
          <div style={{
            backgroundColor: 'var(--white)',
            border: '4px solid var(--black)',
            padding: '40px',
            textAlign: 'center'
          }}
          className="neo-shadow"
          >
            <p style={{ fontSize: '16px', fontWeight: 600 }}>
              NO SAVED ADDRESSES YET
            </p>
          </div>
        ) : (
          addresses.map((address, index) => (
            <div key={index} style={{
              backgroundColor: 'var(--white)',
              border: '4px solid var(--black)',
              padding: '24px'
            }}
            className="neo-shadow"
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'start',
                marginBottom: '12px'
              }}>
                <div style={{
                  padding: '6px 12px',
                  backgroundColor: index === 0 ? 'var(--yellow)' : 'var(--cyan)',
                  border: '2px solid var(--black)',
                  fontSize: '10px',
                  fontWeight: 700
                }}>
                  {index === 0 ? 'DEFAULT' : `ADDRESS ${index + 1}`}
                </div>
                <button 
                  onClick={() => handleDeleteAddress(index)}
                  style={{
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
              <p style={{
                fontSize: '14px',
                fontWeight: 600,
                lineHeight: 1.6,
                whiteSpace: 'pre-wrap'
              }}>
                {address}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

function OrdersTab({ orders }: { orders: Order[] }) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'PROCESSING': return <Clock size={20} />
      case 'SHIPPED': return <Truck size={20} />
      case 'DELIVERED': return <CheckCircle size={20} />
      case 'CANCELLED': return <XCircle size={20} />
      default: return <Package size={20} />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PROCESSING': return 'var(--yellow)'
      case 'SHIPPED': return 'var(--cyan)'
      case 'DELIVERED': return 'var(--green)'
      case 'CANCELLED': return 'var(--pink)'
      default: return 'var(--white)'
    }
  }

  return (
    <div>
      <h2 style={{
        fontSize: '24px',
        fontWeight: 700,
        marginBottom: '24px',
        textTransform: 'uppercase'
      }}>
        ORDER HISTORY ({orders.length})
      </h2>

      {orders.length === 0 ? (
        <div style={{
          backgroundColor: 'var(--white)',
          border: '4px solid var(--black)',
          padding: '40px',
          textAlign: 'center'
        }}
        className="neo-shadow"
        >
          <Package size={48} style={{ margin: '0 auto 16px' }} />
          <p style={{ fontSize: '16px', fontWeight: 600 }}>
            NO ORDERS YET
          </p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gap: '16px'
        }}>
          {orders.map((order) => (
            <div key={order.id} style={{
              backgroundColor: 'var(--white)',
              border: '4px solid var(--black)',
              padding: '24px'
            }}
            className="neo-shadow"
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'start',
                marginBottom: '16px',
                flexWrap: 'wrap',
                gap: '12px'
              }}>
                <div>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: 700,
                    marginBottom: '4px',
                    textTransform: 'uppercase'
                  }}>
                    ORDER #{order.id.slice(-6)}
                  </h3>
                  <p style={{
                    fontSize: '12px',
                    fontWeight: 600,
                    marginBottom: '8px'
                  }}>
                    {new Date(order.createdAt).toLocaleDateString()} {new Date(order.createdAt).toLocaleTimeString()}
                  </p>
                  <a
                    href={`https://suiexplorer.com/txblock/${order.txHash}?network=testnet`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontSize: '11px',
                      fontWeight: 600,
                      color: 'var(--pink)',
                      textDecoration: 'underline'
                    }}
                  >
                    TX: {order.txHash.slice(0, 10)}...
                  </a>
                </div>
                <div style={{
                  padding: '8px 16px',
                  backgroundColor: getStatusColor(order.status),
                  border: '3px solid var(--black)',
                  fontSize: '12px',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
                className="neo-shadow-sm"
                >
                  {getStatusIcon(order.status)}
                  {order.status}
                </div>
              </div>

              <div style={{
                padding: '16px',
                backgroundColor: 'var(--cyan)',
                border: '3px solid var(--black)',
                marginBottom: '12px'
              }}>
                <p style={{
                  fontSize: '14px',
                  fontWeight: 700,
                  marginBottom: '8px'
                }}>
                  ITEMS: {order.items.length}
                </p>
                {order.items.map((item, idx) => (
                  <p key={idx} style={{
                    fontSize: '12px',
                    fontWeight: 600,
                    marginBottom: '4px'
                  }}>
                    • {item.name} × {item.quantity}
                  </p>
                ))}
                <p style={{
                  fontSize: '16px',
                  fontWeight: 700,
                  color: 'var(--pink)',
                  marginTop: '8px'
                }}>
                  TOTAL: {order.total.toFixed(2)} USDC
                </p>
              </div>

              <div style={{
                padding: '12px',
                backgroundColor: 'var(--yellow)',
                border: '3px solid var(--black)',
                marginBottom: '12px'
              }}>
                <p style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  marginBottom: '4px'
                }}>
                  SHIPPING TO:
                </p>
                <p style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  whiteSpace: 'pre-wrap'
                }}>
                  {order.shippingAddress}
                </p>
              </div>

              {order.trackingNumber && (
                <div style={{
                  padding: '12px',
                  backgroundColor: 'var(--green)',
                  border: '3px solid var(--black)',
                  color: 'var(--white)'
                }}>
                  <p style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    marginBottom: '4px'
                  }}>
                    TRACKING NUMBER:
                  </p>
                  <p style={{
                    fontSize: '14px',
                    fontWeight: 700,
                    fontFamily: 'monospace'
                  }}>
                    {order.trackingNumber}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function StatBox({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div style={{
      padding: '20px',
      backgroundColor: color,
      border: '3px solid var(--black)',
      textAlign: 'center'
    }}
    className="neo-shadow"
    >
      <div style={{
        fontSize: '12px',
        fontWeight: 700,
        marginBottom: '8px',
        textTransform: 'uppercase'
      }}>
        {label}
      </div>
      <div style={{
        fontSize: '28px',
        fontWeight: 700
      }}>
        {value}
      </div>
    </div>
  )
}

export default ProfilePage
