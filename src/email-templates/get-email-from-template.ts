export const getEmailFromTemplate = ({
  title,
  body,
  progress,
  button,
  link,
}: {
  title: string
  body: string
  progress?: {
    currentStep: number
    numberOfSteps: number
  }
  button?: {
    text: string
    href: string
  }
  link?: {
    text: string
    href: string
  }
}) => {
  return `
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style>
          * {
            font-family: "Helvetica Neue", sans-serif;
          }
        </style>
      </head>
      <body style="margin: 0">
        <table
          role="presentation"
          width="100%"
          style="background-color: #f1f5f9"
          cellpadding="0"
          cellspacing="0"
        >
          <tr>
            <td align="center" style="padding: 60px 20px">
              <table
                role="presentation"
                style="width: 100%; max-width: 400px"
                cellspacing="0"
                cellpadding="0"
                border="0"
              >
                <tr>
                  <td
                    style="
                      position: relative;
                      background-color: #ffffff;
                      border: 1px solid #e2e8f0;
                      border-radius: 8px 8px 10px 10px;
                      text-align: center;
                      padding: 56px 20px;
                      overflow: hidden;
                    "
                  >
                    ${
                      progress
                        ? `
                      <table
                        role="presentation"
                        style="
                          position: absolute;
                          width: 100%;
                          height: 8px;
                          top: 0;
                          left: 0;
                        "
                        cellspacing="0"
                        cellpadding="0"
                        border="0"
                      >
                        <tr
                          style="
                            display: flex;
                            gap: 8px;
                          "
                        >
                          ${Array.from({ length: progress.numberOfSteps })
                            .map(
                              (_, index) => `
                            <td
                              style="
                                width: ${100 / progress.numberOfSteps}%;
                                height: 8px;
                                display: inline-block;
                              "
                            >
                              <span
                                style="
                                  width: 100%;
                                  height: 100%;
                                  display: block;
                                  background-color: ${
                                    index < progress.currentStep
                                      ? "#5deb5a"
                                      : "#e2e8f0"
                                  };
                                "
                              >
                              </span>
                            </td>
                          `,
                            )
                            .join("\n")}
                        </tr>
                      </table>
                      `
                        : ""
                    }
                    <img
                      src="https://app.auroracloud.dev/static/email/icon.png"
                      style="width: 64px; height: 64px; object-fit: contain"
                      with="64"
                      height="64"
                      alt=""
                    />
                    <h2
                      style="
                        margin-top: 24px;
                        margin-bottom: 10px;
                        color: #0f172a;
                        font-size: 22px;
                        line-height: 24px;
                        letter-spacing: -1px;
                        font-weight: bold;
                      "
                    >
                      ${title}
                    </h2>
                    <p
                      style="
                        color: #475569;
                        font-size: 14px;
                        line-height: 18px;
                        max-width: 220px;
                        margin: 0 auto;
                      "
                    >
                      ${body}
                    </p>
                    ${
                      button
                        ? `
                      <a
                        href="${button.href}"
                        style="
                          display: inline-block;
                          background-color: #5deb5a;
                          border: none;
                          padding: 12px 22px;
                          text-decoration: none;
                          border-radius: 8px;
                          margin-top: 16px;
                          color: #0f172a !important;
                          font-size: 16px;
                          line-height: 24px;
                          letter-spacing: -0.5px;
                          font-weight: bold;
                        "
                      >${button.text}</a
                    >`
                        : ""
                    }
                    ${
                      link
                        ? `
                      <a
                        href="${link.href}"
                        style="
                          display: block;
                          margin-top: 16px;
                          color: #17A615;
                          text-align: center;
                          font-size: 14px;
                          font-style: normal;
                          font-weight: 700;
                          line-height: 18px;
                          text-decoration-line: underline;
                          text-decoration-style: solid;
                          text-decoration-skip-ink: none;
                          text-decoration-thickness: auto;
                          text-underline-offset: auto;
                          text-underline-position: from-font;
                        "
                      >
                        ${link.text}
                      </a>
                      `
                        : ""
                    }
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `
}
