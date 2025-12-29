

   # 📧 FMVTS Notification Microservice

The **FMVTS Notification Microservice** is responsible for **real-time event-driven notifications** within the Fleet Management and Vehicle Tracking System (FMVTS).

This service subscribes to critical fleet events such as **vehicle maintenance** and **delayed trips**, processes the received data, and sends **email notifications** to the respective fleet managers using a **third-party email service (Brevo)**.  
It also maintains a **persistent notification history** and provides **insight APIs** for administrative monitoring.

---

## 📌 Core Responsibilities

- Subscribe to maintenance and delayed trip events
- Process event payloads in real time
- Send email notifications to fleet managers
- Integrate with third-party email provider (**Brevo**)
- Persist notification delivery status in the database
- Track notification success and failure states
- Provide insights and analytics for admins

---

## 🏗️ Architecture Role

# 📧 FMVTS Notification Microservice

The **FMVTS Notification Microservice** is responsible for **real-time event-driven notifications** within the Fleet Management and Vehicle Tracking System (FMVTS).

This service subscribes to critical fleet events such as **vehicle maintenance** and **delayed trips**, processes the received data, and sends **email notifications** to the respective fleet managers using a **third-party email service (Brevo)**.  
It also maintains a **persistent notification history** and provides **insight APIs** for administrative monitoring.

---

## 📌 Core Responsibilities

- Subscribe to maintenance and delayed trip events
- Process event payloads in real time
- Send email notifications to fleet managers
- Integrate with third-party email provider (**Brevo**)
- Persist notification delivery status in the database
- Track notification success and failure states
- Provide insights and analytics for admins

---

## 🏗️ Architecture Role

Maintenance Microservice ──┐
├──▶ Event Queue (RabbitMQ)
Trip Microservice ─────────┘
│
▼
Notification Microservice
│
▼
Brevo Email Service
│
▼
Fleet Managers




- Operates in an **event-driven** manner
- Fully decoupled from event producers
- Ensures reliable and scalable notification handling

---

## 🔄 Event Subscription

The Notification Microservice subscribes to the following events:

### 📦 Maintenance Event
- Event Type: `MAINTENANCE_DUE`
- Triggered by: Maintenance Microservice
- Purpose: Notify fleet managers about vehicles due for maintenance

### ⏱️ Delayed Trip Event
- Event Type: `TRIP_DELAYED`
- Triggered by: Trip Microservice
- Purpose: Notify fleet managers about delayed trips

---

## ✉️ Notification Workflow

1. Event is received from the message queue
2. Event payload is validated and processed
3. Email content is dynamically generated based on event type
4. Mail service is invoked to send email via **Brevo**
5. Notification delivery result is evaluated
6. Notification record is persisted in the database:
   - `SUCCESS` → Email sent successfully
   - `FAILED` → Email delivery failed

This ensures **traceability**, **auditing**, and **operational transparency**.

---

## 🗄️ Notification Persistence

Each notification attempt is stored in the database with details such as:

- Event ID
- Event type (Maintenance / Trip Delayed)
- Recipient
- Notification status (`SUCCESS` / `FAILED`)
- Timestamp

This enables reliable insights and historical analysis.

---

## 📊 Insights & Analytics (Admin Only)

The Notification Microservice provides **insight APIs** for administrators, including:

- Number of events received by type
- Number of notifications sent per event type
- Notification success vs failure metrics
- Notifications sent in the **last quarter**
- Event trends over time

Access to insights is restricted to **Admin role only**.

---

## 🔐 Authentication & Authorization

- All protected endpoints require **JWT authentication**
- Role-based authorization enforced using middleware
- Only **Admin users** can access analytics and insights APIs
- Fleet managers receive notifications but cannot access analytics endpoints

---

## 📍 API Capabilities (High Level)

| Capability | Description |
|----------|-------------|
| Event subscription | Consume maintenance & delayed trip events |
| Email notifications | Send real-time alerts via Brevo |
| Persistence | Store notification delivery status |
| Insights | Provide notification analytics |
| RBAC | Admin-only access to insights |

---


▶️ Running the Service


    Install Dependencies

     npm install


    Start Application

      npm start



