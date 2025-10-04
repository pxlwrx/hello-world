FROM nginx:alpine

# Copy static files to nginx html directory
COPY public/ /usr/share/nginx/html/

# Copy custom nginx configuration if needed (optional)
# COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# The default nginx alpine image already has the correct CMD
# CMD ["nginx", "-g", "daemon off;"]
