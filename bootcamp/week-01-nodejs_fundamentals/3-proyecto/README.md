# 🚀 Procesador de Datos — Catálogo de Patinetas Eléctricas (CLI)

> *Desarrollado por:* Faloon Johanna Ortiz  
> *Bootcamp:* Software Analysis and Development  
> *Semana 1:* Fundamentos de Node.js y TypeScript

---

## 🎯 Objetivo del Proyecto
Construir una herramienta de línea de comandos (CLI) robusta y modular utilizando *Node.js, TypeScript y programación asíncrona (async/await)*, capaz de leer datos desde un archivo JSON, aplicar filtros personalizados, procesar estadísticas analíticas y generar reportes automáticos en formato JSON.

---

## 📋 Dominio Asignado: Tienda de Patinetas Eléctricas

* *Recurso Principal:* Scooter
* *Dataset de Trabajo:* data/items.json (Catálogo con registros detallados)
* *Atributos del Recurso (Scooter):*
  * id: Identificador único de la patineta.
  * name: Modelo o nombre comercial.
  * category: Categoría operativa (ej. Urban, Off-Road, Kids).
  * price: Valor comercial en dólares.
  * active: Estado actual de disponibilidad (true / false).
  * stock: Unidades disponibles en inventario.

---

## 🛠️ Arquitectura y Estructura del Código

El proyecto está diseñado bajo una arquitectura modular y limpia, separando responsabilidades en cada archivo:
* *src/types.ts*: Definición estricta de interfaces y tipos en TypeScript para los ítems y los reportes.
* *src/reader.ts*: Módulo encargado de la lectura asíncrona segura del archivo JSON usando fs/promises.
* *src/processor.ts*: Contiene la lógica de negocio para filtrar por categorías (insensible a mayúsculas/minúsculas) y calcular métricas estadísticas (totales, promedios, elementos más caros y económicos).
* *src/writer.ts*: Gestiona la creación automática del directorio de salida y la persistencia del reporte procesado.
* *src/index.ts: Archivo de entrada principal (*CLI Entry Point) que captura los argumentos de la consola y orquesta todo el flujo de ejecución.

---

## ✅ Requisitos Funcionales Implementados

1. *Lectura de Datos Asíncrona:* Lectura limpia y eficiente de data/items.json.
2. *Resumen Estadístico del Catálogo:* Cálculo preciso de:
   * Total de elementos en inventario.
   * Patinetas activas vs. inactivas.
   * Precio promedio del catálogo.
   * Identificación del modelo más costoso y el más económico.
3. *Filtrado por Línea de Comandos:* Soporte para el parámetro --category para segmentar la información en tiempo de ejecución.
4. *Generación de Reportes:* Creación automática del archivo consolidado en output/report.json.
5. *Manejo Robusto de Errores:* Control de excepciones para archivos inexistentes, catálogos vacíos o categorías no encontradas (mostrando sugerencias y cerrando con códigos de salida seguros).

---

## 🧪 Instrucciones de Ejecución y Pruebas

Abre tu terminal integrada en la ruta del proyecto y sigue estos pasos:

### 1. Instalar dependencias requeridas
```bash
npx pnpm@10.34.5 install

## 1. Resumen general sin filtros
```bash
npx tsx src/index.ts --category Urban ,off road o kids
