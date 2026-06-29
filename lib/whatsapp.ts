/**
 * Build a free WhatsApp "click to chat" deep link with a pre-filled message.
 * No WhatsApp Business API, no cost — opens the customer's WhatsApp with the
 * message ready to send. The number must be international, digits only.
 */
export function buildWhatsAppUrl(whatsappDigits: string, message: string): string {
  const digits = whatsappDigits.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export interface BookingMessageInput {
  shopName: string;
  dateLabel: string; // "5 Temmuz Cumartesi"
  timeLabel: string; // "14:00"
  serviceName?: string;
}

export function buildBookingMessage({
  shopName,
  dateLabel,
  timeLabel,
  serviceName,
}: BookingMessageInput): string {
  const service = serviceName ? ` ${serviceName} için` : "";
  return (
    `Merhaba ${shopName}! ${dateLabel} ${timeLabel}${service} randevu almak istiyorum. ` +
    `Müsait misiniz?`
  );
}
