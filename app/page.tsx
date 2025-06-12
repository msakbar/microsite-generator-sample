"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  Upload,
  Plus,
  Trash2,
  Eye,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  ChevronDown,
  ChevronRight,
  Layout,
  Grid3X3,
  FileText,
  Palette,
} from "lucide-react"

interface Tile {
  id: string
  image?: File | string
  headline: string
  description: string
  link: string
}

interface MicrositeData {
  employerLogo?: File | string
  heroImage?: File | string
  enrollmentStartDate: string
  enrollmentEndDate: string
  primaryColor: string
  button1Text: string
  button1Url: string
  button2Text: string
  button2Url: string
  footerContent: string
  footerDisclaimer: string
  tiles: Tile[]
}

const defaultMediaLibrary = [
  "/placeholder.svg?height=200&width=300",
  "/placeholder.svg?height=200&width=300",
  "/placeholder.svg?height=200&width=300",
  "/placeholder.svg?height=200&width=300",
  "/placeholder.svg?height=200&width=300",
  "/placeholder.svg?height=200&width=300",
]

export default function MicrositeGenerator() {
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "success" | "error">("idle")
  const [openSections, setOpenSections] = useState({
    header: true,
    tiles: false,
    footer: false,
    design: false,
  })
  const [micrositeData, setMicrositeData] = useState<MicrositeData>({
    employerLogo: "/placeholder.svg?height=30&width=120",
    heroImage: "/placeholder.svg?height=400&width=600",
    enrollmentStartDate: "2025-09-01",
    enrollmentEndDate: "2025-09-30",
    primaryColor: "#7b1d3c",
    button1Text: "Enroll Now",
    button1Url: "https://example.com/enroll",
    button2Text: "Learn More",
    button2Url: "https://example.com/learn",
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
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        id: "2",
        headline: "Enroll in your benefits now!",
        description: "Click here to be directed to your enrollment platform to enroll in your benefits.",
        link: "https://example.com/enroll",
        image: "/placeholder.svg?height=30&width=120",
      },
      {
        id: "3",
        headline: "Short-term Income Protection Benefit Highlight Sheets",
        description: "Learn more about your Short-term Income Protection Benefits plan details.",
        link: "https://example.com/short-term",
        image: "/placeholder.svg?height=30&width=120",
      },
    ],
  })
  const [publishStatus, setPublishStatus] = useState<"idle" | "publishing" | "published">("idle")
  const [publishedUrl, setPublishedUrl] = useState("")

  const getRandomImage = useCallback(() => {
    return defaultMediaLibrary[Math.floor(Math.random() * defaultMediaLibrary.length)]
  }, [])

  const toggleSection = useCallback((section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }))
  }, [])

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.name.endsWith(".xlsx")) {
      setUploadStatus("uploading")
      setTimeout(() => {
        setUploadStatus("success")
        setMicrositeData((prev) => ({
          ...prev,
          primaryColor: "#7b1d3c",
          button1Text: "Enroll Now",
          button1Url: "https://example.com/enroll",
          button2Text: "Learn More",
          button2Url: "https://example.com/learn",
          enrollmentStartDate: "2025-09-01",
          enrollmentEndDate: "2025-09-30",
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
              image: "/placeholder.svg?height=200&width=300",
            },
            {
              id: "2",
              headline: "Enroll in your benefits now!",
              description: "Click here to be directed to your enrollment platform to enroll in your benefits.",
              link: "https://example.com/enroll",
              image: "/placeholder.svg?height=30&width=120",
            },
            {
              id: "3",
              headline: "Short-term Income Protection",
              description: "Learn more about your Short-term Income Protection Benefits plan details.",
              link: "https://example.com/short-term",
              image: "/placeholder.svg?height=30&width=120",
            },
          ],
        }))
      }, 2000)
    } else {
      setUploadStatus("error")
    }
  }, [])

  const updateMicrositeData = useCallback((field: keyof MicrositeData, value: any) => {
    setMicrositeData((prev) => ({ ...prev, [field]: value }))
  }, [])

  const addTile = useCallback(() => {
    const newTile: Tile = {
      id: Date.now().toString(),
      headline: "",
      description: "",
      link: "",
      image: getRandomImage(),
    }
    setMicrositeData((prev) => ({
      ...prev,
      tiles: [...prev.tiles, newTile],
    }))
  }, [getRandomImage])

  const updateTile = useCallback((id: string, field: keyof Tile, value: any) => {
    setMicrositeData((prev) => ({
      ...prev,
      tiles: prev.tiles.map((tile) => (tile.id === id ? { ...tile, [field]: value } : tile)),
    }))
  }, [])

  const deleteTile = useCallback((id: string) => {
    setMicrositeData((prev) => ({
      ...prev,
      tiles: prev.tiles.filter((tile) => tile.id !== id),
    }))
  }, [])

  const isFormValid = () => {
    return (
      micrositeData.employerLogo &&
      micrositeData.heroImage &&
      micrositeData.enrollmentStartDate &&
      micrositeData.enrollmentEndDate &&
      micrositeData.button1Text &&
      micrositeData.button1Url &&
      micrositeData.button2Text &&
      micrositeData.button2Url &&
      micrositeData.footerContent &&
      micrositeData.footerDisclaimer &&
      micrositeData.tiles.length > 0 &&
      micrositeData.tiles.every((tile) => tile.headline && tile.description && tile.link)
    )
  }

  const getMissingFields = () => {
    const missing: string[] = []

    if (!micrositeData.employerLogo) missing.push("Employer Logo")
    if (!micrositeData.heroImage) missing.push("Hero Image")
    if (!micrositeData.enrollmentStartDate) missing.push("Enrollment Start Date")
    if (!micrositeData.enrollmentEndDate) missing.push("Enrollment End Date")
    if (!micrositeData.button1Text) missing.push("Button 1 Text")
    if (!micrositeData.button1Url) missing.push("Button 1 URL")
    if (!micrositeData.button2Text) missing.push("Button 2 Text")
    if (!micrositeData.button2Url) missing.push("Button 2 URL")
    if (!micrositeData.footerContent) missing.push("Footer Content")
    if (!micrositeData.footerDisclaimer) missing.push("Footer Disclaimer")
    if (!micrositeData.primaryColor) missing.push("Primary Color")

    if (micrositeData.tiles.length === 0) {
      missing.push("At least one tile")
    } else {
      micrositeData.tiles.forEach((tile, index) => {
        if (!tile.headline) missing.push(`Tile ${index + 1} Headline`)
        if (!tile.description) missing.push(`Tile ${index + 1} Description`)
        if (!tile.link) missing.push(`Tile ${index + 1} Link`)
      })
    }

    return missing
  }

  const handlePublish = useCallback(() => {
    if (!isFormValid()) return

    setPublishStatus("publishing")
    setTimeout(() => {
      const slug = "employer-" + Date.now()
      setPublishedUrl(`https://build.nayya.com/${slug}`)
      setPublishStatus("published")
    }, 3000)
  }, [micrositeData])

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Microsite Generator</h1>
          <p className="text-gray-600">Create branded microsites for The Hartford employers</p>
        </div>

        {/* Upload Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">
                1
              </span>
              Upload Employer Data File (.xlsx)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <Label htmlFor="file-upload" className="cursor-pointer">
                <span className="text-sm font-medium text-gray-700">Click to upload</span>
                <span className="text-sm text-gray-500 ml-1">or drag and drop</span>
              </Label>
              <Input id="file-upload" type="file" accept=".xlsx" onChange={handleFileUpload} className="hidden" />
              <p className="text-xs text-gray-500 mt-2">Excel files only (.xlsx)</p>
            </div>
            {uploadStatus === "uploading" && (
              <div className="mt-4 flex items-center gap-2 text-blue-600">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                Processing file...
              </div>
            )}
            {uploadStatus === "success" && (
              <div className="mt-4 flex items-center gap-2 text-green-600">
                <CheckCircle className="h-4 w-4" />
                File uploaded successfully
              </div>
            )}
            {uploadStatus === "error" && (
              <Alert className="mt-4" variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>Please upload a valid Excel file (.xlsx)</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Configuration Form */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">
                2
              </span>
              <h2 className="text-xl font-semibold">Configure Microsite Details</h2>
            </div>

            {/* Header Section */}
            <Card>
              <Collapsible open={openSections.header} onOpenChange={() => toggleSection("header")}>
                <CollapsibleTrigger asChild>
                  <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors">
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Layout className="h-5 w-5" />
                        Header
                      </div>
                      {openSections.header ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                    </CardTitle>
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent className="space-y-6">
                    {/* Employer Logo */}
                    <div className="space-y-2">
                      <Label htmlFor="employer-logo">Employer Logo *</Label>
                      <Input
                        id="employer-logo"
                        type="file"
                        accept="image/*"
                        onChange={(e) => updateMicrositeData("employerLogo", e.target.files?.[0])}
                      />
                      {micrositeData.employerLogo && (
                        <div className="mt-2">
                          <img
                            src={
                              micrositeData.employerLogo instanceof File
                                ? URL.createObjectURL(micrositeData.employerLogo)
                                : micrositeData.employerLogo
                            }
                            alt="Employer Logo Preview"
                            className="h-16 object-contain"
                          />
                        </div>
                      )}
                    </div>

                    {/* Hero Image */}
                    <div className="space-y-2">
                      <Label htmlFor="hero-image">Hero Image *</Label>
                      <Input
                        id="hero-image"
                        type="file"
                        accept="image/*"
                        onChange={(e) => updateMicrositeData("heroImage", e.target.files?.[0])}
                      />
                      {micrositeData.heroImage && (
                        <div className="mt-2">
                          <img
                            src={
                              micrositeData.heroImage instanceof File
                                ? URL.createObjectURL(micrositeData.heroImage)
                                : micrositeData.heroImage
                            }
                            alt="Hero Image Preview"
                            className="h-24 w-full object-cover rounded"
                          />
                        </div>
                      )}
                    </div>

                    {/* Enrollment Period */}
                    <div className="space-y-2">
                      <Label>Enrollment Period *</Label>
                      <div className="flex gap-2 items-center">
                        <Input
                          type="date"
                          value={micrositeData.enrollmentStartDate}
                          onChange={(e) => updateMicrositeData("enrollmentStartDate", e.target.value)}
                          aria-label="Enrollment Start Date"
                        />
                        <span className="text-gray-500">to</span>
                        <Input
                          type="date"
                          value={micrositeData.enrollmentEndDate}
                          onChange={(e) => updateMicrositeData("enrollmentEndDate", e.target.value)}
                          aria-label="Enrollment End Date"
                        />
                      </div>
                    </div>

                    {/* Buttons */}
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Button 1 *</Label>
                        <div className="flex gap-2">
                          <Input
                            placeholder="Button text"
                            value={micrositeData.button1Text}
                            onChange={(e) => updateMicrositeData("button1Text", e.target.value)}
                            aria-label="Button 1 Text"
                          />
                          <Input
                            type="url"
                            placeholder="Button URL"
                            value={micrositeData.button1Url}
                            onChange={(e) => updateMicrositeData("button1Url", e.target.value)}
                            aria-label="Button 1 URL"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Button 2 *</Label>
                        <div className="flex gap-2">
                          <Input
                            placeholder="Button text"
                            value={micrositeData.button2Text}
                            onChange={(e) => updateMicrositeData("button2Text", e.target.value)}
                            aria-label="Button 2 Text"
                          />
                          <Input
                            type="url"
                            placeholder="Button URL"
                            value={micrositeData.button2Url}
                            onChange={(e) => updateMicrositeData("button2Url", e.target.value)}
                            aria-label="Button 2 URL"
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card>

            {/* Tiles Section */}
            <Card>
              <Collapsible open={openSections.tiles} onOpenChange={() => toggleSection("tiles")}>
                <CollapsibleTrigger asChild>
                  <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors">
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Grid3X3 className="h-5 w-5" />
                        Tiles ({micrositeData.tiles.length})
                      </div>
                      {openSections.tiles ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                    </CardTitle>
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label className="text-lg font-semibold">Benefit Tiles *</Label>
                      <Button onClick={addTile} variant="outline" size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Tile
                      </Button>
                    </div>

                    {micrositeData.tiles.map((tile, index) => (
                      <Card key={tile.id} className="p-4 bg-gray-50">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-medium">Tile {index + 1}</h4>
                          <Button
                            onClick={() => deleteTile(tile.id)}
                            variant="ghost"
                            size="sm"
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="space-y-3">
                          <div>
                            <Label>Image (optional)</Label>
                            <Input
                              type="file"
                              accept="image/*"
                              onChange={(e) => updateTile(tile.id, "image", e.target.files?.[0])}
                              className="mt-1"
                            />
                            {tile.image && (
                              <img
                                src={tile.image instanceof File ? URL.createObjectURL(tile.image) : tile.image}
                                alt="Tile Preview"
                                className="h-16 w-24 object-cover rounded mt-2"
                              />
                            )}
                          </div>
                          <Input
                            placeholder="Headline"
                            value={tile.headline}
                            onChange={(e) => updateTile(tile.id, "headline", e.target.value)}
                          />
                          <Input
                            placeholder="Description"
                            value={tile.description}
                            onChange={(e) => updateTile(tile.id, "description", e.target.value)}
                          />
                          <Input
                            type="url"
                            placeholder="Link URL"
                            value={tile.link}
                            onChange={(e) => updateTile(tile.id, "link", e.target.value)}
                          />
                        </div>
                      </Card>
                    ))}

                    {micrositeData.tiles.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        <p>No tiles added yet. Click "Add Tile" to get started.</p>
                      </div>
                    )}

                    <p className="text-sm text-gray-600">
                      If no image is uploaded for a tile, a random image will be assigned from the media library.
                    </p>
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card>

            {/* Footer Content Section */}
            <Card>
              <Collapsible open={openSections.footer} onOpenChange={() => toggleSection("footer")}>
                <CollapsibleTrigger asChild>
                  <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors">
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        Footer Content
                      </div>
                      {openSections.footer ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                    </CardTitle>
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent className="space-y-6">
                    {/* Footer Content */}
                    <div className="space-y-2">
                      <Label htmlFor="footer-content">Footer Content *</Label>
                      <Textarea
                        id="footer-content"
                        rows={3}
                        placeholder="Enter footer content..."
                        value={micrositeData.footerContent}
                        onChange={(e) => updateMicrositeData("footerContent", e.target.value)}
                      />
                    </div>

                    {/* Footer Disclaimer */}
                    <div className="space-y-2">
                      <Label htmlFor="footer-disclaimer">Footer Disclaimer *</Label>
                      <Textarea
                        id="footer-disclaimer"
                        rows={4}
                        placeholder="Enter footer disclaimer text..."
                        value={micrositeData.footerDisclaimer}
                        onChange={(e) => updateMicrositeData("footerDisclaimer", e.target.value)}
                      />
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card>

            {/* Design Section */}
            <Card>
              <Collapsible open={openSections.design} onOpenChange={() => toggleSection("design")}>
                <CollapsibleTrigger asChild>
                  <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors">
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Palette className="h-5 w-5" />
                        Design
                      </div>
                      {openSections.design ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                    </CardTitle>
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent className="space-y-6">
                    {/* Primary Color */}
                    <div className="space-y-2">
                      <Label htmlFor="primary-color">Primary Color *</Label>
                      <div className="flex gap-2 items-center">
                        <Input
                          id="primary-color"
                          type="color"
                          value={micrositeData.primaryColor}
                          onChange={(e) => updateMicrositeData("primaryColor", e.target.value)}
                          className="w-16 h-10"
                        />
                        <span className="text-sm text-gray-600">{micrositeData.primaryColor}</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-2">
                        This color will be applied to buttons, links, and the footer background.
                      </p>
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card>
          </div>

          {/* Live Preview */}
          <div className="lg:sticky lg:top-4 lg:h-fit">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Live Preview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg overflow-hidden bg-white" style={{ minHeight: "600px" }}>
                  {/* Preview Header */}
                  <div className="flex flex-col md:flex-row">
                    <div className="p-6 flex-1">
                      <div className="flex items-center gap-2 mb-6">
                        <img src="/placeholder.svg?height=30&width=120" alt="The Hartford" className="h-8" />
                        {micrositeData.employerLogo && (
                          <img
                            src={
                              micrositeData.employerLogo instanceof File
                                ? URL.createObjectURL(micrositeData.employerLogo)
                                : micrositeData.employerLogo
                            }
                            alt="Employer Logo"
                            className="h-8"
                          />
                        )}
                      </div>
                    </div>
                    <div className="flex-1">
                      {micrositeData.heroImage ? (
                        <img
                          src={
                            micrositeData.heroImage instanceof File
                              ? URL.createObjectURL(micrositeData.heroImage)
                              : micrositeData.heroImage
                          }
                          alt="Hero"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <img
                          src="/placeholder.svg?height=300&width=400"
                          alt="Hero"
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                  </div>

                  {/* Preview Content */}
                  <div className="p-6">
                    {/* Hero Section */}
                    <div className="mb-8">
                      <h2 className="text-xl font-bold mb-2">During Annual Enrollment you can enroll</h2>
                      <p className="text-lg mb-4">
                        {micrositeData.enrollmentStartDate && micrositeData.enrollmentEndDate
                          ? `${new Date(micrositeData.enrollmentStartDate).toLocaleDateString("en-US", { month: "long", day: "numeric" })} – ${new Date(micrositeData.enrollmentEndDate).toLocaleDateString("en-US", { month: "long", day: "numeric" })}`
                          : "Open Enrollment Period"}
                      </p>
                      <p className="text-sm mb-4">Your benefits provided by ABC company from the Hartford</p>

                      {/* Buttons */}
                      <div className="flex gap-4 mb-8">
                        {micrositeData.button1Text && (
                          <Button style={{ backgroundColor: micrositeData.primaryColor }} className="text-white">
                            {micrositeData.button1Text}
                          </Button>
                        )}
                        {micrositeData.button2Text && <Button variant="outline">{micrositeData.button2Text}</Button>}
                      </div>
                    </div>

                    {/* Tiles */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                      {micrositeData.tiles.map((tile) => (
                        <div
                          key={tile.id}
                          className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                        >
                          <div className="aspect-video relative bg-gray-100">
                            <img
                              src={
                                tile.image instanceof File
                                  ? URL.createObjectURL(tile.image)
                                  : tile.image || getRandomImage()
                              }
                              alt={tile.headline}
                              className="w-full h-full object-cover"
                              style={
                                tile.id === "3" || tile.id === "4" || tile.id === "8"
                                  ? { backgroundColor: micrositeData.primaryColor }
                                  : {}
                              }
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-white p-2">
                              <img src="/placeholder.svg?height=30&width=120" alt="The Hartford" className="h-6" />
                            </div>
                          </div>
                          <div className="p-4">
                            <h3 className="font-semibold text-lg mb-1">{tile.headline}</h3>
                            <p className="text-gray-600 text-sm mb-3">{tile.description}</p>
                            {tile.link && (
                              <div
                                className="flex items-center gap-1 text-sm"
                                style={{ color: micrositeData.primaryColor }}
                              >
                                <span>Learn more</span>
                                <ExternalLink className="h-3 w-3" />
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Footer */}
                    {micrositeData.footerContent && (
                      <div
                        className="mt-8 p-4 text-white text-sm"
                        style={{ backgroundColor: micrositeData.primaryColor }}
                      >
                        <p className="mb-2">{micrositeData.footerDisclaimer}</p>
                        <p>{micrositeData.footerContent}</p>
                        <div className="text-right mt-2">
                          <span className="text-xs">Privacy Policy</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Publish Section */}
        <Card className="mt-8">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Form Status:</span>
                  {isFormValid() ? (
                    <Badge variant="default" className="bg-green-100 text-green-800">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Ready to Publish
                    </Badge>
                  ) : (
                    <div className="flex flex-col gap-2">
                      <Badge variant="secondary">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        Missing Required Fields ({getMissingFields().length})
                      </Badge>
                      <div className="flex flex-wrap gap-1">
                        {getMissingFields()
                          .slice(0, 5)
                          .map((field, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="text-xs bg-red-50 text-red-700 border-red-200"
                            >
                              {field}
                            </Badge>
                          ))}
                        {getMissingFields().length > 5 && (
                          <Badge variant="outline" className="text-xs bg-gray-50 text-gray-600">
                            +{getMissingFields().length - 5} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                {publishStatus === "published" && publishedUrl && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-green-600 font-medium">Published:</span>
                    <a
                      href={publishedUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:underline flex items-center gap-1"
                    >
                      {publishedUrl}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                )}
              </div>
              <Button
                onClick={handlePublish}
                disabled={!isFormValid() || publishStatus === "publishing"}
                size="lg"
                style={{ backgroundColor: isFormValid() ? micrositeData.primaryColor : undefined }}
                className={isFormValid() ? "text-white" : ""}
              >
                {publishStatus === "publishing" ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Publishing...
                  </>
                ) : publishStatus === "published" ? (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Published
                  </>
                ) : (
                  "Publish Microsite"
                )}
              </Button>
            </div>

            {!isFormValid() && (
              <Alert className="mt-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <div className="space-y-2">
                    <p>Please complete the following required fields before publishing:</p>
                    <div className="grid grid-cols-2 gap-1 text-sm">
                      {getMissingFields().map((field, index) => (
                        <div key={index} className="flex items-center gap-1">
                          <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                          {field}
                        </div>
                      ))}
                    </div>
                  </div>
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
