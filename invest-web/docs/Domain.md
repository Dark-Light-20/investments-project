# App Domain

## Table of Contents

- [Entities](#entities)
  - [CDT Term](#cdt-term)
    - [Attributes](#attributes)
  - [FIC](#fic)
    - [Attributes](#attributes-1)
- [Use Cases](#use-cases)
  - [CDT](#cdt)
    - [Get CDT Rates](#get-cdt-rates)
    - [Get Investment](#get-investment)
  - [FIC](#fic-1)
    - [Get FIC Rates](#get-fic-rates)

# Entities

## CDT Term

A CDT (Certificate of Time Deposit) is a financial product offered by banks, similar to a fixed-term deposit or a certificate of deposit. It is a low-risk investment where the investor agrees to deposit a certain amount of money for a fixed period of time, and in return, the bank pays a fixed interest rate.

### Attributes

- Rate (EA: Annual Efective)
- Amount range
- Time range
- Bank

The CDT rate is the fixed interest rate paid by the bank for the investment, the investment range is the minimum and maximum amount of money that can be invested at the CDT rate, and the time range is the minimum and maximum number of days that the investment must be held to receive the CDT rate. Together, these attributes define the terms of the CDT investment.

The bank attribute is related to the financial institution that offers the CDT.

## FIC

A FIC (Fondo de Inversión Coletiva) is a type of investment fund similar to a mutual fund. It is a collective investment scheme where multiple investors pool their money together to invest in a portfolio of assets, such as stocks, bonds, and real estate. The FIC is managed by a professional fund manager who makes investment decisions on behalf of the investors.

### Attributes

- Rates
  - Rate (EA: Annual Efective)
  - Historic time
- Bank
- Profile
- Name
- Unit value
- Fund value

The FIC rate is the interest rate that the bank made profitable its value in the historic time. The bank attribute is related to the financial institution that offers the FIC. The profile attribute is related to the risk profile of the FIC. The name attribute is the name of the FIC. The unit value is the value of the FIC unit. The fund value is the value of the FIC fund.

# Use Cases

## CDT

1. Get CDT Rates:
   <br>
   This use case describes the process of getting the CDT rates of all banks that the app can retrieve.

2. Get Investment:
   <br>
   This use case describes the process of getting the final value invested of a CDT by its attributes.

## FIC

1. Get FIC Rates:
   <br>
   This use case describes the process of getting the FICs rates of all banks that the app can retrieve with its informational attributes.
