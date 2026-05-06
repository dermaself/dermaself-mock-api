# Dermaself Mock API

Mock endpoint pubblico per il take-home challenge Dermaself.

Questo API simula il comportamento reale dell'endpoint di analisi della pelle di Dermaself, permettendo ai candidati di testare l'integrazione senza accesso al backend production.

---

## 🚀 Endpoint

```
POST https://project-dgqwe.vercel.app/api/analyze
```

---

## 📋 Request

**Content-Type**: `multipart/form-data`

### Campi richiesti

| Field | Type | Descrizione | Esempio |
|-------|------|-------------|---------|
| `image` | file | Immagine JPEG o PNG | `photo.jpg` |
| `userData` | JSON string | Dati utente completi | `{"ageRange":"25-35","gender":"F","firstName":"User","lastName":"","shopDomain":"dermaself","languageCode":"it"}` |
| `ageRange` | string | Fascia d'età | `"25-35"`, `"18-25"`, `"35-45"`, `">45"` |
| `gender` | string | Genere | `"F"` o `"M"` |

---

### Esempio con curl

```bash
curl -X POST https://project-dgqwe.vercel.app/api/analyze \
  -F "image=@photo.jpg" \
  -F "userData={\"ageRange\":\"25-35\",\"gender\":\"F\",\"firstName\":\"User\",\"lastName\":\"\",\"shopDomain\":\"dermaself\",\"languageCode\":\"it\"}" \
  -F "ageRange=25-35" \
  -F "gender=F"
```

### Esempio con Python

```python
import requests
import json

with open('photo.jpg', 'rb') as img:
    files = {
        'image': img,
        'userData': json.dumps({
            "ageRange": "25-35",
            "gender": "F",
            "firstName": "User",
            "lastName": "",
            "shopDomain": "dermaself",
            "languageCode": "it"
        }),
        'ageRange': '25-35',
        'gender': 'F'
    }
    response = requests.post(
        'https://project-dgqwe.vercel.app/api/analyze',
        files=files
    )
    print(json.dumps(response.json(), indent=2))
```

### Esempio con Dart (Flutter)

```dart
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'dart:io';

Future<Map<String, dynamic>> analyzeImage(String imagePath) async {
  final request = http.MultipartRequest(
    'POST',
    Uri.parse('https://project-dgqwe.vercel.app/api/analyze'),
  )
    ..fields['userData'] = jsonEncode({
      'ageRange': '25-35',
      'gender': 'F',
      'firstName': 'User',
      'lastName': '',
      'shopDomain': 'dermaself',
      'languageCode': 'it',
    })
    ..fields['ageRange'] = '25-35'
    ..fields['gender'] = 'F'
    ..files.add(await http.MultipartFile.fromPath('image', imagePath));

  final response = await request.send();
  final body = await response.stream.bytesToString();

  if (response.statusCode == 200) {
    return jsonDecode(body) as Map<String, dynamic>;
  } else {
    throw Exception('API Error: ${response.statusCode}');
  }
}
```

### Esempio con TypeScript / Node.js

```typescript
import FormData from 'form-data';
import fs from 'fs';
import axios from 'axios';

async function analyzeImage(imagePath: string) {
  const form = new FormData();

  form.append('image', fs.createReadStream(imagePath));
  form.append('userData', JSON.stringify({
    ageRange: '25-35',
    gender: 'F',
    firstName: 'User',
    lastName: '',
    shopDomain: 'dermaself',
    languageCode: 'it'
  }));
  form.append('ageRange', '25-35');
  form.append('gender', 'F');

  try {
    const response = await axios.post(
      'https://project-dgqwe.vercel.app/api/analyze',
      form,
      { headers: form.getHeaders() }
    );
    console.log(JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.error('Error:', (error as Error).message);
  }
}
```

> **Nota**: aggiunto il cast `(error as Error)` per compatibilità con TypeScript strict mode.

---

## 📄 Response

**Status**: `200 OK`
**Content-Type**: `application/json`

```json
{
  "metrics": {
    "wrinkles": 86.99,
    "acne": 94.25,
    "spots": 34.69,
    "redness": 22.53,
    "dryness": 60.44,
    "oiliness": 34.65,
    "texture": 64.02,
    "elasticity": 74.74,
    "radiance": 90.77,
    "smoothness": 79.50
  },
  "benchmarks": {
    "wrinkles": 80,
    "acne": 50,
    "spots": 40,
    "redness": 30,
    "dryness": 40,
    "oiliness": 45,
    "texture": 80,
    "elasticity": 80,
    "radiance": 90,
    "smoothness": 80
  },
  "priorityCondition": "wrinkles",
  "acneClassification": {
    "acneType": "comedonal",
    "acneSeverity": "none",
    "erythema": false
  },
  "recommendations": {
    "user": {
      "firstName": "User",
      "gender": "F"
    },
    "scoreField": "score",
    "skincareRoutine": [
      {
        "category": "cleansing",
        "modules": [
          {
            "module": "cleanser",
            "stepNumber": 1,
            "mainProduct": {
              "productId": 101,
              "productName": "Gentle Hydrating Cleanser",
              "brand": "Dermaself",
              "bestPrice": 24.99,
              "score": 95,
              "fit": 5
            }
          }
        ]
      },
      {
        "category": "treatment",
        "modules": [
          {
            "module": "serum",
            "stepNumber": 2,
            "mainProduct": {
              "productId": 201,
              "productName": "Vitamin C Serum",
              "brand": "Dermaself",
              "bestPrice": 49.99,
              "score": 92,
              "fit": 4
            }
          }
        ]
      }
    ],
    "recommendationsVersion": 2
  }
}
```

### Field Descriptions

| Field | Type | Descrizione |
|-------|------|-------------|
| `metrics` | object | Metriche analizzate della pelle (0–100) |
| `benchmarks` | object | Benchmark di riferimento per la fascia d'età |
| `priorityCondition` | string | Condizione prevalente (`wrinkles`, `acne`, `mixed`) |
| `acneClassification` | object | Classificazione dell'acne rilevata |
| `recommendations` | object | Routine skincare personalizzata |

### Metric Fields

| Metrica | Range | Significato |
|---------|-------|-------------|
| `wrinkles` | 0–100 | Profondità e densità delle rughe |
| `acne` | 0–100 | Presenza e severità dell'acne |
| `spots` | 0–100 | Macchie e iperpigmentazione |
| `redness` | 0–100 | Arrossamento ed eritema |
| `dryness` | 0–100 | Secchezza e disidratazione |
| `oiliness` | 0–100 | Oleosità cutanea |
| `texture` | 0–100 | Uniformità della texture |
| `elasticity` | 0–100 | Elasticità della pelle |
| `radiance` | 0–100 | Luminosità e radiance |
| `smoothness` | 0–100 | Levigatezza della superficie |

### Acne Classification Types

| `acneType` | Descrizione |
|------------|-------------|
| `no_acne` | Nessun acne rilevato |
| `comedonal` | Acne comedonica (punti neri/bianchi) |
| `inflammatory` | Acne infiammatoria (brufoli rossi) |

### Acne Severity

| `acneSeverity` | Livello |
|----------------|---------|
| `none` | Nessuno |
| `mild` | Lieve |
| `moderate` | Moderato |
| `severe` | Severo |

---

## ❌ Error Handling

### 405 Method Not Allowed
```json
{"error": "Method not allowed"}
```
**Quando**: viene inviata una richiesta GET all'endpoint POST.

### 400 Bad Request
```json
{"error": "Expected multipart/form-data"}
```
**Quando**: il `Content-Type` header non è `multipart/form-data`.

### 500 Server Error
```json
{"error": "Server error"}
```
**Quando**: si verifica un errore interno del server.

---

## 🧪 Test Rapido

### Passo 1 — Scarica una foto di test

```bash
curl https://picsum.photos/200 -o photo.jpg
```

### Passo 2 — Invia la richiesta

**Con `curl.exe` (PowerShell)**:
```powershell
curl.exe -X POST https://project-dgqwe.vercel.app/api/analyze `
  -F "image=@photo.jpg" `
  -F "userData={\"ageRange\":\"25-35\",\"gender\":\"F\"}" `
  -F "ageRange=25-35" `
  -F "gender=F"
```

**Con `curl` (Linux / macOS)**:
```bash
curl -X POST https://project-dgqwe.vercel.app/api/analyze \
  -F "image=@photo.jpg" \
  -F "userData={\"ageRange\":\"25-35\",\"gender\":\"F\"}" \
  -F "ageRange=25-35" \
  -F "gender=F"
```

### Passo 3 — Verifica il response

Dovresti ricevere un JSON completo con `metrics`, `benchmarks` e `recommendations`.

---

## 📋 Specifiche Tecniche

| Aspetto | Valore |
|---------|--------|
| **Runtime** | Node.js 24.x |
| **Platform** | Vercel Serverless Functions |
| **Region** | `europe-west1` |
| **Timeout** | 30 secondi |
| **CORS** | Abilitato |
| **Rate Limit** | Nessuno (mock, unlimited) |
| **Authentication** | Nessuna richiesta |

---

## 🔄 Comportamento dell'API

- **Delay simulato**: 300–1000 ms per simulare una vera API
- **Metriche randomizzate**: ogni request restituisce valori diversi (0–100)
- **Response sempre 200**: l'API non restituisce errori (è un mock)
- **Recommendations fisse**: sempre gli stessi prodotti di esempio

---

## 🚀 Deployment & Monitoraggio

- **Hosted on**: Vercel
- **Auto-deploy**: push su `main` triggera il deployment automatico
- **Uptime**: 99.9% (SLA Vercel)
- **Logs**: disponibili nella Vercel Dashboard

---

## 🔗 Link Utili

- **API Endpoint**: https://project-dgqwe.vercel.app/api/analyze
- **GitHub Repository**: https://github.com/dermaself/dermaself-mock-api
- **Vercel Dashboard**: https://vercel.com/dermaself/project-dgqwe

---

## 📝 Uso nel Challenge

Questa API è fornita per il **take-home challenge** Dermaself rivolto ai candidati Junior Developer.

Utilizzate questo endpoint nella **Schermata 2** del vostro progetto Flutter/React per:

1. ✅ Testare il caricamento di un file multipart
2. ✅ Gestire i loading states
3. ✅ Parsare JSON complesso
4. ✅ Implementare l'error handling
5. ✅ Visualizzare dati strutturati

---

## 📧 Supporto

Domande o problemi con l'API?

- **Email**: lmusso@dermaself.it
- **Issue Tracker**: https://github.com/dermaself/dermaself-mock-api/issues

---

## 📄 Licenza

© 2026 Dermaself s.r.l. — Tutti i diritti riservati.

Mock API for recruitment purposes only.

---

**Last Updated**: May 6, 2026
**Status**: ✅ Online and Tested

**Tested with**:
- ✅ curl
- ✅ Python 3.9+
- ✅ Node.js 18+
- ✅ Dart / Flutter
- ✅ TypeScript
