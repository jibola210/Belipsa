import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods":
    "POST, OPTIONS",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: corsHeaders,
    });
  }

  try {
    const order = await req.json();

    const {
      reference,
      customerName,
      phone,
      address,
      total,
      items,
      status,
    } = order;

    if (!reference || !customerName || !phone || !address) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Missing required order information.",
        }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    const resendApiKey = Deno.env.get("RESEND_API_KEY");

    if (!resendApiKey) {
      throw new Error("RESEND_API_KEY is not configured.");
    }

    const itemsHtml = Array.isArray(items)
      ? items
          .map((item: any) => {
            return `
              <tr>
                <td style="padding:10px;border-bottom:1px solid #eee;">
                  ${item.product}
                </td>
                <td style="padding:10px;border-bottom:1px solid #eee;">
                  ${item.quantity}
                </td>
                <td style="padding:10px;border-bottom:1px solid #eee;">
                  ₦${Number(item.price).toLocaleString("en-NG")}
                </td>
                <td style="padding:10px;border-bottom:1px solid #eee;">
                  ₦${Number(item.total).toLocaleString("en-NG")}
                </td>
              </tr>
            `;
          })
          .join("")
      : `
          <tr>
            <td colspan="4" style="padding:10px;">
              No products found.
            </td>
          </tr>
        `;

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <body style="
          margin:0;
          padding:20px;
          background:#f7f7f7;
          font-family:Arial,sans-serif;
          color:#222;
        ">

          <div style="
            max-width:650px;
            margin:auto;
            background:white;
            padding:30px;
            border-radius:12px;
          ">

            <h1>🔔 New Belipsa Order</h1>

            <p>
              A new order has been placed on the Belipsa website.
            </p>

            <hr>

            <h2>Order Details</h2>

            <p>
              <strong>Order Reference:</strong>
              ${reference}
            </p>

            <p>
              <strong>Payment Status:</strong>
              ${status || "Payment Pending"}
            </p>

            <h2>Customer Details</h2>

            <p>
              <strong>Name:</strong>
              ${customerName}
            </p>

            <p>
              <strong>Phone:</strong>
              ${phone}
            </p>

            <p>
              <strong>Delivery Address:</strong>
              ${address}
            </p>

            <h2>Products</h2>

            <table style="
              width:100%;
              border-collapse:collapse;
            ">

              <thead>
                <tr>

                  <th style="
                    text-align:left;
                    padding:10px;
                    border-bottom:2px solid #222;
                  ">
                    Product
                  </th>

                  <th style="
                    text-align:left;
                    padding:10px;
                    border-bottom:2px solid #222;
                  ">
                    Qty
                  </th>

                  <th style="
                    text-align:left;
                    padding:10px;
                    border-bottom:2px solid #222;
                  ">
                    Price
                  </th>

                  <th style="
                    text-align:left;
                    padding:10px;
                    border-bottom:2px solid #222;
                  ">
                    Total
                  </th>

                </tr>
              </thead>

              <tbody>
                ${itemsHtml}
              </tbody>

            </table>

            <hr>

            <h2>
              Total: ₦${Number(total).toLocaleString("en-NG")}
            </h2>

            <p>
              Please verify the customer's payment before processing this order.
            </p>

            <p>
              — Belipsa
            </p>

          </div>

        </body>
      </html>
    `;

    const emailResponse = await fetch(
      "https://api.resend.com/emails",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${resendApiKey}`,
        },

        body: JSON.stringify({
          from: "Belipsa Orders <onboarding@resend.dev>",

          to: [
            "agboladeridwan174@gmail.com"
          ],

          subject: `🔔 New Belipsa Order — ${reference}`,

          html: emailHtml,
        }),
      }
    );

    const result = await emailResponse.json();

    if (!emailResponse.ok) {
      console.error(
        "Resend API error:",
        result
      );

      return new Response(
        JSON.stringify({
          success: false,
          error: result,
        }),
        {
          status: emailResponse.status,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    console.log(
      "Belipsa order email sent successfully:",
      result
    );

    return new Response(
      JSON.stringify({
        success: true,
        message: "Belipsa order email sent successfully.",
        data: result,
      }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );

  } catch (error) {

    console.error(
      "send-order-email error:",
      error
    );

    return new Response(
      JSON.stringify({
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Unknown error",
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});