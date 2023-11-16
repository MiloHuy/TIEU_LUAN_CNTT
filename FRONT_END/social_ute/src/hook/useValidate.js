export class ErrorBag {
  errors = {};

  constructor(validationErrors) {
    if (!validationErrors) return;

    for (const error of validationErrors.inner) {
      const path = error.path;
      if (!path) {
        continue;
      }

      this.errors[path] = error.message;
    }
  }

  hasError(field) {
    if (field) {
      return !!this.errors[field];
    }
    return !!Object.keys(this.errors).length;
  }

  getError(field) {
    if (field) {
      return this.errors[field];
    }
    return Object.values(this.errors)[0];
  }

  clearError(field) {
    if (field) {
      delete this.errors[field];
    } else {
      this.errors = {};
    }
    return this;
  }
}
