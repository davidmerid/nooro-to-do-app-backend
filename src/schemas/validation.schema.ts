import { z } from 'zod';

// Defines a schema for validation, where body, params, and query are optional Zod schemas
export type ValidationSchema = {
  body?: z.ZodType<any, any, any>; // Schema to validate the request body (optional)
  params?: z.ZodType<any, any, any>; // Schema to validate the request parameters (optional)
  query?: z.ZodType<any, any, any>; // Schema to validate the query parameters (optional)
};
