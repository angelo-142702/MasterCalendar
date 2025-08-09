import { Resend } from 'resend';

const resend = new Resend("re_ZsLYPsdd_HrFyiZrhDzf6W9da3fy1NTC2");

export const envio =  async  (email, username, id )=> {
  console.log(email);
  
  const { data, error } = await resend.emails.send({
    from: 'Angelo <onboarding@resend.dev>',
    to: [email],
    subject: 'restaurar contraseña',
    html: `
<!DOCTYPE html>
<html>
<head>
    <title>Enviar correo electrónico</title>
    <style>
        .button {
            display: inline-block;
            padding: 10px 20px;
            font-size: 16px;
            color: white;
            font-weight: bold;
            background-color: #4CAF50; /* Verde */
            text-align: center;
            text-decoration: none;
            border-radius: 5px;
        }
    </style>
</head>
<body>
    <p>Hola,${username}</p>
    <p>Haz clic en el botón de abajo para ser restablecer su contraseña:</p>
    <a href="http://localhost:5173/restartPassword/${id}" class="button">RESTABLECER</a>
    <p>Saludos,${username}</p>
</body>
</html>
`,
  });

  if (error) {
    return console.error({ error });
  }

  console.log({ data });
};
