// Utility function to parse uploaded Excel file
export interface ParsedExcelData {
  companyName: string
  enrollmentStartDate: string
  enrollmentEndDate: string
  primaryColor: string
  button1Text: string
  button1Url: string
  button2Text: string
  button2Url: string
  footerContent: string
  footerDisclaimer: string
  tiles: Array<{
    headline: string
    description: string
    link: string
    image?: string
  }>
}

export function parseExcelData(data: any[]): ParsedExcelData {
  if (!data || data.length === 0) {
    throw new Error("No data found in Excel file")
  }

  const row = data[0] // Assuming data is in the first row

  // Extract tiles (look for Tile 1, Tile 2, etc.)
  const tiles = []
  let tileIndex = 1

  while (row[`Tile ${tileIndex} Headline`]) {
    const tile = {
      headline: row[`Tile ${tileIndex} Headline`] || "",
      description: row[`Tile ${tileIndex} Description`] || "",
      link: row[`Tile ${tileIndex} Link`] || "",
      image: row[`Tile ${tileIndex} Image`] || undefined,
    }

    // Only add tile if it has required fields
    if (tile.headline && tile.description && tile.link) {
      tiles.push(tile)
    }

    tileIndex++
  }

  return {
    companyName: row["Company Name"] || "ABC Company",
    enrollmentStartDate: row["Enrollment Start Date"] || "",
    enrollmentEndDate: row["Enrollment End Date"] || "",
    primaryColor: row["Primary Color"] || "#7b1d3c",
    button1Text: row["Button 1 Text"] || "",
    button1Url: row["Button 1 URL"] || "",
    button2Text: row["Button 2 Text"] || "",
    button2Url: row["Button 2 URL"] || "",
    footerContent: row["Footer Content"] || "",
    footerDisclaimer: row["Footer Disclaimer"] || "",
    tiles,
  }
}

// Validation function
export function validateExcelData(data: ParsedExcelData): string[] {
  const errors: string[] = []

  if (!data.companyName) errors.push("Company Name is required")
  if (!data.enrollmentStartDate) errors.push("Enrollment Start Date is required")
  if (!data.enrollmentEndDate) errors.push("Enrollment End Date is required")
  if (!data.primaryColor) errors.push("Primary Color is required")
  if (!data.button1Text) errors.push("Button 1 Text is required")
  if (!data.button1Url) errors.push("Button 1 URL is required")
  if (!data.button2Text) errors.push("Button 2 Text is required")
  if (!data.button2Url) errors.push("Button 2 URL is required")
  if (!data.footerContent) errors.push("Footer Content is required")
  if (!data.footerDisclaimer) errors.push("Footer Disclaimer is required")

  if (data.tiles.length < 3) {
    errors.push("At least 3 tiles are required")
  }

  // Validate date format
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/
  if (data.enrollmentStartDate && !dateRegex.test(data.enrollmentStartDate)) {
    errors.push("Enrollment Start Date must be in YYYY-MM-DD format")
  }
  if (data.enrollmentEndDate && !dateRegex.test(data.enrollmentEndDate)) {
    errors.push("Enrollment End Date must be in YYYY-MM-DD format")
  }

  // Validate color format
  const colorRegex = /^#[0-9A-Fa-f]{6}$/
  if (data.primaryColor && !colorRegex.test(data.primaryColor)) {
    errors.push("Primary Color must be a valid hex color (e.g., #7b1d3c)")
  }

  // Validate URLs
  const urlRegex = /^https?:\/\/.+/
  if (data.button1Url && !urlRegex.test(data.button1Url)) {
    errors.push("Button 1 URL must be a valid URL starting with http:// or https://")
  }
  if (data.button2Url && !urlRegex.test(data.button2Url)) {
    errors.push("Button 2 URL must be a valid URL starting with http:// or https://")
  }

  return errors
}
