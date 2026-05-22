# 🚗 CarFleet — Car Rental Platform

A modern, full-stack car rental marketplace where users can browse, book, and list vehicles for rent. Built with a cockpit-inspired UI featuring molded buttons, telemetry-style readouts, and a premium automotive aesthetic.

![CarFleet Banner](./public/banner.png)

🔗 **Live Site:** [https://car-fleet-rho.vercel.app/](https://car-fleet-rho.vercel.app/)

---

## ✨ Features

### 🌐 Public

- 🚗 **Browse all cars** with search by name (MongoDB `$regex`) and filter by car type (`$in`)
- 🔍 **Sort cars** by newest, oldest, price (high → low, low → high)
- 📊 **Live inventory dashboard** with stats (total cars, available count, average price, type variety)
- 🎨 **Auto-rotating hero banner** showcasing premium vehicles with smooth slide transitions
- 📖 **Detailed car pages** with full info, host details, included features, and booking modal
- ❌ **Custom 404 page** with on-brand automotive vocabulary

### 🔐 Authenticated

- 🔑 **Sign up & sign in** with email/password or Google OAuth (better-auth + JWT)
- 🛡️ **Password validation** — uppercase, lowercase, and minimum 6 characters
- ➕ **Add a car** for rent with multi-section form (identity, pricing, image, description, availability)
- 📋 **My Fleet dashboard** — view all your listed cars with edit/delete/availability controls
- 🚙 **My Bookings** — track all your rentals with status filtering (pending/confirmed/cancelled)
- 📅 **Book any car** through a modal with driver-included option and special notes
- 🚫 **"Already Booked" indicator** — prevents re-booking and shows a quick link to My Trips
- 🔢 **Booking counter** — `$inc` operator tracks popularity per car

### 🎨 Design

- 🌑 **Dual-aesthetic theme** — dark cockpit navbar/footer + light showroom for content
- 🔘 **Molded cockpit buttons** with red gradient, chrome bezel, glossy highlights, and press-down animations
- 📊 **Telemetry readouts** — monospace stats, RPM-bar indicators, live status pulses
- 🏎️ **Racing stripe accents** that visually tie the brand together
- 📱 **Fully responsive** — mobile-first layout, sticky panels, touch-friendly controls
- 🎯 **Accessible** — proper ARIA labels, semantic HTML, keyboard navigation support

---

## 🛠️ Tech Stack

### Frontend

- ⚛️ **[Next.js 16](https://nextjs.org/)** — React framework with App Router
- ⚛️ **[React 19](https://react.dev/)** — latest features including new lint rules
- 🎨 **[Tailwind CSS v4](https://tailwindcss.com/)** — utility-first styling
- 📝 **[React Hook Form](https://react-hook-form.com/)** — form management & validation
- 🎉 **[Sonner](https://sonner.emilkowal.ski/)** — toast notifications
- 🎯 **[Lucide React](https://lucide.dev/)** — icon library

### Backend

- 🟢 **[Express.js](https://expressjs.com/)** — Node.js web framework
- 🍃 **[MongoDB](https://www.mongodb.com/)** — NoSQL database
- 🔐 **[better-auth](https://www.better-auth.com/)** — modern authentication library
- 🪙 **JWT** — token-based authorization via better-auth's JWT plugin
- 🌐 **[CORS](https://www.npmjs.com/package/cors)** — cross-origin request handling

### Infrastructure

- ▲ **[Vercel](https://vercel.com/)** — frontend hosting
- 🚂 **Express server** — backend deployment (Render / Railway / Fly.io)
- ☁️ **MongoDB Atlas** — managed database

---

## 📁 Project Structure

```
car-fleet/
├── public/                  # Static assets (banner, logo, etc.)
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── add-car/         # 🔒 Private — list a new car
│   │   ├── added-cars/      # 🔒 Private — manage your fleet
│   │   ├── cars/
│   │   │   ├── page.jsx     # Explore all cars
│   │   │   └── [id]/        # Car details + booking modal
│   │   ├── login/           # Sign in page
│   │   ├── register/        # Sign up page
│   │   ├── my-bookings/      # 🔒 Private — my bookings
│   │   ├── not-found.jsx    # Custom 404
│   │   └── page.jsx         # Home (banner + cars + features + flow)
│   ├── components/          # Reusable UI components
│   │   ├── NavBar.jsx
│   │   ├── BookingCard.jsx
│   │   ├── CarCard.jsx
│   │   ├── Footer.jsx
│   │   ├── Banner.jsx
│   │   ├── AvailableCars.jsx
│   │   ├── WhyCarFleet.jsx
│   │   ├── HowItWorks.jsx
│   │   └── ...
│   ├── lib/
│   │   ├── auth.js          # better-auth server config
│   │   └── auth-client.js   # better-auth client config
│   └── proxy.js             # Next.js 16 proxy (route protection)
├── server/                  # Express backend
│   ├── index.js             # Main server file
│   └── middleware/
│       └── verifyToken.js   # JWT verification middleware
├── .env.local               # Environment variables (gitignored)
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- MongoDB Atlas account (or local MongoDB)
- Google OAuth credentials (for Google sign-in)

### 1. Clone the repository

```bash
git clone https://github.com/GrRabby/car-fleet.git
git clone https://github.com/GrRabby/car-fleet-server.git
cd car-fleet
```

### 2. Install dependencies

```bash
# Frontend
npm install

# Backend (in a separate terminal)
cd car-fleet-server
npm install
```

### 3. Set up environment variables

**Frontend** — create `.env.local` in the project root:

```env
# Better-auth
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=your-32-character-random-secret

# Database
MONGODB_URL=mongodb+srv://user:pass@cluster.mongodb.net/carfleet

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Express API
NEXT_PUBLIC_API_URL=http://localhost:5000
```

**Backend** — create `.env` in the `server/` directory:

```env
PORT=5000
MONGODB_URL=mongodb+srv://user:pass@cluster.mongodb.net/carfleet
BETTER_AUTH_URL=http://localhost:3000
FRONTEND_URL=http://localhost:3000
```

### 4. Run the development servers

```bash
# Terminal 1 — Frontend (Next.js)
npm run dev

# Terminal 2 — Backend (Express)
cd car-fleet-server
npm nodemon index.js
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔑 API Endpoints

### Public

| Method | Endpoint                    | Description                              |
| ------ | --------------------------- | ---------------------------------------- |
| GET    | `/explore-cars`                     | List all cars with search, filter, sort  |
| GET    | `/cars/:id`                 | Get full details of a single car         |

### Authenticated (requires `Authorization: Bearer <jwt>`)

| Method | Endpoint                    | Description                              |
| ------ | --------------------------- | ---------------------------------------- |
| GET    | `/added-cars`               | Get current user's listed cars           |
| POST   | `/add-car`                     | Create a new car listing                 |
| PATCH  | `/added-cars/:id`                 | Update a car (owner only)                |
| DELETE | `/added-cars/:id`                 | Delete a car (owner only)                |
| GET    | `/my-bookings`               | Get current user's bookings              |
| POST   | `/bookings`                 | Create a booking (uses `$inc` for count) |
| DELETE | `/bookings/:id`             | Cancel a booking                         |
| GET    | `/bookings/check/:carId`    | Check if user already booked this car    |

---

## 🎨 Design Highlights

### Cockpit Button System

Every primary CTA uses a custom "molded button" pattern with multiple layered effects:

- Outer chrome bezel with hard offset shadow
- Inner red gradient (red-400 → red-700) face
- Glossy top highlight strip
- Hover shine sweep that translates left-to-right
- Active press-down translation (2-3px down)
- Optional red glow shadow underneath

### Telemetry Readouts

Stats and data are displayed as if on a vehicle dashboard:

- Monospace fonts for numbers
- Uppercase tracked labels with `[0.3em]` letter-spacing
- Recessed cell appearance via inset shadows
- Color-coded status indicators (green LED for active, amber for caution, red for alert)
- RPM-style bar indicators

### Racing Stripe System

Thin red gradient stripes at the top of dark sections (navbar, footer) tie the brand visually. Split-pattern (red → black gap → red) creates the iconic dual-stripe muscle car aesthetic.

---

## 🔐 Authentication Flow

1. User signs up via email/password or Google OAuth (better-auth)
2. better-auth issues an HTTP-only session cookie
3. For API calls, client requests a JWT from `/api/auth/token`
4. JWT is sent as `Authorization: Bearer <token>` header
5. Express backend verifies JWT using better-auth's JWKS endpoint
6. Protected pages use Next.js 16's `proxy.js` to check session on the server before render

---

## 🚧 Roadmap

- [ ] 📅 Pickup & drop-off date selection in booking flow
- [ ] 💳 Stripe payment integration
- [ ] ⭐ Review & rating system for hosts and renters
- [ ] 💬 In-app messaging between hosts and renters
- [ ] 📍 Map view for car locations (Mapbox/Google Maps)
- [ ] 📸 Multi-image uploads per car listing
- [ ] 🌍 Multi-language support
- [ ] 📱 Mobile app (React Native)

---

## 🤝 Contributing

Contributions are welcome! If you'd like to contribute:

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

MIT License — see [LICENSE](./LICENSE) for details.

---

## 👤 Author

**Your Name**

- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your Name](https://linkedin.com/in/yourusername)
- Portfolio: [yoursite.com](https://yoursite.com)

---

## 🙏 Acknowledgments

- 🎨 Design inspiration from automotive instrument clusters & racing telemetry UIs
- 🚗 Car images from [Unsplash](https://unsplash.com/) and [PNGMart](https://www.pngmart.com/)
- 🔐 Authentication by [better-auth](https://www.better-auth.com/) — the next-gen auth library
- 🎯 Icons by [Lucide](https://lucide.dev/)

---

<div align="center">

**Built with ⚡ and ❤️ for drivers who demand more.**

[⬆ Back to top](#-carfleet--car-rental-platform)

</div>
