export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed"
    });
  }

  try {

    const {
      firstName,
      lastName,
      email,
      phone
    } = req.body;

    const reference =
      "GLAM_" +
      Date.now() +
      "_" +
      Math.floor(Math.random() * 100000);

    const response = await fetch(
      "https://api-v1.aspfiy.com/reserve-paga/",
      {
        method: "POST",
        headers: {
          "Authorization":
            `Bearer ${process.env.ASPIFY_SECRET_KEY}`,
          "Content-Type":
            "application/json",
          "accept":
            "application/json"
        },
        body: JSON.stringify({
          reference,
          firstName,
          lastName,
          email,
          phone,

          webhookUrl:
            "https://example.com/webhook"
        })
      }
    );

    const data = await response.json();

    return res.status(200).json(data);

  } catch (error) {

    return res.status(500).json({
      success: false,
      error: error.message
    });

  }

}
