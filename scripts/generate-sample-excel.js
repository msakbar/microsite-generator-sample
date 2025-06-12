// Script to generate sample Excel data structure
// This shows the expected format for the Excel file upload

const XLSX = require("xlsx")

// Sample data structure that matches the microsite requirements
const sampleData = [
  {
    // Header Section
    "Company Name": "ABC Manufacturing Corp",
    "Enrollment Start Date": "2025-09-01",
    "Enrollment End Date": "2025-09-30",
    "Primary Color": "#7b1d3c",

    // Buttons
    "Button 1 Text": "Enroll Now",
    "Button 1 URL": "https://benefits.abcmanufacturing.com/enroll",
    "Button 2 Text": "Learn More",
    "Button 2 URL": "https://benefits.abcmanufacturing.com/info",

    // Footer Content
    "Footer Content":
      "Questions? Contact HR at hr@abcmanufacturing.com or call 1-800-555-0123. Office hours: Monday-Friday 8AM-5PM EST.",
    "Footer Disclaimer":
      "The Hartford® is The Hartford Financial Services Group, Inc. and its subsidiaries, including underwriting companies Hartford Life and Accident Insurance Company and Hartford Fire Insurance Company. Home Office is Hartford, CT. © 2025 The Hartford",

    // Tile 1
    "Tile 1 Headline": "Experience MyTomorrow!",
    "Tile 1 Description":
      "Click here to learn more about the products being offered and assistance in choosing the best option for you.",
    "Tile 1 Link": "https://benefits.abcmanufacturing.com/mytomorrow",
    "Tile 1 Image": "", // Optional - will use default if empty

    // Tile 2
    "Tile 2 Headline": "Enroll in your benefits now!",
    "Tile 2 Description": "Click here to be directed to your enrollment platform to enroll in your benefits.",
    "Tile 2 Link": "https://benefits.abcmanufacturing.com/enroll-benefits",
    "Tile 2 Image": "",

    // Tile 3
    "Tile 3 Headline": "Short-term Income Protection Benefit Highlight Sheets",
    "Tile 3 Description": "Learn more about your Short-term Income Protection Benefits plan details.",
    "Tile 3 Link": "https://benefits.abcmanufacturing.com/short-term-disability",
    "Tile 3 Image": "",

    // Additional tiles (optional)
    "Tile 4 Headline": "Long-term Income Protection Benefit Highlight Sheet",
    "Tile 4 Description": "Learn more about your Long-term Income Protection Benefits plan details.",
    "Tile 4 Link": "https://benefits.abcmanufacturing.com/long-term-disability",
    "Tile 4 Image": "",

    "Tile 5 Headline": "Accidental Injury Benefit Highlight Sheet",
    "Tile 5 Description": "Learn more about your Accidental Injury Benefits plan details.",
    "Tile 5 Link": "https://benefits.abcmanufacturing.com/accidental-injury",
    "Tile 5 Image": "",

    "Tile 6 Headline": "Critical Illness Benefit Highlight Sheet",
    "Tile 6 Description": "Learn more about your Critical Illness Benefits plan details.",
    "Tile 6 Link": "https://benefits.abcmanufacturing.com/critical-illness",
    "Tile 6 Image": "",
  },
]

// Create workbook and worksheet
const workbook = XLSX.utils.book_new()
const worksheet = XLSX.utils.json_to_sheet(sampleData)

// Set column widths for better readability
const columnWidths = [
  { wch: 25 }, // Company Name
  { wch: 20 }, // Enrollment Start Date
  { wch: 20 }, // Enrollment End Date
  { wch: 15 }, // Primary Color
  { wch: 20 }, // Button 1 Text
  { wch: 50 }, // Button 1 URL
  { wch: 20 }, // Button 2 Text
  { wch: 50 }, // Button 2 URL
  { wch: 80 }, // Footer Content
  { wch: 100 }, // Footer Disclaimer
]

worksheet["!cols"] = columnWidths

// Add the worksheet to the workbook
XLSX.utils.book_append_sheet(workbook, worksheet, "Microsite Data")

// Create a second sheet with instructions
const instructionsData = [
  {
    "Field Name": "Company Name",
    Description: "Name of the employer/company",
    Required: "Yes",
    Example: "ABC Manufacturing Corp",
  },
  {
    "Field Name": "Enrollment Start Date",
    Description: "Start date for enrollment period (YYYY-MM-DD)",
    Required: "Yes",
    Example: "2025-09-01",
  },
  {
    "Field Name": "Enrollment End Date",
    Description: "End date for enrollment period (YYYY-MM-DD)",
    Required: "Yes",
    Example: "2025-09-30",
  },
  {
    "Field Name": "Primary Color",
    Description: "Hex color code for branding (buttons, footer, links)",
    Required: "Yes",
    Example: "#7b1d3c",
  },
  {
    "Field Name": "Button 1 Text",
    Description: "Text for the primary action button",
    Required: "Yes",
    Example: "Enroll Now",
  },
  {
    "Field Name": "Button 1 URL",
    Description: "URL for the primary action button",
    Required: "Yes",
    Example: "https://benefits.company.com/enroll",
  },
  {
    "Field Name": "Button 2 Text",
    Description: "Text for the secondary action button",
    Required: "Yes",
    Example: "Learn More",
  },
  {
    "Field Name": "Button 2 URL",
    Description: "URL for the secondary action button",
    Required: "Yes",
    Example: "https://benefits.company.com/info",
  },
  {
    "Field Name": "Footer Content",
    Description: "Contact information and additional details",
    Required: "Yes",
    Example: "Questions? Contact HR at hr@company.com",
  },
  {
    "Field Name": "Footer Disclaimer",
    Description: "Legal disclaimer text",
    Required: "Yes",
    Example: "The Hartford® is The Hartford Financial Services Group...",
  },
  {
    "Field Name": "Tile X Headline",
    Description: "Title for benefit tile (X = 1,2,3,etc.)",
    Required: "Yes (at least 3 tiles)",
    Example: "Experience MyTomorrow!",
  },
  {
    "Field Name": "Tile X Description",
    Description: "Description text for benefit tile",
    Required: "Yes",
    Example: "Click here to learn more about the products...",
  },
  {
    "Field Name": "Tile X Link",
    Description: "URL for benefit tile",
    Required: "Yes",
    Example: "https://benefits.company.com/mytomorrow",
  },
  {
    "Field Name": "Tile X Image",
    Description: "Image URL for tile (optional - will use default if empty)",
    Required: "No",
    Example: "https://company.com/images/benefit1.jpg",
  },
]

const instructionsSheet = XLSX.utils.json_to_sheet(instructionsData)
instructionsSheet["!cols"] = [
  { wch: 25 }, // Field Name
  { wch: 60 }, // Description
  { wch: 15 }, // Required
  { wch: 50 }, // Example
]

XLSX.utils.book_append_sheet(workbook, instructionsSheet, "Instructions")

// Generate the Excel file
try {
  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" })

  console.log("✅ Sample Excel file generated successfully!")
  console.log("\n📋 File Structure:")
  console.log('Sheet 1: "Microsite Data" - Contains sample data')
  console.log('Sheet 2: "Instructions" - Field descriptions and requirements')

  console.log("\n📊 Sample Data Preview:")
  console.log("Company: ABC Manufacturing Corp")
  console.log("Enrollment Period: September 1-30, 2025")
  console.log("Primary Color: #7b1d3c (Burgundy)")
  console.log("Tiles: 6 benefit tiles included")

  console.log("\n💡 Usage Instructions:")
  console.log("1. Download this generated Excel file")
  console.log('2. Modify the data in the "Microsite Data" sheet')
  console.log("3. Upload the file to the Microsite Generator")
  console.log("4. The system will parse and populate the form fields")

  // In a real implementation, you would save this to a file
  // For demonstration, we're just showing the structure
  console.log("\n🔧 Technical Notes:")
  console.log("- Dates should be in YYYY-MM-DD format")
  console.log("- Colors should be hex codes (e.g., #7b1d3c)")
  console.log("- URLs should include http:// or https://")
  console.log("- At least 3 tiles are required")
  console.log("- Image URLs are optional (will use defaults if empty)")
} catch (error) {
  console.error("❌ Error generating Excel file:", error)
}
