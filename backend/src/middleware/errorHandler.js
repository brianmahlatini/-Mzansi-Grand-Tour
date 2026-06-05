// Purpose: Normalizes API errors so validation failures, missing records, and
// unexpected server issues return predictable JSON to the frontend.
import { ZodError } from "zod";

export function errorHandler(error, _req, res, _next) {
  if (error instanceof ZodError) {
    return res.status(400).json({
      message: "Validation failed",
      issues: error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message
      }))
    });
  }

  console.error(error);
  return res.status(500).json({
    message: "Something went wrong while preparing your South Africa journey."
  });
}
