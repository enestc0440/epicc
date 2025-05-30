import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { count = 1 } = await request.json()

    const numCount = Math.min(Math.max(Number.parseInt(count) || 1, 1), 10)

    // Gerçekçi Türk isimleri
    const maleNames = [
      "Ahmet",
      "Mehmet",
      "Mustafa",
      "Ali",
      "Hasan",
      "Hüseyin",
      "İbrahim",
      "İsmail",
      "Ömer",
      "Yusuf",
      "Murat",
      "Emre",
      "Burak",
      "Serkan",
      "Fatih",
      "Kemal",
      "Oğuz",
      "Cem",
      "Deniz",
      "Kaan",
      "Barış",
      "Tolga",
      "Onur",
      "Erhan",
      "Selim",
      "Taner",
      "Volkan",
      "Gökhan",
      "Sinan",
      "Erdem",
    ]

    const femaleNames = [
      "Ayşe",
      "Fatma",
      "Emine",
      "Hatice",
      "Zeynep",
      "Elif",
      "Merve",
      "Özlem",
      "Seda",
      "Gül",
      "Esra",
      "Pınar",
      "Burcu",
      "Derya",
      "Sevgi",
      "Serpil",
      "Dilek",
      "Sibel",
      "Tülay",
      "Nesrin",
      "Canan",
      "Filiz",
      "Hülya",
      "Serap",
      "Yasemin",
      "Gülay",
      "Nurcan",
      "Şule",
      "Ebru",
      "Aslı",
    ]

    const surnames = [
      "Yılmaz",
      "Kaya",
      "Demir",
      "Çelik",
      "Şahin",
      "Yıldız",
      "Yıldırım",
      "Öztürk",
      "Aydin",
      "Özdemir",
      "Arslan",
      "Doğan",
      "Kılıç",
      "Aslan",
      "Çetin",
      "Kara",
      "Koç",
      "Kurt",
      "Özkan",
      "Şimşek",
      "Erdoğan",
      "Güneş",
      "Akın",
      "Avcı",
      "Polat",
      "Bulut",
      "Demirtaş",
      "Karaca",
      "Özer",
      "Turan",
    ]

    // Doğru il-ilçe eşleştirmeleri
    const locations = [
      { il: "İstanbul", ilce: "Kadıköy" },
      { il: "İstanbul", ilce: "Beşiktaş" },
      { il: "İstanbul", ilce: "Şişli" },
      { il: "İstanbul", ilce: "Üsküdar" },
      { il: "İstanbul", ilce: "Fatih" },
      { il: "Ankara", ilce: "Çankaya" },
      { il: "Ankara", ilce: "Keçiören" },
      { il: "Ankara", ilce: "Yenimahalle" },
      { il: "Ankara", ilce: "Mamak" },
      { il: "İzmir", ilce: "Konak" },
      { il: "İzmir", ilce: "Bornova" },
      { il: "İzmir", ilce: "Karşıyaka" },
      { il: "İzmir", ilce: "Alsancak" },
      { il: "Bursa", ilce: "Osmangazi" },
      { il: "Bursa", ilce: "Nilüfer" },
      { il: "Bursa", ilce: "Yıldırım" },
      { il: "Antalya", ilce: "Muratpaşa" },
      { il: "Antalya", ilce: "Kepez" },
      { il: "Antalya", ilce: "Konyaaltı" },
      { il: "Adana", ilce: "Seyhan" },
      { il: "Adana", ilce: "Yüreğir" },
      { il: "Konya", ilce: "Selçuklu" },
      { il: "Konya", ilce: "Meram" },
      { il: "Gaziantep", ilce: "Şahinbey" },
      { il: "Gaziantep", ilce: "Şehitkamil" },
      { il: "Kayseri", ilce: "Melikgazi" },
      { il: "Kayseri", ilce: "Kocasinan" },
      { il: "Mersin", ilce: "Akdeniz" },
      { il: "Mersin", ilce: "Mezitli" },
      { il: "Eskişehir", ilce: "Odunpazarı" },
      { il: "Eskişehir", ilce: "Tepebaşı" },
      { il: "Diyarbakır", ilce: "Bağlar" },
      { il: "Diyarbakır", ilce: "Yenişehir" },
      { il: "Samsun", ilce: "İlkadım" },
      { il: "Samsun", ilce: "Canik" },
      { il: "Denizli", ilce: "Pamukkale" },
      { il: "Denizli", ilce: "Merkezefendi" },
      { il: "Malatya", ilce: "Battalgazi" },
      { il: "Malatya", ilce: "Yeşilyurt" },
      { il: "Kahramanmaraş", ilce: "Dulkadiroğlu" },
      { il: "Kahramanmaraş", ilce: "Onikişubat" },
      { il: "Erzurum", ilce: "Yakutiye" },
      { il: "Erzurum", ilce: "Palandöken" },
      { il: "Van", ilce: "İpekyolu" },
      { il: "Van", ilce: "Tuşba" },
      { il: "Batman", ilce: "Merkez" },
      { il: "Elazığ", ilce: "Merkez" },
      { il: "Erzincan", ilce: "Merkez" },
      { il: "Sivas", ilce: "Merkez" },
      { il: "Tokat", ilce: "Merkez" },
    ]

    const streets = [
      "Atatürk Caddesi",
      "İnönü Caddesi",
      "Cumhuriyet Caddesi",
      "Gazi Caddesi",
      "Mimar Sinan Caddesi",
      "Barbaros Caddesi",
      "Fevzi Çakmak Caddesi",
      "Mithatpaşa Caddesi",
      "Şehit Caddesi",
      "Vatan Caddesi",
      "Millet Caddesi",
      "Özgürlük Caddesi",
      "Barış Caddesi",
      "Dostluk Caddesi",
      "Kardeşlik Caddesi",
    ]

    // TC Kimlik No algoritması (Gerçek algoritma)
    const generateValidTC = (): string => {
      let tc = ""

      // İlk 9 rakam rastgele (ilk rakam 0 olamaz)
      tc += Math.floor(Math.random() * 9) + 1
      for (let i = 1; i < 9; i++) {
        tc += Math.floor(Math.random() * 10)
      }

      // 10. rakam hesaplama
      let oddSum = 0
      let evenSum = 0

      for (let i = 0; i < 9; i++) {
        if (i % 2 === 0) {
          oddSum += Number.parseInt(tc[i])
        } else {
          evenSum += Number.parseInt(tc[i])
        }
      }

      const tenthDigit = (oddSum * 7 - evenSum) % 10
      tc += tenthDigit

      // 11. rakam hesaplama
      let totalSum = 0
      for (let i = 0; i < 10; i++) {
        totalSum += Number.parseInt(tc[i])
      }
      const eleventhDigit = totalSum % 10
      tc += eleventhDigit

      return tc
    }

    const fakeIds = []

    for (let i = 0; i < numCount; i++) {
      const isMale = Math.random() > 0.5
      const firstName = isMale
        ? maleNames[Math.floor(Math.random() * maleNames.length)]
        : femaleNames[Math.floor(Math.random() * femaleNames.length)]

      const lastName = surnames[Math.floor(Math.random() * surnames.length)]
      const location = locations[Math.floor(Math.random() * locations.length)]
      const street = streets[Math.floor(Math.random() * streets.length)]
      const buildingNo = Math.floor(Math.random() * 200) + 1
      const apartmentNo = Math.floor(Math.random() * 50) + 1

      // Doğum tarihi (18-65 yaş arası)
      const currentYear = new Date().getFullYear()
      const birthYear = currentYear - (Math.floor(Math.random() * 47) + 18)
      const birthMonth = Math.floor(Math.random() * 12) + 1
      const birthDay = Math.floor(Math.random() * 28) + 1

      // Telefon numarası (Türkiye formatı)
      const operators = [
        "530",
        "531",
        "532",
        "533",
        "534",
        "535",
        "536",
        "537",
        "538",
        "539",
        "540",
        "541",
        "542",
        "543",
        "544",
        "545",
        "546",
        "547",
        "548",
        "549",
      ]
      const operator = operators[Math.floor(Math.random() * operators.length)]
      const phoneNumber = `0${operator}${Math.floor(Math.random() * 9000000) + 1000000}`

      // E-posta
      const emailDomains = ["gmail.com", "hotmail.com", "yahoo.com", "outlook.com", "yandex.com"]
      const emailDomain = emailDomains[Math.floor(Math.random() * emailDomains.length)]
      const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${Math.floor(Math.random() * 999)}@${emailDomain}`

      fakeIds.push({
        name: `${firstName} ${lastName}`,
        tc: generateValidTC(),
        birthDate: `${birthDay.toString().padStart(2, "0")}/${birthMonth.toString().padStart(2, "0")}/${birthYear}`,
        age: currentYear - birthYear,
        gender: isMale ? "Erkek" : "Kadın",
        address: `${street} No:${buildingNo}/${apartmentNo}, ${location.ilce}/${location.il}`,
        phone: phoneNumber,
        email: email,
        image: `https://thispersondoesnotexist.com/image?${Date.now() + i}`,
        bloodType: ["A+", "A-", "B+", "B-", "AB+", "AB-", "0+", "0-"][Math.floor(Math.random() * 8)],
        maritalStatus: ["Bekar", "Evli", "Boşanmış"][Math.floor(Math.random() * 3)],
        education: ["İlkokul", "Ortaokul", "Lise", "Üniversite", "Yüksek Lisans", "Doktora"][
          Math.floor(Math.random() * 6)
        ],
        profession: [
          "Mühendis",
          "Öğretmen",
          "Doktor",
          "Hemşire",
          "Avukat",
          "Muhasebeci",
          "Satış Danışmanı",
          "İşçi",
          "Memur",
          "Serbest Meslek",
        ][Math.floor(Math.random() * 10)],
        motherName:
          femaleNames[Math.floor(Math.random() * femaleNames.length)] +
          " " +
          surnames[Math.floor(Math.random() * surnames.length)],
        fatherName:
          maleNames[Math.floor(Math.random() * maleNames.length)] +
          " " +
          surnames[Math.floor(Math.random() * surnames.length)],
        serialNumber: `${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${Math.floor(Math.random() * 900000) + 100000}`,
        issueDate: `${Math.floor(Math.random() * 28) + 1}/${Math.floor(Math.random() * 12) + 1}/${Math.floor(Math.random() * 10) + 2014}`,
        expiryDate: `${Math.floor(Math.random() * 28) + 1}/${Math.floor(Math.random() * 12) + 1}/${Math.floor(Math.random() * 10) + 2025}`,
        issuedBy: `${location.il} Nüfus Müdürlüğü`,
        religion: ["İslam", "Hristiyanlık", "Yahudilik", "Diğer", "Belirtilmemiş"][Math.floor(Math.random() * 5)],
      })
    }

    return NextResponse.json({
      count: fakeIds.length,
      ids: fakeIds,
      disclaimer: "Bu veriler tamamen sahte ve eğitim amaçlıdır. Gerçek kişilere ait değildir.",
      generated_at: new Date().toISOString(),
      generator: "ΣPIC PΛПΣL Fake ID Generator v2.0",
    })
  } catch (error) {
    console.error("Error in fake ID API:", error)
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 })
  }
}
