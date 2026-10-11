import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const payload = await request.text();
    // Stripe webhook endpoint handler placeholder
    return NextResponse.json({ received: true });
  } catch (err: any) {
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 }
    );
  }
}
