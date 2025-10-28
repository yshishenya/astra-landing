import { Resend } from 'resend';

/**
 * Timeout error for email operations
 */
export class EmailTimeoutError extends Error {
  constructor(message: string = 'Email operation timed out') {
    super(message);
    this.name = 'EmailTimeoutError';
  }
}

/**
 * Send email with timeout protection
 * @param resend - Resend client instance
 * @param params - Email parameters
 * @param timeoutMs - Timeout in milliseconds (default: 10000ms = 10s)
 */
export async function sendEmailWithTimeout(
  resend: Resend,
  params: Parameters<typeof resend.emails.send>[0],
  timeoutMs: number = 10000
): Promise<Awaited<ReturnType<typeof resend.emails.send>>> {
  // Create timeout promise
  const timeoutPromise = new Promise<never>((_, reject) => {
    setTimeout(() => {
      reject(new EmailTimeoutError(`Email send operation timed out after ${timeoutMs}ms`));
    }, timeoutMs);
  });

  // Race between email send and timeout
  try {
    const result = await Promise.race([resend.emails.send(params), timeoutPromise]);
    return result;
  } catch (error) {
    // Re-throw with additional context
    if (error instanceof EmailTimeoutError) {
      throw error;
    }
    throw new Error(`Email send failed: ${error instanceof Error ? error.message : String(error)}`);
  }
}

/**
 * Send multiple emails with timeout protection
 * Fails gracefully - if one email fails, others still attempt to send
 */
export async function sendEmailsWithTimeout(
  resend: Resend,
  emails: Array<Parameters<typeof resend.emails.send>[0]>,
  timeoutMs: number = 10000
): Promise<{
  success: number;
  failed: number;
  results: Array<{ success: boolean; error?: string }>;
}> {
  const results = await Promise.allSettled(
    emails.map((params) => sendEmailWithTimeout(resend, params, timeoutMs))
  );

  let success = 0;
  let failed = 0;

  const mappedResults = results.map((result) => {
    if (result.status === 'fulfilled') {
      success++;
      return { success: true };
    } else {
      failed++;
      return {
        success: false,
        error: result.reason instanceof Error ? result.reason.message : String(result.reason),
      };
    }
  });

  return {
    success,
    failed,
    results: mappedResults,
  };
}
