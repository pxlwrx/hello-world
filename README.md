# System Information Demo

A lightweight web application that displays various system and browser information using vanilla JavaScript and Nginx. Perfect for testing Coolify deployments.

## Features

- **Browser Information**: User agent, platform, language, cookies status, and online status
- **Location Information**: Hostname, protocol, port, pathname, origin, and full URL
- **Screen Information**: Resolution, available size, color depth, pixel ratio, and viewport size
- **Date & Time Information**: Current time with timezone information and locale
- **Performance Information**: Memory usage, connection type, hardware concurrency, and touch capabilities
- **Storage Information**: Local storage, session storage, IndexedDB, and WebSQL availability
- **Real-time Updates**: Live clock and connection status monitoring
- **Responsive Design**: Built with Bulma CSS framework for clean, mobile-friendly UI

## Tech Stack

- **Frontend**: HTML5, Vanilla JavaScript, Bulma CSS (via CDN)
- **Web Server**: Nginx (Alpine Linux)
- **Container**: Docker
- **Orchestration**: Docker Compose

## Project Structure

```
hello-world/
├── public/
│   ├── index.html          # Main HTML page
│   └── js/
│       └── system-info.js  # JavaScript functionality
├── Dockerfile              # Docker container configuration
├── docker-compose.yml      # Docker Compose configuration
└── README.md              # This file
```

## Quick Start

### Using Docker Compose

1. Clone or download this project
2. Navigate to the project directory
3. Run the application:

```bash
docker-compose up -d
```

4. Open your browser and navigate to `http://localhost:8080`

### Using Docker directly

```bash
# Build the image
docker build -t system-info-demo .

# Run the container
docker run -d -p 8080:80 --name system-info-demo system-info-demo
```

## Coolify Deployment

This project is designed to work seamlessly with Coolify:

1. **Repository Deployment**: Point Coolify to this repository
2. **Docker Deployment**: Coolify will automatically detect the Dockerfile
3. **Port Configuration**: The application runs on port 80 internally, map to your desired external port
4. **Health Check**: The app serves content immediately and doesn't require any startup time

### Coolify Labels

The docker-compose.yml includes Coolify-specific labels:
- `coolify.name=system-info-demo`
- `coolify.managed=true`

## Development

### Local Development

For local development without Docker:

1. Serve the `public` directory using any static file server
2. Example with Python: `python -m http.server 8080` (from the public directory)
3. Example with Node.js: `npx serve public -p 8080`

### Customization

- **Styling**: Modify the Bulma classes in `index.html` or add custom CSS
- **Functionality**: Extend `system-info.js` to collect additional information
- **Nginx Configuration**: Add custom nginx.conf if needed

## Browser Compatibility

This application uses modern JavaScript APIs and should work in:
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

Some features may not be available in older browsers (gracefully degraded).

## Security Notes

This application only accesses client-side information that's publicly available to JavaScript. No sensitive system information is exposed. All data collection happens in the browser and is not transmitted to any external servers.

## API Information Collected

- `navigator.*` properties for browser and system info
- `screen.*` properties for display information
- `performance.memory` for memory usage (Chrome only)
- `navigator.connection` for network information (limited browser support)
- Storage API availability testing

## Contributing

Feel free to submit issues and pull requests to improve this demo project.

## License

This project is open source and available under the MIT License.