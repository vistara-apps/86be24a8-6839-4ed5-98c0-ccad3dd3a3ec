# AdRemixr - AI-Powered Ad Variation Generator

A Base Mini App that allows creators to generate AI-powered ad variations and auto-post them for rapid testing.

## Features

- **AI Ad Variation Generation**: Upload a product image and generate multiple unique ad creatives
- **Cross-Platform Auto-Posting**: Seamlessly publish variations to Farcaster (with future TikTok/Instagram support)
- **Performance Tracking**: Basic engagement metrics for posted variations
- **Micro-transaction Model**: Pay-per-spin pricing at $0.50 per variation

## Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Blockchain**: Base network via OnchainKit
- **AI**: OpenAI/OpenRouter for image and text generation
- **Storage**: Pinata (IPFS) for decentralized asset storage
- **Social**: Farcaster via Neynar API
- **Payments**: Stripe for fiat transactions
- **Database**: Supabase for application data

## Getting Started

1. **Clone and install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   Copy `.env.local.example` to `.env.local` and fill in your API keys:
   - OnchainKit API key
   - OpenAI/OpenRouter API key
   - Pinata credentials
   - Supabase URL and keys
   - Neynar API key for Farcaster
   - Stripe keys

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open [http://localhost:3000](http://localhost:3000)**

## Core User Flow

1. **Connect Wallet**: Users connect via OnchainKit wallet components
2. **Upload Product**: Upload product image which gets stored on IPFS via Pinata
3. **Generate Variations**: Select number of variations and pay via Stripe
4. **AI Processing**: OpenAI generates unique ad creatives with different copy and styles
5. **Auto-Post**: Variations are automatically posted to Farcaster
6. **Track Performance**: View basic engagement metrics for each variation

## Design System

The app uses a sophisticated dark theme with:
- **Colors**: Dark background with purple accents
- **Typography**: Clean, modern font hierarchy
- **Components**: Glass-effect cards with subtle animations
- **Layout**: Mobile-first responsive design

## Architecture

- **Data Models**: User, Product, AdVariation, and Post entities
- **API Integration**: Modular service layer for external APIs
- **State Management**: React hooks with proper provider setup
- **Error Handling**: Comprehensive error states and fallbacks

## Future Enhancements

- Direct TikTok and Instagram posting
- Advanced performance analytics
- AI prompt optimization based on performance
- Bulk generation and scheduling
- Custom brand templates

## License

MIT License - feel free to use and modify for your projects.
