import fs from "fs"
import path from "path"
import font2base64 from "node-font2base64"

const readLocalFile = (filePath: string): string =>
  fs.readFileSync(path.join(__dirname, filePath)).toString()

const cssTailwind = readLocalFile("../../tests/tailwind.css")

const fontCircular = font2base64.encodeToDataUrlSync(
  path.join(__dirname, "../../src/styles/fonts/CircularXXSub-Book.woff2"),
)
const fontCircularMedium = font2base64.encodeToDataUrlSync(
  path.join(__dirname, "../../src/styles/fonts/CircularXXSub-Medium.woff2"),
)
const fontCircularItalic = font2base64.encodeToDataUrlSync(
  path.join(__dirname, "../../src/styles/fonts/CircularXXSub-BookItalic.woff2"),
)
const fontCircularBold = font2base64.encodeToDataUrlSync(
  path.join(__dirname, "../../src/styles/fonts/CircularXXSub-Bold.woff2"),
)
const fontCircularBlack = font2base64.encodeToDataUrlSync(
  path.join(__dirname, "../../src/styles/fonts/CircularXXSub-Black.woff2"),
)

export type RenderOptions = {
  width?: number
  height?: number
}

export const wrapInHtmlTag = (
  htmlContent: string,
  options?: RenderOptions,
): string => `
  <html>
    <head>
        <style>
          @font-face {
            font-weight: 400;
            font-style: normal;
            font-family: CircularXXSub;
            src: url("${fontCircular}") format('woff2');
          }

          @font-face {
            font-weight: 500;
            font-style: normal;
            font-family: CircularXXSub;
            src: url("${fontCircularMedium}") format('woff2');
          }

          @font-face {
            font-weight: 400;
            font-style: italic;
            font-family: CircularXXSub;
            src: url("${fontCircularItalic}") format('woff2');
          }

          @font-face {
            font-weight: 600;
            font-style: normal;
            font-family: CircularXXSub;
            src: url("${fontCircularBold}") format('woff2');
          }

          @font-face {
            font-weight: 700;
            font-style: normal;
            font-family: CircularXXSub;
            src: url("${fontCircularBlack}") format('woff2');
          }
        </style>

        <style>
          body {
            display: flex;
            align-items: center;
            justify-content: center;

            padding: 32px;

            width: ${options?.width || 1200}px;
            height: ${options?.height || 800}px;
          }
        </style>

        <style type="text/css">${cssTailwind}</style>
    </head>
    <body>
      <div id="browser-content" style="padding: 32px">
        ${htmlContent}
      </div>
    </body>
  </html>
`
