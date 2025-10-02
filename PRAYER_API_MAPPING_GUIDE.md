# Prayer API Response Mapping Guide

## 🎯 **Issue Identified**
The frontend prayer components expect specific field names, but the backend API might be returning different field structures. This document maps the expected fields and provides the solution.

## 📊 **Expected Frontend Fields**

The PrayerComponent and Dashboard expect prayer objects with these fields:

```javascript
{
  _id: "prayer_unique_id",           // MongoDB ObjectId or unique identifier
  prayerName: "Fajar",               // Prayer name: Fajar, Dhuhr, Asr, Maghrib, Isha, Tahajjud  
  isCompleted: false,                // Boolean: true if prayer is completed
  completedAt: "2025-09-29T10:30:00Z", // ISO date when completed (optional)
  date: "2025-09-29"                 // Date in YYYY-MM-DD format
}
```

## 🔧 **Backend API Response Normalization**

The updated `prayerService.js` now automatically maps different possible field names:

### Field Mapping Rules:

| Frontend Field | Possible Backend Fields |
|----------------|------------------------|
| `_id` | `_id`, `id` |
| `prayerName` | `prayerName`, `name`, `prayer_name`, `type` |
| `isCompleted` | `isCompleted`, `completed`, `is_completed` |
| `completedAt` | `completedAt`, `completed_at`, `completionTime` |
| `date` | `date`, `prayer_date` |

## 🔄 **API Endpoints & Expected Responses**

### 1. **GET /api/v1/prayer/prayers/today**
**Purpose**: Get today's prayers for the logged-in user

**Expected Response Format**:
```json
{
  "statusCode": 200,
  "data": [
    {
      "_id": "66f123abc456def789",
      "prayerName": "Fajar", 
      "isCompleted": false,
      "date": "2025-09-29",
      "userId": "user_id_here"
    },
    {
      "_id": "66f123abc456def790",
      "prayerName": "Dhuhr",
      "isCompleted": true,
      "completedAt": "2025-09-29T12:30:00Z",
      "date": "2025-09-29",
      "userId": "user_id_here"
    }
    // ... more prayers
  ],
  "message": "Prayers fetched successfully",
  "success": true
}
```

**Alternative Backend Formats Supported**:
```json
// Snake_case format
{
  "data": [
    {
      "id": "123",
      "prayer_name": "Fajar",
      "is_completed": false,
      "prayer_date": "2025-09-29"
    }
  ]
}

// Different naming
{
  "data": [
    {
      "_id": "123", 
      "name": "Fajar",
      "completed": false,
      "date": "2025-09-29"
    }
  ]
}
```

### 2. **POST /api/v1/prayer/prayers**
**Purpose**: Create today's prayer entries (all 6 prayers)

**Expected Response**: Same format as GET endpoint above

### 3. **POST /api/v1/prayer/:prayerId/complete**
**Purpose**: Mark a specific prayer as completed

**Expected Response**:
```json
{
  "statusCode": 200,
  "data": {
    "_id": "66f123abc456def789",
    "prayerName": "Fajar",
    "isCompleted": true,
    "completedAt": "2025-09-29T05:30:00Z",
    "date": "2025-09-29",
    "xpEarned": 5,
    "streakUpdated": true
  },
  "message": "Prayer marked as completed successfully",
  "success": true
}
```

## 🎨 **Dashboard Integration Fields**

The Dashboard OverviewTab specifically looks for:

```javascript
// Prayer filtering and counting
const mandatoryPrayers = prayers.filter(p => p.prayerName !== 'Tahajjud');
const completedPrayers = prayers.filter(p => p.isCompleted);
const completedMandatory = mandatoryPrayers.filter(p => p.isCompleted);

// Recent activity display
prayers.filter(p => p.isCompleted).slice(-3).map(prayer => {
  // Shows: prayer.prayerName + " completed"
});
```

## 🔍 **Debug Information**

With the updated service, the browser console will now show:
- `🔍 Prayer API Response:` - Raw API response
- `📊 Normalized Prayer Data:` - Data after field mapping
- `🆕 No prayers found, creating new ones...` - When prayers need to be created

## ✅ **Testing Checklist**

1. **Check API Response Structure**:
   - Open browser console (F12)
   - Navigate to Prayers tab
   - Look for console logs showing actual API response

2. **Verify Field Mapping**:
   - Ensure prayer names display correctly
   - Check completion status toggles work
   - Verify prayer cards show proper information

3. **Test Dashboard Integration**:
   - Check Overview tab shows correct prayer counts
   - Verify recent activity section displays completed prayers
   - Ensure progress indicators reflect actual completion status

## 🚀 **Implementation Status**

✅ **Completed**:
- Field normalization in `prayerService.js`
- Debug logging in `PrayerComponent.jsx`
- Consistent layout with other components
- Support for multiple backend field naming conventions

⚠️ **Backend Requirements**:
Your backend should return arrays of prayer objects, not single objects, for the `/prayers/today` and `/prayers` endpoints.

## 🔧 **Quick Fix for Backend**

If your backend returns different field names, the frontend will now automatically map them. However, for optimal performance, consider updating your backend to use the expected field names:

```javascript
// Recommended backend response structure
{
  "statusCode": 200,
  "data": [
    {
      "_id": "objectId",
      "prayerName": "Fajar|Dhuhr|Asr|Maghrib|Isha|Tahajjud",
      "isCompleted": boolean,
      "completedAt": "ISO_date_string", // optional
      "date": "YYYY-MM-DD",
      "userId": "user_id"
    }
  ],
  "message": "Success message",
  "success": true
}
```

The prayer API response mapping is now fixed and will work with various backend field naming conventions! 🎉