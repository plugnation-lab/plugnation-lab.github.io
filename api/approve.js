export async function POST(request) {
  try {
    const { paymentId } = await request.json();

    if (!paymentId) {
      return Response.json(
        { error: "Missing paymentId" },
        { status: 400 }
      );
    }

    const response = await fetch(
      `https://api.minepi.com/v2/payments/${paymentId}/approve`,
      {
        method: "POST",
        headers: {
          Authorization: `Key ${process.env.PI_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const data = await response.json();

    return Response.json(data, {
      status: response.status,
      headers: {
        "Access-Control-Allow-Origin": "https://plugnation-lab.github.io"
      }
    });

  } catch (error) {
    return Response.json(
      { error: "Server error" },
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "https://plugnation-lab.github.io"
        }
      }
    );
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "https://plugnation-lab.github.io",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    }
  });
}
