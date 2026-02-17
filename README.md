# n8n-nodes-callerdesk
![npm](https://img.shields.io/npm/v/n8n-nodes-callerdesk)
![downloads](https://img.shields.io/npm/dm/n8n-nodes-callerdesk)
![license](https://img.shields.io/npm/l/n8n-nodes-callerdesk)


Official **CallerDesk integration for n8n** providing call automation, contact management, reporting, and webhook handling.

This package includes multiple nodes to interact with the CallerDesk API and build automation workflows inside n8n.

---

# 🚀 Features

✅ Click-to-Call (V2 / V3 / V4)
✅ Single-Leg Calling
✅ Live Call Status
✅ Contact Management (Create & List)
✅ Member Management
✅ Reports & Routing Details
✅ Multi-Tenant Webhook Trigger
✅ Webhook Response Node (JWT / JSON / Binary / Redirect)
✅ Secure Credential Handling
✅ Production-ready architecture

---

# 📦 Installation

## Community Node Installation (Recommended)

Inside your n8n instance:

```
Settings → Community Nodes → Install
```

Enter:

```
n8n-nodes-callerdesk
```

---

## Manual Installation

```bash
npm install n8n-nodes-callerdesk
```

Restart n8n after installation.

---

## Docker Installation

Add environment variable:

```
N8N_CUSTOM_EXTENSIONS=/home/node/.n8n/custom
```

Then install inside container:

```bash
npm install n8n-nodes-callerdesk
```

Restart container.

---

# 🔐 Credentials Setup

Create credentials in n8n:

**Credential Name:** CallerDesk API

Fields:

| Field     | Description                   |
| --------- | ----------------------------- |
| Auth Code | Your CallerDesk API auth code |
| Base URL  | https://app.callerdesk.io     |

You can obtain your Auth Code from CallerDesk dashboard.

---

# 🧩 Included Nodes

## 1️⃣ CallerDesk (Main Node)

Performs API operations:

### Calling

* Make Call V2
* Make Call V3
* Make Call V4
* Single Leg Call
* Live Status

### Contacts

* Create Contact
* Get Contact List

### Members

* Create Member

### Reports

* App Call List
* Routing Details

---

## 2️⃣ CallerDesk Webhook Trigger

Receives incoming CallerDesk events.

Supports:

* Multi-tenant path routing
* Status filtering
* Source number validation
* Output normalization
* Immediate or deferred response modes

Example webhook URL:

```
https://your-n8n/webhook/{accountId}/incoming-call
```

---

## 3️⃣ CallerDesk Respond to Webhook

Send responses back to CallerDesk.

Supports:

* JSON response
* Text response
* Binary file
* Redirect
* JWT token
* No data acknowledgment

Used with Webhook node in:

```
Response Mode → Using Respond to Webhook Node
```

---

# 📞 Example Use Cases

## Click to Call Automation

Trigger call from CRM events.

```
CRM → n8n → CallerDesk → Customer
```

---

## Incoming Call Workflow

```
CallerDesk → Webhook → n8n → CRM / Database / Slack
```

---

## Auto Lead Creation

When a call is received:

* Save contact
* Assign agent
* Send notification

---

# 🧪 API Notes

CallerDesk endpoints require `multipart/form-data` encoding for some operations.

This package automatically handles correct request formatting.

---

# ⚙️ Development

Clone repository:

```bash
git clone https://github.com/YadavAnuj1888/n8n-nodes-callerdesk.git
cd n8n-nodes-callerdesk
npm install
npm run build
```

Run with local n8n:

```bash
N8N_CUSTOM_EXTENSIONS=/path/to/project n8n
```

---

# 🛠 Requirements

* n8n v1+
* Node.js 18+

---

# 🔄 Versioning

Follow semantic versioning:

```
npm version patch
npm publish
```

---

# 🤝 Contributing

Pull requests are welcome.

If you find bugs or want features, please open an issue.

---

# 🐛 Troubleshooting

## Invalid Authcode Error

* Verify Auth Code
* Ensure Base URL is correct
* Restart n8n after credential change

## Webhook Not Triggering

* Activate workflow
* Check path & accountId
* Confirm CallerDesk webhook configuration

---

# 📄 License

MIT License

---

# 🙌 Acknowledgements

Built for the n8n community and CallerDesk users.

---

# ⭐ Support

If this project helps you, please consider giving it a star on GitHub.

---

# 🔗 Resources

* n8n Documentation: https://docs.n8n.io
* CallerDesk: https://callerdesk.io

---

**Made with ❤️ for automation engineers**
