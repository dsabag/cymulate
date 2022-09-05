import axios from "axios";
import { useEffect, useState } from "react";

export const Emailer = () => {
  const [emails, setEmails] = useState([]);

  const getEmails = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/emails", {
        withCredentials: true,
      });

      setEmails(data?.emails);
    } catch (error) {}
  };

  useEffect(() => {
    getEmails();
  }, []);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();

    let { email } = document.forms[0];

    const sentEmailResponse = await axios.post(
      "http://localhost:5000/send",
      { email: email.value },
      { withCredentials: true }
    );
    getEmails();
  };

  return (
    <>
      <div className="">
        <div className="title">enter email</div>
        <form onSubmit={handleEmailSubmit}>
          <div className="container">
            <label>victim's email here</label>
            <input id="email" type="email" name="email" required />
          </div>
          <input type="submit" />
        </form>
      </div>
      {emails &&
        emails.map((email, index) => {
          return (
            <div key={index}>
              {email.email} ------ {email.clicked ? "clicked" : "sent"}
            </div>
          );
        })}
    </>
  );
};
