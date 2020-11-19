# E-Commerce Documentation

## BASE URL
```
http://localhost:3000
http://ecommerce-cms-yosiaelnino.herokuapp.com
```

## User Register

* ### URL

```
/register
```

* ### Method:

  `POST`

* ### URL Params

  `None`

* ### Data Params

```json
{
    "email": "johndoe@mail.com",
    "password": "johndoe"
}
```

* ### Success Response:

`Status: 201`
```json
{
    "id": 1,
    "email": "johndoe@mail.com"
}
```
* ### Error Response:

`Status: 400`
```
{
    "msg": "Email is required, Password is required"
}

{
    "msg": "Email has already been taken"
}
```
`Status: 500`
```
{
    "msg": "Internal server error"
}
```
----------------------------------

## User Register

* ### URL

```
/login
```

* ### Method:

  `POST`

* ### URL Params

  `None`

* ### Data Params

```json
{
    "email": "johndoe@mail.com",
    "password": "johndoe"
}
```

* ### Success Response:

`Status: 201`
```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJjdXN0b21lckBtYWlsLmNvbSIsImlhdCI6MTYwNTc1OTQ1NX0.OyNQfL-awIybWlIsiL8N5rk4gsvz6OAu3aktLPrnMiE",
    "email": "johndoe@mail.com",
    "role": "customer"
}
```
* ### Error Response:

`Status: 401`
```
{
    "msg": "Wrong email or password"
}
```
`Status: 500`
```
{
    "msg": "Internal server error"
}
```
----------------------------------

## Create Product

* ### URL

```
/products
```

* ### Method:

  `POST`

* ### URL Params

  `None`

* ### Data Params

```json
{
  "name": "Sepatu",
  "description": "Sepatu merah celana biru ku tak peduli",
  "image_url": "https://static.shop.adidas.co.id/media/catalog/product/cache/2/thumbnail/1200x/9df78eab33525d08d6e5fb8d27136e95/B/B/BB6166_SL_eCom.jpg",
  "price": 2000000,
  "stock": 10
}
```

* ### Success Response:

`Status: 201`
```json
{
    "id": 22,
    "name": "Sepatu",
    "description": "Sepatu merah celana biru ku tak peduli",
    "image_url": "https://static.shop.adidas.co.id/media/catalog/product/cache/2/thumbnail/1200x/9df78eab33525d08d6e5fb8d27136e95/B/B/BB6166_SL_eCom.jpg",
    "price": 2000000,
    "stock": 10,
    "updatedAt": "2020-11-19T04:20:01.917Z",
    "createdAt": "2020-11-19T04:20:01.917Z"
}
```
* ### Error Response:

`Status: 400`
```
{
    "msg": "Name is required, Price is required, Stock is required"
}

{
    "msg": "Price must be greater than 0"
}

{
    "msg": "Please fill price with number"
}

{
    "msg": "Stock must be greater than 0"
}

{
    "msg": "Please fill stock with number"
}

```

`Status: 401`
```JSON

{
    "msg": "Authorization failed, please login as admin"
}

```

`Status: 500`
```
{
    "msg": "Internal server error"
}
```
----------------------------------

## Read Product

* ### URL

```
/products
```

* ### Method:

  `GET`

* ### URL Params

  `category`
  `search`

* ### Data Params

  `NONE`

* ### Success Response:

`Status: 200`
```json
[
    {
        "id": 12,
        "name": "Fairy Top",
        "description": "S (bust: 94cm)\nM (bust 96cm)\nL (bust: 98 cm)\nXL (bust 100-102 cm)\nXXL (bust: 110cm) \nXXXL (bust: 120cm)\nXXXXL (bust: 130cm)",
        "image_url": "https://cf.shopee.co.id/file/50723107c981a67a1d1dd165342cdbad_tn",
        "price": 118000,
        "stock": 0,
        "createdAt": "2020-11-10T06:14:06.265Z",
        "updatedAt": "2020-11-10T06:14:06.265Z",
        "categories": [
            {
                "id": 1,
                "name": "Blouse",
                "cover_image_url": "https://cf.shopee.co.id/file/86306953b931b5375f09846901c7cf72_tn",
                "createdAt": "2020-11-10T06:14:06.265Z",
                "updatedAt": "2020-11-10T06:14:06.265Z"
            }
        ]
    },
    {
        "id": 13,
        "name": "Jenna Top",
        "description": "S (bust: 94cm)\nM (bust 96cm)\nL (bust: 98 cm)\nXL (bust 100-102 cm)\nXXL (bust: 110cm) \nXXXL (bust: 120cm)\nXXXXL (bust: 130cm)",
        "image_url": "https://cf.shopee.co.id/file/86306953b931b5375f09846901c7cf72_tn",
        "price": 118000,
        "stock": 15,
        "createdAt": "2020-11-10T06:14:06.265Z",
        "updatedAt": "2020-11-10T06:14:06.265Z",
        "categories": [
            {
                "id": 1,
                "name": "Blouse",
                "cover_image_url": "https://cf.shopee.co.id/file/86306953b931b5375f09846901c7cf72_tn",
                "createdAt": "2020-11-10T06:14:06.265Z",
                "updatedAt": "2020-11-10T06:14:06.265Z"
            }
        ]
    }
]
```
* ### Error Response:

`Status: 500`
```
{
    "msg": "Internal server error"
}
```
----------------------------------

## Update Product

* ### URL

```
/products/:id
```

* ### Method:

  `PUT`

* ### URL Params

  `id`

* ### Data Params

```json
{
  "name": "Sepatu",
  "description": "Sepatu merah celana biru ku tak peduli",
  "image_url": "https://static.shop.adidas.co.id/media/catalog/product/cache/2/thumbnail/1200x/9df78eab33525d08d6e5fb8d27136e95/B/B/BB6166_SL_eCom.jpg",
  "price": 2000000,
  "stock": 10
}
```

* ### Success Response:

`Status: 200`
```json
{
    "id": 22,
    "name": "Sepatu",
    "description": "Sepatu merah celana biru ku tak peduli",
    "image_url": "https://static.shop.adidas.co.id/media/catalog/product/cache/2/thumbnail/1200x/9df78eab33525d08d6e5fb8d27136e95/B/B/BB6166_SL_eCom.jpg",
    "price": 2000000,
    "stock": 10,
    "updatedAt": "2020-11-19T04:20:01.917Z",
    "createdAt": "2020-11-19T04:20:01.917Z"
}
```
* ### Error Response:

`Status: 400`
```
{
    "msg": "Name is required, Price is required, Stock is required"
}

{
    "msg": "Price must be greater than 0"
}

{
    "msg": "Please fill price with number"
}

{
    "msg": "Stock must be greater than 0"
}

{
    "msg": "Please fill stock with number"
}

```

`Status: 401`
```JSON

{
    "msg": "Authorization failed, please login as admin"
}

```

`Status: 500`
```
{
    "msg": "Internal server error"
}
```
----------------------------------

## Delete Product

* ### URL

```
/products/:id
```

* ### Method:

  `DELETE`

* ### URL Params

  `id`

* ### Data Params

  `NONE`

* ### Success Response:

`Status: 200`
```json
{
    "msg":  "Item has been deleted."
}
```
* ### Error Response:

`Status: 401`
```JSON

{
    "msg": "Authorization failed, please login as admin"
}

```

`Status: 500`
```
{
    "msg": "Internal server error"
}
```
----------------------------------
## Read one Product

* ### URL

```
/products/:id
```

* ### Method:

  `GET`

* ### URL Params

  `id`

* ### Data Params

  `NONE`

* ### Success Response:

`Status: 200`
```json

{
    "id": 12,
    "name": "Fairy Top",
    "description": "S (bust: 94cm)\nM (bust 96cm)\nL (bust: 98 cm)\nXL (bust 100-102 cm)\nXXL (bust: 110cm) \nXXXL (bust: 120cm)\nXXXXL (bust: 130cm)",
    "image_url": "https://cf.shopee.co.id/file/50723107c981a67a1d1dd165342cdbad_tn",
    "price": 118000,
    "stock": 0,
    "createdAt": "2020-11-10T06:14:06.265Z",
    "updatedAt": "2020-11-10T06:14:06.265Z",
    "categories": [
        {
            "id": 1,
            "name": "Blouse",
            "cover_image_url": "https://cf.shopee.co.id/file/86306953b931b5375f09846901c7cf72_tn",
            "createdAt": "2020-11-10T06:14:06.265Z",
            "updatedAt": "2020-11-10T06:14:06.265Z"
        }
    ]
}

```
* ### Error Response:

`Status: 500`
```
{
    "msg": "Internal server error"
}
```
----------------------------------

## Add Category to Product

* ### URL

```
/products/:id/category
```

* ### Method:

  `POST`

* ### URL Params

  `id`

* ### Data Params

```json
[
    {
        "CategoryId": 1
    },
    {
        "CategoryId": 2
    }
]
```

* ### Success Response:

`Status: 201`
```json
{
    "id": 13,
    "name": "Jenna Top",
    "description": "S (bust: 94cm)\nM (bust 96cm)\nL (bust: 98 cm)\nXL (bust 100-102 cm)\nXXL (bust: 110cm) \nXXXL (bust: 120cm)\nXXXXL (bust: 130cm)",
    "image_url": "https://cf.shopee.co.id/file/86306953b931b5375f09846901c7cf72_tn",
    "price": 118000,
    "stock": 15,
    "createdAt": "2020-11-10T06:14:06.265Z",
    "updatedAt": "2020-11-10T06:14:06.265Z",
    "categories": [
        {
            "id": 1,
            "name": "Blouse",
            "cover_image_url": "https://cf.shopee.co.id/file/86306953b931b5375f09846901c7cf72_tn",
            "createdAt": "2020-11-10T06:14:06.265Z",
            "updatedAt": "2020-11-10T06:14:06.265Z"
        }
    ]
}
```
* ### Error Response:

`Status: 401`
```JSON

{
    "msg": "Authorization failed, please login as admin"
}

```

`Status: 500`
```
{
    "msg": "Internal server error"
}
```
----------------------------------

## Delete Category to Product

* ### URL

```
/products/:id/category
```

* ### Method:

  `DELETE`

* ### URL Params

  `id`

* ### Data Params

  `None`

* ### Success Response:

`Status: 200`
```json
{
    "msg": "Category has been deleted"
}
```
* ### Error Response:

`Status: 401`
```JSON

{
    "msg": "Authorization failed, please login as admin"
}

```

`Status: 500`
```
{
    "msg": "Internal server error"
}
```
----------------------------------


## Create Category

* ### URL

```
/categories
```

* ### Method:

  `POST`

* ### URL Params

  `None`

* ### Data Params

```json
{
  "name": "Sepatu",
  "cover_image_url" : "https://ecs7-p.tokopedia.net/img/cache/350/attachment/2020/8/24/40768394/40768394_b6c1e193-b91f-4ac5-9013-672916f2bee8.jpg.webp"
}
```

* ### Success Response:

`Status: 201`
```json
{
  "name": "Sepatu",
  "cover_image_url" : "https://ecs7-p.tokopedia.net/img/cache/350/attachment/2020/8/24/40768394/40768394_b6c1e193-b91f-4ac5-9013-672916f2bee8.jpg.webp"
}
```
* ### Error Response:

`Status: 401`
```JSON

{
    "msg": "Authorization failed, please login as admin"
}

```

`Status: 500`
```
{
    "msg": "Internal server error"
}
```
----------------------------------

## Read Category

* ### URL

```
/categories
```

* ### Method:

  `GET`

* ### URL Params

  `None`

* ### Data Params

  `None`

* ### Success Response:

`Status: 201`
```json
[
    {
        "id": 4,
        "name": "Dress",
        "cover_image_url": "https://cf.shopee.co.id/file/df4d3d2874d34eac9151fc65a094cb70_tn",
        "createdAt": "2020-11-11T16:08:12.778Z",
        "updatedAt": "2020-11-11T16:08:12.778Z"
    },
    {
        "id": 12,
        "name": "Set and Jumpsuit",
        "cover_image_url": "https://cf.shopee.co.id/file/ab5a82a46fc765c1a20c02bd008015f4_tn",
        "createdAt": "2020-11-11T16:08:12.778Z",
        "updatedAt": "2020-11-11T16:08:12.778Z"
    }
]
```
* ### Error Response:

```

`Status: 500`
```
{
    "msg": "Internal server error"
}
```
----------------------------------

## Delete Category

* ### URL

```
/categories/:id
```

* ### Method:

  `DELETE`

* ### URL Params

  `id`

* ### Data Params

  `None`

* ### Success Response:

`Status: 201`
```json
{
  "msg": "Item has been deleted."
}
```
* ### Error Response:

`Status: 401`
```JSON

{
    "msg": "Authorization failed, please login as admin"
}

```

`Status: 500`
```
{
    "msg": "Internal server error"
}
```
----------------------------------

## Create Banner

* ### URL

```
/banners
```

* ### Method:

  `POST`

* ### URL Params

  `None`

* ### Data Params

```json
{
  "title" : "Sale 20%",
  "description" : "New year sale",
  "image_url": "https://ecs7-p.tokopedia.net/img/cache/400/wCVIqt/2020/11/15/8f47a37f-458a-48d5-a1ad-f537a8027f55.jpg.webp",
  "status" : "Active",
  "type": "Sale"
}
```

* ### Success Response:

`Status: 201`
```json
{
  "title" : "Sale 20%",
  "description" : "New year sale",
  "image_url": "https://ecs7-p.tokopedia.net/img/cache/400/wCVIqt/2020/11/15/8f47a37f-458a-48d5-a1ad-f537a8027f55.jpg.webp",
  "status" : "Active",
  "type": "Sale"
}
```
* ### Error Response:

`Status: 401`
```JSON

{
    "msg": "Authorization failed, please login as admin"
}

```

`Status: 500`
```
{
    "msg": "Internal server error"
}
```
----------------------------------

## Read Banner

* ### URL

```
/banners
```

* ### Method:

  `GET`

* ### URL Params

  `None`

* ### Data Params

  `None`

* ### Success Response:

`Status: 200`
```json
[
    {
        "id": 3,
        "title": "Best selling",
        "description": "Best Selling",
        "image_url": "https://cf.shopee.co.id/file/3b7821e239e883442be28d8ab429ea99",
        "status": "Active",
        "type": "Info",
        "createdAt": "2020-11-14T08:26:10.983Z",
        "updatedAt": "2020-11-14T10:46:04.261Z"
    },
    {
        "id": 5,
        "title": "Most Favorite",
        "description": "Most Favorite",
        "image_url": "https://cf.shopee.co.id/file/7288e2833ce711c3536e3c84e7927a1a",
        "status": "Active",
        "type": "Info",
        "createdAt": "2020-11-14T08:26:10.983Z",
        "updatedAt": "2020-11-14T10:46:04.261Z"
    },
    {
        "id": 2,
        "title": "Informesyen",
        "description": "Diskon juga",
        "image_url": "https://static.vecteezy.com/system/resources/previews/000/669/988/original/vector-shopping-online-banner.jpg",
        "status": "Inactive",
        "type": "Sale",
        "createdAt": "2020-11-10T06:07:36.033Z",
        "updatedAt": "2020-11-10T06:07:36.033Z"
    }
]
```
* ### Error Response:

`Status: 500`
```
{
    "msg": "Internal server error"
}
```
----------------------------------

## Update Banner

* ### URL

```
/banners/:id
```

* ### Method:

  `PUT`

* ### URL Params

  `id`

* ### Data Params

```json
{
  "title" : "Sale 20%",
  "description" : "New year sale",
  "image_url": "https://ecs7-p.tokopedia.net/img/cache/400/wCVIqt/2020/11/15/8f47a37f-458a-48d5-a1ad-f537a8027f55.jpg.webp",
  "status" : "Active",
  "type": "Sale"
}
```

* ### Success Response:

`Status: 200`
```json
{
  "title" : "Sale 20%",
  "description" : "New year sale",
  "image_url": "https://ecs7-p.tokopedia.net/img/cache/400/wCVIqt/2020/11/15/8f47a37f-458a-48d5-a1ad-f537a8027f55.jpg.webp",
  "status" : "Active",
  "type": "Sale"
}
```
* ### Error Response:

`Status: 401`
```JSON

{
    "msg": "Authorization failed, please login as admin"
}

```

`Status: 500`
```
{
    "msg": "Internal server error"
}
```
----------------------------------

## Delete Banner

* ### URL

```
/banners/:id
```

* ### Method:

  `DELETE`

* ### URL Params

  `id`

* ### Data Params

  `None`

* ### Success Response:

`Status: 200`
```json
{
  "msg": "item has been deleted"
}
```
* ### Error Response:

`Status: 401`
```JSON

{
    "msg": "Authorization failed, please login as admin"
}

```

`Status: 500`
```
{
    "msg": "Internal server error"
}
```
----------------------------------

## Read One Banner

* ### URL

```
/banners/:id
```

* ### Method:

  `GET`

* ### URL Params

  `id`

* ### Data Params

  `None`

* ### Success Response:

`Status: 200`
```json
{
    "id": 3,
    "title": "Best selling",
    "description": "Best Selling",
    "image_url": "https://cf.shopee.co.id/file/3b7821e239e883442be28d8ab429ea99",
    "status": "Active",
    "type": "Info",
    "createdAt": "2020-11-14T08:26:10.983Z",
    "updatedAt": "2020-11-14T10:46:04.261Z"
}
```
* ### Error Response:

`Status: 500`
```
{
    "msg": "Internal server error"
}
```
----------------------------------

## Create Cart

* ### URL

```
/carts
```

* ### Method:

  `POST`

* ### URL Params

  `None`

* ### Data Params

```json
{
    "ProductId": 12,
    "amount": 1
}
```

* ### Success Response:

`Status: 201`
```json
{
    "id": 22,
    "UserId": 2,
    "ProductId": 12,
    "amount": 0,
    "updatedAt": "2020-11-19T04:44:37.883Z",
    "createdAt": "2020-11-19T04:44:37.883Z"
}
```

`Status: 200`
```json
{
    "msg": "Cart has been updated"
}
```

* ### Error Response:

`Status: 500`
```
{
    "msg": "Internal server error"
}
```
----------------------------------

## Read Cart

* ### URL

```
/carts
```

* ### Method:

  `GET`

* ### URL Params

  `None`

* ### Data Params

  `None`

* ### Success Response:

`Status: 200`
```json
[
    {
        "id": 22,
        "UserId": 2,
        "ProductId": 12,
        "amount": 0,
        "createdAt": "2020-11-19T04:44:37.883Z",
        "updatedAt": "2020-11-19T04:45:00.065Z",
        "Product": {
            "id": 12,
            "name": "Fairy Top",
            "description": "S (bust: 94cm)\nM (bust 96cm)\nL (bust: 98 cm)\nXL (bust 100-102 cm)\nXXL (bust: 110cm) \nXXXL (bust: 120cm)\nXXXXL (bust: 130cm)",
            "image_url": "https://cf.shopee.co.id/file/50723107c981a67a1d1dd165342cdbad_tn",
            "price": 118000,
            "stock": 0,
            "createdAt": "2020-11-10T06:14:06.265Z",
            "updatedAt": "2020-11-10T06:14:06.265Z"
        }
    },
    {
        "id": 13,
        "UserId": 2,
        "ProductId": 13,
        "amount": 2,
        "createdAt": "2020-11-19T01:26:42.210Z",
        "updatedAt": "2020-11-19T02:27:37.984Z",
        "Product": {
            "id": 13,
            "name": "Jenna Top",
            "description": "S (bust: 94cm)\nM (bust 96cm)\nL (bust: 98 cm)\nXL (bust 100-102 cm)\nXXL (bust: 110cm) \nXXXL (bust: 120cm)\nXXXXL (bust: 130cm)",
            "image_url": "https://cf.shopee.co.id/file/86306953b931b5375f09846901c7cf72_tn",
            "price": 118000,
            "stock": 15,
            "createdAt": "2020-11-10T06:14:06.265Z",
            "updatedAt": "2020-11-10T06:14:06.265Z"
        }
    }
]
```

* ### Error Response:

`Status: 500`
```
{
    "msg": "Internal server error"
}
```
----------------------------------

## Update Cart

* ### URL

```
/carts/:id
```

* ### Method:

  `PATCH`

* ### URL Params

  `id`

* ### Data Params

```json
{
    "ProductId": 12,
    "amount": 1
}
```

* ### Success Response:

`Status: 200`
```json
{
    "msg": "Cart has been updated."
}
```

* ### Error Response:

`Status: 401`
```
{
    "msg": "Authorization failed"
}
```

`Status: 404`
```
{
    "msg": "Product not found"
}
```


`Status: 500`
```
{
    "msg": "Internal server error"
}
```
----------------------------------

## Delete Cart

* ### URL

```
/carts/:id
```

* ### Method:

  `DELETE`

* ### URL Params

  `id`

* ### Data Params

  `None`

* ### Success Response:

`Status: 200`
```json
{
    "msg": "Cart has been deleted."
}
```

* ### Error Response:

`Status: 401`
```
{
    "msg": "Authorization failed"
}
```

`Status: 404`
```
{
    "msg": "Product not found"
}
```


`Status: 500`
```
{
    "msg": "Internal server error"
}
```
----------------------------------