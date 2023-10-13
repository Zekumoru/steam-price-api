# Steam Price API

## Description

Returns the prices of games on Steam using a web scraper.

## Starting MongoDB

Before starting this API, it needs the MongoDB server running. Its installation guide is found here: [Install MongoDB Community Edition on Ubuntu](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu/).

## Starting Server

It is advised to use **pm2** to have the API continually running.

```bash
pm2 start server.js --name "Steam Price API"
```

## Reverse Proxy Setup

Under a `server` block, set a location block pointing to this API.<br>

Replace `PORT_NUMBER_HERE` with the port number provided in the `.env` file.

```conf
location /steam-price {
    proxy_pass  http://127.0.0.1:PORT_NUMBER_HERE;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
}
```

> Notice the location path: `/steam-price` so it's **not** `/steam-price-api`.

<br>

> The `server` block in my case is in `/etc/nginx/conf.d/www.my-website-name.com.conf`.
