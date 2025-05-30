import type { CategoryType } from "./types"

export const categories: Record<string, CategoryType> = {
  kimlik: {
    id: "kimlik",
    title: "🔐 Kimlik & Simülasyon",
    apis: {
      tcsorgu: {
        title: "TC Sorgu",
        params: ["tc"],
      },
      tcprosorgu: {
        title: "TC Pro Sorgu",
        params: ["tc"],
      },
      adressorgu: {
        title: "Adres Sorgu",
        params: ["tc"],
      },
      hanesorgu: {
        title: "Hane Sorgu",
        params: ["tc"],
      },
      adsoyadsorgu: {
        title: "Ad Soyad Sorgu",
        params: ["ad", "soyad", "il", "ilce"],
      },
      adsoyadprosorgu: {
        title: "Ad Soyad Pro Sorgu",
        params: ["ad", "soyad", "il", "ilce"],
      },
      gsmtcprosorgu: {
        title: "GSM → TC Pro",
        params: ["gsm"],
      },
      tcgsmprosorgu: {
        title: "TC → GSM Pro",
        params: ["tc"],
      },
      sulaleprosorgu: {
        title: "Sülale Pro Sorgu",
        params: ["tc"],
      },
      isyeriarkadasisorgu: {
        title: "İşyeri Arkadaşı Sorgu",
        params: ["tc"],
      },
      isyerisorgu: {
        title: "İşyeri Sorgu",
        params: ["tc"],
      },
      isyeriyetkilisorgu: {
        title: "İşyeri Yetkili Sorgu",
        params: ["tc"],
      },
      fakeid: {
        title: "Sahte Kimlik Oluşturucu",
        params: ["count"],
      },
      tc_validator: {
        title: "TC Kimlik Doğrulayıcı",
        params: ["tc"],
      },
    },
  },
  osint: {
    id: "osint",
    title: "🌐 OSINT & Ağ Araçları",
    apis: {
      ipsorgu_ondex: {
        title: "IP Sorgu (Ondex)",
        params: ["ip"],
      },
      ipsorgu_ipapi: {
        title: "IP Info (ip-api)",
        params: ["ip"],
      },
      whois: {
        title: "WHOIS Sorgulama",
        params: ["domain"],
      },
      portscanner: {
        title: "Port Tarama",
        params: ["host", "port"],
      },
      metascraping: {
        title: "Meta Veri Tarayıcı",
        params: ["url"],
      },
      operator: {
        title: "Operatör Sorgu",
        params: ["gsm"],
      },
      subdomain_enum: {
        title: "Subdomain Enumeration",
        params: ["domain"],
      },
      dns_recon: {
        title: "DNS Reconnaissance",
        params: ["domain"],
      },
      shodan_search: {
        title: "Shodan Search",
        params: ["query"],
      },
      google_dorking: {
        title: "Google Dorking",
        params: ["domain", "dork_type"],
      },
    },
  },
  leak: {
    id: "leak",
    title: "🔍 Leak & Dark Web",
    apis: {
      leakcheck_ondex: {
        title: "Email Leak Check (Ondex)",
        params: ["query"],
      },
      emailsorgu: {
        title: "Email Sorgu (Ondex)",
        params: ["email"],
      },
      numarakedi: {
        title: "Numara Kedi (Ondex)",
        params: ["sayı"],
      },
      darkweb: {
        title: "Dark Web Tarama",
        params: ["query"],
        message: "Gerçek Dark Web taraması özel erişim ve araçlar gerektirir.",
      },
      liveshot: {
        title: "Live Shot (Ekran Görüntüsü)",
        params: ["url"],
      },
      breach_check: {
        title: "Data Breach Check",
        params: ["email"],
      },
      combo_analyzer: {
        title: "Combo List Analyzer",
        params: ["combo_data"],
      },
      password_leak: {
        title: "Password Leak Search",
        params: ["password"],
      },
    },
  },
  ai: {
    id: "ai",
    title: "🤖 Yapay Zeka & Automation",
    apis: {
      cortex_ai: {
        title: "CORTEX AI Assistant",
        params: ["prompt"],
        message: "Advanced AI-powered cybersecurity assistant.",
      },
      face_recognition: {
        title: "Face Recognition",
        params: ["image"],
      },
      voice_cloning: {
        title: "Voice Cloning",
        params: ["audio_file"],
      },
      deepfake_detector: {
        title: "Deepfake Detector",
        params: ["media_file"],
      },
      ai_malware_analyzer: {
        title: "AI Malware Analyzer",
        params: ["file_hash"],
      },
      threat_intelligence: {
        title: "Threat Intelligence",
        params: ["ioc"],
      },
      auto_exploit: {
        title: "Auto Exploit Generator",
        params: ["target", "vulnerability"],
      },
      social_graph: {
        title: "Social Graph Analyzer",
        params: ["username"],
      },
    },
  },
  hacking: {
    id: "hacking",
    title: "⚔️ Advanced Hacking Tools",
    apis: {
      nmap_scan: {
        title: "Nmap Port Scanner",
        params: ["target", "scan_type"],
      },
      nikto_scan: {
        title: "Nikto Web Scanner",
        params: ["url"],
      },
      sqlmap_scan: {
        title: "SQLMap Injection",
        params: ["url", "parameters"],
      },
      xss_scanner: {
        title: "XSS Scanner",
        params: ["url"],
      },
      cms_scanner: {
        title: "CMS Scanner",
        params: ["url"],
      },
      wifi_scanner: {
        title: "WiFi Scanner",
        params: ["interface"],
      },
      bluetooth_scanner: {
        title: "Bluetooth Scanner",
        params: ["duration"],
      },
      exploit_scanner: {
        title: "Exploit Scanner",
        params: ["target"],
      },
      payload_generator: {
        title: "Payload Generator",
        params: ["type", "target_os"],
      },
      reverse_shell: {
        title: "Reverse Shell Generator",
        params: ["ip", "port", "shell_type"],
      },
    },
  },
  mobile: {
    id: "mobile",
    title: "📱 Mobile Security",
    apis: {
      sms_bomber: {
        title: "SMS Bomber",
        params: ["phone", "count"],
        message: "Simülasyon amaçlı. Gerçek SMS gönderilmez.",
      },
      call_bomber: {
        title: "Call Bomber",
        params: ["phone", "count"],
        message: "Simülasyon amaçlı. Gerçek arama yapılmaz.",
      },
      phone_lookup: {
        title: "Phone Number Lookup",
        params: ["phone"],
      },
      imei_tracker: {
        title: "IMEI Tracker",
        params: ["imei"],
      },
      android_exploit: {
        title: "Android Exploit",
        params: ["target_ip"],
      },
      ios_exploit: {
        title: "iOS Exploit",
        params: ["target_ip"],
      },
      mobile_forensics: {
        title: "Mobile Forensics",
        params: ["device_id"],
      },
      app_analyzer: {
        title: "Mobile App Analyzer",
        params: ["apk_file"],
      },
    },
  },
  security: {
    id: "security",
    title: "🔧 Güvenlik Araçları",
    apis: {
      hash: {
        title: "Hash Generator",
        params: ["text", "type"],
      },
      hash_cracker: {
        title: "Hash Cracker",
        params: ["hash", "hash_type"],
      },
      discordnitrogenerator_ondex: {
        title: "Discord Nitro Gen (Ondex)",
        params: ["adet"],
      },
      nitro_checker_local: {
        title: "Discord Nitro Checker",
        params: ["codes"],
      },
      password: {
        title: "Şifre Oluşturucu",
        params: ["length", "include_uppercase", "include_numbers", "include_symbols"],
      },
      scraper: {
        title: "OTP/API Key Scraper",
        params: ["text_to_scrape"],
      },
      base64: {
        title: "Base64 Encoder/Decoder",
        params: ["text", "mode"],
      },
      encryption: {
        title: "Text Encryption/Decryption",
        params: ["text", "key", "mode"],
      },
      steganography: {
        title: "Steganography",
        params: ["image", "message", "mode"],
      },
      keylogger: {
        title: "Keylogger Simulator",
        params: ["duration"],
      },
    },
  },
  blockchain: {
    id: "blockchain",
    title: "₿ Blockchain & Kripto",
    apis: {
      wallet_analyzer: {
        title: "Wallet Analyzer",
        params: ["wallet_address", "blockchain"],
      },
      transaction_tracker: {
        title: "Transaction Tracker",
        params: ["tx_hash"],
      },
      crypto_mixer: {
        title: "Crypto Mixer Detector",
        params: ["address"],
      },
      nft_analyzer: {
        title: "NFT Analyzer",
        params: ["contract_address"],
      },
      defi_scanner: {
        title: "DeFi Scanner",
        params: ["protocol"],
      },
      smart_contract_audit: {
        title: "Smart Contract Audit",
        params: ["contract_code"],
      },
      blockchain_explorer: {
        title: "Blockchain Explorer",
        params: ["block_number", "chain"],
      },
    },
  },
  social: {
    id: "social",
    title: "👥 Sosyal Mühendislik",
    apis: {
      social_profiler: {
        title: "Social Media Profiler",
        params: ["username"],
      },
      email_harvester: {
        title: "Email Harvester",
        params: ["domain"],
      },
      linkedin_scraper: {
        title: "LinkedIn Scraper",
        params: ["company"],
      },
      instagram_analyzer: {
        title: "Instagram Analyzer",
        params: ["username"],
      },
      twitter_osint: {
        title: "Twitter OSINT",
        params: ["username"],
      },
      facebook_lookup: {
        title: "Facebook Lookup",
        params: ["profile_id"],
      },
      phishing_generator: {
        title: "Phishing Page Generator",
        params: ["target_site"],
      },
      social_graph_mapper: {
        title: "Social Graph Mapper",
        params: ["target_user"],
      },
    },
  },
  forensics: {
    id: "forensics",
    title: "🔬 Adli Bilişim",
    apis: {
      file_analyzer: {
        title: "File Analyzer",
        params: ["file_hash"],
      },
      metadata_extractor: {
        title: "Metadata Extractor",
        params: ["file_path"],
      },
      disk_analyzer: {
        title: "Disk Analyzer",
        params: ["disk_image"],
      },
      memory_dump_analyzer: {
        title: "Memory Dump Analyzer",
        params: ["dump_file"],
      },
      network_forensics: {
        title: "Network Forensics",
        params: ["pcap_file"],
      },
      timeline_analyzer: {
        title: "Timeline Analyzer",
        params: ["log_files"],
      },
      deleted_file_recovery: {
        title: "Deleted File Recovery",
        params: ["drive_path"],
      },
      registry_analyzer: {
        title: "Registry Analyzer",
        params: ["registry_hive"],
      },
    },
  },
  network: {
    id: "network",
    title: "🌐 Ağ Güvenliği",
    apis: {
      network_scanner: {
        title: "Network Scanner",
        params: ["network_range"],
      },
      vulnerability_scanner: {
        title: "Vulnerability Scanner",
        params: ["target"],
      },
      firewall_tester: {
        title: "Firewall Tester",
        params: ["target", "ports"],
      },
      ddos_simulator: {
        title: "DDoS Simulator",
        params: ["target", "duration"],
        message: "Simülasyon amaçlı. Gerçek saldırı yapılmaz.",
      },
      packet_analyzer: {
        title: "Packet Analyzer",
        params: ["interface"],
      },
      bandwidth_monitor: {
        title: "Bandwidth Monitor",
        params: ["interface"],
      },
      intrusion_detector: {
        title: "Intrusion Detector",
        params: ["log_file"],
      },
      honeypot_manager: {
        title: "Honeypot Manager",
        params: ["service_type"],
      },
    },
  },
  webapp: {
    id: "webapp",
    title: "🌍 Web Uygulama Güvenliği",
    apis: {
      web_scanner: {
        title: "Web Vulnerability Scanner",
        params: ["url"],
      },
      directory_bruteforce: {
        title: "Directory Bruteforce",
        params: ["url", "wordlist"],
      },
      sql_injection_tester: {
        title: "SQL Injection Tester",
        params: ["url", "parameter"],
      },
      xss_tester: {
        title: "XSS Tester",
        params: ["url"],
      },
      csrf_tester: {
        title: "CSRF Tester",
        params: ["url"],
      },
      lfi_tester: {
        title: "LFI/RFI Tester",
        params: ["url"],
      },
      ssl_analyzer: {
        title: "SSL/TLS Analyzer",
        params: ["domain"],
      },
      header_analyzer: {
        title: "HTTP Header Analyzer",
        params: ["url"],
      },
    },
  },
  database: {
    id: "database",
    title: "🗄️ Veritabanı Güvenliği",
    apis: {
      db_scanner: {
        title: "Database Scanner",
        params: ["host", "port"],
      },
      mysql_bruteforce: {
        title: "MySQL Bruteforce",
        params: ["host", "username_list"],
      },
      mssql_scanner: {
        title: "MSSQL Scanner",
        params: ["host"],
      },
      oracle_scanner: {
        title: "Oracle Scanner",
        params: ["host"],
      },
      mongodb_scanner: {
        title: "MongoDB Scanner",
        params: ["host"],
      },
      redis_scanner: {
        title: "Redis Scanner",
        params: ["host"],
      },
      db_dump_analyzer: {
        title: "Database Dump Analyzer",
        params: ["dump_file"],
      },
      privilege_escalation: {
        title: "DB Privilege Escalation",
        params: ["db_type", "credentials"],
      },
    },
  },
  cloud: {
    id: "cloud",
    title: "☁️ Bulut Güvenliği",
    apis: {
      aws_scanner: {
        title: "AWS Security Scanner",
        params: ["access_key"],
      },
      azure_scanner: {
        title: "Azure Scanner",
        params: ["subscription_id"],
      },
      gcp_scanner: {
        title: "GCP Scanner",
        params: ["project_id"],
      },
      s3_bucket_scanner: {
        title: "S3 Bucket Scanner",
        params: ["bucket_name"],
      },
      cloud_metadata: {
        title: "Cloud Metadata Extractor",
        params: ["instance_id"],
      },
      container_scanner: {
        title: "Container Scanner",
        params: ["image_name"],
      },
      kubernetes_scanner: {
        title: "Kubernetes Scanner",
        params: ["cluster_endpoint"],
      },
      serverless_scanner: {
        title: "Serverless Scanner",
        params: ["function_name"],
      },
    },
  },
  iot: {
    id: "iot",
    title: "📡 IoT Güvenliği",
    apis: {
      iot_scanner: {
        title: "IoT Device Scanner",
        params: ["network_range"],
      },
      firmware_analyzer: {
        title: "Firmware Analyzer",
        params: ["firmware_file"],
      },
      zigbee_scanner: {
        title: "Zigbee Scanner",
        params: ["channel"],
      },
      bluetooth_le_scanner: {
        title: "Bluetooth LE Scanner",
        params: ["duration"],
      },
      mqtt_scanner: {
        title: "MQTT Scanner",
        params: ["broker_ip"],
      },
      coap_scanner: {
        title: "CoAP Scanner",
        params: ["target"],
      },
      upnp_scanner: {
        title: "UPnP Scanner",
        params: ["network"],
      },
      smart_home_scanner: {
        title: "Smart Home Scanner",
        params: ["target_ip"],
      },
    },
  },
  general: {
    id: "general",
    title: "🛠️ Genel Araçlar",
    apis: {
      browser: {
        title: "Tarayıcı Bilgileri",
        params: [],
      },
      camera: {
        title: "Kamera Sistemi",
        params: [],
      },
      json: {
        title: "JSON Görüntüleyici",
        params: ["json_data"],
      },
      urlencode: {
        title: "URL Encoder/Decoder",
        params: ["text_to_encode", "mode"],
      },
      qrcode: {
        title: "QR Code Oluşturucu",
        params: ["text_for_qr"],
      },
      timestamp: {
        title: "Timestamp Converter",
        params: ["timestamp"],
      },
      colorpicker: {
        title: "Color Picker & Converter",
        params: ["color"],
      },
      url_shortener: {
        title: "URL Shortener",
        params: ["long_url"],
      },
      text_analyzer: {
        title: "Text Analyzer",
        params: ["text"],
      },
      regex_tester: {
        title: "Regex Tester",
        params: ["pattern", "text"],
      },
    },
  },
}
