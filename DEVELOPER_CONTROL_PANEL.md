# Developer Control Panel Documentation

## Overview

The Developer Control Panel provides full administrative access to all system components for developers with the 'developer' role. It includes comprehensive tools for managing templates, users, API keys, database, system settings, and monitoring activity logs.

## Access

The Developer Control Panel is accessible at `/developer` and requires authentication with a developer account. The feature is only enabled when the `VITE_ENABLE_DEVELOPER_MODE` environment variable is set to `true`.

## Features

### 1. Template Management
- Create, edit, and delete analysis templates
- Manage template fields with the FieldBuilder component
- Drag and drop to reorder fields between stages
- Full CRUD permissions on all templates

### 2. User Management
- View all users in the system
- Manage user roles (admin, developer, user)
- Search and filter users
- Full control over user accounts

### 3. API Key Management
- View, create, and delete API keys
- Toggle API key status (active/disabled)
- Copy API keys to clipboard
- Manage all service integrations

### 4. Database Management
- Monitor database statistics
- View table information
- Create and restore database backups
- Run database optimization and maintenance tasks

### 5. System Settings
- Configure application settings
- Manage environment variables
- Run system health checks
- Configure security settings

### 6. Developer Tools
- Interactive developer console
- API testing interface
- Data import/export functionality
- Debugging tools

### 7. Activity Logs
- View detailed system activity logs
- Filter logs by level, source, and user
- Export logs for analysis
- Monitor system performance and issues

## Security

The Developer Control Panel implements role-based access control to ensure only authorized developers can access these administrative features. All actions are logged for audit purposes.

## Environment Configuration

To enable the Developer Control Panel, ensure the following environment variable is set in your `.env` file:

```
VITE_ENABLE_DEVELOPER_MODE=true
```

## Navigation

The Developer Control Panel features a tab-based navigation system for easy access to all administrative functions:

- **Dashboard**: Overview of system status and quick access to all tools
- **Templates**: Template management interface
- **Users**: User management system
- **API Keys**: API key management
- **Database**: Database monitoring and maintenance
- **System**: System configuration and settings
- **Tools**: Developer tools and utilities
- **Logs**: Activity log monitoring

## Template Builder

The Template Builder allows developers to create and edit analysis templates with the following features:

1. **Template Metadata**: Define template name, description, category, and duration
2. **Field Management**: Add, edit, and delete input fields with the FieldBuilder
3. **Stage Organization**: Organize fields into logical stages
4. **Drag and Drop**: Reorder fields within and between stages
5. **Validation Rules**: Configure validation for each field type

## Field Builder

The Field Builder provides a comprehensive interface for creating and editing template fields:

- Multiple input types (text, textarea, number, dropdown, multiselect, slider, URL)
- Custom field options for dropdown and multiselect fields
- Detailed rationale field for AI prompt engineering
- Validation rules specific to field types
- Required field toggle

## API Integration

All Developer Control Panel features integrate with the backend API services:

- Template Service: `/api/templates`
- User Service: `/api/users`
- Authentication Service: `/api/auth`
- Developer Service: `/api/developer`

## Best Practices

1. **Regular Backups**: Use the database backup feature regularly
2. **Log Monitoring**: Monitor activity logs for unusual activity
3. **API Key Rotation**: Regularly rotate API keys for security
4. **System Health Checks**: Run health checks to ensure optimal performance
5. **Access Control**: Only grant developer access to trusted team members

## Troubleshooting

If you encounter issues with the Developer Control Panel:

1. Verify the `VITE_ENABLE_DEVELOPER_MODE` environment variable is set to `true`
2. Check that you're logged in with a developer account
3. Ensure the backend API services are running
4. Review activity logs for error messages
5. Clear browser cache and refresh the page

## Support

For issues with the Developer Control Panel, contact the development team or review the system documentation.