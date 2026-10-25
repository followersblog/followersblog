import Razorpay from 'razorpay';
import crypto from 'crypto';

export const getRazorpayInstance = () => {
  const key_id = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_live_Ts8dDt5Uk6gpHC';
  const key_secret = process.env.RAZORPAY_KEY_SECRET || 'fhZvPTLKlNBcS7hgQBSNizWB';

  return new Razorpay({
    key_id,
    key_secret,
  });
};

/**
 * Verifies Razorpay HMAC SHA256 Signature
 */
export const verifyRazorpaySignature = (
  orderId: string,
  paymentId: string,
  signature: string
): boolean => {
  const secret = process.env.RAZORPAY_KEY_SECRET || 'fhZvPTLKlNBcS7hgQBSNizWB';
  if (!secret) return false;

  const generatedSignature = crypto
    .createHmac('sha256', secret)
    .update(`${orderId}|${paymentId}`)
    .digest('hex');

  return generatedSignature === signature;
};
