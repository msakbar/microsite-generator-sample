// Type definitions for data that would come from Excel file
export interface ExcelRowData {
  // Header section
  employerLogo?: string
  heroImage?: string
  enrollmentStartDate: string
  enrollmentEndDate: string
  companyName?: string

  // Buttons
  button1Text: string
  button1Url: string
  button2Text: string
  button2Url: string

  // Design
  primaryColor: string

  // Footer
  footerContent: string
  footerDisclaimer: string

  // Tiles (could be multiple rows or columns in Excel)
  tiles: Array<{
    headline: string
    description: string
    link: string
    image?: string
  }>
}

// Function to transform Excel data to Microsite props
export function transformExcelDataToMicrositeProps(
  excelData: ExcelRowData,
): import("../components/microsite").MicrositeProps {
  return {
    employerLogo: excelData.employerLogo,
    heroImage: excelData.heroImage,
    enrollmentStartDate: excelData.enrollmentStartDate,
    enrollmentEndDate: excelData.enrollmentEndDate,
    button1Text: excelData.button1Text,
    button1Url: excelData.button1Url,
    button2Text: excelData.button2Text,
    button2Url: excelData.button2Url,
    primaryColor: excelData.primaryColor,
    companyName: excelData.companyName,
    footerContent: excelData.footerContent,
    footerDisclaimer: excelData.footerDisclaimer,
    tiles: excelData.tiles.map((tile, index) => ({
      id: `tile-${index + 1}`,
      headline: tile.headline,
      description: tile.description,
      link: tile.link,
      image: tile.image,
    })),
  }
}
