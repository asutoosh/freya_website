# Money-Glitch Preview WebApp

A Next.js 14 web application serving as a preview bridge between Meta Ads and Telegram bot, featuring a Telegram-style chat interface with automated trading signals.

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Copy the example file
cp .env.example .env.local
```

Edit `.env.local` and add your IP2Location.io API key:

```env
# Get your FREE API key at: https://www.ip2location.io/sign-up
IP2LOCATION_API_KEY=your_api_key_here

# For testing in India (bypass India blocking)
# Set to "IN" during development, remove in production
BYPASS_COUNTRY_CODE=IN
```

> **Note**: You can use the API without a key (1,000 queries/day limit), but it's recommended to [sign up for a free account](https://www.ip2location.io/sign-up) to get 50,000 queries/month.

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🎯 Features

- ✅ **Telegram-Style UI** - Dark theme chat interface
- ✅ **3-Minute Timer** - Preview countdown with localStorage lock
- ✅ **IP Verification** - Real VPN/proxy detection via IP2Location.io
- ✅ **India Blocking** - Region-based access control
- ✅ **24-Hour IP Lock** - Prevents repeated preview access
- ✅ **Live Signals** - Real-time trading signal delivery
- ✅ **Mobile Responsive** - Collapsible sidebar for mobile

---

## 🔧 Configuration

### Update Telegram Bot URL

Edit `components/TimerPopup.tsx` line 35:

```tsx
href="https://t.me/YOUR_ACTUAL_BOT_USERNAME"
```

### Adjust Timer Duration

Edit `app/money-glitch/page.tsx` line 12:

```tsx
const PREVIEW_DURATION = 180; // seconds (default: 3 minutes)
```

### Production Deployment

Before deploying to production:

1. **Remove bypass country code**:
   ```env
   # .env.local or .env.production
   IP2LOCATION_API_KEY=your_production_key
   # Remove or comment out BYPASS_COUNTRY_CODE
   ```

2. **Update Telegram bot URL** in `TimerPopup.tsx`

3. **Set up proper database** for IP sessions and signals (replace JSON files)

---

## 📡 API Endpoints

### IP Verification
```bash
GET /api/verify-ip
```

Returns:
```json
{
  "allowed": true,
  "reason": "ok" | "vpn" | "india"
}
```

### Push Live Signal (Webhook)
```bash
POST /api/push-signal
Content-Type: application/json

{
  "channel": "money-glitch",
  "message": {
    "text": "script : BTCUSD\nPosition : BUY ⬆️\nEnter Price : 95000\nTake Profit 1 : 95500\nStoploss : 94500"
  }
}
```

### Get Signals (Polling)
```bash
GET /api/get-signals?channel=money-glitch&since=1733512800000
```

---

## 🧪 Testing

### Test VPN Detection

The app will automatically detect VPNs/proxies using IP2Location.io. To test:

1. Connect to a VPN
2. Visit the app
3. You should see: "Please disable your VPN or proxy"

### Test India Blocking

**During Development** (with `BYPASS_COUNTRY_CODE=IN`):
- Indian IPs will be allowed (for testing)

**In Production** (without bypass):
- Indian IPs will see: "Service not available in your region"

### Test Timer

1. Go to `/money-glitch`
2. Watch timer count down from 3:00
3. Wait for expiry or clear localStorage to reset

### Test Live Signals

```bash
curl -X POST http://localhost:3000/api/push-signal \
  -H "Content-Type: application/json" \
  -d '{
    "channel": "money-glitch",
    "message": {
      "text": "script : ETHUSD\nPosition : SELL ⬇️\nEnter Price : 3500\nTake Profit 1 : 3450\nStoploss : 3550"
    }
  }'
```

Signal should appear in chat within 5 seconds.

---

## 📁 Project Structure

```
├── app/
│   ├── api/              # API routes
│   ├── welcome/          # Welcome channel
│   ├── money-glitch/     # Money-Glitch channel (timed)
│   └── reviews/          # Reviews channel
├── components/           # React components
├── lib/                  # Utilities and types
├── data/                 # JSON storage (auto-generated)
└── .env.local           # Environment variables (create this)
```

---

## 🌍 IP2Location.io Integration

This app uses [IP2Location.io](https://www.ip2location.io/) for:

- **VPN/Proxy Detection**: Blocks users using VPNs, proxies, Tor, etc.
- **Geolocation**: Identifies user's country code
- **India Blocking**: Restricts access from India (configurable)

### How It Works

1. User visits the app
2. Backend extracts IP from request headers
3. Calls IP2Location.io API: `https://api.ip2location.io/?key=YOUR_KEY&ip=USER_IP`
4. Checks response for:
   - `is_proxy: true` → Block (VPN/Proxy detected)
   - `proxy.is_vpn: true` → Block (VPN detected)
   - `country_code: "IN"` → Block (India, unless bypassed)
5. Shows blocking screen or allows access

### Environment Variable Bypass

For testing in India, set:

```env
BYPASS_COUNTRY_CODE=IN
```

This allows Indian IPs during development. **Remove in production!**

---

## 🔒 Security Notes

- IP sessions stored in `data/ip-sessions.json` (use database in production)
- No authentication on `/api/push-signal` (add API key in production)
- Fail-open on API errors (allows access if IP2Location.io is down)

---

## 📄 License

Private project - All rights reserved

---

## 🆘 Support

For issues or questions, contact the development team.
