# Crypto Investigation Reporting App Backend / API
Author: Kylan Hurt

Created: 2024-01-18

## Intro

The purpose of this repository is to provide backend infrastructure for Coinstructive's Crypto Investigation Reporting App. This API uses the AdonisJS framework, along with Postgres.

## Instructions

This backend module requires the installation of the following software for the host environment:

* Node (v18 recommended, preferably installed via nvm)
* yarn
* Postgres

Once those are installed, follow these steps **from this folder** for development:
1. Create a `.env` file in this folder, copy over the values from `.env.example` file and change the values to match your local instance. Pay attention to the port being used and Postgres values (eg `PG_USER`, `PS_PASSWORD`, etc). Make sure that your local Postgres instance is running with the corresponding database name, user, password, and port.
2. Run `node ace migration:refresh`, which should create the necessary Postgres tables
3. Run `yarn dev` and pay attention to which port the app is running on.
