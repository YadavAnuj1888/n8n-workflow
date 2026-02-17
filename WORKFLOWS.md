# Workflow Examples — CallerDesk n8n

This section provides ready-to-import workflow examples demonstrating how to use the CallerDesk nodes.

You can import these JSON files directly into n8n:

```
n8n → Workflows → Import from File
```

---

# 📞 Example 1 — Click To Call From Manual Trigger

Trigger a call manually.

```json
{
  "name": "CallerDesk - Click To Call",
  "nodes": [
    {
      "parameters": {},
      "id": "ManualTrigger",
      "name": "Manual Trigger",
      "type": "n8n-nodes-base.manualTrigger",
      "typeVersion": 1,
      "position": [300, 300]
    },
    {
      "parameters": {
        "resource": "call",
        "operation": "click_to_call_v2",
        "calling_party_a": "8888888888",
        "calling_party_b": "9999999999",
        "deskphone": "0800000000",
        "call_from_did": true
      },
      "id": "CallerDesk",
      "name": "CallerDesk",
      "type": "n8n-nodes-callerdesk.callerDesk",
      "typeVersion": 1,
      "position": [600, 300],
      "credentials": {
        "callerDeskApi": {
          "id": "YOUR_CREDENTIAL_ID",
          "name": "CallerDesk account"
        }
      }
    }
  ],
  "connections": {
    "Manual Trigger": {
      "main": [
        [
          {
            "node": "CallerDesk",
            "type": "main",
            "index": 0
          }
        ]
      ]
    }
  }
}
```

---

# ☎️ Example 2 — Save Contact Automatically

Create a contact when workflow runs.

```json
{
  "name": "CallerDesk - Save Contact",
  "nodes": [
    {
      "parameters": {},
      "id": "ManualTrigger",
      "name": "Manual Trigger",
      "type": "n8n-nodes-base.manualTrigger",
      "typeVersion": 1,
      "position": [300, 300]
    },
    {
      "parameters": {
        "resource": "contact",
        "operation": "save_contact",
        "contact_num": "9876543210",
        "contact_name": "Test User",
        "contact_email": "test@example.com",
        "contact_address": "India"
      },
      "id": "CallerDesk",
      "name": "CallerDesk",
      "type": "n8n-nodes-callerdesk.callerDesk",
      "typeVersion": 1,
      "position": [600, 300],
      "credentials": {
        "callerDeskApi": {
          "id": "YOUR_CREDENTIAL_ID",
          "name": "CallerDesk account"
        }
      }
    }
  ],
  "connections": {
    "Manual Trigger": {
      "main": [
        [
          {
            "node": "CallerDesk",
            "type": "main",
            "index": 0
          }
        ]
      ]
    }
  }
}
```

---

# 🔔 Example 3 — Incoming Call Webhook → Respond

Receive incoming call event and acknowledge.

```json
{
  "name": "CallerDesk - Incoming Call Handler",
  "nodes": [
    {
      "parameters": {
        "httpMethod": "GET",
        "accountId": "12345",
        "path": "incoming-call",
        "responseMode": "responseNode"
      },
      "id": "Webhook",
      "name": "CallerDesk Webhook",
      "type": "n8n-nodes-callerdesk.callerDeskWebhook",
      "typeVersion": 1,
      "position": [300, 300]
    },
    {
      "parameters": {
        "respondWith": "noData"
      },
      "id": "Respond",
      "name": "CallerDesk Respond",
      "type": "n8n-nodes-callerdesk.callerDeskRespond",
      "typeVersion": 1,
      "position": [600, 300]
    }
  ],
  "connections": {
    "CallerDesk Webhook": {
      "main": [
        [
          {
            "node": "CallerDesk Respond",
            "type": "main",
            "index": 0
          }
        ]
      ]
    }
  }
}
```

---

# 📊 Example 4 — Fetch Call Reports

Retrieve call logs.

```json
{
  "name": "CallerDesk - Get Call Reports",
  "nodes": [
    {
      "parameters": {},
      "id": "ManualTrigger",
      "name": "Manual Trigger",
      "type": "n8n-nodes-base.manualTrigger",
      "typeVersion": 1,
      "position": [300, 300]
    },
    {
      "parameters": {
        "resource": "reports",
        "operation": "app_call_list"
      },
      "id": "CallerDesk",
      "name": "CallerDesk",
      "type": "n8n-nodes-callerdesk.callerDesk",
      "typeVersion": 1,
      "position": [600, 300],
      "credentials": {
        "callerDeskApi": {
          "id": "YOUR_CREDENTIAL_ID",
          "name": "CallerDesk account"
        }
      }
    }
  ],
  "connections": {
    "Manual Trigger": {
      "main": [
        [
          {
            "node": "CallerDesk",
            "type": "main",
            "index": 0
          }
        ]
      ]
    }
  }
}
```

---

# 🧠 Tips

* Replace `YOUR_CREDENTIAL_ID` with your credential.
* Activate workflow before using webhook URLs.
* Use **Respond Node mode** when CallerDesk expects acknowledgment.

---

# 🚀 More Examples Coming

Planned workflows:

* CRM Lead Sync
* Missed Call Alert to WhatsApp
* Auto Dialer Campaign
* Call Recording Processing

---

**Enjoy automating with CallerDesk + n8n 🎉**
