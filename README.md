# Passwordless Authentication 


## End-point: Create Device UuId
this api will create device uuid .

here userType, deviceType, appInfo, and ipAddress are **requred.**

userType is a enum of

``` javascript
enum UserType  {
    ADMIN,
    USER
}

```
### Method: POST
>```
>{{localhost}}/auth/create-device-uuid
>```
### Body (**raw**)

```json
{
    "userType": "ADMIN",
    "deviceType": "WEB",
    "osVersionCode": "mac",
    "osVersionRelease": "12.2",
    "deviceBrand": "Apple",
    "deviceModel": "macbook pro m1",
    "deviceManufacturer": "Apple",
    "appInfo": {
        "versionName": "1.0.0",
        "versionCode": "1"
    },
    "location": {
        "coordinates": [0, 0]
    },
    "ipAddress": "172.0.0.1"
}
```
### Response
```json
{
    "status": "CREATED",
    "message": "device uuid created successfully",
    "data": {
        "deviceUuId": "U2FsdGVkX1/KctaimzBiCz9wmdmD1g9mO6k9WrMW59iS43Z2RHH8H10q2wU3fnLHJXwZ6TX8XK2n2g+pNLSwI/4reW1W2qaMtDhSpNwIOrHteIqS1hkO0bgillTNEroVeSgQ2jb7xZ/yUUPewX1LGd4NNINzoJCc+bJJAUsn0GMdaRZK5sVE9gOUnyBbMmfFHpWb7cEMvZ/NrYhi3e7hA7ZB25JsRLOYLCYYt3vze0E/Pza4A2viL9opB9d70wR0/DCeOv/5nW94M9ZNWvk850eWOndmDZBrBRyNed8bMRAj+8msqxHvtQJOFEV96QV0YfKKvjPShlkp+1ED1yuihVGtvmjhSSCIDlsHfJmCdlZBSakceKfZ4jAFPE0WIT1/d8y8aBmuJ88EsVlIiq0L8aci8uDGxQw+hG2dKpIv3xo="
    }
}

```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Request OTP
here user can request otp for login or signup. if there is no user with this email, system will create signup otp.
### Method: POST
>```
>{{localhost}}/auth/req-otp
>```
### Body (**raw**)

```json
{
    "email":"shafiulislam20@gmail.com",
    "deviceUuid": "U2FsdGVkX1/heJpO2ngP1VM8TBXHWVBLx6KzTvhZFktJhMEtRgFKkWqCPDdXQm5KjW5KX92kypQC4c5kTD00EgwGNagvFFVNpoTMJ3Q+w3dAax13UjNQ3C+xjYUvji9MXIy22P4VttM+j4q5Ro0lTdEXrjSQjsraE+Xlahvq2kGcwoq4Jkr0wD769Vgz+04wpRurcjhK4kYw5WBqymalXGcYinYJf2fjvxbJhtIds89Z7G+S6Etkio6CVyXEowGOWb51Gp+0mvtUAEwUdCbF7p8/4rETEx+o3Bozr0siXQg2J8xF2Pur3v9DFKJoR6SbJ7shV39oWINwn5csNBtrb3I1nbJclVyLczeqg1Qpqkou+HTAhDQBhIHdP3uNraMR0NVLGfUIbYX7BHKbe6Bm6gycYrMqyrQxFpEKNo+oSn8="
}
```
### Response
```json
{
    "status": "CREATED",
    "message": "Login Otp Send",
    "data": ""
}

```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Verify OTP
if otp valid it will return access token. if otp valid and there is no user with is email, system will create a new user.

with this system , one user can only use one device login at a same time. other access token will expired and other device login will expire
### Method: POST
>```
>{{localhost}}/auth/verify-otp
>```
### Body (**raw**)

```json
{
    "otp": "38228",
    "email":"shafiulislam20@gmail.com",
    "deviceUuid": "U2FsdGVkX1/heJpO2ngP1VM8TBXHWVBLx6KzTvhZFktJhMEtRgFKkWqCPDdXQm5KjW5KX92kypQC4c5kTD00EgwGNagvFFVNpoTMJ3Q+w3dAax13UjNQ3C+xjYUvji9MXIy22P4VttM+j4q5Ro0lTdEXrjSQjsraE+Xlahvq2kGcwoq4Jkr0wD769Vgz+04wpRurcjhK4kYw5WBqymalXGcYinYJf2fjvxbJhtIds89Z7G+S6Etkio6CVyXEowGOWb51Gp+0mvtUAEwUdCbF7p8/4rETEx+o3Bozr0siXQg2J8xF2Pur3v9DFKJoR6SbJ7shV39oWINwn5csNBtrb3I1nbJclVyLczeqg1Qpqkou+HTAhDQBhIHdP3uNraMR0NVLGfUIbYX7BHKbe6Bm6gycYrMqyrQxFpEKNo+oSn8="
}
```
### Response
```json
{
    "status": "SUCCESS",
    "message": "Token Created Successfully!",
    "data": {
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2Mzk4NjFjYzE5MDVhNjA2ZmU2Y2M4OWYiLCJlbWFpbCI6InNoYWZpdWxpc2xhbTIwQGdtYWlsLmNvbSIsImlhdCI6MTY3MDkzMjgzNSwiZXhwIjoxNjcwOTMyODk1fQ.VFOkmJ9-xAWveasNDf-JMhqbYF1fsJhJMEgybrGx_hk",
        "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2Mzk4NjFjYzE5MDVhNjA2ZmU2Y2M4OWYiLCJlbWFpbCI6InNoYWZpdWxpc2xhbTIwQGdtYWlsLmNvbSIsImlhdCI6MTY3MDkzMjgzNSwiZXhwIjoxNjcwOTMzMTM1fQ.5t3BMrpU35NUHRWcSt-uCyBT8WijmBo1kVRyPYsU6HY"
    }
}

```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Refresh Token
with this system , one user can only use one device login at a same time. other access token will expired.
### Method: POST
>```
>{{localhost}}/auth/refresh-token
>```
### Body (**raw**)

```json
{
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2Mzk4NjFjYzE5MDVhNjA2ZmU2Y2M4OWYiLCJlbWFpbCI6InNoYWZpdWxpc2xhbTIwQGdtYWlsLmNvbSIsImlhdCI6MTY3MDkzMjgzNSwiZXhwIjoxNjcwOTMzMTM1fQ.5t3BMrpU35NUHRWcSt-uCyBT8WijmBo1kVRyPYsU6HY",
    "deviceUuId": "U2FsdGVkX1/heJpO2ngP1VM8TBXHWVBLx6KzTvhZFktJhMEtRgFKkWqCPDdXQm5KjW5KX92kypQC4c5kTD00EgwGNagvFFVNpoTMJ3Q+w3dAax13UjNQ3C+xjYUvji9MXIy22P4VttM+j4q5Ro0lTdEXrjSQjsraE+Xlahvq2kGcwoq4Jkr0wD769Vgz+04wpRurcjhK4kYw5WBqymalXGcYinYJf2fjvxbJhtIds89Z7G+S6Etkio6CVyXEowGOWb51Gp+0mvtUAEwUdCbF7p8/4rETEx+o3Bozr0siXQg2J8xF2Pur3v9DFKJoR6SbJ7shV39oWINwn5csNBtrb3I1nbJclVyLczeqg1Qpqkou+HTAhDQBhIHdP3uNraMR0NVLGfUIbYX7BHKbe6Bm6gycYrMqyrQxFpEKNo+oSn8="
}
```

### Response
```json
{
    "status": "SUCCESS",
    "message": "Token Created Successfully!",
    "data": {
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2Mzk4NjFjYzE5MDVhNjA2ZmU2Y2M4OWYiLCJlbWFpbCI6InNoYWZpdWxpc2xhbTIwQGdtYWlsLmNvbSIsImlhdCI6MTY3MDkzMjg0OCwiZXhwIjoxNjcwOTMyOTA4fQ.RAqEy07mrz-ZPWe7tFIMnggDY4dyiugveh1HmN3pswo",
        "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2Mzk4NjFjYzE5MDVhNjA2ZmU2Y2M4OWYiLCJlbWFpbCI6InNoYWZpdWxpc2xhbTIwQGdtYWlsLmNvbSIsImlhdCI6MTY3MDkzMjg0OCwiZXhwIjoxNjcwOTMzMTQ4fQ.2kRRqaJE94EZq_iEDsb5gBvR5cMg5y7fS2_IyCAPZwc"
    }
}

```
