# Simple Unified Push Notifications (V1)

Requirements:

`Not clear yet`

## Client-Push Server Integration

### Registration

`Not implemented`

### Handling Push Notifications on Device

`Not implemented`

## Server-Push Server Integration
### Send Notification
**Request:**

```httph
POST /api/v1/notifications
Content-Type: application/json

{
  "payload": {
    "text": "Custom text",
    "type": "text",
	"content": "Content text"
  },
  "target": {
    "services": ["test", "test1"],
    "platforms": ["ios", "android", "wp"]
  }
}
```

**Response:**

```httph-json
Status: 200 OK

notification:{
  id: "545e556514a01fbc16773558"
}
```

#### Payload
##### Type
Allows different resources to be opened via push notifications:

Moreover you could make client to open URL when user clicks on push notification.

For resource notification types you should send id of resource in payload parameters.  
Example:  

```httph
POST /api/v1/notifications
Content-Type: application/json

{
  "payload": {
    "text": "Custom text",
    "type": "item",
    "id": "item_id"
  },
  "target": {
    "services": ["test", "test1"],
    "platforms": ["ios", "android", "wp"]
  }
}
```

For URL notification you could set in which browser should the URL be opened and browser title.  
Example:  

```httph
POST /api/v1/notifications
Content-Type: application/json

{
  "payload": {
    "text": "Custom text",
    "type" : "url",
    "url" : "http://example.com",
    "default_browser" : true (for Default Browser) / false (for Internal Browser),
    "browser_title" : "Example"
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
- platforms
- id
- locale
- country
- version

##### Examples:
Target all iOS devices from Singapore with application version (less than or equal to 2) or (more than or equal to 4, but less than 5)

```json
{
  "platforms" : "ios",
  "country" : "sg",
  "version" : ["<= 2","~> 4"]
}
```

Filter all android devices from all countries except Bulgaria

```json
{
  "platforms" : "android",
  "country" : {
    "except" : "bg"
  }
}
```
