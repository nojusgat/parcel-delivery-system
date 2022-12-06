# Sprendžiamo uždavinio aprašymas
## Sistemos paskirtis
Projekto tikslas – suteikti siuntų pristatymo įmonei galimybę kontroliuoti siuntas bei užtikrinti sklandų siuntų pristatymą.

Administratorius galės pridėti įmonės automobilius prie sistemos ir siuntas, kurios laukia pristatymo. Tuomet administratorius galės sukurti kurjeriui paskyrą prie sistemos, priskirti kurjeriui automobilį, bei siuntas, kurias reikia pristatyti. Kurjeris galės matyti kurį automobilį jam priskyrę, siuntų maršrutą ir keisti siuntos pristatymo statusą. Neregistruotas sistemos naudotojas turės galimybę peržiūrėti siuntos statusą.

Taikomosios sirties objektai: siunta <- kurjeris <- automobilis.

## Funkciniai reikalavimai
Neregistruotas sistemos naudotojas galės:
1. Prisijungti prie internetinės aplikacijos;
2. Peržiūrėti siuntos būseną.

Registruotas sistemos naudotojas (kurjeris) galės:
1. Matyti priskirto automobilio informaciją;
2. Matyti savo pristatomų siuntų sąrašą;
3. Matyti detalią pristatomos siuntos informaciją;
4. Atnaujinti siuntos statusą.

Administratorius galės:
1. Valdyti kurjerius (CRUD);
2. Valdyti siuntas (CRUD);
3. Valdyti automobilius (CRUD);
4. Priskirti kurjerį prie siuntos;
5. Priskirti automobilį prie kurjerio.

# Sistemos architektūra
Sistemos sudedamosios dalys:
- Kliento pusė (ang. Front-End) – naudojant React.js;
- Serverio pusė (angl. Back-End) – naudojant Node.js Express. Duomenų bazė – MySQL.

![](/deployment-diagram.png)

# Naudotojo sąsajos projektas

## Pagrindinis puslapis (Siuntos sekimas)

| Wireframe |
| --- |
| ![](/wireframes/home-wireframe.png) |

| Realizacija |
| --- |
| ![](/wireframes/home-real.png) |

## Prisijungimas

| Wireframe |
| --- |
| ![](/wireframes/login-wireframe.png) |

| Realizacija |
| --- |
| ![](/wireframes/login-real.png) |

## Registracija

| Wireframe |
| --- |
| ![](/wireframes/register-wireframe.png) |

| Realizacija |
| --- |
| ![](/wireframes/register-real.png) |

## Siuntos pristatymo puslapis (Matomas tik kurjeriui)

| Wireframe |
| --- |
| ![](/wireframes/courier-view/deliveries-wireframe.png) |

| Realizacija |
| --- |
| ![](/wireframes/courier-view/deliveries-real.png) |

## Siuntos sąrašas (Matomas tik kurjeriui)

| Wireframe |
| --- |
| ![](/wireframes/courier-view/parcels-wireframe.png) |

| Realizacija |
| --- |
| ![](/wireframes/courier-view/parcels-real.png) |

## Automobilių sąrašas (Matomas tik administratoriui)

| Wireframe |
| --- |
| ![](/wireframes/admin-view/cars-wireframe.png) |

| Realizacija |
| --- |
| ![](/wireframes/admin-view/cars-real.png) |

## Kurjerių sąrašas (Matomas tik administratoriui)

| Wireframe |
| --- |
| ![](/wireframes/admin-view/couriers-wireframe.png) |

| Realizacija |
| --- |
| ![](/wireframes/admin-view/couriers-real.png) |

## Siuntų sąrašas (Matomas tik administratoriui)

| Wireframe |
| --- |
| ![](/wireframes/admin-view/parcels-wireframe.png) |

| Realizacija |
| --- |
| ![](/wireframes/admin-view/parcels-real.png) |

# API specifikacija


## GET /parcels

Returns a list of all parcels with the current page, total pages and result count. Only accessible for authenticated courier and administrator. When accessed by a courier returned list will only have parcels assigned to that courier.


### Resource URL

>```
>https://parcel-delivery-system-ng.herokuapp.com/api/parcels
>```


### Resource Information

<table>
  <tr><td>Response formats</td><td>JSON</td></tr>
  <tr><td>Requires authentication?</td><td>Yes</td></tr>
  <tr><td>Response codes</td><td>200, 204, 400, 401, 403</td></tr>
</table>


###  Parameters

|Name|Required|Description|Default Value|Example|
|---|---|---|---|---|
|page|optional|The page number||1|
|size|optional|The number of parcels to return per page||10|
|unassigned|optional|When set to true, will only return parcels that have not been assigned to a courier||true|


### Example Requests

>```
>curl --location --request GET --url 'https://parcel-delivery-system-ng.herokuapp.com/api/parcels' \
>--header 'authorization: Bearer Token'
>```


### Example Response

```json
{
    "page": 1,
    "results": [
        {parcel-object},
        {parcel-object},
        {parcel-object}
    ],
    "total_pages": 5,
    "total_results": 13
}
```


## POST /parcels

Creates a new parcel. Only accessible for authenticated administrator.


### Resource URL

>```
>https://parcel-delivery-system-ng.herokuapp.com/api/parcels
>```


### Resource Information

<table>
  <tr><td>Response formats</td><td>JSON</td></tr>
  <tr><td>Requires authentication?</td><td>Yes</td></tr>
  <tr><td>Response codes</td><td>201, 400, 401, 403</td></tr>
</table>


###  Parameters

|Name|Required|Description|Default Value|Example|
|---|---|---|---|---|
|senderName|required|The parcel senders full name||Vardenis Pavardenis|
|senderAddress|required|The parcel senders full address||Gatvė g. 1, Kaunas LT-00000|
|senderPhone|optional|The parcel senders phone number||+37060000000|
|receiverName|required|The parcel receivers full name||Vardenis Pavardenis|
|receiverAddress|required|The parcel receivers full address||Gatvė g. 1, Kaunas LT-00000|
|receiverPhone|optional|The parcel receivers phone number||+37060000000|
|weight|required|The weight of the parcel||2.5|
|price|required|The price of the parcel||1.5|
|status|optional|The status of the parcel, either Pending, In Progress or Delivered||Pending|
|courierId|optional|ID of the courier to whom it will be assigned to||10|


### Example Requests

>```
>curl --location --request POST 'https://parcel-delivery-system-ng.herokuapp.com/api/parcels' \
>--data-urlencode 'senderName=Vardenis Pavardenis' \
>--data-urlencode 'senderAddress=Gatvė g. 1, Kaunas LT-00000' \
>--data-urlencode 'senderPhone=+37060000000' \
>--data-urlencode 'receiverName=Vardenis Pavardenis' \
>--data-urlencode 'receiverAddress=Gatvė g. 1, Kaunas LT-00000' \
>--data-urlencode 'receiverPhone=+37060000000' \
>--data-urlencode 'weight=2.5' \
>--data-urlencode 'price=1.5' \
>--data-urlencode 'status=Pending' \
>--header 'authorization: Bearer Token'
>```


### Example Response

```json
{
  "parcelNumber": {string},
  "senderName": {string},
  "senderAddress": {string},
  "senderPhone": {string},
  "receiverName": {string},
  "receiverAddress": {string},
  "receiverPhone": {string},
  "weight": {double},
  "price": {double},
  "status": {string},
  "updatedAt": {string},
  "createdAt": {string}
}
```


## GET /parcels/:id

Returns the specified parcel.


### Resource URL

>```
>https://parcel-delivery-system-ng.herokuapp.com/api/parcels/:id
>```


### Resource Information

<table>
  <tr><td>Response formats</td><td>JSON</td></tr>
  <tr><td>Requires authentication?</td><td>No</td></tr>
  <tr><td>Response codes</td><td>200, 400</td></tr>
</table>


###  Parameters

|Name|Required|Description|Default Value|Example|
|---|---|---|---|---|
|id|required|ID of the parcel||LTEDE6CD6B6B134|


### Example Requests

>```
>curl --location --request GET 'https://parcel-delivery-system-ng.herokuapp.com/api/parcels/LTEDE6CD6B6B134'
>```


### Example Response

```json
{
  "parcelNumber": {string},
  "senderName": {string},
  "senderAddress": {string},
  "senderPhone": {string},
  "receiverName": {string},
  "receiverAddress": {string},
  "receiverPhone": {string},
  "weight": {double},
  "price": {double},
  "status": {string},
  "updatedAt": {string},
  "createdAt": {string},
  "courier": {courier-object}
}
```


## PUT /parcels/:id

Updates a specified parcel. Only accessible for authenticated administrator and courier. Courier can only change the parameter "status".


### Resource URL

>```
>https://parcel-delivery-system-ng.herokuapp.com/api/parcels/:id
>```


### Resource Information

<table>
  <tr><td>Response formats</td><td>JSON</td></tr>
  <tr><td>Requires authentication?</td><td>Yes</td></tr>
  <tr><td>Response codes</td><td>200, 400, 401, 403</td></tr>
</table>


###  Parameters

|Name|Required|Description|Default Value|Example|
|---|---|---|---|---|
|id|required|ID of the parcel||LTEDE6CD6B6B134|
|senderName|optional|The parcel senders full name||Vardenis Pavardenis|
|senderAddress|optional|The parcel senders full address||Gatvė g. 1, Kaunas LT-00000|
|senderPhone|optional|The parcel senders phone number||+37060000000|
|receiverName|optional|The parcel receivers full name||Vardenis Pavardenis|
|receiverAddress|optional|The parcel receivers full address||Gatvė g. 1, Kaunas LT-00000|
|receiverPhone|optional|The parcel receivers phone number||+37060000000|
|weight|optional|The weight of the parcel||2.5|
|price|optional|The price of the parcel||1.5|
|status|optional|The status of the parcel, either Pending, In Progress or Delivered||Pending|
|courierId|optional|ID of the courier to whom it will be assigned to||10|


### Example Requests

>```
>curl --location --request PUT 'https://parcel-delivery-system-ng.herokuapp.com/api/parcels/LTEDE6CD6B6B134' \
>--data-urlencode 'status=Delivered' \
>--header 'authorization: Bearer Token'
>```


### Example Response

```json
{
  "parcelNumber": {string},
  "senderName": {string},
  "senderAddress": {string},
  "senderPhone": {string},
  "receiverName": {string},
  "receiverAddress": {string},
  "receiverPhone": {string},
  "weight": {double},
  "price": {double},
  "status": {string},
  "updatedAt": {string},
  "createdAt": {string},
  "courier": {courier-object}
}
```


## DEL /parcels/:id

Deletes a specified parcel. Only accessible for authenticated administrator.


### Resource URL

>```
>https://parcel-delivery-system-ng.herokuapp.com/api/parcels/:id
>```


### Resource Information

<table>
  <tr><td>Response formats</td><td>JSON</td></tr>
  <tr><td>Requires authentication?</td><td>Yes</td></tr>
  <tr><td>Response codes</td><td>204, 400, 401, 403</td></tr>
</table>


###  Parameters

|Name|Required|Description|Default Value|Example|
|---|---|---|---|---|
|id|required|ID of the parcel||LTEDE6CD6B6B134|


### Example Requests

>```
>curl --location --request DELETE 'https://parcel-delivery-system-ng.herokuapp.com/api/parcels/LTEDE6CD6B6B134' \
>--header 'authorization: Bearer Token'
>```


### Example Response

```json
null
```




## GET /couriers

Returns a list of all couriers with the current page, total pages and result count. Only accessible for authenticated administrator.


### Resource URL

>```
>https://parcel-delivery-system-ng.herokuapp.com/api/couriers
>```


### Resource Information

<table>
  <tr><td>Response formats</td><td>JSON</td></tr>
  <tr><td>Requires authentication?</td><td>Yes</td></tr>
  <tr><td>Response codes</td><td>200, 204, 400, 401, 403</td></tr>
</table>


###  Parameters

|Name|Required|Description|Default Value|Example|
|---|---|---|---|---|
|page|optional|The page number||1|
|size|optional|The number of couriers to return per page||10|


### Example Requests

>```
>curl --location --request GET --url 'https://parcel-delivery-system-ng.herokuapp.com/api/couriers' \
>--header 'authorization: Bearer Token'
>```


### Example Response

```json
{
    "page": 1,
    "results": [
        {courier-object},
        {courier-object},
        {courier-object}
    ],
    "total_pages": 5,
    "total_results": 13
}
```


## GET /couriers/:id/parcels

Returns a list of all parcels for a specified courier with the current page, total pages and result count. Only accessible for authenticated administrator.


### Resource URL

>```
>https://parcel-delivery-system-ng.herokuapp.com/api/couriers/:id/parcels
>```


### Resource Information

<table>
  <tr><td>Response formats</td><td>JSON</td></tr>
  <tr><td>Requires authentication?</td><td>Yes</td></tr>
  <tr><td>Response codes</td><td>200, 400, 401, 403</td></tr>
</table>


###  Parameters

|Name|Required|Description|Default Value|Example|
|---|---|---|---|---|
|id|required|ID of the courier||10|
|page|optional|The page number||1|
|size|optional|The number of parcels to return per page||10|


### Example Requests

>```
>curl --location --request GET --url 'https://parcel-delivery-system-ng.herokuapp.com/api/couriers/10/parcels' \
>--header 'authorization: Bearer Token'
>```


### Example Response

```json
{
    "page": 1,
    "results": [
        {parcel-object},
        {parcel-object},
        {parcel-object}
    ],
    "total_pages": 5,
    "total_results": 13
}
```


## POST /couriers

Creates a new courier. Only accessible for authenticated administrator.


### Resource URL

>```
>https://parcel-delivery-system-ng.herokuapp.com/api/couriers
>```


### Resource Information

<table>
  <tr><td>Response formats</td><td>JSON</td></tr>
  <tr><td>Requires authentication?</td><td>Yes</td></tr>
  <tr><td>Response codes</td><td>201, 400, 401, 403</td></tr>
</table>


###  Parameters

|Name|Required|Description|Default Value|Example|
|---|---|---|---|---|
|firstname|required|The first name of the courier||Vardenis|
|lastname|required|The last name of the courier||Pavardenis|
|phone|required|The couriers phone number||+37060000000|
|carId|optional|ID of the car that will be assigned to the courier||1|
|userId|optional|ID of the user that will be assigned to the courier||1|


### Example Requests

>```
>curl --location --request POST 'https://parcel-delivery-system-ng.herokuapp.com/api/couriers' \
>--data-urlencode 'firstname=Vardenis' \
>--data-urlencode 'lastname=Pavardenis' \
>--data-urlencode 'phone=+37060000000' \
>--header 'authorization: Bearer Token'
>```


### Example Response

```json
{
  "status": {string},
  "id": {number},
  "firstname": {string},
  "lastname": {string},
  "phone": {string},
  "updatedAt": {string},
  "createdAt": {string}
}
```


## GET /couriers/:id

Returns the specified courier. Only accessible for authenticated administrator.


### Resource URL

>```
>https://parcel-delivery-system-ng.herokuapp.com/api/couriers/:id
>```


### Resource Information

<table>
  <tr><td>Response formats</td><td>JSON</td></tr>
  <tr><td>Requires authentication?</td><td>Yes</td></tr>
  <tr><td>Response codes</td><td>200, 400, 401, 403</td></tr>
</table>


###  Parameters

|Name|Required|Description|Default Value|Example|
|---|---|---|---|---|
|id|required|ID of the courier||1|


### Example Requests

>```
>curl --location --request GET 'https://parcel-delivery-system-ng.herokuapp.com/api/couriers/1' \
>--header 'authorization: Bearer Token'
>```


### Example Response

```json
{
  "status": {string},
  "id": {number},
  "firstname": {string},
  "lastname": {string},
  "phone": {string},
  "updatedAt": {string},
  "createdAt": {string},
  "car": {car-object},
  "user": {user-object}
}
```


## PUT /couriers/:id

Updates a specified courier. Only accessible for authenticated administrator.


### Resource URL

>```
>https://parcel-delivery-system-ng.herokuapp.com/api/couriers/:id
>```


### Resource Information

<table>
  <tr><td>Response formats</td><td>JSON</td></tr>
  <tr><td>Requires authentication?</td><td>Yes</td></tr>
  <tr><td>Response codes</td><td>200, 400, 401, 403</td></tr>
</table>


###  Parameters

|Name|Required|Description|Default Value|Example|
|---|---|---|---|---|
|id|required|ID of the courier||1|
|firstname|optional|The first name of the courier||Vardenis|
|lastname|optional|The last name of the courier||Pavardenis|
|phone|optional|The couriers phone number||+37060000000|
|carId|optional|ID of the car that will be assigned to the courier||1|
|userId|optional|ID of the user that will be assigned to the courier||1|


### Example Requests

>```
>curl --location --request PUT 'https://parcel-delivery-system-ng.herokuapp.com/api/couriers/1' \
>--data-urlencode 'firstname=Vardenis' \
>--data-urlencode 'lastname=Pavardenis' \
>--data-urlencode 'phone=+37060000000' \
>--header 'authorization: Bearer Token'
>```


### Example Response

```json
{
  "status": {string},
  "id": {number},
  "firstname": {string},
  "lastname": {string},
  "phone": {string},
  "updatedAt": {string},
  "createdAt": {string},
  "car": {car-object},
  "user": {user-object}
}
```


## DEL /couriers/:id

Deletes a specified courier. Only accessible for authenticated administrator.


### Resource URL

>```
>https://parcel-delivery-system-ng.herokuapp.com/api/couriers/:id
>```


### Resource Information

<table>
  <tr><td>Response formats</td><td>JSON</td></tr>
  <tr><td>Requires authentication?</td><td>Yes</td></tr>
  <tr><td>Response codes</td><td>204, 400, 401, 403</td></tr>
</table>


###  Parameters

|Name|Required|Description|Default Value|Example|
|---|---|---|---|---|
|id|required|ID of the courier||1|


### Example Requests

>```
>curl --location --request DELETE 'https://parcel-delivery-system-ng.herokuapp.com/api/couriers/1' \
>--header 'authorization: Bearer Token'
>```


### Example Response

```json
null
```




## GET /cars

Returns a list of all cars with the current page, total pages and result count. Only accessible for authenticated administrator.


### Resource URL

>```
>https://parcel-delivery-system-ng.herokuapp.com/api/cars
>```


### Resource Information

<table>
  <tr><td>Response formats</td><td>JSON</td></tr>
  <tr><td>Requires authentication?</td><td>Yes</td></tr>
  <tr><td>Response codes</td><td>200, 204, 400, 401, 403</td></tr>
</table>


###  Parameters

|Name|Required|Description|Default Value|Example|
|---|---|---|---|---|
|page|optional|The page number||1|
|size|optional|The number of cars to return per page||10|


### Example Requests

>```
>curl --location --request GET --url 'https://parcel-delivery-system-ng.herokuapp.com/api/cars' \
>--header 'authorization: Bearer Token'
>```


### Example Response

```json
{
    "page": 1,
    "results": [
        {car-object},
        {car-object},
        {car-object}
    ],
    "total_pages": 5,
    "total_results": 13
}
```


## GET /cars/:id/parcels

Returns a list of all parcels for a specified car with the current page, total pages and result count. Only accessible for authenticated administrator.


### Resource URL

>```
>https://parcel-delivery-system-ng.herokuapp.com/api/cars/:id/parcels
>```


### Resource Information

<table>
  <tr><td>Response formats</td><td>JSON</td></tr>
  <tr><td>Requires authentication?</td><td>Yes</td></tr>
  <tr><td>Response codes</td><td>200, 400, 401, 403</td></tr>
</table>


###  Parameters

|Name|Required|Description|Default Value|Example|
|---|---|---|---|---|
|id|required|ID of the car||10|
|page|optional|The page number||1|
|size|optional|The number of parcels to return per page||10|


### Example Requests

>```
>curl --location --request GET --url 'https://parcel-delivery-system-ng.herokuapp.com/api/cars/10/parcels' \
>--header 'authorization: Bearer Token'
>```


### Example Response

```json
{
    "page": 1,
    "results": [
        {parcel-object},
        {parcel-object},
        {parcel-object}
    ],
    "total_pages": 5,
    "total_results": 13
}
```


## POST /cars

Creates a new car. Only accessible for authenticated administrator.


### Resource URL

>```
>https://parcel-delivery-system-ng.herokuapp.com/api/cars
>```


### Resource Information

<table>
  <tr><td>Response formats</td><td>JSON</td></tr>
  <tr><td>Requires authentication?</td><td>Yes</td></tr>
  <tr><td>Response codes</td><td>201, 400, 401, 403</td></tr>
</table>


###  Parameters

|Name|Required|Description|Default Value|Example|
|---|---|---|---|---|
|make|required|The make of the car||Fiat|
|model|required|The model of the car||Scudo|
|licensePlate|required|The license plate of the car||ABC123|


### Example Requests

>```
>curl --location --request POST 'https://parcel-delivery-system-ng.herokuapp.com/api/cars' \
>--data-urlencode 'make=Fiat' \
>--data-urlencode 'model=Scudo' \
>--data-urlencode 'licensePlate=ABC123' \
>--header 'authorization: Bearer Token'
>```


### Example Response

```json
{
  "id": {number},
  "make": {string},
  "model": {string},
  "licensePlate": {string}
}
```


## GET /cars/:id

Returns the specified car. Only accessible for authenticated administrator.


### Resource URL

>```
>https://parcel-delivery-system-ng.herokuapp.com/api/cars/:id
>```


### Resource Information

<table>
  <tr><td>Response formats</td><td>JSON</td></tr>
  <tr><td>Requires authentication?</td><td>Yes</td></tr>
  <tr><td>Response codes</td><td>200, 400, 401, 403</td></tr>
</table>


###  Parameters

|Name|Required|Description|Default Value|Example|
|---|---|---|---|---|
|id|required|ID of the car||1|


### Example Requests

>```
>curl --location --request GET 'https://parcel-delivery-system-ng.herokuapp.com/api/cars/1' \
>--header 'authorization: Bearer Token'
>```


### Example Response

```json
{
  "id": {number},
  "make": {string},
  "model": {string},
  "licensePlate": {string}
}
```


## PUT /cars/:id

Updates a specified car. Only accessible for authenticated administrator.


### Resource URL

>```
>https://parcel-delivery-system-ng.herokuapp.com/api/cars/:id
>```


### Resource Information

<table>
  <tr><td>Response formats</td><td>JSON</td></tr>
  <tr><td>Requires authentication?</td><td>Yes</td></tr>
  <tr><td>Response codes</td><td>200, 400, 401, 403</td></tr>
</table>


###  Parameters

|Name|Required|Description|Default Value|Example|
|---|---|---|---|---|
|id|required|ID of the car||1|
|make|optional|The make of the car||Fiat|
|model|optional|The model of the car||Scudo|
|licensePlate|optional|The license plate of the car||ABC123|


### Example Requests

>```
>curl --location --request PUT 'https://parcel-delivery-system-ng.herokuapp.com/api/cars/1' \
>--data-urlencode 'make=Fiat' \
>--data-urlencode 'model=Scudo' \
>--data-urlencode 'licensePlate=ABC123' \
>--header 'authorization: Bearer Token'
>```


### Example Response

```json
{
  "id": {number},
  "make": {string},
  "model": {string},
  "licensePlate": {string}
}
```


## DEL /cars/:id

Deletes a specified car. Only accessible for authenticated administrator.


### Resource URL

>```
>https://parcel-delivery-system-ng.herokuapp.com/api/cars/:id
>```


### Resource Information

<table>
  <tr><td>Response formats</td><td>JSON</td></tr>
  <tr><td>Requires authentication?</td><td>Yes</td></tr>
  <tr><td>Response codes</td><td>204, 400, 401, 403</td></tr>
</table>


###  Parameters

|Name|Required|Description|Default Value|Example|
|---|---|---|---|---|
|id|required|ID of the car||1|


### Example Requests

>```
>curl --location --request DELETE 'https://parcel-delivery-system-ng.herokuapp.com/api/cars/1' \
>--header 'authorization: Bearer Token'
>```


### Example Response

```json
null
```




## POST /auth/register

Registers the user.


### Resource URL

>```
>https://parcel-delivery-system-ng.herokuapp.com/api/auth/register
>```


### Resource Information

<table>
  <tr><td>Response formats</td><td>JSON</td></tr>
  <tr><td>Requires authentication?</td><td>No</td></tr>
  <tr><td>Response codes</td><td>201, 400</td></tr>
</table>


###  Parameters

|Name|Required|Description|Default Value|Example|
|---|---|---|---|---|
|username|required|Username of the user to register||example|
|password|required|Password of the user to register||example|
|email|required|Email of the user to register||example@example.com|


### Example Requests

>```
>curl --location --request POST 'https://parcel-delivery-system-ng.herokuapp.com/api/auth/register' \
>--data-urlencode 'username=example' \
>--data-urlencode 'password=example' \
>--data-urlencode 'email=example@example.com'
>```


### Example Response

```json
{
    "user": {user-object},
    "token": {string}
}
```


## POST /auth/login

Logs in the specified user.


### Resource URL

>```
>https://parcel-delivery-system-ng.herokuapp.com/api/auth/login
>```


### Resource Information

<table>
  <tr><td>Response formats</td><td>JSON</td></tr>
  <tr><td>Requires authentication?</td><td>No</td></tr>
  <tr><td>Response codes</td><td>201, 400</td></tr>
</table>


###  Parameters

|Name|Required|Description|Default Value|Example|
|---|---|---|---|---|
|username|required|Username of the user to login with||example|
|password|required|Password of the user to login with||example|


### Example Requests

>```
>curl --location --request POST 'https://parcel-delivery-system-ng.herokuapp.com/api/auth/login' \
>--data-urlencode 'username=example' \
>--data-urlencode 'password=example'
>```


### Example Response

```json
{
    "user": {user-object},
    "token": {string}
}
```


## GET /auth/logout

Logs out the current user.


### Resource URL

>```
>https://parcel-delivery-system-ng.herokuapp.com/api/auth/logout
>```


### Resource Information

<table>
  <tr><td>Response formats</td><td>JSON</td></tr>
  <tr><td>Requires authentication?</td><td>Yes</td></tr>
  <tr><td>Response codes</td><td>200, 401</td></tr>
</table>


###  Parameters

None


### Example Requests

>```
>curl --location --request GET 'https://parcel-delivery-system-ng.herokuapp.com/api/auth/logout' \
>--header 'authorization: Bearer Token'
>```


### Example Response

```json
{
  "message": "User logged out successfully."
}
```


## GET /auth/me

Returns the current users information.


### Resource URL

>```
>https://parcel-delivery-system-ng.herokuapp.com/api/auth/me
>```


### Resource Information

<table>
  <tr><td>Response formats</td><td>JSON</td></tr>
  <tr><td>Requires authentication?</td><td>Yes</td></tr>
  <tr><td>Response codes</td><td>200, 401</td></tr>
</table>


###  Parameters

None


### Example Requests

>```
>curl --location --request GET 'https://parcel-delivery-system-ng.herokuapp.com/api/auth/me' \
>--header 'authorization: Bearer Token'
>```


### Example Response

```json
{
  "id": {number},
  "username": {string},
  "email": {string},
  "role": {string},
  "createdAt": {string},
  "updatedAt": {string},
  "courier": {courier-object}
}
```


## GET /users

Returns a list of all users with the current page, total pages and result count. Only accessible for authenticated administrator.


### Resource URL

>```
>https://parcel-delivery-system-ng.herokuapp.com/api/users
>```


### Resource Information

<table>
  <tr><td>Response formats</td><td>JSON</td></tr>
  <tr><td>Requires authentication?</td><td>Yes</td></tr>
  <tr><td>Response codes</td><td>200, 204, 400, 401, 403</td></tr>
</table>


###  Parameters

|Name|Required|Description|Default Value|Example|
|---|---|---|---|---|
|page|optional|The page number||1|
|size|optional|The number of users to return per page||10|
|unassigned|optional|When set to true, will only return users that have not been assigned to a courier||true|


### Example Requests

>```
>curl --location --request GET 'https://parcel-delivery-system-ng.herokuapp.com/api/users' \
>--header 'authorization: Bearer Token'
>```


### Example Response

```json
{
    "page": 1,
    "results": [
        {user-object},
        {user-object},
        {user-object}
    ],
    "total_pages": 5,
    "total_results": 13
}
```


# Išvados
Pavyko realizuoti siuntų pristatymo sistemą bei geriau išmokti front-end, back-end technologijas naudotas šiame darbe, talpinimą į debesį bei sistemos dokumentavimą.