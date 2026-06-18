# Authentication Setup

## Date

Current Development Phase

## Goal

Implement secure authentication system for:

* Admin
* Agent
* User

## Features

* Login
* Logout
* Password Hashing
* Session Management
* Role Based Access
* Protected Routes
* Admin Created Agent Accounts
* Agent Active / Inactive Status

## Status

✅ Packages Installed

✅ Auth Configuration

✅ Login Page

✅ Protected Routes

✅ Role Based Access

✅ Password Hashing

✅ Session Management

✅ Admin Login

✅ Agent Account Creation

✅ Agent Password Hashing

✅ Agent Profile Fields

✅ Agent Active / Inactive Field

⬜ Public Register Page

⬜ User Registration

⬜ User Dashboard

## Current Implementation

Authentication is implemented using credentials based login.

Passwords are hashed using bcrypt before saving into the database.

User roles are managed through:

```prisma
enum UserRole {
  ADMIN
  AGENT
  USER
}