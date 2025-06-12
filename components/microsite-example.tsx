import Microsite, { type MicrositeProps } from "./microsite"

// Example of how the component would be used with data from Excel file
const exampleMicrositeData: MicrositeProps = {
  employerLogo: "/placeholder.svg?height=30&width=120&text=Company+Logo",
  heroImage: "/placeholder.svg?height=400&width=600&text=Team+Photo",
  enrollmentStartDate: "2025-09-01",
  enrollmentEndDate: "2025-09-30",
  button1Text: "Enroll Now",
  button1Url: "https://example.com/enroll",
  button2Text: "Learn More",
  button2Url: "https://example.com/learn",
  primaryColor: "#7b1d3c",
  companyName: "ABC Company",
  footerContent: "Questions? Contact HR at hr@company.com or call 1-800-555-0123",
  footerDisclaimer:
    "The Hartford® is The Hartford Financial Services Group, Inc. and its subsidiaries, including underwriting companies Hartford Life and Accident Insurance Company and Hartford Fire Insurance Company. Home Office is Hartford, CT. © 2025 The Hartford",
  tiles: [
    {
      id: "1",
      headline: "Experience MyTomorrow!",
      description:
        "Click here to learn more about the products being offered and assistance in choosing the best option for you.",
      link: "https://example.com/mytomorrow",
      image: "/placeholder.svg?height=200&width=300&text=MyTomorrow",
    },
    {
      id: "2",
      headline: "Enroll in your benefits now!",
      description: "Click here to be directed to your enrollment platform to enroll in your benefits.",
      link: "https://example.com/enroll",
      image: "/placeholder.svg?height=200&width=300&text=Enrollment",
    },
    {
      id: "3",
      headline: "Short-term Income Protection Benefit Highlight Sheets",
      description: "Learn more about your Short-term Income Protection Benefits plan details.",
      link: "https://example.com/short-term",
      image: "/placeholder.svg?height=200&width=300&text=Income+Protection",
    },
  ],
}

export default function MicrositeExample() {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Microsite Preview</h2>
      <div className="border rounded-lg overflow-hidden">
        <Microsite {...exampleMicrositeData} />
      </div>
    </div>
  )
}
