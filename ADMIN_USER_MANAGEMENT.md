# Admin User Management Features

This document describes the Admin User Management functionality implemented in the Masroo3k application.

## Features Overview

### 1. **Add User**
Admins can create new user accounts with the following details:
- **Full Name** (required)
- **Email Address** (required, must be unique)
- **Password** (required, minimum 6 characters)
- **Role** (Admin or User)

**How to use:**
1. Navigate to Admin → Users
2. Click the "Add User" button
3. Fill in the form
4. Click "Create User"
5. Success notification will appear

### 2. **Edit User**
Admins can modify existing user accounts:
- Update name, email, and role
- Optionally change password (leave blank to keep current)
- Email uniqueness is validated

**How to use:**
1. Navigate to Admin → Users
2. Click the Edit (pencil) icon next to a user
3. Modify the desired fields
4. Click "Update User"
5. Success notification will appear

### 3. **Delete User**
Admins can remove user accounts:
- Confirmation dialog prevents accidental deletions
- All user's analyses will be deleted (cascade delete)

**How to use:**
1. Navigate to Admin → Users
2. Click the Delete (trash) icon next to a user
3. Confirm the deletion in the dialog
4. Success notification will appear

### 4. **Search & Filter**
Easily find users with:
- **Search** - by name or email
- **Role Filter** - All Roles, Admin, User
- **Status Filter** - All Status, Active, Inactive
- **Result Counter** - Shows filtered count vs total

## Security Features

### Password Hashing
- All passwords are hashed using **BCrypt** before storage
- Passwords are never stored in plain text
- Password strength: minimum 6 characters

### Email Validation
- Duplicate emails are prevented
- Email format is validated
- Unique constraint at database level

### Admin-Only Access
- Only users with "admin" role can access user management
- Routes are protected by authentication

## API Endpoints

### GET /api/users
**Description:** List all users  
**Authorization:** Required  
**Response:** Array of user objects with statistics

### POST /api/users
**Description:** Create a new user  
**Authorization:** Required  
**Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "role": "user"
}
```

### PUT /api/users/{id}
**Description:** Update an existing user  
**Authorization:** Required  
**Body:**
```json
{
  "name": "John Doe Updated",
  "email": "john.updated@example.com",
  "role": "admin",
  "password": "newPassword123"  // Optional
}
```

### DELETE /api/users/{id}
**Description:** Delete a user  
**Authorization:** Required  
**Response:** 204 No Content on success

## User Interface

### Notifications
- **Success** - Green notification with checkmark icon
- **Error** - Red notification with X icon
- Auto-dismisses after 5 seconds
- Positioned at top-right corner

### Modal Form
- Clean, responsive design
- Real-time validation
- Password visibility toggle
- Loading states during submission

### User Table
- Sortable columns
- Color-coded role badges (Indigo for Admin, Gray for User)
- Color-coded status badges (Green for Active, Red for Inactive)
- Hover effects on action buttons
- Empty state when no results

## Database Schema

### Users Table
```sql
CREATE TABLE Users (
    Id INT PRIMARY KEY IDENTITY,
    Name NVARCHAR(MAX) NOT NULL,
    Email NVARCHAR(450) NOT NULL UNIQUE,
    PasswordHash NVARCHAR(MAX) NOT NULL,
    Role NVARCHAR(MAX) NOT NULL DEFAULT 'user',
    CreatedAt DATETIME2 NOT NULL DEFAULT GETUTCDATE()
);
```

### Relationships
- One user can have many analyses (One-to-Many)
- Cascade delete: Deleting a user deletes their analyses

## Technical Implementation

### Frontend Components
- **UserFormModal.tsx** - Reusable modal for Add/Edit operations
- **AdminUsers.tsx** - Main user management page

### Backend Controllers
- **UsersController.cs** - CRUD operations for users
- **AuthController.cs** - User authentication

### Services
- **userService.ts** - API client for user operations
- **authService.ts** - Authentication service

### DTOs
- **CreateUserRequest** - For creating new users
- **UpdateUserRequest** - For updating existing users
- **UserResponse** - For API responses

## Error Handling

### Frontend
- Form validation before submission
- API error messages displayed in notifications
- Network error handling

### Backend
- Email uniqueness validation
- Password hashing errors
- Database constraint violations
- User not found errors (404)

## Best Practices

1. **Always use BCrypt** for password hashing
2. **Validate email uniqueness** before creating/updating
3. **Confirm deletions** to prevent accidents
4. **Show clear feedback** with notifications
5. **Handle errors gracefully** with user-friendly messages
6. **Keep passwords secure** - never log or display them

## Future Enhancements

Potential improvements for future versions:
- Bulk user operations (import/export)
- User roles and permissions system
- Email notifications for account changes
- Password reset functionality
- User activity logs
- Advanced filtering and sorting
- Pagination for large user lists
- User profile pictures/avatars
- Account suspension (soft delete)
- Two-factor authentication

## Testing the Features

### Test Credentials
**Admin Account:**
- Email: admin@mashroo3k.com
- Password: admin123

**Regular User:**
- Email: john@example.com
- Password: user123

### Test Scenarios

1. **Create New User**
   - Try creating with existing email (should fail)
   - Try short password (should fail)
   - Create valid user (should succeed)

2. **Edit User**
   - Change role from user to admin
   - Update email to existing email (should fail)
   - Leave password blank (should keep current)
   - Set new password (should update)

3. **Delete User**
   - Cancel deletion (should not delete)
   - Confirm deletion (should delete and show success)

4. **Search & Filter**
   - Search by name
   - Search by email
   - Filter by role
   - Combine search and filters

## Troubleshooting

### Common Issues

**"Failed to fetch"**
- Check if backend API is running
- Verify CORS settings allow frontend port
- Check network tab for detailed error

**"Email already exists"**
- Try a different email address
- Check existing users in the database

**Changes not saving**
- Check browser console for errors
- Verify form validation passes
- Ensure all required fields are filled

**Notifications not showing**
- Check CSS file is loaded
- Verify animation keyframes are defined
- Check browser console for errors

## Support

For issues or questions about user management features:
1. Check the browser console for errors
2. Verify API is running on https://localhost:7140
3. Check database connectivity
4. Review server logs for backend errors
