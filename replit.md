# Overview

LearnLink is an inclusive learning platform that connects students and mentors through accessible educational content and messaging capabilities. The platform emphasizes accessibility features like sign language support, captions, transcripts, and high contrast modes to ensure inclusive learning experiences for all users.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React with TypeScript and Vite for fast development and building
- **Routing**: Wouter for lightweight client-side routing
- **UI Framework**: Radix UI components with Tailwind CSS for styling and shadcn/ui design system
- **State Management**: TanStack Query for server state management and caching
- **Forms**: React Hook Form with Zod validation for type-safe form handling
- **Authentication**: Firebase Authentication with Google OAuth integration

## Backend Architecture
- **Server**: Express.js with TypeScript for the REST API
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Session Management**: Express sessions with PostgreSQL session store
- **File Storage**: Firebase Storage for content files and media

## Data Storage Solutions
- **Primary Database**: PostgreSQL hosted on Neon Database
- **Schema Management**: Drizzle Kit for migrations and schema changes
- **In-Memory Storage**: Fallback MemStorage implementation for development
- **File Storage**: Firebase Storage for user uploads, content files, and media assets

## Authentication and Authorization
- **Primary Auth**: Firebase Authentication with Google OAuth provider
- **Session Handling**: Server-side session management with PostgreSQL session store
- **User Roles**: Role-based system supporting "student" and "mentor" user types
- **Profile Management**: Separate user profiles and mentor profiles with specialized fields

## Core Data Models
- **Users**: Basic user information with roles, bio, skills, and accessibility preferences
- **Content**: Educational materials with accessibility features (captions, transcripts, sign language)
- **Mentor Profiles**: Extended profiles for mentors with expertise, ratings, and availability
- **Conversations**: Messaging system between students and mentors
- **Messages**: Individual messages within conversations with timestamps

## Accessibility Features
- **Content Accessibility**: Support for sign language videos, captions, transcripts, and high contrast modes
- **UI Accessibility**: Screen reader compatibility, keyboard navigation, and ARIA labels
- **Universal Design**: High contrast themes and customizable accessibility settings

# External Dependencies

## Authentication & Storage
- **Firebase**: Authentication, Firestore, and Storage services
- **Google OAuth**: Primary authentication provider through Firebase

## Database & ORM
- **Neon Database**: Serverless PostgreSQL hosting
- **Drizzle ORM**: Type-safe database operations and migrations
- **connect-pg-simple**: PostgreSQL session store for Express

## UI & Styling
- **Radix UI**: Accessible component primitives
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: Pre-built component library
- **Lucide Icons**: Icon library for UI elements

## Development & Build Tools
- **Vite**: Frontend build tool and development server
- **TypeScript**: Type safety across the entire stack
- **Replit**: Development environment with specialized plugins
- **ESBuild**: Backend bundling for production builds