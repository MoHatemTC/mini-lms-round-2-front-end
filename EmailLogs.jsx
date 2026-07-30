import { getEmails } from "../components/EmailService";
import "./styles/style.css";

function EmailLogs() {

  const emails = getEmails();

  return (
    <div className="email-page">

      <div className="email-container">

        <h1>Email Logs</h1>

        <table className="email-table">

          <thead>
            <tr>
              <th>To</th>
              <th>Subject</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>

            {emails.map((email, index) => (

              <tr key={index}>

                <td>{email.to}</td>

                <td>{email.subject}</td>

                <td className="status-sent">
                  {email.status}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default EmailLogs;