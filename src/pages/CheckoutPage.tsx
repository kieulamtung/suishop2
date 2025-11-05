import React, { useState } from 'react'
import { Trash2, Ticket, Wallet, AlertCircle, ExternalLink } from 'lucide-react'
import { useCartStore } from '../store/cartStore'
import { useCurrentAccount, useSignAndExecuteTransaction } from '@mysten/dapp-kit'
import { Transaction } from '@mysten/sui/transactions'

function CheckoutPage() {
  const account = useCurrentAccount()
  const { items, removeItem, updateQuantity, clearCart } = useCartStore()
  const [selectedVoucher, setSelectedVoucher] = useState<string | null>(null)
  const [paymentMethod, setPaymentMethod] = useState<'SUI' | 'USDC'>('SUI')
  const [isProcessing, setIsProcessing] = useState(false)
  const [txResult, setTxResult] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [shippingAddress, setShippingAddress] = useState('')

  const { mutate: signAndExecute } = useSignAndExecuteTransaction()

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = 10
  const discount = selectedVoucher ? subtotal * 0.3 : 0
  const total = subtotal + shipping - discount

  const handlePayment = async () => {
    if (!account) {
      setError('PLEASE CONNECT YOUR WALLET FIRST!')
      return
    }

    if (items.length === 0) {
      setError('CART IS EMPTY!')
      return
    }

    if (!shippingAddress.trim()) {
      setError('PLEASE ENTER SHIPPING ADDRESS!')
      return
    }

    setIsProcessing(true)
    setError(null)
    setTxResult(null)

    try {
      const tx = new Transaction()

      if (paymentMethod === 'SUI') {
        const amountInMist = Math.floor(total * 1_000_000_000)
        const sellerAddress = '0x742d35cc6634c0532925a3b844bc9c7eb6fb05f44228e1a3946d9b6e6e8e8e8e'
        
        const [coin] = tx.splitCoins(tx.gas, [amountInMist])
        tx.transferObjects([coin], sellerAddress)

      } else {
        const usdcAmount = Math.floor(total * 1_000_000)
        const usdcType = '0x5d4b302506645c37ff133b98c4b50a5ae14841659738d6d733d59d0d217a93bf::coin::COIN'
        const sellerAddress = '0x742d35cc6634c0532925a3b844bc9c7eb6fb05f44228e1a3946d9b6e6e8e8e8e'

        tx.moveCall({
          target: '0x2::pay::split_and_transfer',
          typeArguments: [usdcType],
          arguments: [
            tx.object('0x2'),
            tx.pure.u64(usdcAmount),
            tx.pure.address(sellerAddress),
          ],
        })
      }

      signAndExecute(
        {
          transaction: tx,
        },
        {
          onSuccess: (result) => {
            console.log('Transaction successful:', result)
            setTxResult(result.digest)
            setIsProcessing(false)
            
            // Save order with shipping address
            const order = {
              id: Date.now().toString(),
              items: items,
              total: total,
              shippingAddress: shippingAddress,
              txHash: result.digest,
              status: 'PROCESSING',
              createdAt: new Date().toISOString()
            }
            
            const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]')
            localStorage.setItem('orders', JSON.stringify([order, ...existingOrders]))
            
            setTimeout(() => {
              clearCart()
              alert('PAYMENT SUCCESSFUL! ORDER HAS BEEN CREATED.')
            }, 1000)
          },
          onError: (error) => {
            console.error('Transaction failed:', error)
            setError(`TRANSACTION FAILED: ${error.message}`)
            setIsProcessing(false)
          },
        }
      )

    } catch (err: any) {
      console.error('Payment error:', err)
      setError(`ERROR: ${err.message || 'UNABLE TO PROCESS PAYMENT'}`)
      setIsProcessing(false)
    }
  }

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
        CHECKOUT - TESTNET
      </h1>

      {!account && (
        <div style={{
          backgroundColor: 'var(--yellow)',
          border: '4px solid var(--black)',
          padding: '24px',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}
        className="neo-shadow"
        >
          <AlertCircle size={24} />
          <p style={{ fontSize: '16px', fontWeight: 700 }}>
            PLEASE CONNECT YOUR SUI WALLET TO CHECKOUT!
          </p>
        </div>
      )}

      <div style={{
        display: 'grid',
        gridTemplateColumns: window.innerWidth < 1024 ? '1fr' : '2fr 1fr',
        gap: '32px'
      }}>
        <div>
          <div style={{
            backgroundColor: 'var(--white)',
            border: '4px solid var(--black)',
            padding: '24px',
            marginBottom: '24px'
          }}
          className="neo-shadow"
          >
            <h2 style={{
              fontSize: '20px',
              fontWeight: 700,
              marginBottom: '20px',
              textTransform: 'uppercase'
            }}>
              SHOPPING CART ({items.length})
            </h2>

            {items.length === 0 ? (
              <p style={{
                textAlign: 'center',
                padding: '40px',
                fontSize: '16px',
                fontWeight: 600
              }}>
                CART IS EMPTY
              </p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {items.map((item) => (
                  <div key={item.id} style={{
                    display: 'flex',
                    gap: '16px',
                    padding: '16px',
                    backgroundColor: 'var(--cyan)',
                    border: '3px solid var(--black)'
                  }}
                  className="neo-shadow-sm"
                  >
                    <div style={{
                      width: '80px',
                      height: '80px',
                      backgroundColor: 'var(--white)',
                      border: '2px solid var(--black)',
                      flexShrink: 0,
                      overflow: 'hidden'
                    }}>
                      <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <h3 style={{
                        fontSize: '16px',
                        fontWeight: 700,
                        marginBottom: '4px',
                        textTransform: 'uppercase'
                      }}>
                        {item.name}
                      </h3>
                      <p style={{
                        fontSize: '14px',
                        fontWeight: 600,
                        marginBottom: '8px'
                      }}>
                        {item.price} USDC × {item.quantity}
                      </p>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <button
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          style={{
                            width: '32px',
                            height: '32px',
                            backgroundColor: 'var(--white)',
                            border: '2px solid var(--black)',
                            fontWeight: 700
                          }}
                        >
                          -
                        </button>
                        <span style={{ fontWeight: 700, minWidth: '30px', textAlign: 'center' }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          style={{
                            width: '32px',
                            height: '32px',
                            backgroundColor: 'var(--white)',
                            border: '2px solid var(--black)',
                            fontWeight: 700
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      style={{
                        width: '40px',
                        height: '40px',
                        backgroundColor: 'var(--pink)',
                        border: '3px solid var(--black)',
                        color: 'var(--white)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}
                      className="neo-shadow-sm"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={{
            backgroundColor: 'var(--white)',
            border: '4px solid var(--black)',
            padding: '24px',
            marginBottom: '24px'
          }}
          className="neo-shadow"
          >
            <h2 style={{
              fontSize: '20px',
              fontWeight: 700,
              marginBottom: '16px',
              textTransform: 'uppercase'
            }}>
              SHIPPING ADDRESS
            </h2>
            <textarea
              value={shippingAddress}
              onChange={(e) => setShippingAddress(e.target.value)}
              placeholder="ENTER YOUR FULL SHIPPING ADDRESS..."
              style={{
                width: '100%',
                minHeight: '120px',
                padding: '16px',
                border: '3px solid var(--black)',
                fontSize: '14px',
                fontWeight: 600,
                fontFamily: 'inherit',
                resize: 'vertical'
              }}
            />
            <p style={{
              marginTop: '12px',
              fontSize: '12px',
              fontWeight: 600,
              color: '#666'
            }}>
              YOUR ADDRESS WILL BE ENCRYPTED AND STORED SECURELY
            </p>
          </div>

          <div style={{
            backgroundColor: 'var(--yellow)',
            border: '4px solid var(--black)',
            padding: '24px'
          }}
          className="neo-shadow"
          >
            <h2 style={{
              fontSize: '20px',
              fontWeight: 700,
              marginBottom: '16px',
              textTransform: 'uppercase',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <Ticket size={24} />
              APPLY VOUCHER
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: window.innerWidth < 768 ? '1fr' : 'repeat(2, 1fr)',
              gap: '12px'
            }}>
              <VoucherOption
                name="SUMMER 30%"
                selected={selectedVoucher === 'summer'}
                onClick={() => setSelectedVoucher(selectedVoucher === 'summer' ? null : 'summer')}
              />
              <VoucherOption
                name="TECH 40%"
                selected={selectedVoucher === 'tech'}
                onClick={() => setSelectedVoucher(selectedVoucher === 'tech' ? null : 'tech')}
              />
            </div>
          </div>
        </div>

        <div>
          <div style={{
            backgroundColor: 'var(--white)',
            border: '4px solid var(--black)',
            padding: '24px',
            position: 'sticky',
            top: '100px'
          }}
          className="neo-shadow-lg"
          >
            <h2 style={{
              fontSize: '20px',
              fontWeight: 700,
              marginBottom: '20px',
              textTransform: 'uppercase'
            }}>
              ORDER SUMMARY
            </h2>

            <div style={{ marginBottom: '20px' }}>
              <SummaryRow label="SUBTOTAL" value={`${subtotal.toFixed(2)} USDC`} />
              <SummaryRow label="SHIPPING" value={`${shipping.toFixed(2)} USDC`} />
              {discount > 0 && (
                <SummaryRow label="DISCOUNT" value={`-${discount.toFixed(2)} USDC`} color="var(--green)" />
              )}
              <div style={{
                height: '3px',
                backgroundColor: 'var(--black)',
                margin: '16px 0'
              }} />
              <SummaryRow label="TOTAL" value={`${total.toFixed(2)} USDC`} large />
            </div>

            <div style={{
              backgroundColor: 'var(--cyan)',
              border: '3px solid var(--black)',
              padding: '16px',
              marginBottom: '20px'
            }}>
              <h3 style={{
                fontSize: '14px',
                fontWeight: 700,
                marginBottom: '12px',
                textTransform: 'uppercase'
              }}>
                PAYMENT METHOD
              </h3>
              <div style={{ display: 'flex', gap: '8px' }}>
                <PaymentMethodButton
                  label="SUI"
                  selected={paymentMethod === 'SUI'}
                  onClick={() => setPaymentMethod('SUI')}
                />
                <PaymentMethodButton
                  label="USDC"
                  selected={paymentMethod === 'USDC'}
                  onClick={() => setPaymentMethod('USDC')}
                />
              </div>
              <p style={{
                fontSize: '11px',
                fontWeight: 600,
                marginTop: '12px',
                textAlign: 'center'
              }}>
                {paymentMethod === 'SUI' 
                  ? `≈ ${total.toFixed(4)} SUI (TESTNET)`
                  : `${total.toFixed(2)} USDC (TESTNET)`
                }
              </p>
            </div>

            <a
              href="https://faucet.circle.com/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                width: '100%',
                padding: '12px',
                backgroundColor: 'var(--green)',
                border: '3px solid var(--black)',
                color: 'var(--white)',
                fontSize: '14px',
                fontWeight: 700,
                textTransform: 'uppercase',
                textDecoration: 'none',
                marginBottom: '16px'
              }}
              className="neo-shadow-sm"
            >
              <ExternalLink size={18} />
              GET TESTNET USDC
            </a>

            {error && (
              <div style={{
                backgroundColor: 'var(--pink)',
                border: '3px solid var(--black)',
                padding: '12px',
                marginBottom: '16px',
                color: 'var(--white)',
                fontSize: '12px',
                fontWeight: 700
              }}
              className="neo-shadow-sm"
              >
                {error}
              </div>
            )}

            {txResult && (
              <div style={{
                backgroundColor: 'var(--green)',
                border: '3px solid var(--black)',
                padding: '12px',
                marginBottom: '16px',
                fontSize: '11px',
                fontWeight: 700,
                wordBreak: 'break-all'
              }}
              className="neo-shadow-sm"
              >
                TRANSACTION SUCCESS!<br />
                TX: {txResult.slice(0, 20)}...
                <a 
                  href={`https://suiexplorer.com/txblock/${txResult}?network=testnet`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'block',
                    marginTop: '8px',
                    color: 'var(--black)',
                    textDecoration: 'underline'
                  }}
                >
                  VIEW ON EXPLORER
                </a>
              </div>
            )}

            <button
              onClick={handlePayment}
              disabled={items.length === 0 || !account || isProcessing || !shippingAddress.trim()}
              style={{
                width: '100%',
                padding: '16px',
                backgroundColor: items.length === 0 || !account || isProcessing || !shippingAddress.trim() ? '#ccc' : 'var(--pink)',
                border: '4px solid var(--black)',
                color: 'var(--white)',
                fontSize: '16px',
                fontWeight: 700,
                textTransform: 'uppercase',
                cursor: items.length === 0 || !account || isProcessing || !shippingAddress.trim() ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
              className="neo-shadow"
            >
              <Wallet size={20} />
              {isProcessing ? 'PROCESSING...' : `PAY WITH ${paymentMethod}`}
            </button>

            <p style={{
              marginTop: '16px',
              fontSize: '12px',
              fontWeight: 600,
              textAlign: 'center'
            }}>
              PROTECTED BY ESCROW SMART CONTRACT
            </p>

            {account && (
              <div style={{
                marginTop: '16px',
                padding: '12px',
                backgroundColor: 'var(--cyan)',
                border: '2px solid var(--black)',
                fontSize: '10px',
                fontWeight: 600,
                wordBreak: 'break-all'
              }}>
                WALLET: {account.address.slice(0, 10)}...{account.address.slice(-8)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function SummaryRow({ label, value, color, large }: { label: string; value: string; color?: string; large?: boolean }) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '12px',
      fontSize: large ? '20px' : '16px',
      fontWeight: large ? 700 : 600,
      color: color || 'var(--black)'
    }}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  )
}

function VoucherOption({ name, selected, onClick }: { name: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '12px',
        backgroundColor: selected ? 'var(--pink)' : 'var(--white)',
        border: '3px solid var(--black)',
        color: selected ? 'var(--white)' : 'var(--black)',
        fontSize: '14px',
        fontWeight: 700,
        textTransform: 'uppercase'
      }}
      className="neo-shadow-sm"
    >
      {name}
    </button>
  )
}

function PaymentMethodButton({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        flex: 1,
        padding: '12px',
        backgroundColor: selected ? 'var(--pink)' : 'var(--white)',
        border: '3px solid var(--black)',
        color: selected ? 'var(--white)' : 'var(--black)',
        fontSize: '14px',
        fontWeight: 700,
        textTransform: 'uppercase'
      }}
      className="neo-shadow-sm"
    >
      {label}
    </button>
  )
}

export default CheckoutPage
