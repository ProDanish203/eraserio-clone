# Eraser.io Clone

A full-stack collaborative whiteboard application built with Next.js, inspired by Eraser.io. This project aims to recreate the core functionalities of Eraser.io, providing a seamless collaborative diagramming and whiteboarding experience.

## Features

### Current Features
- **Authentication System**: User registration and login functionality
- **Dashboard Layout**: Modern interface with sidebar navigation and header
- **Responsive Design**: Works across devices of different screen sizes

### Planned Features
- **Interactive Whiteboard**: Create and edit diagrams in real-time
- **Collaboration**: Multi-user editing capabilities
- **Rich Drawing Tools**: Shapes, text, connectors, and freehand drawing
- **Export Options**: Export diagrams as images or PDFs
- **Sharing Functionality**: Share boards with specific users or via public links
- **Templates**: Pre-defined templates for common diagram types
- **Cloud Storage**: Automatic saving of boards to the cloud

## Technology Stack

### Frontend
- **Next.js**: React framework for server-rendered applications
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Shadcn UI**: Component library for creating a beautiful UI
- **Next Auth**: Authentication solution for Next.js applications

### Backend
- **Next.js API Routes**: Server-side functionality
- **Prisma**: Modern database ORM
- **PostgreSQL**: Relational database for data storage
- **Vercel**: Deployment platform

## Getting Started

### Prerequisites
- Node.js (v18 or newer)
- npm or yarn
- PostgreSQL database

### Installation

1. Clone the repository:
```bash
git clone https://github.com/prodanish203/eraserio-clone.git
cd eraserio-clone
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
Create a `.env` file in the root directory and add the following:
```
DATABASE_URL="postgresql://username:password@localhost:5432/eraserio"
NEXTAUTH_SECRET="your-nextauth-secret"
NEXTAUTH_URL="http://localhost:3000"
```

4. Run database migrations:
```bash
npx prisma migrate dev
```

5. Start the development server:
```bash
npm run dev
# or
yarn dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
eraserio-clone/
├── app/                    # Next.js app directory
│   ├── (auth)/             # Authentication routes
│   ├── (dashboard)/        # Dashboard and whiteboard routes
│   ├── api/                # API routes
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
├── components/             # React components
│   ├── auth/               # Authentication components
│   ├── shared/             # Shared UI components (Header, Sidebar)
│   └── ui/                 # UI components from shadcn
├── lib/                    # Utility functions and constants
├── prisma/                 # Prisma schema and migrations
├── public/                 # Static assets
└── styles/                 # Global styles
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Inspired by [Eraser.io](https://eraser.io)
- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
