## How to start the project

- Download the repo
- Make sure you have node installed
- Run `npm install` to install all the dependencies
- Run `npm start` to start the server
- Post `http://localhost:5000/mobile` in postman with the following body

```
{ "components": ["I","A","D","F","K"] }
```

- You can change the components array to test different scenarios
- The response will be an array of objects with the following structure

```
{
    "orderId": 827318.8638751876,
    "price": 142.3,
    "parts": [
        "Android OS",
        "LED Screen",
        "Wide-Angle Camera",
        "USB-C Port",
        "Metallic Body"
    ]
}
```



