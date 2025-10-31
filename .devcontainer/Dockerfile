# Use the official Node.js image as base
ARG NODE_VERSION=20
FROM node:${NODE_VERSION}

# Install additional tools and dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    wget \
    vim \
    sudo \
    dos2unix \
    htop \
    && rm -rf /var/lib/apt/lists/*

# Create a non-root user
ARG USERNAME=node
ARG USER_UID=1000
ARG USER_GID=$USER_UID

# Ensure the node user has the correct UID/GID
RUN if [ "$(id -u node 2>/dev/null || echo 0)" != "$USER_UID" ] && [ "$USER_UID" != "1000" ]; then \
        groupmod --gid $USER_GID node && \
        usermod --uid $USER_UID --gid $USER_GID node; \
    fi

# Add node user to sudoers
RUN echo $USERNAME ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$USERNAME \
    && chmod 0440 /etc/sudoers.d/$USERNAME

# Set working directory
WORKDIR /workspace

# Set the default user
USER node

# Expose Angular development server port
EXPOSE 4200

# Continue setting up software in the entry point script.
COPY .devcontainer/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN sudo dos2unix /usr/local/bin/entrypoint.sh
RUN sudo chmod a+x /usr/local/bin/entrypoint.sh
