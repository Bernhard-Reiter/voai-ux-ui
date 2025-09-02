export const flags = {
  newUploadFlow: process.env.VERCEL_ENV === "production" ? 0.1 : 1,
  stripeCheckout: 1
};
export const flagEnabled = (value: number) => Math.random() < value;