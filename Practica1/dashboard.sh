#!/bin/bash

while true; do
    clear  # Limpiar la pantalla antes de imprimir la nueva información

    # Información del sistema
    echo "==== Dashboard de Monitoreo ===="
    echo "Fecha y hora: $(date)"
    echo "----------------------------------"

    # Procesos en memoria
    echo "Procesos en memoria:"
    ps aux | awk '{print $2, $3, $4, $11}' | head -n 6
    echo "----------------------------------"

    # Uso de RAM
    echo "Uso de RAM:"
    free -m | awk 'NR==2 {print "Total: " $2 "MB, Usada: " $3 "MB, Libre: " $4 "MB"}'
    echo "----------------------------------"

    # Uso de disco duro
    echo "Uso de disco duro:"
    df -h | awk '$NF=="/" {print "Total: " $2 ", Usado: " $3 ", Libre: " $4}'
    echo "----------------------------------"

    # Uso de CPU
    echo "Uso de CPU:"
    top -bn1 | grep '%Cpu' | awk '{print "Usuario: " $2 ", Sistema: " $4 ", Ocioso: " $8}'
    echo "----------------------------------"

    sleep 5  # Actualizar cada 5 segundos
done
