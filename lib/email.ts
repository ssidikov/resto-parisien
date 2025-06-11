import nodemailer from 'nodemailer';

// Интерфейс для данных резервации
interface ReservationData {
  id?: number;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  special_requests?: string;
  status?: string;
}

// Создание транспорта для отправки email
const createTransporter = () => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn('⚠️ Email credentials not configured. Email notifications disabled.');
    return null;
  }

  return nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

// Генерация HTML шаблона для уведомления администратора
const generateAdminNotificationHTML = (reservation: ReservationData) => {
  return `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nouvelle Réservation - Le Moderne</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f9f9f9;
        }
        .header {
            background: linear-gradient(135deg, #f59e0b, #ea580c);
            color: white;
            padding: 30px;
            text-align: center;
            border-radius: 12px 12px 0 0;
        }
        .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: bold;
        }
        .header p {
            margin: 5px 0 0 0;
            opacity: 0.9;
        }
        .content {
            background: white;
            padding: 30px;
            border-radius: 0 0 12px 12px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .alert {
            background-color: #fef3c7;
            border-left: 4px solid #f59e0b;
            padding: 15px;
            margin-bottom: 20px;
            border-radius: 6px;
        }
        .reservation-details {
            background-color: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
        }
        .detail-row {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
            border-bottom: 1px solid #e2e8f0;
        }
        .detail-row:last-child {
            border-bottom: none;
        }
        .label {
            font-weight: 600;
            color: #4a5568;
            min-width: 120px;
        }
        .value {
            color: #2d3748;
            font-weight: 500;
        }
        .special-requests {
            background-color: #fff7ed;
            border: 1px solid #fed7aa;
            border-radius: 6px;
            padding: 15px;
            margin: 15px 0;
        }
        .actions {
            text-align: center;
            margin: 30px 0;
        }
        .btn {
            display: inline-block;
            padding: 12px 24px;
            margin: 0 10px;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 600;
            text-align: center;
            transition: all 0.2s;
        }
        .btn-primary {
            background-color: #10b981;
            color: white;
        }
        .btn-secondary {
            background-color: #6b7280;
            color: white;
        }
        .footer {
            text-align: center;
            margin-top: 30px;
            padding: 20px;
            background-color: #f3f4f6;
            border-radius: 8px;
            font-size: 14px;
            color: #6b7280;
        }
        @media (max-width: 600px) {
            body { padding: 10px; }
            .header, .content { padding: 20px; }
            .detail-row { flex-direction: column; }
            .label { margin-bottom: 5px; }
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>🍽️ Le Moderne</h1>
        <p>Nouvelle réservation reçue</p>
    </div>
    
    <div class="content">
        <div class="alert">
            <strong>🔔 Nouvelle réservation!</strong><br>
            Une nouvelle demande de réservation vient d'être soumise et nécessite votre attention.
        </div>
        
        <div class="reservation-details">
            <h3 style="margin-top: 0; color: #1f2937;">📋 Détails de la réservation</h3>
            
            <div class="detail-row">
                <span class="label">👤 Client:</span>
                <span class="value">${reservation.name}</span>
            </div>
            
            <div class="detail-row">
                <span class="label">📧 Email:</span>
                <span class="value">${reservation.email}</span>
            </div>
            
            <div class="detail-row">
                <span class="label">📞 Téléphone:</span>
                <span class="value">${reservation.phone}</span>
            </div>
            
            <div class="detail-row">
                <span class="label">📅 Date:</span>
                <span class="value">${new Date(reservation.date).toLocaleDateString('fr-FR', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
            </div>
            
            <div class="detail-row">
                <span class="label">🕐 Heure:</span>
                <span class="value">${reservation.time}</span>
            </div>
            
            <div class="detail-row">
                <span class="label">👥 Convives:</span>
                <span class="value">${reservation.guests} personne${reservation.guests > 1 ? 's' : ''}</span>
            </div>
            
            <div class="detail-row">
                <span class="label">📊 Statut:</span>
                <span class="value" style="color: #f59e0b; font-weight: bold;">⏳ En attente</span>
            </div>
        </div>
        
        ${reservation.special_requests ? `
        <div class="special-requests">
            <h4 style="margin-top: 0; color: #92400e;">🗒️ Demandes particulières:</h4>
            <p style="margin-bottom: 0;">${reservation.special_requests}</p>
        </div>
        ` : ''}
        
        <div class="actions">
            <a href="${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/dashboard" class="btn btn-primary">
                ✅ Gérer les réservations
            </a>
        </div>
        
        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;">
        
        <div style="background-color: #fef3c7; padding: 15px; border-radius: 6px; border-left: 4px solid #f59e0b;">
            <strong>⚡ Action requise:</strong><br>
            Connectez-vous au tableau de bord pour confirmer ou annuler cette réservation.
        </div>
    </div>
    
    <div class="footer">
        <p><strong>Le Moderne Restaurant</strong></p>
        <p>45 Rue de Rivoli, 75001 Paris, France</p>
        <p>📞 +33 1 42 86 91 45 | 📧 contact@lemoderne.fr</p>
        <hr style="border: none; border-top: 1px solid #d1d5db; margin: 15px 0;">
        <p style="font-size: 12px;">
            Cet email a été envoyé automatiquement par le système de réservation.<br>
            Heure de réception: ${new Date().toLocaleString('fr-FR')}
        </p>
    </div>
</body>
</html>
  `;
};

// Генерация HTML шаблона для подтверждения клиенту
const generateCustomerConfirmationHTML = (reservation: ReservationData) => {
  return `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Confirmation de réservation - Le Moderne</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f9f9f9;
        }
        .header {
            background: linear-gradient(135deg, #f59e0b, #ea580c);
            color: white;
            padding: 30px;
            text-align: center;
            border-radius: 12px 12px 0 0;
        }
        .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: bold;
        }
        .content {
            background: white;
            padding: 30px;
            border-radius: 0 0 12px 12px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .success-message {
            background-color: #d1fae5;
            border-left: 4px solid #10b981;
            padding: 15px;
            margin-bottom: 20px;
            border-radius: 6px;
        }
        .reservation-summary {
            background-color: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
        }
        .detail-row {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
            border-bottom: 1px solid #e2e8f0;
        }
        .detail-row:last-child {
            border-bottom: none;
        }
        .label {
            font-weight: 600;
            color: #4a5568;
        }
        .value {
            color: #2d3748;
            font-weight: 500;
        }
        .info-box {
            background-color: #eff6ff;
            border: 1px solid #bfdbfe;
            border-radius: 6px;
            padding: 15px;
            margin: 20px 0;
        }
        .footer {
            text-align: center;
            margin-top: 30px;
            padding: 20px;
            background-color: #f3f4f6;
            border-radius: 8px;
            font-size: 14px;
            color: #6b7280;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>🍽️ Le Moderne</h1>
        <p>Merci pour votre réservation!</p>
    </div>
    
    <div class="content">
        <div class="success-message">
            <strong>✅ Demande reçue!</strong><br>
            Cher(e) ${reservation.name}, nous avons bien reçu votre demande de réservation.
        </div>
        
        <p>Nous vous remercions d'avoir choisi <strong>Le Moderne</strong> pour votre expérience culinaire. Voici un récapitulatif de votre demande:</p>
        
        <div class="reservation-summary">
            <h3 style="margin-top: 0; color: #1f2937;">📋 Récapitulatif de votre réservation</h3>
            
            <div class="detail-row">
                <span class="label">📅 Date:</span>
                <span class="value">${new Date(reservation.date).toLocaleDateString('fr-FR', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
            </div>
            
            <div class="detail-row">
                <span class="label">🕐 Heure:</span>
                <span class="value">${reservation.time}</span>
            </div>
            
            <div class="detail-row">
                <span class="label">👥 Nombre de convives:</span>
                <span class="value">${reservation.guests} personne${reservation.guests > 1 ? 's' : ''}</span>
            </div>
            
            <div class="detail-row">
                <span class="label">📞 Téléphone de contact:</span>
                <span class="value">${reservation.phone}</span>
            </div>
            
            ${reservation.special_requests ? `
            <div class="detail-row">
                <span class="label">🗒️ Demandes particulières:</span>
                <span class="value">${reservation.special_requests}</span>
            </div>
            ` : ''}
        </div>
        
        <div class="info-box">
            <h4 style="margin-top: 0; color: #1e40af;">ℹ️ Étapes suivantes</h4>
            <ul style="margin: 10px 0;">
                <li><strong>Confirmation:</strong> Notre équipe va examiner votre demande dans les plus brefs délais</li>
                <li><strong>Contact:</strong> Nous vous contacterons par téléphone pour confirmer votre réservation</li>
                <li><strong>Délai:</strong> Vous recevrez une réponse sous 24 heures maximum</li>
            </ul>
        </div>
        
        <div style="background-color: #fef3c7; padding: 15px; border-radius: 6px; border-left: 4px solid #f59e0b; margin: 20px 0;">
            <strong>📱 Besoin de modifier votre réservation?</strong><br>
            Contactez-nous directement au <strong>+33 1 42 86 91 45</strong> ou par email à <strong>reservation@lemoderne.fr</strong>
        </div>
    </div>
    
    <div class="footer">
        <p><strong>Le Moderne Restaurant</strong></p>
        <p>L'Excellence Culinaire Parisienne</p>
        <p>📍 45 Rue de Rivoli, 75001 Paris, France</p>
        <p>📞 +33 1 42 86 91 45 | 📧 contact@lemoderne.fr</p>
        <hr style="border: none; border-top: 1px solid #d1d5db; margin: 15px 0;">
        <p style="font-size: 12px;">
            Horaires: Mardi-Vendredi 12h-14h30 & 19h-22h30 | Samedi 19h-22h30<br>
            Nous nous réjouissons de vous accueillir bientôt!
        </p>
    </div>
</body>
</html>
  `;
};

// Отправка уведомления администратору
export const sendAdminNotification = async (reservation: ReservationData): Promise<boolean> => {
  const transporter = createTransporter();
  if (!transporter) {
    console.log('📧 Email transporter not configured, skipping admin notification');
    return false;
  }

  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: process.env.EMAIL_TO || 'galaxys7air@gmail.com',
      subject: `🔔 Nouvelle réservation - ${reservation.name} (${new Date(reservation.date).toLocaleDateString('fr-FR')})`,
      html: generateAdminNotificationHTML(reservation),
      text: `Nouvelle réservation reçue:
      
Client: ${reservation.name}
Email: ${reservation.email}
Téléphone: ${reservation.phone}
Date: ${new Date(reservation.date).toLocaleDateString('fr-FR')}
Heure: ${reservation.time}
Convives: ${reservation.guests}
${reservation.special_requests ? `Demandes particulières: ${reservation.special_requests}` : ''}

Connectez-vous au tableau de bord pour gérer cette réservation.`,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('✅ Admin notification sent successfully:', result.messageId);
    return true;
  } catch (error) {
    console.error('❌ Failed to send admin notification:', error);
    return false;
  }
};

// Отправка подтверждения клиенту
export const sendCustomerConfirmation = async (reservation: ReservationData): Promise<boolean> => {
  const transporter = createTransporter();
  if (!transporter) {
    console.log('📧 Email transporter not configured, skipping customer confirmation');
    return false;
  }

  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: reservation.email,
      subject: `✅ Confirmation de réservation - Le Moderne Restaurant`,
      html: generateCustomerConfirmationHTML(reservation),
      text: `Bonjour ${reservation.name},

Nous avons bien reçu votre demande de réservation pour Le Moderne Restaurant.

Détails de votre réservation:
- Date: ${new Date(reservation.date).toLocaleDateString('fr-FR')}
- Heure: ${reservation.time}
- Convives: ${reservation.guests} personne${reservation.guests > 1 ? 's' : ''}
${reservation.special_requests ? `- Demandes particulières: ${reservation.special_requests}` : ''}

Notre équipe va examiner votre demande et vous contacter sous 24h pour confirmer votre réservation.

Pour toute question: +33 1 42 86 91 45 ou reservation@lemoderne.fr

Merci de votre confiance,
L'équipe du Moderne Restaurant`,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('✅ Customer confirmation sent successfully:', result.messageId);
    return true;
  } catch (error) {
    console.error('❌ Failed to send customer confirmation:', error);
    return false;
  }
};

// Отправка уведомления при изменении статуса
export const sendStatusUpdateNotification = async (
  reservation: ReservationData,
  newStatus: string
): Promise<boolean> => {
  const transporter = createTransporter();
  if (!transporter) {
    console.log('📧 Email transporter not configured, skipping status update notification');
    return false;
  }

  const statusTexts = {
    confirmed: { text: 'confirmée', emoji: '✅', color: '#10b981' },
    cancelled: { text: 'annulée', emoji: '❌', color: '#ef4444' },
    pending: { text: 'en attente', emoji: '⏳', color: '#f59e0b' }
  };

  const status = statusTexts[newStatus as keyof typeof statusTexts] || statusTexts.pending;

  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: reservation.email,
      subject: `${status.emoji} Mise à jour de votre réservation - Le Moderne`,
      html: `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mise à jour de réservation - Le Moderne</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; }
        .header { background: linear-gradient(135deg, #f59e0b, #ea580c); color: white; padding: 30px; text-align: center; border-radius: 12px 12px 0 0; }
        .content { background: white; padding: 30px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }
        .status-update { background-color: ${newStatus === 'confirmed' ? '#d1fae5' : newStatus === 'cancelled' ? '#fee2e2' : '#fef3c7'}; border-left: 4px solid ${status.color}; padding: 15px; margin-bottom: 20px; border-radius: 6px; }
    </style>
</head>
<body>
    <div class="header">
        <h1>🍽️ Le Moderne</h1>
        <p>Mise à jour de votre réservation</p>
    </div>
    <div class="content">
        <div class="status-update">
            <strong>${status.emoji} Votre réservation a été ${status.text}!</strong><br>
            Bonjour ${reservation.name}, nous vous informons que votre réservation pour le ${new Date(reservation.date).toLocaleDateString('fr-FR')} à ${reservation.time} a été <strong>${status.text}</strong>.
        </div>
        
        ${newStatus === 'confirmed' ? `
        <p>🎉 <strong>Excellente nouvelle!</strong> Votre table est réservée. Nous avons hâte de vous accueillir au Moderne Restaurant.</p>
        <div style="background-color: #eff6ff; padding: 15px; border-radius: 6px; margin: 20px 0;">
            <h4 style="margin-top: 0;">📍 Informations pratiques:</h4>
            <ul>
                <li><strong>Adresse:</strong> 45 Rue de Rivoli, 75001 Paris</li>
                <li><strong>Métro:</strong> Châtelet (Lignes 1, 4, 7, 11, 14)</li>
                <li><strong>Arrivée:</strong> Merci d'arriver 5 minutes avant l'heure prévue</li>
            </ul>
        </div>
        ` : newStatus === 'cancelled' ? `
        <p>😔 Nous sommes désolés d'avoir dû annuler votre réservation. N'hésitez pas à nous recontacter pour une nouvelle demande.</p>
        ` : ''}
        
        <p>Pour toute question, contactez-nous au <strong>+33 1 42 86 91 45</strong></p>
    </div>
</body>
</html>
      `,
      text: `Bonjour ${reservation.name},

Votre réservation pour le ${new Date(reservation.date).toLocaleDateString('fr-FR')} à ${reservation.time} a été ${status.text}.

${newStatus === 'confirmed' ? 'Nous avons hâte de vous accueillir au Moderne Restaurant!' : newStatus === 'cancelled' ? 'Nous sommes désolés de cette annulation.' : ''}

Pour toute question: +33 1 42 86 91 45

Cordialement,
L'équipe du Moderne Restaurant`,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log(`✅ Status update notification sent successfully to ${reservation.email}:`, result.messageId);
    return true;
  } catch (error) {
    console.error('❌ Failed to send status update notification:', error);
    return false;
  }
};

// Тестовая функция для проверки email
export const testEmailConfiguration = async (): Promise<boolean> => {
  const transporter = createTransporter();
  if (!transporter) {
    return false;
  }

  try {
    await transporter.verify();
    console.log('✅ Email configuration is valid');
    return true;
  } catch (error) {
    console.error('❌ Email configuration test failed:', error);
    return false;
  }
};
