# EmailJS Setup Guide

This guide will help you configure EmailJS to receive booking emails from your website.

## Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

## Step 2: Add Email Service

1. In the EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail recommended)
4. Follow the prompts to connect your email account
5. **Copy the Service ID** (e.g., `service_abc123`)

## Step 3: Create Email Template

1. Go to **Email Templates** in the dashboard
2. Click **Create New Template**
3. Set the template name (e.g., "Transfer Booking")
4. Configure the template:

### Email Settings:
- **To Email**: `gingi2603@gmail.com`
- **From Name**: `{{from_name}}`
- **From Email**: `{{from_email}}`
- **Subject**: `New Transfer Booking Request from {{from_name}}`

### Template Content:
```html
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #22c55e; color: white; padding: 20px; border-radius: 8px; }
        .section { margin: 20px 0; padding: 15px; background: #f9f9f9; border-radius: 8px; }
        .label { font-weight: bold; color: #555; }
        .value { margin-bottom: 10px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>🚗 New Transfer Booking Request</h2>
        </div>

        <div class="section">
            <h3>👤 Personal Details</h3>
            <div class="value"><span class="label">Name:</span> {{from_name}}</div>
            <div class="value"><span class="label">Email:</span> {{from_email}}</div>
            <div class="value"><span class="label">Phone:</span> {{from_phone}}</div>
        </div>

        <div class="section">
            <h3>📍 Transfer Details</h3>
            <div class="value"><span class="label">From:</span> {{pickup_location}}</div>
            <div class="value"><span class="label">To:</span> {{dropoff_location}}</div>
            <div class="value"><span class="label">Date:</span> {{pickup_date}}</div>
            <div class="value"><span class="label">Time:</span> {{pickup_time}}</div>
        </div>

        <div class="section">
            <h3>🚐 Vehicle & Passengers</h3>
            <div class="value"><span class="label">Passengers:</span> {{num_passengers}}</div>
            <div class="value"><span class="label">Vehicle:</span> {{vehicle_type}}</div>
            <div class="value"><span class="label">Estimated Price:</span> {{estimated_price}}</div>
        </div>

        <div class="section">
            <h3>✈️ Additional Information</h3>
            <div class="value"><span class="label">Flight Number:</span> {{flight_number}}</div>
            <div class="value"><span class="label">Special Requests:</span> {{special_requests}}</div>
        </div>

        <div style="margin-top: 30px; padding: 15px; background: #e0f2fe; border-radius: 8px;">
            <p><strong>⚡ Action Required:</strong> Please respond to this booking request as soon as possible.</p>
        </div>
    </div>
</body>
</html>
```

4. Click **Save** and **copy the Template ID** (e.g., `template_xyz789`)

## Step 4: Get Public Key

1. Go to **Account** > **General** (or **API Keys**)
2. Find your **Public Key** (e.g., `user_abc123xyz789`)
3. Copy this key

## Step 5: Update Your Code

Open `/lib/emailjs.ts` and replace the placeholder values:

```typescript
export const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_abc123',      // Replace with your Service ID
  TEMPLATE_ID: 'template_xyz789',    // Replace with your Template ID
  PUBLIC_KEY: 'user_abc123xyz789',   // Replace with your Public Key
}
```

## Step 6: Test the Integration

1. Go to your website's transfer booking page
2. Fill out the booking form
3. Click "Send via Email" button
4. Check `gingi2603@gmail.com` for the booking email
5. Test all three buttons:
   - Send via WhatsApp
   - Send via Email
   - Send Both (WhatsApp + Email)

## Troubleshooting

### Email not sending?
- Check browser console for errors
- Verify all EmailJS credentials are correct
- Make sure you've verified your email service in EmailJS
- Check EmailJS dashboard for failed requests

### Rate Limits
- Free plan: 200 emails/month
- If you need more, upgrade to a paid plan

### CORS Issues
- EmailJS handles CORS automatically
- No additional configuration needed

## Template Variables Reference

The following variables are available in your email template:

| Variable | Description | Example |
|----------|-------------|---------|
| `{{from_name}}` | Customer's full name | John Smith |
| `{{from_email}}` | Customer's email | john@example.com |
| `{{from_phone}}` | Customer's phone number | +995 555 123 456 |
| `{{pickup_location}}` | Pickup location name | Tbilisi Airport |
| `{{dropoff_location}}` | Destination location name | Gudauri |
| `{{pickup_date}}` | Date of pickup | 2024-03-15 |
| `{{pickup_time}}` | Time of pickup | 14:30 |
| `{{num_passengers}}` | Number of passengers | 4 |
| `{{vehicle_type}}` | Selected vehicle type | Minivan (4-6 passengers) |
| `{{estimated_price}}` | Calculated price with currency | €85 |
| `{{flight_number}}` | Flight number (if provided) | TK 123 |
| `{{special_requests}}` | Special requests text | 2 child seats needed |

## Security Notes

- The Public Key is safe to expose in client-side code
- Never share your Private Key
- EmailJS automatically prevents email injection attacks
- Rate limiting is enforced by EmailJS

## Support

For EmailJS support, visit:
- Documentation: [https://www.emailjs.com/docs/](https://www.emailjs.com/docs/)
- FAQ: [https://www.emailjs.com/faq/](https://www.emailjs.com/faq/)
- Support: [https://www.emailjs.com/support/](https://www.emailjs.com/support/)
