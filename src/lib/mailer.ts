import nodemailer from 'nodemailer';

// 環境変数を参照（.env.local に定義）
const host = process.env.SMTP_HOST || '';
const port = Number(process.env.SMTP_PORT || 587);
const user = process.env.SMTP_USER || '';
const pass = process.env.SMTP_PASS || '';
const to = process.env.CONTACT_EMAIL || '';

// nodemailer トランスポーターを作成
const transporter = nodemailer.createTransport({
    host,
    port,
    secure: true, // Gmail用なら必ず true
    auth: {
        user,
        pass,
    },
});

interface MailData {
    name: string;
    phone?: string;
    message: string;
}

// メール送信関数
export async function sendMail(data: MailData) {
    const { name, phone, message } = data;

    const mailOptions = {
        from: user,
        to,
        subject: '【京喬不動産】お問い合わせがありました',
        text: `お名前: ${name}\n電話番号: ${phone || '（未入力）'}\n\nメッセージ:\n${message}`,
        html: `
    <h3>京喬不動産へのお問い合わせ</h3>
    <p><strong>お名前:</strong> ${name}</p>
    <p><strong>電話番号:</strong> ${phone || '（未入力）'}</p>
    <p><strong>メッセージ:</strong><br/>${message.replace(/\n/g, '<br/>')}</p>
  `,
    };


    return transporter.sendMail(mailOptions);
}
