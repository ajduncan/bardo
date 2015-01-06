#!/bin/sh

# Update and upgrade
echo "Updating system..."
apt-get update > /dev/null 2>&1
echo "Upgrading system packages..."
apt-get -y upgrade > /dev/null 2>&1

# Install system dependencies.
echo "Installing system dependencies: nodejs, npm"
apt-get -y install nodejs npm > /dev/null 2>&1

# Make pm2 and other apps happy.
if [ ! -f /usr/bin/node ]; then
    echo "linking /usr/bin/nodejs to /usr/bin/node ..."
    ln -s /usr/bin/nodejs /usr/bin/node
fi

# Install pm2
echo "Installing pm2 for process management..."
npm install pm2 -g > /dev/null 2>&1
npm install pm2-web -g > /dev/null 2>&1

# Install npm dependencies.
echo "Installing dependencies..."
cd /vagrant; npm install

# Ensure log folder exists
if [ ! -d /vagrant/logs ]; then
    mkdir /vagrant/logs
fi

# Run the app.
echo "Running app."
pm2 start processes.json --watch > /dev/null 2>&1

# Report status
echo "Status of processes..."
pm2 list
