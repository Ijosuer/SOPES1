#!/bin/bash

limite=$1
cont=1

while true;do
	echo -n "$cont"
	sleep 2
	((cont++))
	if (($cont > $limite));then
		cont=1
	fi
done
