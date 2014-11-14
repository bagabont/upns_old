# Unified Push Notifications Service (V1)

Requirements:

`In progress ...`

## Client Integration

### Registration

**Request:**
```httph
POST /api/v1/subscribers/:id?platform={platform}&service={service_name}&token={push_token}
```

**Response:**
```httph
Status: 201 Created || 204 No Content
```

### Retrieving Payload of a Push Notification

To retrieve a push notification's payload you should send the ID of the notification as a parameter.

##### Type
Allows different resources to be opened via push notifications. Moreover you could make client to open URL when user clicks on push notification. For URL notification you could set in which browser should the URL be opened and browser title. For launching in the default browser set `"default_browser" :true`, for internal browser `"default_browser" :false`.  

**Request:**
```httph
GET /api/v1/payloads:id
```

**Response:**
```httph
Status: 200 OK
```
```json
{
    "payload": {
		"type": "image",
        "category": "animals",
        "watermark": "Our new Hippo is here!!!"
    }
}
```

## Server Integration
### Send Notification

#### Create and send push notification
**Request:**
```httph
POST /api/v1/notifications
Content-Type: application/json
```
```json
{
    "headers": {
        "text": "New text push received!"        
    },
    "payload": {
		"type": "text",
        "content": "Content text"
    },
    "target": {
        "services": [ "test", "test1" ],
        "platforms": [ "ios", "android", "windows" ]
    }
}
```

**Response:**
```httph
Status: 200 OK
```
```json
notification:{
  "id": "545e556514a01fbc16773558"
}
```

#### Resend push notification
**Request:**
```httph
POST /api/v1/notifications/:id
```

**Response:**
```httph
Status: 200 OK
```
```json
notification:{
  "id": "545e556514a01fbc16773558"
}
```

#### Headers

##### Text 
Short text notification message.

**Request:**
```httph
POST /api/v1/notifications
Content-Type: application/json
```
```json
{
    "headers": {
        "text": "New LINK push received!"        
    },
    "payload": {
		"type": "link",
    	"url" : "http://example.com",
    	"default_browser" : true,
    	"browser_title" : "Custom title"
    },
    "target": {
    	"services": ["test", "test1"],
    	"platforms": ["ios", "android", "wp"]
    }
}
```

#### Target
Use JSON format for target request param. You can target by following params:

- services
- platforms (Valid: ["windows", "ios", "android"])
- id
- locale
- country
- version

Example:
Target all iOS devices from Singapore with application version (less than or equal to 2) or (more than or equal to 4, but less than 5)

```json
{
  "platforms" : "ios",
  "country" : "sg",
  "version" : ["<= 2","~> 4"]
}
```
