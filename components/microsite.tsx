"use client"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

export interface MicrositeTile {
  id: string
  image?: string
  headline: string
  description: string
  link: string
}

export interface MicrositeProps {
  // Header/Hero section
  employerLogo?: string
  heroImage?: string
  enrollmentStartDate: string
  enrollmentEndDate: string

  // Buttons
  button1Text: string
  button1Url: string
  button2Text: string
  button2Url: string

  // Content
  tiles: MicrositeTile[]

  // Footer
  footerContent: string
  footerDisclaimer: string

  // Design
  primaryColor: string

  // Optional customization
  companyName?: string
  className?: string
}

export default function Microsite({
  employerLogo,
  heroImage,
  enrollmentStartDate,
  enrollmentEndDate,
  button1Text,
  button1Url,
  button2Text,
  button2Url,
  tiles,
  footerContent,
  footerDisclaimer,
  primaryColor,
  companyName = "ABC Company",
  className = "",
}: MicrositeProps) {
  const formatEnrollmentPeriod = () => {
    if (enrollmentStartDate && enrollmentEndDate) {
      const start = new Date(enrollmentStartDate).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
      })
      const end = new Date(enrollmentEndDate).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
      return `${start} – ${end}`
    }
    return "Open Enrollment Period"
  }

  const getRandomImage = () => {
    return `/placeholder.svg?height=200&width=300&text=Benefit+Image`
  }

  return (
    <div className={`bg-white ${className}`}>
      {/* Header Section */}
      <div className="flex flex-col md:flex-row">
        <div className="p-6 flex-1">
          <div className="flex items-center gap-2 mb-6">
            <img src="/placeholder.svg?height=30&width=120&text=The+Hartford" alt="The Hartford" className="h-8" />
            {employerLogo && <img src={employerLogo || "/placeholder.svg"} alt="Employer Logo" className="h-8" />}
          </div>
        </div>
        <div className="flex-1">
          <img
            src={heroImage || "/placeholder.svg?height=300&width=400&text=Hero+Image"}
            alt="Hero"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Hero Section */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">During Annual Enrollment you can enroll</h1>
          <p className="text-lg mb-4">{formatEnrollmentPeriod()}</p>
          <p className="text-sm mb-6">Your benefits provided by {companyName} from The Hartford</p>

          {/* Action Buttons */}
          <div className="flex gap-4 mb-8">
            {button1Text && button1Url && (
              <Button asChild style={{ backgroundColor: primaryColor }} className="text-white hover:opacity-90">
                <a href={button1Url} target="_blank" rel="noopener noreferrer">
                  {button1Text}
                </a>
              </Button>
            )}
            {button2Text && button2Url && (
              <Button
                asChild
                variant="outline"
                style={{ borderColor: primaryColor, color: primaryColor }}
                className="hover:bg-gray-50"
              >
                <a href={button2Url} target="_blank" rel="noopener noreferrer">
                  {button2Text}
                </a>
              </Button>
            )}
          </div>
        </div>

        {/* Tiles Grid */}
        {tiles && tiles.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {tiles.map((tile) => (
              <div
                key={tile.id}
                className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                onClick={() => tile.link && window.open(tile.link, "_blank")}
              >
                <div className="aspect-video relative bg-gray-100">
                  <img
                    src={tile.image || getRandomImage()}
                    alt={tile.headline}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-white p-2">
                    <img src="/placeholder.svg?height=20&width=80&text=Hartford" alt="The Hartford" className="h-4" />
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2">{tile.headline}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-3">{tile.description}</p>
                  {tile.link && (
                    <div className="flex items-center gap-1 text-sm font-medium" style={{ color: primaryColor }}>
                      <span>Learn more</span>
                      <ExternalLink className="h-3 w-3" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <footer className="mt-12 p-6 text-white text-sm rounded-lg" style={{ backgroundColor: primaryColor }}>
          <div className="space-y-3">
            <p className="text-sm leading-relaxed">{footerDisclaimer}</p>
            <p className="text-sm">{footerContent}</p>
            <div className="flex justify-between items-center pt-2 border-t border-white/20">
              <div className="text-xs opacity-75">© {new Date().getFullYear()} The Hartford</div>
              <button className="text-xs underline hover:no-underline">Privacy Policy</button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
