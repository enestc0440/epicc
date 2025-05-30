"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import {
  Search,
  Copy,
  Trash2,
  Save,
  Camera,
  Shield,
  Eye,
  Terminal,
  Database,
  Brain,
  FileText,
  Network,
  Settings,
  Activity,
  Play,
  CircleStop,
  Scan,
  Download,
  X,
  AlertCircle,
  Clock,
  Send,
  Upload,
} from "lucide-react"
import MatrixBackground from "@/components/matrix-background"
import CategoryPanel from "@/components/category-panel"
import OutputTerminal from "@/components/output-terminal"
import { categories } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function Home() {
  const [result, setResult] = useState<string>("ΣPIC PΛПΣL Terminal Initialized...")
  const [resultType, setResultType] = useState<"success" | "error" | "info">("info")
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [originalResult, setOriginalResult] = useState("")
  const [queryHistory, setQueryHistory] = useState<
    Array<{ id: string; query: string; result: string; timestamp: Date }>
  >([])
  const [notifications, setNotifications] = useState<
    Array<{ id: string; message: string; type: "success" | "error" | "info" }>
  >([])
  const [activeTab, setActiveTab] = useState("tools")
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null)
  const [isRecording, setIsRecording] = useState(false)
  const [progress, setProgress] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Database File Upload State
  const [dbFiles, setDbFiles] = useState<File[]>([])
  const [sqlQuery, setSqlQuery] = useState("")
  const [queryResults, setQueryResults] = useState("")
  const [isProcessingQuery, setIsProcessingQuery] = useState(false)

  // CORTEX AI Chat State
  const [chatMessages, setChatMessages] = useState<Array<{ role: "user" | "assistant"; content: string }>>([
    { role: "assistant", content: "CORTEX AI Online. How can I assist with your cyber operations?" },
  ])

  // Multi AI Provider State
  const [selectedAIProvider, setSelectedAIProvider] = useState("cortex")
  const [apiKeys, setApiKeys] = useState({
    openai: "",
    anthropic: "",
    grok: "",
    gemini: "",
    cohere: "",
  })
  const [aiProviderMessages, setAiProviderMessages] = useState<
    Record<string, Array<{ role: "user" | "assistant"; content: string }>>
  >({
    cortex: [{ role: "assistant", content: "CORTEX AI Online. How can I assist with your cyber operations?" }],
    openai: [{ role: "assistant", content: "ChatGPT ready. How can I help you today?" }],
    anthropic: [{ role: "assistant", content: "Claude here. What would you like to discuss?" }],
    grok: [{ role: "assistant", content: "Grok AI activated. Ready for any questions!" }],
    gemini: [{ role: "assistant", content: "Gemini AI online. How may I assist you?" }],
    cohere: [{ role: "assistant", content: "Cohere AI ready. What can I help you with?" }],
  })
  const [currentAIInput, setCurrentAIInput] = useState("")

  // Face Recognition State
  const [faceImage, setFaceImage] = useState<string | null>(null)
  const [faceResults, setFaceResults] = useState<any>(null)

  // Advanced Features State
  const [threatLevel, setThreatLevel] = useState(0)
  const [systemStatus, setSystemStatus] = useState("SECURE")
  const [activeConnections, setActiveConnections] = useState(0)
  const [dataProcessed, setDataProcessed] = useState(0)

  useEffect(() => {
    // Simulate real-time threat monitoring
    const interval = setInterval(() => {
      setThreatLevel(Math.floor(Math.random() * 100))
      setActiveConnections(Math.floor(Math.random() * 50) + 10)
      setDataProcessed((prev) => prev + Math.floor(Math.random() * 1000))

      if (Math.random() > 0.95) {
        addNotification(`Threat detected: Level ${Math.floor(Math.random() * 10)}`, "error")
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const addNotification = (message: string, type: "success" | "error" | "info") => {
    const id = Date.now().toString()
    setNotifications((prev) => [...prev, { id, message, type }])
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id))
    }, 5000)
  }

  const handleExecute = async (category: string, apiName: string, params: Record<string, any>) => {
    setLoading(true)
    setResult("Processing...")
    setProgress(0)

    try {
      // Progress simulation
      const progressInterval = setInterval(() => {
        setProgress((prev) => Math.min(prev + 10, 90))
      }, 200)

      // Handle special local functions
      if (apiName === "browser") {
        const browserInfo = `ΣPIC PΛПΣL Browser Analysis:
═══════════════════════════════════════
User Agent: ${navigator.userAgent}
Platform: ${navigator.platform}
Language: ${navigator.language}
Cookies Enabled: ${navigator.cookieEnabled}
Screen Resolution: ${screen.width}x${screen.height}
Color Depth: ${screen.colorDepth}-bit
Window Size: ${window.innerWidth}x${window.innerHeight}
Online Status: ${navigator.onLine}
Touch Support: ${navigator.maxTouchPoints > 0 ? "Yes" : "No"}
Device Memory: ${(navigator as any).deviceMemory || "Unknown"} GB
CPU Cores: ${navigator.hardwareConcurrency || "Unknown"}
Connection Type: ${(navigator as any).connection?.effectiveType || "Unknown"}
Battery Level: ${await getBatteryLevel()}%
Geolocation: ${await getGeolocation()}
WebGL Support: ${getWebGLSupport()}
Local Storage: ${getStorageInfo()}
Session Storage: ${getSessionStorageInfo()}
IndexedDB: ${getIndexedDBSupport()}
WebRTC: ${getWebRTCSupport()}
Service Worker: ${getServiceWorkerSupport()}
Push Notifications: ${getPushNotificationSupport()}
Clipboard API: ${getClipboardSupport()}
Camera/Microphone: ${await getMediaDeviceSupport()}
Bluetooth: ${getBluetoothSupport()}
USB: ${getUSBSupport()}
NFC: ${getNFCSupport()}
Payment Request: ${getPaymentRequestSupport()}
Web Authentication: ${getWebAuthSupport()}
Permissions: ${await getPermissionsStatus()}
═══════════════════════════════════════`

        clearInterval(progressInterval)
        setProgress(100)
        setResult(browserInfo)
        setOriginalResult(browserInfo)
        setResultType("info")
        addNotification("Browser analysis completed", "success")
        addToHistory("Browser Analysis", browserInfo)
        setLoading(false)
        return
      }

      if (apiName === "camera") {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { width: 1280, height: 720 },
            audio: false,
          })

          if (videoRef.current) {
            videoRef.current.srcObject = stream
            videoRef.current.play()
          }

          setCameraStream(stream)

          const cameraInfo = `ΣPIC PΛПΣL Camera System:
═══════════════════════════════════════
Status: ACTIVE
Resolution: 1280x720
Frame Rate: 30 FPS
Device: ${stream.getVideoTracks()[0].label}
Capabilities: ${JSON.stringify(stream.getVideoTracks()[0].getCapabilities(), null, 2)}
Settings: ${JSON.stringify(stream.getVideoTracks()[0].getSettings(), null, 2)}
═══════════════════════════════════════
Camera feed is now active. Use controls below to capture or record.`

          clearInterval(progressInterval)
          setProgress(100)
          setResult(cameraInfo)
          setOriginalResult(cameraInfo)
          setResultType("success")
          addNotification("Camera activated successfully", "success")
          addToHistory("Camera Activation", cameraInfo)
        } catch (err: any) {
          clearInterval(progressInterval)
          setProgress(100)
          const errorMsg = `ΣPIC PΛПΣL Camera Error:
═══════════════════════════════════════
Error: ${err.name} - ${err.message}
Possible Solutions:
1. Grant camera permissions
2. Check if camera is being used by another app
3. Try refreshing the page
4. Check browser settings
═══════════════════════════════════════`
          setResult(errorMsg)
          setResultType("error")
          addNotification("Camera access failed", "error")
        }
        setLoading(false)
        return
      }

      if (apiName === "cortex_ai") {
        const response = await handleCortexAI(params.prompt)
        clearInterval(progressInterval)
        setProgress(100)
        setResult(response)
        setOriginalResult(response)
        setResultType("success")
        addNotification("CORTEX AI response generated", "success")
        addToHistory("CORTEX AI", response)
        setLoading(false)
        return
      }

      if (apiName === "face_recognition") {
        const response = await handleFaceRecognition(params.image)
        clearInterval(progressInterval)
        setProgress(100)
        setResult(response)
        setOriginalResult(response)
        setResultType("success")
        addNotification("Face recognition completed", "success")
        addToHistory("Face Recognition", response)
        setLoading(false)
        return
      }

      // Handle API calls
      const response = await fetch(`/api/${apiName}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "An error occurred")
      }

      clearInterval(progressInterval)
      setProgress(100)

      const resultText = typeof data === "object" ? JSON.stringify(data, null, 2) : data
      setResult(resultText)
      setOriginalResult(resultText)
      setResultType("success")
      addNotification("Operation completed successfully", "success")
      addToHistory(`${category} - ${apiName}`, resultText)
    } catch (error) {
      console.error("Error:", error)
      const errorMsg = `ΣPIC PΛПΣL Error:
═══════════════════════════════════════
${error instanceof Error ? error.message : "Unknown error"}
═══════════════════════════════════════`
      setResult(errorMsg)
      setResultType("error")
      addNotification("Operation failed", "error")
    } finally {
      setLoading(false)
      setProgress(0)
    }
  }

  const addToHistory = (query: string, result: string) => {
    const historyItem = {
      id: Date.now().toString(),
      query,
      result,
      timestamp: new Date(),
    }
    setQueryHistory((prev) => [historyItem, ...prev.slice(0, 49)]) // Keep last 50
  }

  const handleCortexAI = async (prompt: string): Promise<string> => {
    // Simulate AI processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const responses = [
      `CORTEX AI Analysis: "${prompt}"
═══════════════════════════════════════
Based on your query, I recommend the following cyber operations:

1. Initial Reconnaissance
 - Port scanning with Nmap
 - Service enumeration
 - OS fingerprinting

2. Vulnerability Assessment
 - Web application scanning
 - Network vulnerability scan
 - Configuration review

3. Exploitation Phase
 - Exploit development
 - Payload delivery
 - Privilege escalation

4. Post-Exploitation
 - Data exfiltration
 - Persistence mechanisms
 - Lateral movement

Risk Level: MODERATE
Estimated Time: 2-4 hours
Success Probability: 78%
═══════════════════════════════════════`,

      `CORTEX AI Threat Intelligence: "${prompt}"
═══════════════════════════════════════
Threat Analysis Complete:

IOCs Identified: 15
Malware Families: 3
Attack Vectors: 7
Affected Systems: 12

Recommended Actions:
- Immediate isolation of affected systems
- Deploy additional monitoring
- Update security signatures
- Conduct forensic analysis

Threat Level: HIGH
Confidence: 92%
═══════════════════════════════════════`,
    ]

    return responses[Math.floor(Math.random() * responses.length)]
  }

  const handleFaceRecognition = async (imageData: string): Promise<string> => {
    // Simulate face recognition processing
    await new Promise((resolve) => setTimeout(resolve, 3000))

    return `ΣPIC PΛПΣL Face Recognition Results:
═══════════════════════════════════════
Face Detected: YES
Confidence: 94.7%
Age Estimate: 28-32 years
Gender: Male (87% confidence)
Emotion: Neutral (76%)

Facial Features:
- Eyes: Brown
- Hair: Dark Brown
- Facial Hair: Clean Shaven
- Glasses: No

Database Matches: 3 potential matches found
- Match 1: 78% similarity
- Match 2: 65% similarity  
- Match 3: 52% similarity

Biometric Hash: 7f4a8b2c9e1d6f3a8b5c2e9f1d4a7b8c
═══════════════════════════════════════`
  }

  const getBatteryLevel = async (): Promise<number> => {
    try {
      const battery = await (navigator as any).getBattery()
      return Math.round(battery.level * 100)
    } catch {
      return 0
    }
  }

  const getGeolocation = async (): Promise<string> => {
    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
      })
      return `${position.coords.latitude}, ${position.coords.longitude}`
    } catch {
      return "Permission denied"
    }
  }

  const getWebGLSupport = (): string => {
    const canvas = document.createElement("canvas")
    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl")
    return gl ? "Supported" : "Not supported"
  }

  const getStorageInfo = (): string => {
    try {
      localStorage.setItem("test", "test")
      localStorage.removeItem("test")
      return "Available"
    } catch {
      return "Not available"
    }
  }

  const getSessionStorageInfo = (): string => {
    try {
      sessionStorage.setItem("test", "test")
      sessionStorage.removeItem("test")
      return "Available"
    } catch {
      return "Not available"
    }
  }

  const getIndexedDBSupport = (): string => {
    return "indexedDB" in window ? "Supported" : "Not supported"
  }

  const getWebRTCSupport = (): string => {
    return "RTCPeerConnection" in window ? "Supported" : "Not supported"
  }

  const getServiceWorkerSupport = (): string => {
    return "serviceWorker" in navigator ? "Supported" : "Not supported"
  }

  const getPushNotificationSupport = (): string => {
    return "PushManager" in window ? "Supported" : "Not supported"
  }

  const getClipboardSupport = (): string => {
    return "clipboard" in navigator ? "Supported" : "Not supported"
  }

  const getMediaDeviceSupport = async (): Promise<string> => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices()
      const videoInputs = devices.filter((device) => device.kind === "videoinput")
      const audioInputs = devices.filter((device) => device.kind === "audioinput")
      return `Video: ${videoInputs.length}, Audio: ${audioInputs.length}`
    } catch {
      return "Not available"
    }
  }

  const getBluetoothSupport = (): string => {
    return "bluetooth" in navigator ? "Supported" : "Not supported"
  }

  const getUSBSupport = (): string => {
    return "usb" in navigator ? "Supported" : "Not supported"
  }

  const getNFCSupport = (): string => {
    return "nfc" in navigator ? "Supported" : "Not supported"
  }

  const getPaymentRequestSupport = (): string => {
    return "PaymentRequest" in window ? "Supported" : "Not supported"
  }

  const getWebAuthSupport = (): string => {
    return "credentials" in navigator ? "Supported" : "Not supported"
  }

  const getPermissionsStatus = async (): Promise<string> => {
    try {
      const permissions = ["camera", "microphone", "geolocation", "notifications"]
      const results = await Promise.all(
        permissions.map(async (permission) => {
          try {
            const result = await navigator.permissions.query({ name: permission as PermissionName })
            return `${permission}: ${result.state}`
          } catch {
            return `${permission}: unknown`
          }
        }),
      )
      return results.join(", ")
    } catch {
      return "Not available"
    }
  }

  const handleCopyOutput = () => {
    navigator.clipboard
      .writeText(result)
      .then(() => {
        addNotification("Output copied to clipboard", "success")
        toast({
          title: "Success",
          description: "Output copied to clipboard",
        })
      })
      .catch((err) => {
        addNotification("Copy failed: " + err, "error")
        toast({
          title: "Error",
          description: "Failed to copy output",
          variant: "destructive",
        })
      })
  }

  const handleClearOutput = () => {
    setResult("Terminal cleared.")
    setOriginalResult("Terminal cleared.")
    setResultType("info")
    setSearchTerm("")
    addNotification("Terminal cleared", "info")
  }

  const handleSaveOutput = () => {
    const blob = new Blob([result], { type: "text/plain;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `EPIC_PANEL_Output_${new Date().toISOString().replace(/[:.]/g, "-")}.txt`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    addNotification("Output saved to file", "success")
  }

  const handleExportReport = (format: "json" | "csv" | "pdf") => {
    const reportData = {
      timestamp: new Date().toISOString(),
      query_history: queryHistory,
      current_result: result,
      system_status: {
        threat_level: threatLevel,
        active_connections: activeConnections,
        data_processed: dataProcessed,
      },
    }

    if (format === "json") {
      const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: "application/json" })
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = `EPIC_PANEL_Report_${new Date().toISOString().replace(/[:.]/g, "-")}.json`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    } else if (format === "csv") {
      const csvContent = queryHistory
        .map((item) => `"${item.timestamp}","${item.query}","${item.result.replace(/"/g, '""')}"`)
        .join("\n")
      const blob = new Blob([csvContent], { type: "text/csv" })
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = `EPIC_PANEL_Report_${new Date().toISOString().replace(/[:.]/g, "-")}.csv`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    }

    addNotification(`Report exported as ${format.toUpperCase()}`, "success")
  }

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current
      const video = videoRef.current
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      const ctx = canvas.getContext("2d")
      if (ctx) {
        ctx.drawImage(video, 0, 0)
        const imageData = canvas.toDataURL("image/png")
        setFaceImage(imageData)
        addNotification("Photo captured", "success")
      }
    }
  }

  const startRecording = () => {
    if (cameraStream) {
      setIsRecording(true)
      addNotification("Recording started", "info")
      // Implement actual recording logic here
    }
  }

  const stopRecording = () => {
    setIsRecording(false)
    addNotification("Recording stopped", "info")
    // Implement actual recording stop logic here
  }

  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => track.stop())
      setCameraStream(null)
      if (videoRef.current) {
        videoRef.current.srcObject = null
      }
      addNotification("Camera stopped", "info")
    }
  }

  const handleChatSubmit = async () => {
    if (!currentAIInput.trim()) return

    const userMessage = { role: "user" as const, content: currentAIInput }

    // Update messages for current provider
    setAiProviderMessages((prev) => ({
      ...prev,
      [selectedAIProvider]: [...prev[selectedAIProvider], userMessage],
    }))

    setCurrentAIInput("")

    // Handle different AI providers
    if (selectedAIProvider === "cortex") {
      // Original CORTEX AI logic
      setTimeout(() => {
        const aiResponse = {
          role: "assistant" as const,
          content: `CORTEX AI: Processing "${userMessage.content}". Analyzing threat vectors and recommending countermeasures. Standby for detailed analysis...`,
        }
        setAiProviderMessages((prev) => ({
          ...prev,
          cortex: [...prev.cortex, aiResponse],
        }))
      }, 1000)
    } else {
      // Handle external AI providers
      await handleExternalAI(selectedAIProvider, userMessage.content)
    }
  }

  const handleExternalAI = async (provider: string, message: string) => {
    const apiKey = apiKeys[provider as keyof typeof apiKeys]

    if (!apiKey) {
      const errorResponse = {
        role: "assistant" as const,
        content: `Error: Please enter your ${provider.toUpperCase()} API key in the settings below.`,
      }
      setAiProviderMessages((prev) => ({
        ...prev,
        [provider]: [...prev[provider], errorResponse],
      }))
      return
    }

    try {
      let response

      switch (provider) {
        case "openai":
          response = await fetch("/api/ai/openai", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ apiKey, message }),
          })
          break
        case "anthropic":
          response = await fetch("/api/ai/anthropic", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ apiKey, message }),
          })
          break
        case "grok":
          response = await fetch("/api/ai/grok", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ apiKey, message }),
          })
          break
        case "gemini":
          response = await fetch("/api/ai/gemini", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ apiKey, message }),
          })
          break
        case "cohere":
          response = await fetch("/api/ai/cohere", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ apiKey, message }),
          })
          break
        default:
          throw new Error("Unsupported AI provider")
      }

      const data = await response?.json()

      if (!response?.ok) {
        throw new Error(data.error || "AI request failed")
      }

      const aiResponse = {
        role: "assistant" as const,
        content: data.response || data.content || "No response received",
      }

      setAiProviderMessages((prev) => ({
        ...prev,
        [provider]: [...prev[provider], aiResponse],
      }))
    } catch (error) {
      const errorResponse = {
        role: "assistant" as const,
        content: `Error: ${error instanceof Error ? error.message : "Unknown error occurred"}`,
      }
      setAiProviderMessages((prev) => ({
        ...prev,
        [provider]: [...prev[provider], errorResponse],
      }))
    }
  }

  const handleApiKeyChange = (provider: string, key: string) => {
    setApiKeys((prev) => ({
      ...prev,
      [provider]: key,
    }))
  }

  // Database File Upload Handlers
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files)
      setDbFiles((prev) => [...prev, ...fileArray])
      addNotification(`${fileArray.length} database file(s) uploaded`, "success")
    }
  }

  const handleRemoveFile = (index: number) => {
    setDbFiles(dbFiles.filter((_, i) => i !== index))
    addNotification("File removed", "info")
  }

  const executeQuery = async () => {
    if (!sqlQuery.trim() || dbFiles.length === 0) {
      setQueryResults("Please upload files and enter a query")
      setResultType("error")
      addNotification("Query execution failed: Missing files or query", "error")
      return
    }

    setIsProcessingQuery(true)
    setLoading(true)
    setProgress(0)

    try {
      // Progress simulation
      const progressInterval = setInterval(() => {
        setProgress((prev) => Math.min(prev + 10, 90))
      }, 200)

      // Simulate database query execution
      await new Promise((resolve) => setTimeout(resolve, 1500))

      clearInterval(progressInterval)
      setProgress(100)

      const mockResult = `ΣPIC PΛПΣL Database Query Results:
═══════════════════════════════════════
Query: ${sqlQuery}
Files Analyzed: ${dbFiles.map((f) => f.name).join(", ")}
Execution Time: 0.023s

Results:
${generateMockQueryResults(sqlQuery, dbFiles)}
═══════════════════════════════════════`

      setQueryResults(mockResult)
      setResult(mockResult)
      setOriginalResult(mockResult)
      setResultType("success")
      addNotification("Query executed successfully", "success")
      addToHistory(`Database Query: ${sqlQuery}`, mockResult)
    } catch (error) {
      console.error("Error executing query:", error)
      const errorMsg = `ΣPIC PΛПΣL Database Error:
═══════════════════════════════════════
${error instanceof Error ? error.message : "Unknown error"}
═══════════════════════════════════════`
      setQueryResults(errorMsg)
      setResult(errorMsg)
      setResultType("error")
      addNotification("Query execution failed", "error")
    } finally {
      setIsProcessingQuery(false)
      setLoading(false)
      setProgress(0)
    }
  }

  const generateMockQueryResults = (query: string, files: File[]): string => {
    const lowerQuery = query.toLowerCase()

    if (lowerQuery.includes("select")) {
      // Generate mock SELECT results
      const tableName = extractTableName(lowerQuery)
      return `Table: ${tableName}
Records Found: ${Math.floor(Math.random() * 20) + 1}

ID | Name       | Value
----------------------------
1  | Record1    | ${Math.random().toString(36).substring(2, 10)}
2  | Record2    | ${Math.random().toString(36).substring(2, 10)}
3  | Record3    | ${Math.random().toString(36).substring(2, 10)}
...`
    } else if (lowerQuery.includes("insert")) {
      return `Insert successful
Affected rows: 1
Last insert ID: ${Math.floor(Math.random() * 1000) + 1}`
    } else if (lowerQuery.includes("update")) {
      return `Update successful
Affected rows: ${Math.floor(Math.random() * 5) + 1}`
    } else if (lowerQuery.includes("delete")) {
      return `Delete successful
Affected rows: ${Math.floor(Math.random() * 3) + 1}`
    } else {
      return `Query executed successfully
No results to display`
    }
  }

  const extractTableName = (query: string): string => {
    const fromMatch = query.match(/from\s+(\w+)/i)
    if (fromMatch && fromMatch[1]) {
      return fromMatch[1]
    }

    const insertMatch = query.match(/insert\s+into\s+(\w+)/i)
    if (insertMatch && insertMatch[1]) {
      return insertMatch[1]
    }

    const updateMatch = query.match(/update\s+(\w+)/i)
    if (updateMatch && updateMatch[1]) {
      return updateMatch[1]
    }

    const deleteMatch = query.match(/delete\s+from\s+(\w+)/i)
    if (deleteMatch && deleteMatch[1]) {
      return deleteMatch[1]
    }

    return "unknown"
  }

  useEffect(() => {
    if (searchTerm) {
      const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi")
      const highlightedContent = originalResult.replace(regex, '<span class="highlight">$1</span>')
      setResult(highlightedContent)
    } else {
      setResult(originalResult)
    }
  }, [searchTerm, originalResult])

  return (
    <main className="min-h-screen bg-black text-[#00ff00] font-mono overflow-x-hidden relative">
      <MatrixBackground />

      {/* Notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {notifications.map((notification) => (
          <Alert
            key={notification.id}
            className={`w-80 ${
              notification.type === "error"
                ? "border-red-500 bg-red-950/50"
                : notification.type === "success"
                  ? "border-green-500 bg-green-950/50"
                  : "border-blue-500 bg-blue-950/50"
            }`}
          >
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{notification.message}</AlertDescription>
          </Alert>
        ))}
      </div>

      {/* Main Container */}
      <div className="container w-[95%] max-w-7xl mx-auto my-5 p-6 bg-black/95 border-[3px] border-[#00ff00] shadow-[0_0_25px_#00ff00,0_0_35px_#00ff00_inset,0_0_40px_rgba(0,255,0,0.5)] rounded-xl flex flex-col flex-grow relative z-10">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-[#00ff00] font-mono text-4xl mb-2 relative">
            <span className="glitch" data-text="ΣPIC PΛПΣL">
              ΣPIC PΛПΣL
            </span>
            <span className="version text-[#ff0000] text-sm align-super ml-1">v6.0</span>
          </h1>
          <p className="text-[#00aaff] text-lg">Ultimate Cybersecurity Operations Platform</p>
        </div>

        {/* Status Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-black/50 border-[#00ff00]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#00ff00]">Threat Level</p>
                  <p className="text-2xl font-bold text-[#ff0000]">{threatLevel}%</p>
                </div>
                <Shield className="h-8 w-8 text-[#ff0000]" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/50 border-[#00ff00]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#00ff00]">Active Connections</p>
                  <p className="text-2xl font-bold text-[#00aaff]">{activeConnections}</p>
                </div>
                <Network className="h-8 w-8 text-[#00aaff]" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/50 border-[#00ff00]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#00ff00]">Data Processed</p>
                  <p className="text-2xl font-bold text-[#ffff00]">{(dataProcessed / 1000).toFixed(1)}K</p>
                </div>
                <Database className="h-8 w-8 text-[#ffff00]" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/50 border-[#00ff00]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#00ff00]">System Status</p>
                  <p className="text-2xl font-bold text-[#00ff00]">{systemStatus}</p>
                </div>
                <Activity className="h-8 w-8 text-[#00ff00]" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-grow">
          <TabsList className="grid w-full grid-cols-7 bg-black/50 border border-[#00ff00]">
            <TabsTrigger value="tools" className="data-[state=active]:bg-[#00ff00] data-[state=active]:text-black">
              <Terminal className="w-4 h-4 mr-2" />
              Tools
            </TabsTrigger>
            <TabsTrigger value="ai" className="data-[state=active]:bg-[#00ff00] data-[state=active]:text-black">
              <Brain className="w-4 h-4 mr-2" />
              CORTEX AI
            </TabsTrigger>
            <TabsTrigger value="camera" className="data-[state=active]:bg-[#00ff00] data-[state=active]:text-black">
              <Camera className="w-4 h-4 mr-2" />
              Camera
            </TabsTrigger>
            <TabsTrigger value="database" className="data-[state=active]:bg-[#00ff00] data-[state=active]:text-black">
              <Database className="w-4 h-4 mr-2" />
              Database
            </TabsTrigger>
            <TabsTrigger value="history" className="data-[state=active]:bg-[#00ff00] data-[state=active]:text-black">
              <Clock className="w-4 h-4 mr-2" />
              History
            </TabsTrigger>
            <TabsTrigger value="reports" className="data-[state=active]:bg-[#00ff00] data-[state=active]:text-black">
              <FileText className="w-4 h-4 mr-2" />
              Reports
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-[#00ff00] data-[state=active]:text-black">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Tools Tab */}
          <TabsContent value="tools" className="space-y-6">
            <div className="category-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {categories && Object.entries(categories).length > 0 ? (
                Object.entries(categories).map(([key, category]) => (
                  <CategoryPanel
                    key={key}
                    category={category}
                    onExecute={(apiName, params) => handleExecute(key, apiName, params)}
                  />
                ))
              ) : (
                <div className="col-span-full text-center text-[#ff0000] p-8">
                  <p>No categories available. Please check the data configuration.</p>
                </div>
              )}
            </div>

            {/* Output Section */}
            <div className="output-section bg-black/70 p-5 border border-[#008000] rounded-xl shadow-[0_0_10px_rgba(0,255,0,0.3)]">
              <h3 className="text-[#ff0000] font-mono text-2xl mt-0 mb-4 pb-2.5 border-b border-[#ff3333] shadow-[0_0_8px_#ff0000]">
                Terminal Output
              </h3>

              {/* Progress Bar */}
              {loading && (
                <div className="mb-4">
                  <Progress value={progress} className="w-full" />
                  <p className="text-[#00aaff] text-sm mt-2">Processing... {progress}%</p>
                </div>
              )}

              {/* Output Controls */}
              <div className="output-controls flex gap-2.5 mb-4 items-center flex-wrap">
                <div className="relative flex-grow min-w-[200px]">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#009900]" />
                  <Input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search results..."
                    className="pl-10 bg-[#001000] text-[#00ff00] border-[#00ff00] focus:border-[#66ff66]"
                  />
                </div>
                <Button
                  onClick={handleCopyOutput}
                  variant="outline"
                  size="sm"
                  className="border-[#00ff00] text-[#00ff00] hover:bg-[#00ff00] hover:text-black"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </Button>
                <Button
                  onClick={handleClearOutput}
                  variant="outline"
                  size="sm"
                  className="border-[#00ff00] text-[#00ff00] hover:bg-[#00ff00] hover:text-black"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear
                </Button>
                <Button
                  onClick={handleSaveOutput}
                  variant="outline"
                  size="sm"
                  className="border-[#00ff00] text-[#00ff00] hover:bg-[#00ff00] hover:text-black"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save
                </Button>
              </div>

              <OutputTerminal content={result} type={resultType} />
            </div>
          </TabsContent>

          <TabsContent value="ai" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* AI Provider Selection */}
              <Card className="bg-black/50 border-[#00ff00]">
                <CardHeader>
                  <CardTitle className="text-[#00ff00] flex items-center">
                    <Brain className="w-6 h-6 mr-2" />
                    AI Provider Selection
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-[#00ff00] mb-2 block">Select AI Provider</Label>
                    <Select value={selectedAIProvider} onValueChange={setSelectedAIProvider}>
                      <SelectTrigger className="bg-[#001000] text-[#00ff00] border-[#00ff00]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[#001000] border-[#00ff00]">
                        <SelectItem value="cortex" className="text-[#00ff00]">
                          CORTEX AI (Built-in)
                        </SelectItem>
                        <SelectItem value="openai" className="text-[#00ff00]">
                          ChatGPT (OpenAI)
                        </SelectItem>
                        <SelectItem value="anthropic" className="text-[#00ff00]">
                          Claude (Anthropic)
                        </SelectItem>
                        <SelectItem value="grok" className="text-[#00ff00]">
                          Grok (xAI)
                        </SelectItem>
                        <SelectItem value="gemini" className="text-[#00ff00]">
                          Gemini (Google)
                        </SelectItem>
                        <SelectItem value="cohere" className="text-[#00ff00]">
                          Cohere
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {selectedAIProvider !== "cortex" && (
                    <div>
                      <Label className="text-[#00ff00] mb-2 block">{selectedAIProvider.toUpperCase()} API Key</Label>
                      <Input
                        type="password"
                        placeholder={`Enter your ${selectedAIProvider.toUpperCase()} API key`}
                        value={apiKeys[selectedAIProvider as keyof typeof apiKeys]}
                        onChange={(e) => handleApiKeyChange(selectedAIProvider, e.target.value)}
                        className="bg-[#001000] text-[#00ff00] border-[#00ff00]"
                      />
                      <p className="text-[#00aaff] text-xs mt-1">
                        Get your API key from{" "}
                        {selectedAIProvider === "openai"
                          ? "platform.openai.com"
                          : selectedAIProvider === "anthropic"
                            ? "console.anthropic.com"
                            : selectedAIProvider === "grok"
                              ? "console.x.ai"
                              : selectedAIProvider === "gemini"
                                ? "makersuite.google.com"
                                : "dashboard.cohere.ai"}
                      </p>
                    </div>
                  )}

                  <div className="pt-4 border-t border-[#333]">
                    <h4 className="text-[#00ff00] font-bold mb-2">Provider Status</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-[#ccc]">CORTEX AI:</span>
                        <span className="text-[#00ff00]">Online</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#ccc]">ChatGPT:</span>
                        <span className={apiKeys.openai ? "text-[#00ff00]" : "text-[#ff0000]"}>
                          {apiKeys.openai ? "Ready" : "API Key Required"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#ccc]">Claude:</span>
                        <span className={apiKeys.anthropic ? "text-[#00ff00]" : "text-[#ff0000]"}>
                          {apiKeys.anthropic ? "Ready" : "API Key Required"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#ccc]">Grok:</span>
                        <span className={apiKeys.grok ? "text-[#00ff00]" : "text-[#ff0000]"}>
                          {apiKeys.grok ? "Ready" : "API Key Required"}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* AI Chat Interface */}
              <Card className="lg:col-span-2 bg-black/50 border-[#00ff00]">
                <CardHeader>
                  <CardTitle className="text-[#00ff00] flex items-center">
                    <Brain className="w-6 h-6 mr-2" />
                    {selectedAIProvider === "cortex"
                      ? "CORTEX AI Assistant"
                      : selectedAIProvider === "openai"
                        ? "ChatGPT Assistant"
                        : selectedAIProvider === "anthropic"
                          ? "Claude Assistant"
                          : selectedAIProvider === "grok"
                            ? "Grok Assistant"
                            : selectedAIProvider === "gemini"
                              ? "Gemini Assistant"
                              : "Cohere Assistant"}
                  </CardTitle>
                  <CardDescription className="text-[#00aaff]">
                    {selectedAIProvider === "cortex"
                      ? "Advanced AI-powered cybersecurity assistant"
                      : `External AI provider: ${selectedAIProvider.toUpperCase()}`}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[400px] w-full border border-[#00ff00] rounded p-4 mb-4 bg-black/30">
                    {aiProviderMessages[selectedAIProvider]?.map((message, index) => (
                      <div key={index} className={`mb-4 ${message.role === "user" ? "text-right" : "text-left"}`}>
                        <div
                          className={`inline-block p-3 rounded-lg max-w-[80%] ${
                            message.role === "user"
                              ? "bg-[#00ff00] text-black"
                              : selectedAIProvider === "cortex"
                                ? "bg-[#ff0000] text-white"
                                : selectedAIProvider === "openai"
                                  ? "bg-[#10a37f] text-white"
                                  : selectedAIProvider === "anthropic"
                                    ? "bg-[#d97706] text-white"
                                    : selectedAIProvider === "grok"
                                      ? "bg-[#1d4ed8] text-white"
                                      : selectedAIProvider === "gemini"
                                        ? "bg-[#4285f4] text-white"
                                        : "bg-[#39c5bb] text-white"
                          }`}
                        >
                          <p className="text-sm font-bold mb-1">
                            {message.role === "user"
                              ? "USER"
                              : selectedAIProvider === "cortex"
                                ? "CORTEX AI"
                                : selectedAIProvider.toUpperCase()}
                          </p>
                          <p className="whitespace-pre-wrap">{message.content}</p>
                        </div>
                      </div>
                    ))}
                  </ScrollArea>
                  <div className="flex gap-2">
                    <Input
                      value={currentAIInput}
                      onChange={(e) => setCurrentAIInput(e.target.value)}
                      placeholder={`Ask ${selectedAIProvider === "cortex" ? "CORTEX AI" : selectedAIProvider.toUpperCase()} anything...`}
                      className="bg-[#001000] text-[#00ff00] border-[#00ff00]"
                      onKeyPress={(e) => e.key === "Enter" && handleChatSubmit()}
                    />
                    <Button
                      onClick={handleChatSubmit}
                      className={`${
                        selectedAIProvider === "cortex"
                          ? "bg-[#00ff00] text-black hover:bg-[#00cc00]"
                          : selectedAIProvider === "openai"
                            ? "bg-[#10a37f] text-white hover:bg-[#0d8f6f]"
                            : selectedAIProvider === "anthropic"
                              ? "bg-[#d97706] text-white hover:bg-[#b45309]"
                              : selectedAIProvider === "grok"
                                ? "bg-[#1d4ed8] text-white hover:bg-[#1e40af]"
                                : selectedAIProvider === "gemini"
                                  ? "bg-[#4285f4] text-white hover:bg-[#3367d6]"
                                  : "bg-[#39c5bb] text-white hover:bg-[#319795]"
                      }`}
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Camera Tab */}
          <TabsContent value="camera" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-black/50 border-[#00ff00]">
                <CardHeader>
                  <CardTitle className="text-[#00ff00] flex items-center">
                    <Camera className="w-6 h-6 mr-2" />
                    Camera Feed
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <video
                      ref={videoRef}
                      className="w-full h-64 bg-black border border-[#00ff00] rounded"
                      autoPlay
                      muted
                    />
                    <canvas ref={canvasRef} className="hidden" />
                    {isRecording && (
                      <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-sm">REC</div>
                    )}
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button
                      onClick={capturePhoto}
                      variant="outline"
                      size="sm"
                      className="border-[#00ff00] text-[#00ff00]"
                    >
                      <Camera className="w-4 h-4 mr-2" />
                      Capture
                    </Button>
                    <Button
                      onClick={isRecording ? stopRecording : startRecording}
                      variant="outline"
                      size="sm"
                      className="border-[#ff0000] text-[#ff0000]"
                    >
                      {isRecording ? <CircleStop className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                      {isRecording ? "Stop" : "Record"}
                    </Button>
                    <Button
                      onClick={stopCamera}
                      variant="outline"
                      size="sm"
                      className="border-[#ffff00] text-[#ffff00]"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Stop Camera
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/50 border-[#00ff00]">
                <CardHeader>
                  <CardTitle className="text-[#00ff00] flex items-center">
                    <Eye className="w-6 h-6 mr-2" />
                    Face Recognition
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {faceImage && (
                    <div className="mb-4">
                      <img
                        src={faceImage || "/placeholder.svg"}
                        alt="Captured"
                        className="w-full h-32 object-cover border border-[#00ff00] rounded"
                      />
                    </div>
                  )}
                  <Button
                    onClick={() => handleExecute("ai", "face_recognition", { image: faceImage })}
                    className="w-full bg-[#00ff00] text-black hover:bg-[#00cc00]"
                    disabled={!faceImage}
                  >
                    <Scan className="w-4 h-4 mr-2" />
                    Analyze Face
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Database Tab */}
          <TabsContent value="database" className="space-y-6">
            <Card className="bg-black/50 border-[#00ff00]">
              <CardHeader>
                <CardTitle className="text-[#00ff00] flex items-center">
                  <Database className="w-6 h-6 mr-2" />
                  Database File Analyzer
                </CardTitle>
                <CardDescription className="text-[#00aaff]">
                  Upload and analyze MYD, MYI, FRM and other database files
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="file-upload" className="text-[#00ff00]">
                      Upload Database Files (MYD, MYI, FRM, etc.)
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        id="file-upload"
                        type="file"
                        multiple
                        onChange={handleFileUpload}
                        className="bg-[#001000] text-[#00ff00] border-[#00ff00]"
                      />
                      <Button
                        variant="outline"
                        className="border-[#00ff00] text-[#00ff00] hover:bg-[#00ff00] hover:text-black"
                      >
                        <Upload className="h-4 w-4 mr-2" /> Upload
                      </Button>
                    </div>
                  </div>

                  {dbFiles.length > 0 && (
                    <div className="space-y-2">
                      <Label className="text-[#00ff00]">Uploaded Files</Label>
                      <ScrollArea className="h-24 border border-[#00ff00] rounded p-2 bg-black/30">
                        {dbFiles.map((file, index) => (
                          <div key={index} className="flex justify-between items-center py-1">
                            <div className="flex items-center gap-2">
                              <FileText className="h-4 w-4 text-[#00ff00]" />
                              <span className="text-sm text-[#00ff00]">
                                {file.name} ({(file.size / 1024).toFixed(2)} KB)
                              </span>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveFile(index)}
                              className="h-6 w-6 p-0 text-[#ff0000] hover:text-[#ff3333] hover:bg-[#330000]"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </ScrollArea>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="sql-query" className="text-[#00ff00]">
                      SQL Query
                    </Label>
                    <Textarea
                      id="sql-query"
                      placeholder="Enter your SQL query here..."
                      value={sqlQuery}
                      onChange={(e) => setSqlQuery(e.target.value)}
                      className="bg-[#001000] text-[#00ff00] border-[#00ff00] min-h-[100px]"
                    />
                  </div>

                  <Button
                    onClick={executeQuery}
                    disabled={isProcessingQuery || dbFiles.length === 0 || !sqlQuery.trim()}
                    className="w-full bg-[#00ff00] text-black hover:bg-[#00cc00] font-bold"
                  >
                    {isProcessingQuery ? "Processing..." : "Execute Query"}
                  </Button>

                  {queryResults && (
                    <div className="space-y-2">
                      <Label className="text-[#00ff00]">Results</Label>
                      <div className="border border-[#00ff00] rounded p-2 bg-black/30">
                        <pre className="text-[#00ff00] text-sm whitespace-pre-wrap">{queryResults}</pre>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history" className="space-y-6">
            <Card className="bg-black/50 border-[#00ff00]">
              <CardHeader>
                <CardTitle className="text-[#00ff00] flex items-center">
                  <Clock className="w-6 h-6 mr-2" />
                  Query History
                </CardTitle>
                <CardDescription className="text-[#00aaff]">Recent operations and their results</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[500px]">
                  {queryHistory.length === 0 ? (
                    <p className="text-[#666] text-center py-8">No history available</p>
                  ) : (
                    <div className="space-y-4">
                      {queryHistory.map((item) => (
                        <div key={item.id} className="border border-[#333] rounded p-4 bg-black/30">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="text-[#00ff00] font-bold">{item.query}</h4>
                            <Badge variant="outline" className="text-[#00aaff] border-[#00aaff]">
                              {item.timestamp.toLocaleString()}
                            </Badge>
                          </div>
                          <pre className="text-[#ccc] text-sm whitespace-pre-wrap overflow-hidden">
                            {item.result.substring(0, 200)}...
                          </pre>
                        </div>
                      ))}
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            <Card className="bg-black/50 border-[#00ff00]">
              <CardHeader>
                <CardTitle className="text-[#00ff00] flex items-center">
                  <FileText className="w-6 h-6 mr-2" />
                  Export Reports
                </CardTitle>
                <CardDescription className="text-[#00aaff]">Generate and export comprehensive reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button
                    onClick={() => handleExportReport("json")}
                    variant="outline"
                    className="border-[#00ff00] text-[#00ff00] hover:bg-[#00ff00] hover:text-black"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export JSON
                  </Button>
                  <Button
                    onClick={() => handleExportReport("csv")}
                    variant="outline"
                    className="border-[#00ff00] text-[#00ff00] hover:bg-[#00ff00] hover:text-black"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export CSV
                  </Button>
                  <Button
                    onClick={() => handleExportReport("pdf")}
                    variant="outline"
                    className="border-[#00ff00] text-[#00ff00] hover:bg-[#00ff00] hover:text-black"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export PDF
                  </Button>
                </div>

                <Separator className="my-6 bg-[#333]" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-[#00ff00] font-bold mb-4">System Statistics</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-[#ccc]">Total Queries:</span>
                        <span className="text-[#00ff00]">{queryHistory.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#ccc]">Threat Level:</span>
                        <span className="text-[#ff0000]">{threatLevel}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#ccc]">Active Connections:</span>
                        <span className="text-[#00aaff]">{activeConnections}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#ccc]">Data Processed:</span>
                        <span className="text-[#ffff00]">{(dataProcessed / 1000).toFixed(1)}K</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-[#00ff00] font-bold mb-4">Recent Activity</h4>
                    <div className="space-y-2">
                      {queryHistory.slice(0, 5).map((item, index) => (
                        <div key={index} className="text-sm">
                          <span className="text-[#00aaff]">{item.timestamp.toLocaleTimeString()}</span>
                          <span className="text-[#ccc] ml-2">{item.query}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card className="bg-black/50 border-[#00ff00]">
              <CardHeader>
                <CardTitle className="text-[#00ff00] flex items-center">
                  <Settings className="w-6 h-6 mr-2" />
                  System Settings
                </CardTitle>
                <CardDescription className="text-[#00aaff]">
                  Configure ΣPIC PΛПΣL settings and preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-[#00ff00] font-bold mb-4">Security Settings</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-[#ccc]">Auto-clear terminal</span>
                        <Button variant="outline" size="sm" className="border-[#00ff00] text-[#00ff00]">
                          Enabled
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[#ccc]">Threat monitoring</span>
                        <Button variant="outline" size="sm" className="border-[#00ff00] text-[#00ff00]">
                          Active
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[#ccc]">Encryption level</span>
                        <Badge className="bg-[#00ff00] text-black">AES-256</Badge>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-[#00ff00] font-bold mb-4">Interface Settings</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-[#ccc]">Matrix animation</span>
                        <Button variant="outline" size="sm" className="border-[#00ff00] text-[#00ff00]">
                          Enabled
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[#ccc]">Sound effects</span>
                        <Button variant="outline" size="sm" className="border-[#666] text-[#666]">
                          Disabled
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[#ccc]">Auto-save results</span>
                        <Button variant="outline" size="sm" className="border-[#00ff00] text-[#00ff00]">
                          Enabled
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator className="my-6 bg-[#333]" />

                <div>
                  <h4 className="text-[#00ff00] font-bold mb-4">System Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-[#ccc]">Version:</span>
                      <span className="text-[#00ff00] ml-2">v6.0</span>
                    </div>
                    <div>
                      <span className="text-[#ccc]">Build:</span>
                      <span className="text-[#00ff00] ml-2">2024.01.15</span>
                    </div>
                    <div>
                      <span className="text-[#ccc]">Platform:</span>
                      <span className="text-[#00ff00] ml-2">Web</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
