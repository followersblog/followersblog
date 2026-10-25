import Razorpay from 'razorpay';
import crypto from 'crypto';

export const getRazorpayInstance = () => {
  const key_id = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_Ts840pCB0WvHBf';
  const key_secret = process.env.RAZORPAY_KEY_SECRET || 'AsMpIkXR0BqR4tTmu2Eypsg7';

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
  const secret = process.env.RAZORPAY_KEY_SECRET || 'AsMpIkXR0BqR4tTmu2Eypsg7';
  if (!secret) return false;

  const generatedSignature = crypto
    .createHmac('sha256', secret)
    .update(`${orderId}|${paymentId}`)
    .digest('hex');

  return generatedSignature === signature;
};
