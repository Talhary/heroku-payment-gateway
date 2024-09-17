import { Resend } from "resend";
const resend = new Resend('re_d7QfTnHg_DQbiN2aT56mTzWaomFfLPCLy');
(async function () {
  const { data, error } = await resend.emails.send({
    from: 'Talha Riaz <info@talhariaz.xyz>',
    to: ['talhariaz5425869@gmail.com'],
    subject: 'Hello World',
    html: '<strong>It works!</strong>',
  });

  if (error) {
    return console.error({ error });
  }

  console.log({ data });
})();