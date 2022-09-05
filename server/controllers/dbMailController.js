import { dbo } from "../db/conn.js";

export const updateClicked = async (req, res) => {
  const { token } = req.params;
  if (!token) {
    return res.status(400).send("something went wrong");
  }

  const db = dbo.getDb();
  const emails = await db.collection("emails");

  try {
    await emails.updateOne(
      { token: token },
      { $set: { clicked: true } },
      function (err, result) {
        if (err) throw err;

        return res.status(200).send("gotchaaa");
      }
    );
  } catch (error) {
    return res.status(500).send("unable to update email status");
  }
};

export const getEmails = async (req, res) => {
  const db = dbo.getDb();
  const emails = await db.collection("emails");

  try {
    await emails.find({}).toArray(function (err, result) {
      if (err) throw err;

      return res.status(200).send({ emails: result });
    });
  } catch (error) {
    return res.status(500).send("unable to get emails");
  }
};
