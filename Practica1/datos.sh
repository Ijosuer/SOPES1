#!/bin/bash
cyan='\033[36m'
reset='\033[0m'
name="202000895"

while true; do
	sleep 5
	echo -n -e "${cyan}$name$reset"
done
