import { Request, Response, NextFunction, RequestHandler } from 'express';
import { z, ZodError } from 'zod';
import { ValidationSchema } from '../schemas/validation.schema';

// Middleware to validate request data against a provided schema
export const validate =
  (schema: ValidationSchema): RequestHandler =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // Validate request body if defined in the schema
      if (schema.body) {
        await schema.body.parseAsync(req.body);
      }

      // Validate request parameters if defined in the schema
      if (schema.params) {
        await schema.params.parseAsync(req.params);
      }

      // Validate query parameters if defined in the schema
      if (schema.query) {
        await schema.query.parseAsync(req.query);
      }

      next(); // Proceed to the next middleware or route handler if validation passes
    } catch (error) {
      // Handle validation errors
      if (error instanceof z.ZodError) {
        res.status(400).json({
          errors: error.issues.map((issue) => ({
            field: issue.path.join('.'), // Format error path (e.g., body.title)
            message: issue.message, // Error message for the field
          })),
        });
      } else {
        res.status(400).json({ error: 'Validation failed' }); // General validation failure response
      }
    }
  };
