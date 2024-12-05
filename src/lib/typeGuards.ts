interface ValidationError extends Error {
  name: 'ValidationError';
  errors: Record<string, {
    message: string;
    name: string;
    kind: string;
    path: string;
    value: unknown;
  }>;
}

export function isValidationError(error: unknown): error is ValidationError {
  return (
    error instanceof Error &&
    error.name === 'ValidationError' &&
    'errors' in error &&
    error.errors !== null &&
    typeof error.errors === 'object'
  );
}
