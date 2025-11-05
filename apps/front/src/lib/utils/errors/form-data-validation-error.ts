export class FormDataValidationError extends Error {
  fields: Record<string, string[]>;

  constructor(fields: Record<string, string[]>) {
    super(fields[Object.keys(fields)[0] as keyof typeof fields].toString());
    this.name = 'FormDataValidationError';
    this.fields = fields;
  }
}
