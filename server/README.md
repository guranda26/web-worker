# JavaScript Frontend Applied Server

## Installation

1. Install [Node.js](https://nodejs.org/en/download/)
2. Clone this repository.
3. Install dependencies `npm install`.
4. Run server `npm run start`. Server will run on `localhost:3000`

## API reference

### Subscription

#### POST `/subscribe`

payload `{email: 'email@gmail.com'}`
response `{"success": true}`

#### POST `/unsubscribe`

response `{"success": true}`

### Community

#### GET `/community`

response

```json
[
  {
    "id": "2f1b6bf3-f23c-47e4-88f2-e4ce89409376",
    "avatar": "http://localhost:3000/avatars/avatar1.png",
    "firstName": "Mary",
    "lastName": "Smith",
    "position": "Lead Designer at Company Name"
  },
  {
    "id": "1157fea1-8b72-4a9e-b253-c65fa1556e26",
    "avatar": "http://localhost:3000/avatars/avatar2.png",
    "firstName": "Bill",
    "lastName": "Filler",
    "position": "Lead Engineer at Company Name"
  },
  {
    "id": "b96ac290-543c-4403-80fe-0c2d44e84ea9",
    "avatar": "http://localhost:3000/avatars/avatar3.png",
    "firstName": "Tim",
    "lastName": "Gates",
    "position": "CEO at Company Name"
  }
]
```

#### GET `/community/:id`

```json
{
  "id": "2f1b6bf3-f23c-47e4-88f2-e4ce89409376",
  "avatar": "http://localhost:3000/avatars/avatar1.png",
  "firstName": "Mary",
  "lastName": "Smith",
  "position": "Lead Designer at Company Name"
}
```

### Analytics

#### GET `/analytics/user`

response `[{timestamp: 1590085191530, data: []}]`

#### POST `/analytics/user`

payload `[] // Any array`
response `{"success": true}`

#### GET `/analytics/performance`

response `[{timestamp: 1590085191530, data: []}]`

#### POST `/analytics/performance`

payload `[] // Any array`
response `{"success": true}`
