const mailTemp = (name, token, text, linkText) => {
    return (
        `<!doctype html>
<html>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Google Font -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"
        rel="stylesheet">
</head>
<body style="font-family:Montserrat, sans-serif;">
    <div
        style="border-radius: 15px; text-align: start; background-color: #212121; color: white; font-size:x-large; align-content: center; margin: auto; width:500px;">
        <h1 style="padding: 25px 25px 1px 25px;">${process.env.SITE_NAME}</h1>
        <div
            style="background-color: #f1f1f1; border-radius: 14px; border-radius: 0px 0px 14px 14px; font-size: medium; padding-bottom: 25px;">
            <div style="padding: 10px 25px; color: #212121;">
            <p><b>Hello ${name}.</b></p>
            <p>${text}</p>
                <a href="http://localhost:${process.env.PORT}/${token}" target="_blank">${linkText}</a>
                <br>
                <br>
                <br>
                <b>${process.env.SITE_NAME}</b>
            </div>
        </div>
    </div>
    </body>

</html>`
    )

}
module.exports = { mailTemp };
