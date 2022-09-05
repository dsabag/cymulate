import SIB from "sib-api-v3-sdk";
import ngrok from "ngrok";

let url;

(async function () {
  url = await ngrok.connect(5000);
  url += "/ngrok";
})();

const client = SIB.ApiClient.instance;
const apiKey = client.authentications["api-key"];
apiKey.apiKey =
  "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";

export const sendEmail = (req, res) => {
  const tranEmailApi = new SIB.TransactionalEmailsApi();
  const { email, token } = req;

  const sender = {
    email: "dsabag85@gmail.com",
    name: "dvir",
  };
  const receivers = [
    {
      email: email,
    },
  ];

  tranEmailApi
    .sendTransacEmail({
      sender,
      to: receivers,
      subject: "ATTENTION!!! THIS IS NOT A SCAM!!!",
      textContent: `
       you have just won a brand new iphone 13, lucky you...
        `,
      htmlContent: `
        <h1>APPLE GIVEAWAY</h1>
        <a href=${url + "/" + token}>Get A New Iphone 13 PRO!!!</a>
                `,
    })
    .then(() => {
      return res.status(200).send({
        email,
      });
    })
    .catch();
};
