import { PostgrestError } from '@supabase/supabase-js';
import * as z from 'zod';
import { FormDataValidationError } from './form-data-validation-error';

type ParsedErrorDetails =
  | {
      hasFields: true;
      fields: Record<string, string[]>;
    }
  | {
      hasFields: false;
      fields: null;
    };

export interface ParsedError {
  name: string;
  message: string;
  details: ParsedErrorDetails;
}

export class ErrorParser {
  error: Error;

  constructor(error: Error) {
    this.error = error;
  }

  static fromError(error: Error) {
    return new ErrorParser(error);
  }

  parse(): ParsedError {
    if (this.error instanceof PostgrestError) {
      return this.parsePostgresError(this.error);
    } else if (this.error instanceof z.ZodError) {
      return this.parseZodError(this.error);
    } else if (this.error instanceof FormDataValidationError) {
      return this.parseFormDataValidationError(this.error);
    } else {
      return {
        name: this.error.name,
        message: this.error.message,
        details: {
          hasFields: false,
          fields: null,
        },
      };
    }
  }

  private parsePostgresError(error: PostgrestError): ParsedError {
    return {
      name: error.name,
      message: error.message,
      details: {
        hasFields: false,
        fields: null,
      },
    };
  }

  private parseZodError(error: z.ZodError): ParsedError {
    const flattenError = z.flattenError(error);
    const fieldErrors = flattenError.fieldErrors;
    const keys = Object.keys(fieldErrors);
    const firstKey = keys.length > 0 ? keys[0] : null;
    const message = firstKey
      ? `[${firstKey}] ${fieldErrors[firstKey as keyof typeof fieldErrors][0]}`
      : 'Unknown validation error';

    return {
      name: error.name,
      message,
      details: {
        hasFields: true,
        fields: flattenError.fieldErrors,
      },
    };
  }

  private parseFormDataValidationError(
    error: FormDataValidationError,
  ): ParsedError {
    return {
      name: error.name,
      message: error.message,
      details: {
        hasFields: true,
        fields: error.fields,
      },
    };
  }
}
