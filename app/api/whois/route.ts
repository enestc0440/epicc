import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { domain } = await request.json()

    if (!domain) {
      return NextResponse.json({ error: "Domain is required" }, { status: 400 })
    }

    // Simulate WHOIS lookup
    const simulatedResponse = generateSimulatedWhoisResponse(domain)

    return NextResponse.json(simulatedResponse)
  } catch (error) {
    console.error("Error in WHOIS API:", error)
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 })
  }
}

function generateSimulatedWhoisResponse(domain: string) {
  const currentDate = new Date()
  const registrationDate = new Date(currentDate)
  registrationDate.setFullYear(currentDate.getFullYear() - Math.floor(Math.random() * 10 + 1))

  const expiryDate = new Date(currentDate)
  expiryDate.setFullYear(currentDate.getFullYear() + Math.floor(Math.random() * 5 + 1))

  const registrars = [
    "GoDaddy.com, LLC",
    "Namecheap, Inc.",
    "Amazon Registrar, Inc.",
    "Google LLC",
    "NameSilo, LLC",
    "Tucows Domains Inc.",
  ]

  const nameservers = [
    ["ns1.example.com", "ns2.example.com"],
    ["dns1.registrar-servers.com", "dns2.registrar-servers.com"],
    ["ns-1.awsdns-01.com", "ns-2.awsdns-02.net", "ns-3.awsdns-03.org"],
    ["ns1.googledomains.com", "ns2.googledomains.com"],
    ["ns1.vercel-dns.com", "ns2.vercel-dns.com"],
  ]

  const selectedNameservers = nameservers[Math.floor(Math.random() * nameservers.length)]

  return {
    domain: domain,
    registrar: registrars[Math.floor(Math.random() * registrars.length)],
    registrant: "Privacy Protected",
    created: registrationDate.toISOString().split("T")[0],
    expires: expiryDate.toISOString().split("T")[0],
    updated: new Date(currentDate.getTime() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    status: ["clientTransferProhibited", "clientUpdateProhibited", "clientDeleteProhibited"],
    nameservers: selectedNameservers,
    dnssec: Math.random() > 0.5 ? "signedDelegation" : "unsigned",
    raw: `Domain Name: ${domain}\nRegistry Domain ID: ${Math.random().toString(36).substring(2, 15)}\nRegistrar WHOIS Server: whois.${registrars[Math.floor(Math.random() * registrars.length)].toLowerCase().replace(", ", "-").replace(" ", "")}.com\nRegistrar URL: http://www.${registrars[Math.floor(Math.random() * registrars.length)].toLowerCase().replace(", ", "-").replace(" ", "")}.com\nUpdated Date: ${new Date(currentDate.getTime() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]}\nCreation Date: ${registrationDate.toISOString().split("T")[0]}\nRegistry Expiry Date: ${expiryDate.toISOString().split("T")[0]}\nRegistrar: ${registrars[Math.floor(Math.random() * registrars.length)]}\nRegistrar IANA ID: ${Math.floor(Math.random() * 1000) + 1}\nRegistrar Abuse Contact Email: abuse@${registrars[Math.floor(Math.random() * registrars.length)].toLowerCase().replace(", ", "-").replace(" ", "")}.com\nRegistrar Abuse Contact Phone: +1.${Math.floor(Math.random() * 900) + 100}${Math.floor(Math.random() * 900) + 100}${Math.floor(Math.random() * 9000) + 1000}\nDomain Status: clientDeleteProhibited https://icann.org/epp#clientDeleteProhibited\nDomain Status: clientRenewProhibited https://icann.org/epp#clientRenewProhibited\nDomain Status: clientTransferProhibited https://icann.org/epp#clientTransferProhibited\nDomain Status: clientUpdateProhibited https://icann.org/epp#clientUpdateProhibited\nName Server: ${selectedNameservers.join("\nName Server: ")}\nDNSSEC: ${Math.random() > 0.5 ? "signedDelegation" : "unsigned"}\nURL of the ICANN Whois Inaccuracy Complaint Form: https://www.icann.org/wicf/\n>>> Last update of whois database: ${currentDate.toISOString().split("T")[0]}T${currentDate.toISOString().split("T")[1].split(".")[0]}Z <<<`,
  }
}
