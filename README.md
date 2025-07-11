# Gaius - All-in-One Loyalty Program Platform

![Gaius Logo](public/gaiuslogo-app.png)

Gaius is a blockchain-powered loyalty program platform built on Algorand that enables businesses to create, manage, and grow customer loyalty programs with ease. The platform leverages blockchain technology to provide transparent, secure, and interoperable loyalty experiences.

## Features

### For Businesses

- **Loyalty Program Creation**: Create custom loyalty programs with branded visuals and tiered rewards
- **Member Management**: Track and manage program members, view analytics, and engage with customers
- **XP & Points System**: Award points to customers for actions and track their progress through reward tiers
- **Messaging Center**: Communicate directly with loyalty program members
- **Analytics Dashboard**: View program performance metrics and member engagement statistics
- **Multi-Network Support**: Run programs on Algorand TestNet or MainNet

### For Customers

- **Digital Loyalty Cards**: Store all loyalty memberships in one digital wallet
- **Points Tracking**: View points balance and progress towards reward tiers
- **Reward Redemption**: Redeem points for exclusive rewards
- **Cross-Brand Benefits**: Use loyalty points across participating businesses in the network

## Technology Stack

- **Frontend**: React, TypeScript, Vite, TailwindCSS
- **Blockchain**: Algorand (TestNet & MainNet)
- **Authentication**: Supabase Auth
- **Database**: Supabase PostgreSQL
- **Storage**: IPFS via Pinata
- **Wallet Integration**: Pera Wallet, Defly, Lute, Exodus, WalletConnect

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm or pnpm
- Algorand account and wallet
- Supabase account for authentication and database

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```
# Algorand Network
VITE_TESTNET_ALGOD_SERVER=https://testnet-api.algonode.cloud
VITE_MAINNET_ALGOD_SERVER=https://mainnet-api.algonode.cloud
VITE_TESTNET_INDEXER_URL=https://testnet-idx.algonode.cloud
VITE_MAINNET_INDEXER_URL=https://mainnet-idx.algonode.cloud
VITE_TESTNET_EXPLORER_URL=https://lora.algokit.io/testnet
VITE_MAINNET_EXPLORER_URL=https://lora.algokit.io/mainnet

# WalletConnect
VITE_PROJECT_ID=your_walletconnect_project_id

# Supabase
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# IPFS/Pinata
VITE_PINATA_API_KEY=your_pinata_api_key
VITE_PINATA_API_SECRET=your_pinata_api_secret
VITE_PINATA_JWT=your_pinata_jwt
VITE_IPFS_GATEWAY=https://gateway.pinata.cloud

# Subscription
VITE_SUBSCRIPTION_WALLET=your_subscription_wallet_address
```

### Installation

1. Clone the repository
   ```
   git clone https://github.com/yourusername/gaiusnew.git
   cd gaiusnew
   ```

2. Install dependencies
   ```
   npm install
   # or
   pnpm install
   ```

3. Start the development server
   ```
   npm run dev
   # or
   pnpm dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Database Setup

The application requires a Supabase database with the following tables:

1. `organization_admins` - Stores information about organization administrators
   - `id`: UUID (primary key)
   - `wallet_address`: String (Algorand address)
   - `full_name`: String
   - `email`: String
   - `subscription_plan`: String
   - `created_at`: Timestamp

2. Other tables for managing loyalty programs, members, and transactions.

## Subscription Plans

Gaius offers multiple subscription tiers for businesses:

- **Basic**: 5 ALGO/month - Up to 250 members, 5 loyalty programs
- **Professional**: 20 ALGO/month - Up to 2,500 members, 20 loyalty programs
- **Enterprise**: 50 ALGO/month - Unlimited members and programs

## Building for Production

```
npm run build
# or
pnpm build
```

The build artifacts will be stored in the `dist/` directory.

## Deployment

The application can be deployed to any static hosting service like Netlify, Vercel, or GitHub Pages. Make sure to configure environment variables on your hosting platform.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with [Bolt.new](https://bolt.new/?rid=os72mi)
- Powered by [Algorand](https://www.algorand.com/)
- Wallet connectivity via [Use Wallet](https://github.com/txnlab/use-wallet)
- Authentication and database by [Supabase](https://supabase.com/)
- IPFS storage via [Pinata](https://www.pinata.cloud/)
