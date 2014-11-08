# Simple Unified Push Notifications (V1)

Requirements:

`Not clear`

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

notification : {
  text : ...,
  payload : {
    type : ...
    ...
  }
  ...
},
filter : {
  ...
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

notification : {
  text : "Some text",
  payload : {
    type : "item",
    id : "item_id"
  }
},
filter : {
  platform : [
    "ios",
    "android",
    "wp"
    ]
}
```

For URL notification you could set in which browser should the URL be opened and browser title.  
Example:  

```httph
POST /api/v1/notifications
Content-Type: application/json

notification : {
  text : "Custom text",
  payload : {
    type : "url",
    url : "example.com",
    default_browser : true (for Default Browser) / false (for Internal Browser),
    browser_title : "Example"
  }
},
filter : {
  platform : [
    "ios",
    "android",
    "wp"
    ]
}
```

#### Filter
Use JSON format for filter request param. You can filter by following params:

- service
- device\_id
- platform
- locale
- country
- app\_version

You could use keyword "except" for filtering attributes.  
For "app\_version" param you can use "=", ">", "\<", "\<=", "\>=", "~\>".  
Possible values of platform: "ios", "android", "wp".  
Specify device\_id if you want to send notification to a certain device.  

##### Examples:
Filter all iOS devices from Singapore with application version (less than or equal to 2) or (more than or equal to 4, but less than 5)

```json
{
  "platform" : "ios",
  "country" : "sg",
  "version" : ["<= 2","~> 4"]
}
```

Filter all android devices from all countries except Bulgaria

```json
{
  "platform" : "android",
  "country" : {
    "except" : "bg"
  }
}
```
