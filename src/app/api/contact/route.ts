import { NextResponse } from 'next/server';

// Temporarily disabled email functionality for deployment
// import { Resend } from 'resend';
// const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    // Basic validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Temporarily disabled email sending
    console.log('Contact form submission:', { name, email, phone, subject, message });
    
    /* Uncomment this when email functionality is needed
    await resend.emails.send({
      from: 'Excimaa Contact <contact@excimaa.com>',
      to: 'info@excimaa.com',
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-line; background: #f5f5f5; padding: 15px; border-radius: 5px;">${message}</p>
        </div>
      `,
    });

    // Confirmation email to the user
    await resend.emails.send({
      from: 'Excimaa <no-reply@excimaa.com>',
      to: email,
      subject: 'Thank you for contacting EXCIMAA',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Thank you for contacting EXCIMAA!</h2>
          <p>We've received your message and our team will get back to you within 1-2 business days.</p>
          
          <h3 style="margin-top: 30px;">Your Message:</h3>
          <p style="white-space: pre-line; background: #f5f5f5; padding: 15px; border-radius: 5px;">${message}</p>
          
          <p style="margin-top: 30px;">
            <strong>Best regards,</strong><br>
            The EXCIMAA Team
          </p>
          
          <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #666;">
            <p>This is an automated message. Please do not reply to this email.</p>
            <p>© ${new Date().getFullYear()} EXCIMAA. All rights reserved.</p>
          </div>
        </div>
      `,
    });
    */

    return NextResponse.json({ 
      success: true,
      message: 'Contact form submission received. Email functionality is temporarily disabled.'
    });
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { error: 'Error processing your request. Please try again later.' },
      { status: 500 }
    );
  }
}
