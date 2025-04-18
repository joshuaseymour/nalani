import { ImageResponse } from "next/og"
import { getDictionary } from "@/lib/dictionaries"

export const runtime = "edge"
export const alt = "Nalani's Lip Balm Product"
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/png"

export default async function OGImage({
  params,
}: {
  params: { lang: string; id: string }
}) {
  const dictionary = await getDictionary(params.lang)

  // Find the product by ID
  const products = Object.values(dictionary.products).filter((product) => typeof product === "object")
  const product = products.find((p: any) => p.id === params.id) as any

  if (!product) {
    return new ImageResponse(
      <div
        style={{
          display: "flex",
          fontSize: 48,
          background: "linear-gradient(to right, #c026d3, #9333ea)",
          color: "white",
          width: "100%",
          height: "100%",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: 64, fontWeight: "bold", marginBottom: 20 }}>Nalani's Lip Balm</div>
        <div>Natural Handcrafted Lip Care</div>
      </div>,
      { ...size },
    )
  }

  return new ImageResponse(
    <div
      style={{
        display: "flex",
        fontSize: 48,
        background: "linear-gradient(to right, #c026d3, #9333ea)",
        color: "white",
        width: "100%",
        height: "100%",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: 40,
      }}
    >
      <div style={{ fontSize: 64, fontWeight: "bold", marginBottom: 20 }}>{product.name}</div>
      <div style={{ fontSize: 32, maxWidth: 800 }}>{product.description}</div>
      <div style={{ fontSize: 36, marginTop: 40 }}>${product.price.toFixed(2)}</div>
    </div>,
    { ...size },
  )
}
