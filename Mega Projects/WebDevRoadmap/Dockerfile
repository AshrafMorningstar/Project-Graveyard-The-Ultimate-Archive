# Lightweight Web Server for Static Content
FROM nginx:alpine

# Copy all project files to Nginx document root
COPY . /usr/share/nginx/html

# Custom Nginx configuration for correct MIME types and caching
RUN echo 'server { \
    listen 80; \
    server_name localhost; \
    root /usr/share/nginx/html; \
    index index.html; \
    location / { \
        try_files $uri $uri/ =404; \
    } \
    # Cache static assets \
    location ~* \.(css|js|jpg|jpeg|png|gif|ico|svg)$ { \
        expires 30d; \
        add_header Cache-Control "public, no-transform"; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
