# SUI-SHOP - Decentralized E-commerce Platform

Nền tảng thương mại điện tử phi tập trung trên SUI blockchain với NFT vouchers.

## Tính năng chính

- 🛍️ **Marketplace**: Mua bán sản phẩm thực với crypto
- 💳 **Thanh toán Testnet**: Hỗ trợ thanh toán bằng SUI hoặc USDC
- 🎫 **NFT Vouchers**: Voucher giảm giá dạng NFT có thể giao dịch
- 🔐 **Escrow**: Bảo vệ người mua và người bán
- 👛 **Wallet Integration**: Kết nối ví SUI để thanh toán

## Hướng dẫn test thanh toán Testnet

### 1. Chuẩn bị

1. **Cài đặt ví SUI**:
   - Tải [Sui Wallet](https://chrome.google.com/webstore/detail/sui-wallet) extension
   - Tạo ví mới hoặc import ví hiện có
   - Chuyển sang **Testnet** trong settings

2. **Lấy SUI testnet**:
   - Truy cập [SUI Testnet Faucet](https://discord.com/channels/916379725201563759/971488439931392130)
   - Hoặc dùng CLI: `sui client faucet`
   - Nhận 10 SUI testnet miễn phí

### 2. Test kết nối ví

1. Mở ứng dụng
2. Click nút **"Connect Wallet"** ở header
3. Chọn ví SUI của bạn
4. Xác nhận kết nối
5. Địa chỉ ví sẽ hiển thị ở header

### 3. Test ký giao dịch

1. Thêm sản phẩm vào giỏ hàng
2. Vào trang **Checkout**
3. Click nút **"THỬ KÝ GIAO DỊCH"**
4. Ví sẽ mở popup yêu cầu ký
5. Xác nhận giao dịch
6. Xem kết quả và transaction hash

### 4. Test thanh toán

#### Thanh toán bằng SUI:
1. Chọn **"SUI"** làm phương thức thanh toán
2. Click **"THANH TOÁN BẰNG SUI"**
3. Xác nhận giao dịch trong ví
4. Đợi xử lý (3-5 giây)
5. Xem transaction trên [SUI Explorer](https://suiexplorer.com/?network=testnet)

#### Thanh toán bằng USDC:
1. Chọn **"USDC"** làm phương thức thanh toán
2. Click **"THANH TOÁN BẰNG USDC"**
3. Xác nhận giao dịch
4. Kiểm tra kết quả

### 5. Kiểm tra giao dịch

Sau khi thanh toán thành công:
- Transaction hash sẽ hiển thị
- Click link để xem chi tiết trên SUI Explorer
- Giỏ hàng sẽ tự động xóa
- Đơn hàng được tạo

## Lưu ý quan trọng

⚠️ **ĐÂY LÀ TESTNET** - Không sử dụng tiền thật!

- Tất cả giao dịch đều trên SUI Testnet
- SUI và USDC là token test, không có giá trị thực
- Địa chỉ người bán là địa chỉ demo
- Smart contract escrow chưa được deploy

## Cấu trúc thanh toán

```typescript
// Thanh toán SUI
const amountInMist = total * 1_000_000_000 // 1 SUI = 1B MIST
txb.splitCoins(txb.gas, [amountInMist])
txb.transferObjects([coin], sellerAddress)

// Thanh toán USDC
const usdcAmount = total * 1_000_000 // USDC có 6 decimals
txb.moveCall({
  target: '0x2::pay::split_and_transfer',
  typeArguments: [usdcType],
  arguments: [coinObject, amount, recipient]
})
```

## Roadmap

- [ ] Deploy smart contract escrow
- [ ] Tích hợp USDC thật trên testnet
- [ ] Mã hóa địa chỉ giao hàng
- [ ] NFT voucher minting
- [ ] Marketplace voucher
- [ ] Mainnet deployment

## Tech Stack

- React + TypeScript
- Vite
- @mysten/dapp-kit
- @mysten/sui.js
- Zustand (state management)
- Neo-Brutalism design

## Development

```bash
npm install
npm run dev
```

Ứng dụng chạy tại: http://localhost:3000
