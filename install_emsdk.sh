#!/bin/bash

# This script automates the installation of the Emscripten SDK.
# It should be run only once to set up the environment.
set -e

# Emscripten SDK directory
EMSDK_DIR=~/emsdk

# Check if the emsdk directory already exists.
if [ -d "$EMSDK_DIR" ]; then
    echo "✅ Emscripten SDK directory already exists at $EMSDK_DIR. Skipping git clone."
else
    echo "⚡ Cloning Emscripten SDK into $EMSDK_DIR..."
    git clone https://github.com/emscripten-core/emsdk.git "$EMSDK_DIR"
fi

# Enter the directory to run the installation commands.
cd "$EMSDK_DIR"

# Download and install the latest SDK tools.
./emsdk install latest

# Make the "latest" SDK "active" for the current user.
./emsdk activate latest

# Activate PATH and other environment variables in the current terminal
echo 'source "$EMSDK_DIR/emsdk_env.sh"' >> ~/.bash_profile