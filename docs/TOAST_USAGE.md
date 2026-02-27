# Toast Notification System

The platform uses `react-hot-toast` for displaying toast notifications globally across all pages.

## Usage

Import the toast utilities in any component:

```typescript
import { showSuccess, showError, showInfo, showWarning, showLoading, showPromise } from '@/lib/utils/toast';
```

## Available Functions

### 1. Success Toast
```typescript
showSuccess('Operation completed successfully!');
showSuccess('Data saved!', 5000); // Custom duration in ms
```

### 2. Error Toast
```typescript
showError('Something went wrong!');
showError('Failed to save data', 6000);
```

### 3. Info Toast
```typescript
showInfo('This is an informational message');
showInfo('New feature available!', 4000);
```

### 4. Warning Toast
```typescript
showWarning('Please review your changes');
showWarning('Action cannot be undone', 5000);
```

### 5. Loading Toast
```typescript
const toastId = showLoading('Saving data...');
// Later dismiss it
dismissToast(toastId);
```

### 6. Promise Toast (for async operations)
```typescript
const saveData = async () => {
  // Your async operation
  return await api.save(data);
};

showPromise(saveData(), {
  loading: 'Saving...',
  success: 'Saved successfully!',
  error: 'Failed to save',
});
```

### 7. Custom Toast with Action Button
```typescript
showCustom('File uploaded successfully', {
  label: 'View',
  onClick: () => {
    router.push('/files');
  }
});
```

### 8. Dismiss Toasts
```typescript
// Dismiss specific toast
dismissToast(toastId);

// Dismiss all toasts
dismissAllToasts();
```

## Examples

### Form Submission
```typescript
const handleSubmit = async () => {
  if (!formData.name) {
    showError('Name is required');
    return;
  }

  const promise = api.submitForm(formData);
  
  showPromise(promise, {
    loading: 'Submitting form...',
    success: 'Form submitted successfully!',
    error: 'Failed to submit form',
  });
};
```

### File Upload
```typescript
const handleUpload = async (file: File) => {
  const toastId = showLoading('Uploading file...');
  
  try {
    await uploadFile(file);
    dismissToast(toastId);
    showSuccess('File uploaded successfully!');
  } catch (error) {
    dismissToast(toastId);
    showError('Failed to upload file');
  }
};
```

### Delete Confirmation
```typescript
const handleDelete = () => {
  showCustom('Are you sure you want to delete this item?', {
    label: 'Delete',
    onClick: async () => {
      await deleteItem(id);
      showSuccess('Item deleted');
    }
  });
};
```

## Styling

Toasts are automatically styled with:
- Soft shadows
- Rounded corners (12px)
- Color-coded backgrounds
- Smooth animations
- Positioned at top-right by default

## Configuration

Toast configuration is in `src/lib/providers/ToastProvider.tsx`:
- Position: `top-right`
- Default duration: 4 seconds
- Success: 3 seconds
- Error: 5 seconds
- Custom styling per toast type

## Best Practices

1. **Use appropriate toast types**
   - Success: For completed actions
   - Error: For failures
   - Info: For general information
   - Warning: For cautionary messages

2. **Keep messages concise**
   - Short, clear messages
   - Avoid technical jargon
   - Use action-oriented language

3. **Don't overuse toasts**
   - Only for important feedback
   - Avoid for every minor action
   - Consider inline validation for forms

4. **Use promise toasts for async operations**
   - Better UX with loading states
   - Automatic success/error handling
   - Cleaner code

## Migration from alert()

Replace all `alert()` calls with appropriate toast functions:

```typescript
// Before
alert('Success!');
alert('Error occurred');

// After
showSuccess('Success!');
showError('Error occurred');
```

## Global Access

The toast system is available globally through the `ToastProvider` in the root layout, so you can use it in any component without additional setup.
