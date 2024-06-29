# Build: docker build -t my-html-app .
# Run: docker run -d -p 8080:80 --name my-html-app-container -v "${PWD}:/usr/share/nginx/html" my-html-app   
# Stop: docker stop my-html-app-container
# Delete: docker rm my-html-app-container

# Use the official Nginx image from the Docker Hub
FROM nginx:alpine

# Copy your HTML, CSS, and JS files to the Nginx html directory
COPY . /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 80

# Start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]
