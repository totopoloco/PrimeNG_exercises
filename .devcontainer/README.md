# Development Container Configuration

This directory contains the configuration for developing the PrimeNG Angular project in a containerized environment using Visual Studio Code.

## What's Included

### Container Setup
- **Node.js 20**: Latest LTS version for Angular development
- **Angular CLI**: Automatically installed globally during container creation
- **Git**: Version control tools
- **Essential utilities**: curl, wget, vim

### VS Code Extensions
The following extensions are automatically installed:
- **Angular Language Service**: IntelliSense and error checking for Angular templates
- **Angular Snippets**: Code snippets for Angular development
- **TypeScript**: Enhanced TypeScript support
- **ESLint**: JavaScript/TypeScript linting
- **Prettier**: Code formatting
- **Path Intellisense**: Autocomplete for file paths
- **EditorConfig**: Maintain consistent coding styles
- **Auto Rename Tag**: Automatically rename paired HTML tags
- **Angular Console**: UI for Angular CLI commands

### Port Forwarding
- Port **4200** is automatically forwarded for the Angular development server

## How to Use

1. **Prerequisites**:
   - Install [Visual Studio Code](https://code.visualstudio.com/)
   - Install the [Dev Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)
   - Install [Docker Desktop](https://www.docker.com/products/docker-desktop)

2. **Open in Container**:
   - Open this project in VS Code
   - Press `F1` and select "Dev Containers: Reopen in Container"
   - Wait for the container to build (first time may take a few minutes)

3. **Start Developing**:
   - Once the container is ready, you can start the Angular development server:
     ```bash
     ng serve
     ```
   - Open your browser to `http://localhost:4200`

## Customization

- **Node.js Version**: Edit the `NODE_VERSION` argument in `devcontainer.json`
- **Additional Extensions**: Add extension IDs to the `extensions` array in `devcontainer.json`
- **VS Code Settings**: Modify the `settings` object in `devcontainer.json`
- **Additional Tools**: Add packages to the Dockerfile's `apt-get install` command

## Benefits

✅ Consistent development environment across team members  
✅ No need to install Node.js, Angular CLI, or dependencies locally  
✅ Isolated from your host system  
✅ Quick onboarding for new developers  
✅ Same environment for development and CI/CD
