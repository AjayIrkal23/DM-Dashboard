import subprocess
import os

# Define the path and the command
path = "E:\\codes\\DM Dashboard\\server"
command = "npm run dev"

# Change the current working directory
os.chdir(path)

# Run the command
subprocess.run(command, shell=True)
